/*var info = {
    preferencias: [200, 200, 200, 200, 200, 200, 200],
    cercania: [200, 180, 170, 150, 130, 110, 90, 70, 50]
}*/
var metodos = [];

var canvas;
var runP5 = 0;
var display = ["none", "block"]
var fs = false;
//if (this.runP5 == true) {

var img = [];

function preload() {
    img[0] = loadImage("imgs/icono_pila.svg");
    img[1] = loadImage("imgs/icono_pastas.svg");
    img[2] = loadImage("imgs/icono_inyectable.svg");
    img[3] = loadImage("imgs/icono_anillo.svg");
    img[4] = loadImage("imgs/icono_parche.svg");
    img[5] = loadImage("imgs/icono_t.svg");
    img[6] = loadImage("imgs/icono_mujer.svg");
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function setup() {
    pixelDensity(2.0);
    imageMode(CENTER);
    rectMode(CENTER);
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.style('z-index', '-1');
    canvas.style('position', 'fixed');
    canvas.style('display', display[runP5]);
    metodos = [];

    if (vista.metodos != null) {
        vista.metodos.forEach((m, index) => {
            metodos.push(new Metodo(img[index], m.nombre, m.aplicacion, m.control, m.visible, m.inyectable, m.ingerible, m.insercion, m.interrupcion, m.uso, m.costo, m.url, m.resumen, m.ref));
        });

    } else {
        console.log(vista.metodos);
    };

}

function draw() {
    background(255, 252, 250);
    // background(0, 252, 250);

    noStroke();
    fill(255, 245, 230);
    ellipse(width / 2, height / 2, 780, 780);

    fill(255);
    ellipse(width / 2, height / 2, 580, 580);

    fill(255, 252, 250);
    ellipse(width / 2, height / 2, 580, 580);
    fill(244, 218, 225);
    ellipse(width / 2, height / 2, 300, 300);

    image(img[6], width / 2, height / 2);

    metodos.forEach((metodo, index) => {
        metodo.setIncremento(index * 0.99);
        metodo.mover(width / 2, height / 2);
        metodo.flotar();
        metodo.pintar();
    });




}
var full = false;

function mousePressed() {
    if (full == true) {
        fullscreen(!fs);
        full = false;
    }

}


function Metodo(img, n, a, c, v, y, g, s, t, uso, costo, url, resumen, ref) {

    this.nombre = n;
    this.aplicacion = a;
    this.control = c;
    this.visible = v;
    this.inyectable = y;
    this.ingerible = g;
    this.insercion = s;
    this.interrupcion = t;
    this.uso = uso;
    this.costo = costo;
    this.url = url;
    this.resumen = resumen;
    this.ref = ref;

    this.img = img;
    this.x = width / 2;
    this.y = height / 2;

    this.p = 4;
    this.amp = [400, 360, 320, 280, 240, 200, 160, 120, 80];
    this.pasos = this.amp[this.p];
    this.desplazaCerca = false;
    this.desplazaLejos = false;

    this.d = 1;
    this.diametro = [45, 55, 65, 76, 85, 95];
    this.dimer = this.diametro[this.d];
    this.dimerMax = false;
    this.dimerMin = false;

    this.incremento = 2;

    this.fx = 0;
    this.fy = 0;
    this.famp = Math.floor(Math.random() * (6 - 5)) + 5;
    this.finc = 0;
    this.fs = Math.random() * (0.1);

    this.mover = function (width, height) {
        // this.x = width + (cos(this.incremento) * this.amp[this.p]);
        //this.y = height + (sin(this.incremento) * this.amp[this.p]);

        this.x = width + (cos(this.incremento) * this.pasos);
        this.y = height + (sin(this.incremento) * this.pasos);

        if (this.desplazaCerca == true) {
            this.pasos -= 3;
            if (this.pasos < this.amp[this.p]) {
                this.pasos = this.amp[this.p];
                this.desplazaCerca = false;
            }
        }
        if (this.desplazaLejos == true) {
            this.pasos += 3;
            if (this.pasos > this.amp[this.p]) {
                this.pasos = this.amp[this.p];
                this.desplazaLejos = false;
            }
        }
    }

    this.setIncremento = function (incremento) {
        this.incremento = incremento;
    }

    this.desplazarCerca = function () {
        this.desplazaCerca = true;

    }
    this.desplazarLejos = function () {
        this.desplazaLejos = true;

    }
    //==================================

    this.dimerizarMax = function () {
        this.dimerMax = true;
    }

    this.dimerizarMin = function () {
        this.dimerMin = true;
    }

    //=================================
    this.getAmpLength = function () {
        return this.amp.length;
    }
    this.getDiametroLength = function () {
        return this.diametro.length;
    }

    this.flotar = function () {
        this.finc += this.fs;
        this.fx = cos(this.finc) * this.famp;
        this.fy = sin(this.finc) * this.famp;
    }

    this.pintar = function () {

        // image(img, this.x + this.fx, this.y + this.fy, this.diametro[this.d], this.diametro[this.d]);
        image(img, this.x + this.fx, this.y + this.fy, this.dimer, this.dimer);

        if (this.dimerMax == true) {
            this.dimer += 3;
            if (this.dimer > this.diametro[this.d]) {
                this.dimer = this.diametro[this.d];
                this.dimerMax = false;
            }
        }
        if (this.dimerMin == true) {
            this.dimer -= 3;
            if (this.dimer < this.diametro[this.d]) {
                this.dimer = this.diametro[this.d];
                this.dimerMin = false;
            }
        }

    }

}
/*  console.log("Item: " + atributos[index + 1] + " / Valor del input: " + e.target.value + " / Metodo: " + metodos[0][atributos[index + 1]]);*/
