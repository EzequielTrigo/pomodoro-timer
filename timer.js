class Timer {
    constructor(goal, frase) {
        this.startTime = null;
        this.elapsedTime = 0;
        this.running = false;
        this.stopped = false;
        this.goal = goal;
        this.frase = frase;
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
        console.log(this)
        if (this.running) {
            this.elapsedTime = Date.now() - this.startTime;
            if (this.elapsedTime >= this.goal) {
                console.log("Goal reached!");
                this.resetTimer();
            }else{
                console.log(this.frase);
            }
        }
    }
}
let pomodoroTimer = new Timer( 4000, "study") // Set goal to 25 minutes
let restTimer = new Timer( 2000, "rest") // Set goal to 5 minutes

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
            loopTimer(timerToMonitor, timerToChange);
        }, 1000);
    }else{
        console.log("termino timer, pasa al otro");
        timerToChange.resetTimer();
        timerToChange.startTimer();
        loopTimer(timerToChange, timerToMonitor)
    }
}