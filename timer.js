class Timer {
    constructor(goal, frase) {
        if (goal <=0){
            throw new Error("goal most be greater than 0");
        }
        this.startTime = null;
        this.elapsedTime = 0;
        this.running = false;
        this.stopped = false;
        this.goal = goal;
        this.frase = frase;
        this.timerToChange = null;
    }

    startTimer() {
        if (!this.running) {
            this.startTime = Date.now();
            this.running = true;
            //console.log("Timer started.");
        }
        document.getElementById("estado").innerText =
        `${this.frase}`;
    }

    stopTimer() {
        if (this.running) {
            this.running=false;
            this.elapsedTime = Date.now() - this.startTime;
            this.stopped = true;
            //if (this.elapsedTime >= this.goal) {
            //    console.log("Goal reached!");
            //    this.resetTimer();
            //}
            //console.log("Timer stopped. Elapsed time: " + this.elapsedTime + " ms");
        }
    }

    resumeTimer() {
        if (this.stopped) {
            this.startTime = Date.now() - this.elapsedTime;
            this.running = true;
            this.stopped = false;
            //console.log("Timer resumed.");
            loopTimer(this, this.timerToChange);
            clock.changeTimer(this);
        }
    }

    resetTimer() {
        this.startTime = null;
        this.elapsedTime = 0;
        this.running = false;
        this.stopped = false;
        //console.log("Timer reset.");
        this.startTimer();
    }

    checkGoal() {
        if (this.running) {
            this.elapsedTime = Date.now() - this.startTime;
            //console.log("Checking goal. Elapsed time: " + this.elapsedTime + " ms");
            if (this.elapsedTime >= this.goal) {
                //console.log("Goal reached!");
                this.running = false;
                this.elapsedTime = 0;
                //this.resetTimer();
            }else{
                //console.log(this.frase+"!!!!!!!!!!!");
            }
            clock.displayTime();
            //console.log("timer to change es:" + this.timerToChange);
        }
    }

    pauseWithEventualChange(timerToChange){
        //console.log("pausando timer, el otro es:" + timerToChange.frase);
        this.timerToChange=timerToChange;
        this.stopTimer();
    }
}

class Clock {
    constructor(timer = null) {
        this.timer = timer;
        this.minutes = 0;
        this.seconds = 0;
    }

    displayTime() {
        if (this.timer != null) {
            const elapsedTime = this.timer.elapsedTime;
            this.minutes = Math.floor(elapsedTime / 60000);
            this.seconds = Math.floor((elapsedTime % 60000) / 1000);
            console.log("Elapsed time: " + this.minutes + " minutes and " + this.seconds + " seconds");
            //console.log("time :"+ elapsedTime);
            //console.log("Displaying time of :" + this.timer.frase);
        }else{ console.log("No timer set."); }
        let minutes = String(this.minutes).padStart(2, "0");
        let seconds = String(this.seconds).padStart(2, "0");

        document.getElementById("reloj").innerText =
        `${minutes}:${seconds}`;
    }   

    changeTimer(newTimer) {
        this.timer = newTimer;
        this.minutes = 0;
        this.seconds = 0;
        console.log("Timer changed to: " + newTimer.frase );
    }
}

//const readline = require("readline/promises");

//const rl = readline.createInterface({
//  input: process.stdin,
//  output: process.stdout
//});

//async function actionReader() {
//    const action = await rl.question("Next action: ");
//    if (action == "stop"){
//        stop=true;
//    }else if(action == "continue"){
//        stop=false;
//        stoppedTimer.resumeWithEventualChange();
//    }
//    actionReader();
//}

let stop = false
let clock = new Clock();
let stoppedTimer = null;

function stopTimer(){
    stop=true;
    console.log(stop);
}

function displayTime(){
    clock.displayTime();
}

function continueTimer(){
    stop=false;
    if(stoppedTimer!= null){
        stoppedTimer.resumeTimer();
    }
}

async function initializeTimes(pomodoroTime, restTime){
    //let pomodoroTime = await rl.question("Set pomodoro time in minutes: ");
    //let restTime = await rl.question("Set rest time in minutes: ");
    let pomodoroTimer = new Timer( pomodoroTime * 60000, "study"); // Set goal to pomodoroTime minutes
    let restTimer = new Timer( restTime * 60000, "rest"); // Set goal to restTime minutes
    //actionReader();
    pomodoroTimer.startTimer();
    clock.changeTimer(pomodoroTimer);
    clock.displayTime();
    loopTimer(pomodoroTimer, restTimer);
}

function loopTimer(timerToMonitor, timerToChange){
    if(timerToMonitor.running){
        //console.log("isRunning");
        setTimeout(() => {
            timerToMonitor.checkGoal();
            console.log("stop es:" + stop);
            //clock.displayTime();
            if(stop){
                timerToMonitor.pauseWithEventualChange(timerToChange);
                stoppedTimer=timerToMonitor;
            }else{
                loopTimer(timerToMonitor, timerToChange, clock, stop);
            }
        }, 200);
    }else{
        clock.changeTimer(timerToChange);
        //console.log("termino timer, pasa al otro");
        timerToChange.resetTimer();
        clock.displayTime();
        loopTimer(timerToChange, timerToMonitor, clock, stop);
    }
}