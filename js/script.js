function pressSpace() {
    document.dispatchEvent(new KeyboardEvent('keydown', {key: ' ',
    keyCode: 32,
    code: 'Space'}));    
};

class Mario {
    constructor (id) {
        this.mario = document.getElementById(id);
        this.mario.setAttribute('onclick', 'pressSpace()')
        this.mario.setAttribute('ontouchstart', 'pressSpace()')        
        this.pulando = false;
    };
    bottom (){
        return window.getComputedStyle(this.mario).bottom.replace('px','')
    };
    clientWidth () {
        return this.mario.clientWidth;
    }
    retomarCorrida () {
        this.mario.setAttribute('src', './img/mario-correndo.gif');        
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
            //mario.setAttribute('src', './img/mario-correndo.gif');
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

const mario = new Mario('mario');
const cano = document.querySelector('.cano');

const tratarTecla = (e) => {
    switch (e.code) {
        case 'Space': {            
            if (mario.pulando)
              mario.pularAlto()
            else            
              mario.pular();
            break;
        };
        case 'Escape': {
            window.location.href = window.location.href
            break;
        };
    }
}

const loop = setInterval(() => {
    const posicaoCano = cano.offsetLeft;
    const posicaoMario = mario.bottom();

    if ((posicaoCano > 0) && (posicaoCano <= mario.clientWidth()) && 
        (posicaoMario <= cano.clientHeight)) {
        cano.style.animation = 'none';
        cano.style.left = `${posicaoCano}px`;
    }
    
}, 10);

document.addEventListener('keydown', tratarTecla);
//document.addEventListener('ontouchstart', keyPress);


function startTimer(duration, display) {
    var hour = 0, minute = 0;
    setInterval(function () {
        if (minute++ > 59) {
            if (hour++ > 23) hour = 0;
            minute = 0;
        };
        hour = (hour).toString(10).padStart(2,'0');
        minute = minute < 10 ? "0" + minute : minute;
        display.textContent = hour + ":" + minute;
    }, 50);
}
window.onload = function () {
    var duration = 60 * 24; // Converter para segundos
    display = document.querySelector('#timer'); // selecionando o timer
    startTimer(duration, display); // iniciando o timer
};