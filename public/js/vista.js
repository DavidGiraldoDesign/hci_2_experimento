var vista = {
    body: document.querySelector("body"),
    usuario: null,
    metodos: null,
    localUse: false,
    recomendar: false,

    setUsuario: function setUsuario(ref) {
        this.usuario = ref;
        localStorage.setItem("localUser", JSON.stringify(this.usuario));
    },

    setMetodos: function setMetodos(ref) {
        this.metodos = ref;
        localStorage.setItem("localMethods", JSON.stringify(this.metodos));
    },

    setRecomendar: function setRecomendar(ref) {
        this.recomendar = ref;
        localStorage.setItem("localRecomendar", JSON.stringify(this.recomendar));
    },


    getHome: function getHome(logo) {
        var div = document.createElement("div");
        div.className = "row col-4 col-l-6 col-m-8 col-s-10"
        div.id = "aviso"

        div.innerHTML =
            `
        <div class="col-8 col-l-8 col-m-8 col-s-8" id="logoAnimation"></div>

        <div id="copy" class="col-12 col-l-12 col-m-12 col-s-12"> 
        <p>Te ayudamos ha elegir tu<br> 
        método de planificación.</p>
        </div>
        
        <div class="formulario" ></div>

        <div class="col-12 col-l-12 col-m-12 col-s-12 botones">
        <button class="col-6 col-l-4 col-m-6 col-s-8 rojo">Registrarme</button> 
        </div>

        <div class="col-12 col-l-12 col-m-12 col-s-12 botones">
        <button class="col-6 col-l-4 col-m-6 col-s-8 azul">Ya estoy registrada</button> 
        </div>
        
        `;

        var btnRojo = div.querySelector(".rojo");
        var btnAzul = div.querySelector(".azul");

        btnRojo.addEventListener("click", (e) => {

            e.target.style.display = "none";
            btnAzul.style.display = "block";
            div.querySelector(".formulario").innerHTML = "";
            div.querySelector(".formulario").appendChild(this.getFomularioRegistro());

        });

        btnAzul.addEventListener("click", (e) => {

            e.target.style.display = "none";
            btnRojo.style.display = "block";
            div.querySelector(".formulario").innerHTML = "";
            div.querySelector(".formulario").appendChild(this.getFomularioIngreso());
        });

        div.querySelector("#logoAnimation").appendChild(logo);

        return div;
    },

    getFomularioRegistro: function getFomularioRegistro() {
        var div = document.createElement("div");
        div.className = "col-6 col-l-4 col-m-6 col-s-8 registro";
        div.innerHTML = `
                    <form>
                    <input class="col-12 col-l-12 col-m-12 col-s-12" type="text" value="" placeholder="¿Cúal es tu nombre?" required>
                    <input class="col-12 col-l-12 col-m-12 col-s-12" type="number" name="quantity" min="15" max="20" value="" placeholder="¿Cúantos años tienes?" required>
                    <input class="col-12 col-l-12 col-m-12 col-s-12" type="email" value="" placeholder="¿Cúal es tu correo?" required>
                    <input class="col-12 col-l-12 col-m-12 col-s-12" type="password" value="" placeholder="Contraseña" required>
                    <input class="col-12 col-l-12 col-m-12 col-s-12 rojo" type="submit" value="Registrarme">
                    </form>

                        `;


        div.querySelector("form").addEventListener("submit", (e) => {
            e.preventDefault();
            var inputs = div.querySelectorAll("input");
            var nombre = inputs[0].value;
            var edad = inputs[1].value;
            var email = inputs[2].value;
            var psw = inputs[3].value;
            this.onRegistro(nombre, edad, email, psw);
        });

        return div;
    },

    getFomularioIngreso: function getFomularioIngreso() {
        var div = document.createElement("div");
        div.className = "col-6 col-l-4 col-m-6 col-s-8 ingreso";
        div.innerHTML = `
                    <form>
                    <input class="col-12 col-l-12 col-m-12 col-s-12" type="email" value="" placeholder="Tu correo" required>
                    <input class="col-12 col-l-12 col-m-12 col-s-12" type="password" value="" placeholder="Contraseña" required>
                    <input class="col-12 col-l-12 col-m-12 col-s-12 azul" type="submit" value="Ingresar">
                    </form>

                        `;

        div.querySelector("form").addEventListener("submit", (e) => {
            e.preventDefault();
            var inputs = div.querySelectorAll("input");
            var email = inputs[0].value;
            var psw = inputs[1].value;
            this.onIngreso(email, psw);
        });

        return div;
    },

    getHeader: function getHeader() {
        var div = document.createElement("div");
        div.id = "header";
        div.className = "row col-6 col-l-6 col-m-6 col-s-6";
        div.innerHTML = `
        <div class="col-4 col-l-4 col-m-4 col-s-4">
            <button id="logout" class="rojo col-6 col-l-6 col-m-6 col-s-6">Cerra Sesion</button>
        </div>
        <div class="col-4 col-l-4 col-m-4 col-s-4">
            <h1 class="col-12 col-l-12 col-m-12 col-s-12">Ginef</h1>
            <span class="col-12 col-l-12 col-m-12 col-s-12">Mi método preferido</span>
            <p class="col-12 col-l-12 col-m-12 col-s-12">Desplegar</p>
        </div>
        <div class="col-4 col-l-4 col-m-4 col-s-4">
            <button id="fs" class="azul col-6 col-l-6 col-m-6 col-s-6">Pantalla completa</button>
        </div>
        `;

        div.querySelector("#logout").addEventListener("click", (e) => {
            console.log(":v");
            this.onLogOut();
        });

        div.querySelector("#fs").addEventListener("click", (e) => {
            full = true;
            fs = !fs;
            mousePressed();
        });

        return div
    },
    getModalRecomendacion: function getModalRecomendacion() {
        var div = document.createElement("div");

        div.id = "fondo-recomendacion";
        div.className = "row col-12 col-l-12 col-m-12 col-s-12";
        div.innerHTML = `
        <div id="recomendacion" class= "row col-4 col-l-4 col-m-4 col-s-4">
        <div class="col-12 col-l-12 col-m-12 col-s-12">
            <button class="azul col-4 col-l-4 col-m-4 col-s-4">Actualizar resultados</button>
            <button class="rojo col-4 col-l-4 col-m-4 col-s-4">Volver</button>
            
            <div id="recomendados" class="col-12 col-l-12 col-m-12 col-s-12"></div>
        </div>
        </div>
        `;

        div.querySelector(".azul").addEventListener("click", (e) => {
            div.querySelector("#recomendados").innerHTML = "";
            var rank = [];
            metodos.map((m, i) => {
                return rank[i] = m;
            });


            rank.sort((a, b) => {
                console.log("sort");
                return b.p - a.p;
            }).forEach((r, i) => {
                console.log("forEach");
                var met = document.createElement("div");
                met.className = "rocomendado col-12 col-l-12 col-m-12 col-s-12";
                met.innerHTML = `
                <div class="col-12 col-l-12 col-m-12 col-s-12">
                <img src="${r.url}" class="col-4 col-l-4 col-m-4 col-s-4">
                <div class="col-8 col-l-8 col-m-8 col-s-8">
                <h3>${r.nombre}</h3>
                <br>
                <span>Número ${i + 1}</span>
                </div>
                </div>
                <div class="col-12 col-l-12 col-m-12 col-s-12">
                
                <p class="col-12 col-l-12 col-m-12 col-s-12">${r.resumen}</p>
                <p class="col-12 col-l-12 col-m-12 col-s-12">${r.ref}</p>
                </div>
                
                `;
                if (i < 3) {
                    div.querySelector("#recomendados").appendChild(met);
                }


            });
            this.onActualizarPreferencias(this.usuario.email, this.usuario);
        });

        div.querySelector(".rojo").addEventListener("click", (e) => {
            div.style.display = "none";
        });


        return div
    },
    getConsulta: function getConsulta(usuario, metodos) {
        var div = document.createElement("div");
        div.id = "consulta";

        var convenciones = document.createElement("div");
        convenciones.id = "convenciones";
        convenciones.className = "col-4 col-l-5 col-m-6 col-s-4";
        convenciones.innerHTML = `
                                <div class="col-12 col-l-12 col-m-12 col-s-12">
                                <span id="sa">Conoce más sobre las zonas de preferencia</span><br>
                                <span id="sb">Cada color tiene un signficado</span>
                                </div>
                                <div class="col-4 col-l-4 col-m-4 col-s-4">
                                    <div class="col-12 col-l-12 col-m-12 col-s-12" id="zonaA"></div>
                                    <div class="col-12 col-l-12 col-m-12 col-s-12">
                                    <p>Aquí encontraras los métodos NO recomendados para ti</p>
                                    </div>
                                </div>
                                <div class="col-4 col-l-4 col-m-4 col-s-4">
                                    <div class="col-12 col-l-12 col-m-12 col-s-12" id="zonaB"></div>
                                    <div class="col-12 col-l-12 col-m-12 col-s-12">
                                    <p>Aquí encontraras los métodos de relevancia indiferente</p>
                                    </div>
                                </div>
                                <div class="col-4 col-l-4 col-m-4 col-s-4">
                                    <div class="col-12 col-l-12 col-m-12 col-s-12" id="zonaC"></div>
                                    <div class="col-12 col-l-12 col-m-12 col-s-12">
                                    <p>Aquí encontraras los métodos recomendados para ti</p>
                                    </div>
                                </div>
                                
                                    
                                    `;

        var b = document.createElement("button");
        b.innerHTML = "Ver resultado";
        b.id = "b";
        b.className = "rojo col-2 col-l-2 col-m-2 col-s-2";
        b.addEventListener("click", (e) => {
            console.log("Ver resultado");
            div.querySelector("#fondo-recomendacion").style.display = "block";
            div.querySelector("#recomendacion").style.display = "block";

        });

        div.appendChild(b);

        div.appendChild(this.getHeader());
        div.appendChild(convenciones);
        div.appendChild(this.getConsultaMujer());
        div.appendChild(this.getConsultaHombre());
        div.appendChild(this.getModalRecomendacion());

        if (this.recomendar == true) {
            runP5 = 1;
            //div.querySelector("#ginef").style.display = "block";
            div.querySelector("#convenciones").style.display = "block";
            div.querySelector("#mujer").style.display = "block";
            div.querySelector("#hombre").style.display = "block";
            div.querySelector("#b").style.display = "block";

        } else {
            //div.querySelector("#ginef").style.display = "none";
            div.querySelector("#convenciones").style.display = "none";
            div.querySelector("#mujer").style.display = "none";
            div.querySelector("#hombre").style.display = "none";
            div.querySelector("#b").style.display = "none";
        }

        div.appendChild(this.getRunP5(div.querySelector("#mujer"), div.querySelector("#hombre")));



        return div;
    },

    getRunP5: function getRunP5(mujer, hombre) {
        var div = document.createElement("div");
        div.id = "runP5";
        div.className = "col-4 col-l-4 col-m-4 col-s-4";
        div.innerHTML = `
                        <h3>Hola ${this.usuario.nombre.split(" ")[0]}</h3>
                        <p>Ginef es tu guía personalida, que te ayudará en la 
                        elección de un método anticonceptivo que se ajuste a tus necesidades y estilo de vida 
                        </p> <p> Esta información es completamente confidencial y sólo se podrá acceder a través
                        de tu correo y contraseña.</p>
                        <button class="rojo">Iniciar recomendación</button>
                            `;
        if (this.recomendar == true) {
            div.style.display = "none"
        } else {
            div.querySelector("button").addEventListener("click", (e) => {
                this.setRecomendar(true);
                console.log(this.recomendar);
                mujer.style.display = "block";
                hombre.style.display = "block";
                this.body.querySelector("#convenciones").style.display = "block";
                this.body.querySelector("#b").style.display = "block";
                div.style.display = "none";
                runP5 = 1;
                setup();
            });
        }
        return div;
    },
    //==================================================================================== CONSULTA MUJER
    getConsultaMujer: function getConsultaMujer() {
        var div = document.createElement("div");
        div.id = "mujer";
        div.className = "col-2 col-l-3 col-m-3 col-s-2";
        div.innerHTML = `
                        <div class="row chica col-12 col-l-12 col-m-12 col-s-12"></div>
                        <div class="row nombre col-12 col-l-12 col-m-12 col-s-12">
                        <h2>${this.usuario.nombre}</h2></div>
                        <div class="row opciones col-12 col-l-12 col-m-12 col-s-12"></div>
                            `;

        var iconoMujer = svg.getIconoMujer();
        iconoMujer.className = "cont col-3 col-l-3 col-m-3 col-s-3";
        div.querySelector(".chica").appendChild(iconoMujer);

        var titulos = [
            "¿Te interesa poder aplicar (usar) tu método sin depender de un médico?",
            "¿Te interesa tener controles médicos periodicos?",
            "¿Te interesa que tu metodo sea invisible para otras personas?",
            "¿Te interesa que tu metodo dependa de una inyeccion?",
            "¿Te interesa que tu metodo dependa de pastillas?",
            "¿Te interesa que tu metodo deba ser introducido por tu vagina?",
            "¿Te interesa poder interrumpir el uso del metodo en cualquier momento?",
            "Me interesa poder usar mi metodo cada"
        ];
        var atributos = [
            "nombre",
            "aplicacion",
            "control",
            "visible",
            "inyectable",
            "ingerible",
            "insercion",
            "interrupcion",
            "uso",
            "costo"
        ];


        titulos.forEach((titulo, index, array) => {
            var opcionSelect = document.createElement("div");
            opcionSelect.className = "row col-12 col-l-12 col-m-12 col-s-12 opcion";
            opcionSelect.innerHTML = `                                    
                                        <div class="item-consulta col-2 col-l-2 col-m-2 col-s-2"></div>

                                        <div class="col-10 col-l-10 col-m-10 col-s-10">
                                        
                                            <p  class="12 col-l-12 col-m-12 col-s-12">${titulo}</p>
                                            <div class="item 12 col-l-12 col-m-12 col-s-12">
                                                <select class="col-12 col-l-12 col-m-12 col-s-12" value="">
                                                    <option value="indiferente">Indiferente..</option>
                                                    <option value="true">Si</option>
                                                    <option value="false">No</option>
                                                    
                                                </select>
                                            </div>
                                       </div>`;

            if (index == array.length - 1) {
                opcionSelect.querySelector("select").innerHTML = `<option value="indiferente">Indiferente..</option>
                                                                <option value="0">Dia</option>
                                                                <option value="1">Mes</option>
                                                                <option value="2">Año</option>`;
            }

            var interesAnterior = opcionSelect.querySelector("select").value;

            opcionSelect.querySelector("select").addEventListener("change", (e) => {

                if (interesAnterior == "indiferente") {
                    metodos.forEach((m) => {
                        if (m[atributos[index + 1]].toString() == e.target.value) {
                            if (m.p < m.getAmpLength() - 1) {
                                m.p++;
                                m.desplazarCerca();
                            }
                        } else {
                            if (m.p > 0) {
                                m.p--;
                                m.desplazarLejos();
                            }
                        }
                    });
                } else {
                    if (e.target.value != "indiferente") {
                        metodos.forEach((m) => {
                            if (m[atributos[index + 1]].toString() == e.target.value) {
                                if (m.p < m.getAmpLength() - 2) {
                                    m.p += 2;
                                    m.desplazarCerca();
                                } else if (m.p < m.getAmpLength() - 1) {
                                    m.p++;
                                    m.desplazarCerca();
                                }
                            } else {
                                if (m.p > 1) {
                                    m.p -= 2;
                                    m.desplazarLejos();
                                } else if (m.p == 1) {
                                    m.p--;
                                    m.desplazarLejos();
                                }
                            }
                        });
                    } else {
                        metodos.forEach((m) => {
                            if (m[atributos[index + 1]].toString() == interesAnterior) {
                                if (m.p > 0) {
                                    m.p--;
                                    m.desplazarLejos();
                                }
                            } else {
                                if (m.p < m.getAmpLength() - 1) {
                                    m.p++;
                                    m.desplazarCerca();
                                }
                            }
                        });
                    }
                }

                if (e.target.value != "" && e.target.value != "indiferente") {
                    e.target.className = "select-on col-12 col-l-12 col-m-12 col-s-12";
                } else {
                    e.target.className = "col-12 col-l-12 col-m-12 col-s-12";
                }
                interesAnterior = e.target.value;
                this.onPreferir(atributos[index + 1], e.target.value);
            });

            div.querySelector(".opciones").appendChild(opcionSelect);
        });

        var opcioneRango = document.createElement("div");
        opcioneRango.className = "row col-12 col-l-12 col-m-12 col-s-12 opcion";
        opcioneRango.innerHTML = `                               
                                    <div class="item-consulta col-2 col-l-2 col-m-2 col-s-2"></div>
                                    <div class="col-10 col-l-10 col-m-10 col-s-10">
                                        <h4  class="col-12 col-l-12 col-m-12 col-s-12">Costo promedio que estoy dispuesta a pagar</h4>
                                        <div class="item-slider slidecontainer col-12 col-l-12 col-m-12 col-s-12">
                                        <input type="range" min="0" max="600" step="30" value="0" class="slider col-9 col-l-9 col-m-9 col-s-9" id="myRange">
                                        <h3 class="col-3 col-l-3 col-m-3 col-s-3 costo-dinamico">$0</h3>
                                        </div>
                                    </div>`;

        opcioneRango.querySelector("input[type=range]").addEventListener("input", (e) => {
            // console.log(e.target.value);
            opcioneRango.querySelector(".costo-dinamico").innerHTML = `$${e.target.value}`;
        });

        div.querySelector(".opciones").appendChild(opcioneRango);

        var iconos = div.querySelectorAll(".item-consulta");

        iconos[0].appendChild(svg.getIconoAplicacion());
        iconos[1].appendChild(svg.getIconoControl());
        iconos[2].appendChild(svg.getIconoVisibilidad());
        iconos[3].appendChild(svg.getIconoInyectable());
        iconos[4].appendChild(svg.getIconoIngerible());
        iconos[5].appendChild(svg.getIconoInsercion());
        iconos[6].appendChild(svg.getIconoInterrupcion());
        iconos[7].appendChild(svg.getIconoCalendario());
        iconos[8].appendChild(svg.getIconoCosto());


        return div;
    },

    getConsultaHombre: function getConsultaHombre() {
        var div = document.createElement("div");
        div.id = "hombre";
        div.className = "col-2 col-l-3 col-m-3 col-s-2";

        var confirmaPareja = document.createElement("div");
        confirmaPareja.id = "confirmaPareja";
        confirmaPareja.className = "col-12 col-l-12 col-m-12 col-s-12";
        confirmaPareja.innerHTML = `
                    
                            <h3 class="col-8 col-l-8 col-m-8 col-s-8">¿Tienes una pareja heterosexual fiel actualmente?</h3>
                            <form>
                                <input class="col-10 col-l-8 col-m-8 col-s-8" type="text" value="" placeholder="Escribe su nombre" required>
                                <p class="col-10 col-l-8 col-m-8 col-s-8" >Al crear el cuestionario, podrás 
                                conocer las opiniones de tu pareja respecto al método anticonceptivo que elegirás.
                                </p>
                                
                                <input class="col-10 col-l-8 col-m-8 col-s-8 azul" type="submit" value="Registrar a mi novio">
                                <p class="col-10 col-l-8 col-m-8 col-s-8" id="#consejo">*Este cuestionario debe ser llenado con las 
                                opiniones de tu pareja, y es aconsejable que él esté presente al 
                                momento de llenar esta parte del formulario.
                                </p>
                            </form>
                       `;

        var pareja = document.createElement("div");
        pareja.id = "pareja";
        pareja.className = "col-12 col-l-12 col-m-12 col-s-12";
        pareja.innerHTML = `<button id="sinPareja" class="azul">x</button>
                            
        

                            <div class="row chico col-12 col-l-12 col-m-12 col-s-12"></div>
                            <div class="row nombre col-12 col-l-12 col-m-12 col-s-12">
                            <h2>${this.usuario.pareja.nombre}</h2></div>
                            <div class="row opciones col-12 col-l-12 col-m-12 col-s-12"></div>
                            `;
        var iconoHombre = svg.getIconoHombre();
        iconoHombre.className = "cont col-3 col-l-3 col-m-3 col-s-3";
        pareja.querySelector(".chico").appendChild(iconoHombre);

        //========================================== Agregar y eliminar pareja
        if (this.usuario.conPareja == false) {
            div.appendChild(confirmaPareja);
        } else {
            div.appendChild(pareja);
        }
        confirmaPareja.querySelector("form").addEventListener("submit", (e) => {
            e.preventDefault();
            div.innerHTML = "";
            div.appendChild(pareja);
            this.onConfirmaPareja(this.usuario.email, confirmaPareja.querySelector("input[type=text]").value);
        });

        pareja.querySelector("#sinPareja").addEventListener("click", (e) => {
            e.preventDefault();
            div.innerHTML = "";
            div.appendChild(confirmaPareja);
            this.onEliminarPareja(this.usuario.email);
        });
        //========================================== Agregar y eliminar pareja

        var titulos = [
            "Me causa seguridad si mi novia se aplica (utiliza) el método sin depender de un médico",
            "Me causa seguridad si el método es inyectable",
            "Me causa seguridad si el método depende de pastillas",
            "Me causa seguridad si el método es de inserción en la vagina",
            "Me siento más seguro si mi novia debe usar el método cada",
        ];

        var atributos = [
            "nombre",
            "aplicacion",
            "inyectable",
            "ingerible",
            "insercion",
            "uso",
            "costo"
        ];

        titulos.forEach((titulo, index, array) => {
            var opcionSelect = document.createElement("div");
            opcionSelect.className = "row col-12 col-l-12 col-m-12 col-s-12 opcion";
            opcionSelect.innerHTML = `  
                                        <div class="col-10 col-l-10 col-m-10 col-s-10">
                                            <p class="12 col-l-12 col-m-12 col-s-12">${titulo}</p>
                                            <div class="item 12 col-l-12 col-m-12 col-s-12">
                                                <select class="col-12 col-l-12 col-m-12 col-s-12" value="">
                                                    <option value="indiferente">Indiferente..</option>
                                                    <option value="true">Si</option>
                                                    <option value="false">No</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="item-consulta col-2 col-l-2 col-m-2 col-s-2"></div>
                                  

                                            `;
            if (index == array.length - 1) {
                opcionSelect.querySelector("select").innerHTML = `<option value="indiferente">Indiferente..</option>
                                                                <option value="0">Dia</option>
                                                                <option value="1">Mes</option>
                                                                <option value="2">Año</option>`;
            }


            var interesAnterior = opcionSelect.querySelector("select").value;

            opcionSelect.querySelector("select").addEventListener("change", (e) => {
                //   console.log(index + " " + e.target.value);

                if (interesAnterior == "indiferente") {
                    metodos.forEach((m) => {
                        if (m[atributos[index + 1]].toString() == e.target.value) {
                            if (m.d < m.getDiametroLength() - 1) {
                                m.d++;
                                m.dimerizarMax();
                            }
                        } else {
                            if (m.d > 0) {
                                m.d--;
                                m.dimerizarMin();
                            }
                        }
                    });
                } else {
                    if (e.target.value != "indiferente") {
                        metodos.forEach((m) => {
                            if (m[atributos[index + 1]].toString() == e.target.value) {
                                if (m.d < m.getDiametroLength() - 2) {
                                    m.d += 2;
                                    m.dimerizarMax();
                                } else if (m.d < m.getDiametroLength() - 1) {
                                    m.d++;
                                    m.dimerizarMax();
                                }
                            } else {
                                if (m.d > 1) {
                                    m.d -= 2;
                                    m.dimerizarMin();
                                } else if (m.d == 1) {
                                    m.d--;
                                    m.dimerizarMin();
                                }
                            }
                        });
                    } else {
                        metodos.forEach((m) => {
                            if (m[atributos[index + 1]].toString() == interesAnterior) {
                                if (m.d > 0) {
                                    m.d--;
                                    m.dimerizarMin();
                                }
                            } else {
                                if (m.d < m.getDiametroLength() - 1) {
                                    m.d++;
                                    m.dimerizarMax();
                                }
                            }
                        });
                    }

                }


                if (e.target.value != "" && e.target.value != "indiferente") {
                    e.target.className = "select-on col-12 col-l-12 col-m-12 col-s-12";
                } else {
                    e.target.className = "col-12 col-l-12 col-m-12 col-s-12";
                }

                interesAnterior = e.target.value;

            });

            pareja.querySelector(".opciones").appendChild(opcionSelect);
        });


        var opcioneRango = document.createElement("div");
        opcioneRango.className = "row col-12 col-l-12 col-m-12 col-s-12 opcion";
        opcioneRango.innerHTML = `
                                    <div class="col-10 col-l-10 col-m-10 col-s-10">
                                        <h4  class="col-12 col-l-12 col-m-12 col-s-12">Puedo ayudar con un parte del costo</h4>
                                        <div class="item-slider slidecontainer col-12 col-l-12 col-m-12 col-s-12">
                                         <h3  class="col-3 col-l-3 col-m-3 col-s-3 costo-dinamico">$0</h3><input type="range" min="0" max="600" step="30" value="0" class="slider col-9 col-l-9 col-m-9 col-s-9" id="myRange">
                                        
                                        </div>
                                    </div>
                                    <div class="item-consulta col-2 col-l-2 col-m-2 col-s-2"></div>
                          `;



        opcioneRango.querySelector("input[type=range]").addEventListener("input", (e) => {
            console.log(e.target.value);
            opcioneRango.querySelector(".costo-dinamico").innerHTML = `$${e.target.value}`;
        });
        pareja.querySelector(".opciones").appendChild(opcioneRango);


        var iconos = pareja.querySelectorAll(".item-consulta");

        iconos[0].appendChild(svg.getIconoControl());
        iconos[1].appendChild(svg.getIconoInyectable());
        iconos[2].appendChild(svg.getIconoIngerible());
        iconos[3].appendChild(svg.getIconoInsercion());
        iconos[4].appendChild(svg.getIconoCalendario());
        iconos[5].appendChild(svg.getIconoCosto());

        var mensajeCondon = document.createElement("div");
        mensajeCondon.className = "row mensaje-condon col-12 col-l-12 col-m-12 col-s-12";
        mensajeCondon.innerHTML = `
                                    <div class="col-10 col-l-10 col-m-10 col-s-10">
                                    <p>Ninguno de estos métodos exime el uso del condón. Tu responsabilidad es usarlo en cada relación sexual.</p>
                                    </div>
                                    <div class="item-condon col-2 col-l-2 col-m-2 col-s-2"></div>

                                    `;

        mensajeCondon.querySelector(".item-condon").appendChild(svg.getCondon());
        pareja.appendChild(mensajeCondon);

        return div;
    },


    //
    guardarEnLocal: function guardarEnLocal(localUser, localMethods, localRecomendar) {
        if (this.localUse == false) {
            localStorage.setItem("localUser", JSON.stringify(localUser));
            localStorage.setItem("localMethods", JSON.stringify(localMethods));
            localStorage.setItem("localRecomendar", JSON.stringify(localRecomendar));
            // console.log("Entra a guardarLocal y guarda");
            this.localUse = true;
        }
    },
    asignaLocal: function asignaLocal() {

        this.usuario = JSON.parse(localStorage.getItem("localUser"));
        this.metodos = JSON.parse(localStorage.getItem("localMethods"));
        this.recomendar = JSON.parse(localStorage.getItem("localRecomendar"));
        //console.log("Asigna lo guardado");

    },
    //
    renderHome: function renderHome(logo) {
        this.body.innerHTML = "";
        if (JSON.parse(localStorage.getItem("localUser")) == null) {

            this.body.appendChild(this.getHome(logo));
        } else {

            this.asignaLocal();
            this.renderConsulta();
        }
    },

    renderConsulta: function renderConsulta() {
        if (this.usuario != null) {
            this.guardarEnLocal(this.usuario, this.metodos, this.recomendar);
            this.body.innerHTML = "";
            this.body.appendChild(this.getConsulta(this.usuario, this.metodos));
            //location.reload();
        }
    },
    renderConsultaMujer: function renderConsultaMujer() {
        if (this.usuario != null) {
            this.body.querySelector("#mujer").innerHTML = "";
            this.body.querySelector("#mujer").appendChild(this.getConsultaMujer());
        }
    },

    renderConsultaPareja: function renderConsultaPareja() {
        if (this.usuario != null) {
            this.body.querySelector("#hombre").innerHTML = "";
            this.body.querySelector("#hombre").appendChild(this.getConsultaHombre());
        }
    }
};

/*
    ||||      ||||   |||||||||    |||||||||       |||||||||
    |||||||   ||||   |||||||||    |||||||||||     |||||||||||
    |||| |||  ||||   ||||         ||||    ||||    ||||    ||||||
    ||||  ||| ||||   ||||||||     |||||||||||     ||||       ||||
    ||||   |||||||   ||||||||     |||||||||       ||||       ||||
    ||||    ||||||   ||||         ||||  ||||      ||||    ||||||
    ||||     |||||   |||||||||    ||||   ||||     ||||||||||||
    ||||      ||||   |||||||||    ||||    ||||    ||||||||||

*/
