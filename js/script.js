const DAY_DURATION_MINUTES = 24 * 60;
const GAME_DAY_DURATION = 60; //in seconds
var cancelSpace = false;

class Game {
    constructor(){
        this.stopped = true;
        this.play = document.getElementById('play');
        this.background = document.getElementById('background');
        this.sun = document.getElementById('sun');
        this.sunShadow = document.getElementById('sun-shadow');
        this.pipe = document.getElementById('pipe');
        this.blocks = document.getElementById('blocks');
        this.mario = new Mario('mario');
        
        //keyboard
        this.background.setAttribute('onclick', 'spaceKeyPressEmulate()');
        this.background.setAttribute('ondbclick', 'spaceKeyPressEmulate()');
        //touch
        this.background.setAttribute('ontouchend', 'spaceKeyPressEmulate()');
        this.background.setAttribute('ontouchmove', 'cancelSpaceKeyPressEmulate()');

        this.play.setAttribute('onclick', 'game.start()');
        this.accelerationFactor = 1;        
    } 
    elementsAnimate(){
        this.background.style.animation = 'background-animate '+ this.dayDuration() +'s'+' infinite linear';
        this.sun.style.animation = 'sun-animate '+ this.dayDuration() +'s'+' infinite linear';
        this.sunShadow.style.animation = 'sun-animate '+ this.dayDuration() +'s'+' infinite linear';
        this.pipe.style.animation = 'pipe-animate '+ this.dayDuration()/30 +'s'+' infinite linear';
        this.blocks.style.animation = 'blocks-animate '+ this.dayDuration()/15 +'s'+' infinite linear';
        this.mario.run();
    }
    elementsStopAnimate(){
        this.stopped = true;
        this.background.style.animation = 'none';
        this.sun.style.animation = 'none';
        this.sunShadow.style.animation = 'none';
        this.pipe.style.animation = 'none';
        this.blocks.style.animation = 'none';
        this.mario.stop();
    }
    dayDuration(){
        return GAME_DAY_DURATION * this.accelerationFactor;
    }   
    start(){
        this.stopped = false;
        this.play.style.display = 'none';
        this.elementsAnimate();
        startTimer();        
        const loop = setInterval(() => {            
            const pipePosition = this.pipe.offsetLeft;
            const marioPosition = this.mario.bottom();
            if ((pipePosition > 0) && (pipePosition <= this.mario.clientWidth()) && 
                (marioPosition <= this.pipe.clientHeight)) {
                this.elementsStopAnimate();
                this.pipe.style.animation = 'none';
                this.pipe.style.left = `${pipePosition}px`;
            }    
        }, 10);
    }
    pushSun_n(){        
        this.sun.setAttribute('src', './img/sun-n.webp');
    }
};

class Mario {
    constructor (id) {
        this.mario = document.getElementById(id);
        //this.mario.style.display = 'none';
        this.pulando = false;
    };
    run(){ 
        //this.mario.retomarCorrida();
        this.mario.setAttribute('src', './img/mario-running.gif');
        this.pulando = false;
    };
    stop(){        
        this.mario.setAttribute('src', './img/mario-stopped.gif');
        this.pulando = false;
    }
    bottom (){
        return window.getComputedStyle(this.mario).bottom.replace('px','')
    };
    clientWidth () {
        return this.mario.clientWidth;
    }
    retomarCorrida () {
        this.mario.setAttribute('src', './img/mario-running.gif');        
        this.pulando = false;
    };
    pular () {
        if (this.mario.classList.contains('pulo-alto'))
            Exit;
        this.pulando = true;
        this.mario.setAttribute('src', './img/mario-pulo.gif');
        this.mario.classList.add('pulo');
        setTimeout(() => {
            this.mario.classList.remove('pulo');
            //mario.setAttribute('src', './img/mario-running.gif');
            if (!this.mario.classList.contains('pulo-duplo')) {
                this.retomarCorrida();
            }
            this.pulando = false;
        }, 500);
    };
    pularAlto () {
        if (this.pulando) {
            if (this.mario.classList.contains('pulo-alto'))
                Exit;
            this.pulando = true;
            this.mario.setAttribute('src', './img/mario-pulo.gif');
            this.mario.classList.add('pulo-duplo');
            setTimeout(() => {
                this.mario.classList.remove('pulo-duplo');
                this.retomarCorrida();
            }, 900);
        };
    };
};

function cancelSpaceKeyPressEmulate() {
    cancelSpace = true;   
};

function spaceKeyPressEmulate() {
    if (game.stopped)
      return;
    document.dispatchEvent(new KeyboardEvent('keydown', 
    {key: ' ',
    keyCode: 32,
    code: 'Space'}));    
};

const keyPress = (e) => {
    if (cancelSpace) {
        cancelSpace = false;
        return 0;
    }
    switch (e.code) {
        case 'Space': { 
            if (game.stopped)
              return;           

            if (game.mario.pulando)
                game.mario.pularAlto()
            else            
                game.mario.pular();
            break;
        };
        case 'Escape': {
            window.location.href = window.location.href
            break;
        };
    }
}

function startTimer() {
    display = document.querySelector('#timer'); // selecionando o timer
   // startTimer(display); // iniciando o timer
    var hour = 0, minute = 0;
    data.setHours(0)
    data.setMinutes(0);
    data.setSeconds(0);
    data.setMilliseconds(0)
    cronometer = setInterval( () => {        
            ++minute;
            display.style.color = '#fa0';
            data2 = new Date(data.getTime() + (minute) * 10 * DAY_DURATION_MINUTES);
            if (!game.stopped)
              display.textContent = data2.toTimeString().substr(0, 5);
            if (data2.getHours() > 20) 
              game.pushSun_n();
        }, 10);
}

if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support 
  hidden = "hidden";
  visibilityChange = "visibilitychange";
} else if (typeof document.msHidden !== "undefined") {
  hidden = "msHidden";
  visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
  hidden = "webkitHidden";
  visibilityChange = "webkitvisibilitychange";
}

// If the page is hidden, pause the video;
// if the page is shown, play the video
function handleVisibilityChange() {
  if (document[hidden]) {
    dataSaida = Date.now();
  } else {
    data = new Date(data.getTime() + (Date.now() - dataSaida) * DAY_DURATION_MINUTES);
  }
}

// Warn if the browser doesn't support addEventListener or the Page Visibility API
if (typeof document.addEventListener === "undefined" || typeof document.hidden === "undefined") {
  console.log("This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.");
} else {
  // Handle page visibility change   
  document.addEventListener(visibilityChange, handleVisibilityChange, false);

  // When the video pauses, set the title.
  // This shows the paused
}

// Set the name of the hidden property and the change event for visibility
var hidden, visibilityChange;
var offTime = 0; 
var data = new Date();
const game = new Game();
//game.run();


document.addEventListener('keydown', keyPress);
document.addEventListener('ontouchend', spaceKeyPressEmulate);
document.addEventListener('ontouchmove', cancelSpaceKeyPressEmulate);
