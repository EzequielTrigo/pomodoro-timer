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
const readline = require("readline/promises");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
let stop = false;

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

actionReader();
let pomodoroTimer = new Timer( 8000, "study"); // Set goal to 25 minutes
let restTimer = new Timer( 4000, "rest"); // Set goal to 5 minutes
let stoppedTimer;

pomodoroTimer.startTimer();
console.log(pomodoroTimer.running);
loopTimer(pomodoroTimer,restTimer);
//while (true) {
//    console.log("hola");
//    while (pomodoroTimer.running) {
//        setTimeout(() => console.log(pomodoroTimer.checkGoal()), 500);
//        setTimeout(() => console.log("esperar"), 500);
//    }
//    if (pomodoroTimer.stopped) {
//        restTimer.startTimer();
//        while (restTimer.running) {
//            restTimer.checkGoal();
//            console.log("rest")
//        }
//    }
//}

function loopTimer(timerToMonitor, timerToChange){
    if(timerToMonitor.running){
        console.log("isRunning");
        setTimeout(() => {
            timerToMonitor.checkGoal();
            if(stop){
                timerToMonitor.pauseWithEventualChange(timerToChange);
            }else{
                loopTimer(timerToMonitor, timerToChange);
            }
        }, 2000);
    }else{
        console.log("termino timer, pasa al otro");
        timerToChange.resetTimer();
        timerToChange.startTimer();
        loopTimer(timerToChange, timerToMonitor)
    }
}