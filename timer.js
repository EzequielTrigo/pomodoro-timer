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
        this.pair = null;
    }

    startTimer() {
        if (!this.running) {
            this.startTime = Date.now();
            this.running = true;
            console.log("Timer started.");
        }
    }

    stopTimer() {
        if (this.running) {
            this.running=false;
            this.elapsedTime = Date.now() - this.startTime;
            this.stopped = true;
            if (this.elapsedTime >= this.goal) {
                console.log("Goal reached!");
                this.resetTimer();
            }
            console.log("Timer stopped. Elapsed time: " + this.elapsedTime + " ms");
        }
    }

    resumeTimer() {
        if (this.stopped) {
            this.startTime = Date.now() - this.elapsedTime;
            this.running = true;
            this.stopped = false;
            console.log("Timer resumed.");
        }
    }

    resetTimer() {
        this.startTime = null;
        this.elapsedTime = 0;
        this.running = false;
        this.stopped = false;
        console.log("Timer reset.");
    }

    checkGoal() {
        if (this.running) {
            this.elapsedTime = Date.now() - this.startTime;
            if (this.elapsedTime >= this.goal) {
                console.log("Goal reached!");
                this.resetTimer();
            }else{
                console.log(this.frase+"!!!!!!!!!!!");
            }
        }
    }
    pauseWithEventualChange(timerToChange){
        this.timerToChange=timerToChange;
        stoppedTimer=this;
        this.stopTimer;
    }
    resumeWithEventualChange(){
        this.resumeTimer;
        loopTimer(this, this.timerToChange);
    }
}

class Clock {
    constructor(timer) {
        this.timer = timer;
        this.minutes = 0;
        this.seconds = 0;
    }

    displayTime() {
        const elapsedTime = this.timer.elapsedTime;
        this.minutes = Math.floor(elapsedTime / 60000);
        this.seconds = Math.floor((elapsedTime % 60000) / 1000);
        console.log("Elapsed time: " + this.minutes + " minutes and " + this.seconds + " seconds");
    }   

    changeTimer(newTimer) {
        this.timer = newTimer;
        this.minutes = 0;
        this.seconds = 0;
        console.log("Timer changed.");
    }
}

const readline = require("readline/promises");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function actionReader() {
    const action = await rl.question("Next action: ");
    if (action == "stop"){
        stop=true;
    }else if(action == "continue"){
        stop=false;
        stoppedTimer.resumeWithEventualChange();
    }
    actionReader();
}



async function initializeTimes(){
    let pomodoroTime = await rl.question("Set pomodoro time in minutes: ");
    let restTime = await rl.question("Set rest time in minutes: ");
    let pomodoroTimer = new Timer( pomodoroTime * 60000, "study"); // Set goal to pomodoroTime minutes
    let restTimer = new Timer( restTime * 60000, "rest"); // Set goal to restTime minutes
    let stop = false;
    actionReader();
    pomodoroTimer.startTimer();
    let clock = new Clock(pomodoroTimer);
    loopTimer(pomodoroTimer, restTimer, clock, stop);
}

initializeTimes();

function loopTimer(timerToMonitor, timerToChange, clock, stop){
    if(timerToMonitor.running){
        console.log("isRunning");
        clock.displayTime();
        setTimeout(() => {
            timerToMonitor.checkGoal();
            if(stop){
                timerToMonitor.pauseWithEventualChange(timerToChange);
                clock.changeTimer(timerToChange);
            }else{
                loopTimer(timerToMonitor, timerToChange, clock, stop);
            }
        }, 1000);
    }else{
        console.log("termino timer, pasa al otro");
        timerToChange.resetTimer();
        timerToChange.startTimer();
        loopTimer(timerToChange, timerToMonitor, clock, stop);
    }
}