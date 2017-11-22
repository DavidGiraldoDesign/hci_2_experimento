const express = require('express'),
    bodyParser = require("body-parser"),
    mongo = require("mongodb"),
    fileUpload = require("express-fileupload"),
    ObjectID = require("mongodb").ObjectID;
//==============================================================================
const app = express();
app.use(fileUpload());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
//==============================================================================
var url = 'mongodb://josedavidgm1995:Lespaul#1952@clusterdesign-shard-00-00-kmsdl.mongodb.net:27017,clusterdesign-shard-00-01-kmsdl.mongodb.net:27017,clusterdesign-shard-00-02-kmsdl.mongodb.net:27017/hci?ssl=true&replicaSet=ClusterDesign-shard-0&authSource=admin';

var mongoClient = mongo.MongoClient;

var db = null // global variable to hold the database

mongoClient.connect(url, (err, database) => {
    if (!err) {
        console.log("Database connected!");
        db = database;
    }

    /*
        var metodos = [
            {
                nombre: "Implante subdérmico",
                aplicacion: false,
                control: true,
                visible: true,
                inyectable: true,
                ingerible: false,
                insercion: false,
                interrupcion: false,
                uso: 2,
                costo: 200500,
                url:"https://www.your-life.com/static/images/contraception-methods/contraceptive-implant/header.png",
                resumen:"Es un dispositivo más o menos del mismo tamaño de un fósforo que es colocado inmediatamente debajo de la piel de tu brazo, donde libera constantemente pequeñas dosis de una hormona (progestina) desde un depósito hacia tu circulación. La hormona evita que tus ovarios liberen óvulos, y también vuelve más espeso el moco cervical, dificultando el movimiento de los espermatozoides dentro de útero para fertilizar un óvulo.",
                ref:"Recuperado - 2017: https://www.your-life.com/es/metodos-anticonceptivos/anticonceptivos-reversibles-de-larga-duracion/implante-anticonceptivo/"
                

        }, {
                nombre: "Píldoras anticonceptivas",
                aplicacion: true,
                control: false,
                visible: true,
                inyectable: false,
                ingerible: true,
                insercion: false,
                interrupcion: true,
                uso: 0,
                costo: 60000,
                url:"https://www.your-life.com/static/images/contraception-methods/the-pill/header.png",
                resumen:"La Píldora es una tableta que tomas una vez al día – existen unos cuantos tipos diferentes de píldoras. La píldora combinada contiene estrógeno y progestina, que impiden que los ovarios liberen óvulos. También hacen que el moco cervical sea más espeso, lo que no permite que los espermatozoides lleguen al óvulo. La llamada mini-píldora contiene solo una hormona, una progestina, lo que ofrece una alternativa a aquellas mujeres a las que los estrógenos les afectan.",
                ref:"Recuperado - 2017: https://www.your-life.com/es/metodos-anticonceptivos/anticonceptivos-de-corta-duracion/la-pildora/"

        }, {
                nombre: "Inyectables (Mensual o Trimestral)",
                aplicacion: false,
                control: false,
                visible: true,
                inyectable: true,
                ingerible: false,
                insercion: false,
                interrupcion: true,
                uso: 1,
                costo: 35500,
                url:"https://www.your-life.com/static/images/contraception-methods/injectable-contraceptives/header.png",
                resumen:"La inyección anticonceptiva es una inyección que contiene hormonas, ya sea una progestina sola o una progestina y un estrógeno juntos, y hace que tu cuerpo deje de liberar óvulos y que el moco del cérvix sea más espeso. Necesitas que un profesional médico te ponga una inyección una vez al mes o una vez cada tres meses. Sin embargo, el efecto de la inyección no se puede revertir una vez que se ha aplicado, lo que significa que en caso de tener efectos colaterales, éstos no se pueden detener. La forma cómo actúa es similar a la píldora o al anillo, excepto que no tienes que recordar tomarla diariamente o aplicarlo cada semana, pero probablemente no es la mejor opción para las que le tienen miedo a las agujas.",
                ref:"Recuperado - 2017: https://www.your-life.com/es/metodos-anticonceptivos/anticonceptivos-de-corta-duracion/inyeccion-anticonceptiva/"

        }, {
                nombre: "Anillo vaginal",
                aplicacion: true,
                control: false,
                visible: true,
                inyectable: false,
                ingerible: false,
                insercion: true,
                interrupcion: true,
                uso: 1,
                costo: 66000,
                url:"https://www.your-life.com/static/images/contraception-methods/contraceptive-ring/header.png",
                resumen:"Es un anillo claro y flexible de polietileno acetato de vinilo que, una vez colocado en la vagina, libera lentamente en tu cuerpo las hormonas progestina y estrógeno para impedir que los ovarios liberen óvulos. También hace que el moco cervical sea más espeso, lo que no permite que los espermatozoides lleguen al óvulo. Lo mantienes puesto durante 3 semanas y después lo sacas, descansas una semana y después te pones otro.",
                ref:" Recuperado - 2017: https://www.your-life.com/es/metodos-anticonceptivos/anticonceptivos-de-corta-duracion/anillo-anticonceptivo/"

        }, {
                nombre: "Parche",
                aplicacion: true,
                control: false,
                visible: false,
                inyectable: false,
                ingerible: false,
                insercion: false,
                interrupcion: true,
                uso: 1,
                costo: 100000,
                url:"https://www.your-life.com/static/images/contraception-methods/intros/contraception-patch.jpg",
                resumen:"El parche anticonceptivo es justamente eso, un parche que parece una curita brillante que se pega a la piel, al liberar hormonas resulta altamente efectivo para impedir que te embaraces. El parche libera constantemente las hormonas estrógeno y progestina que entran a la circulación a través de la piel e impiden que los ovarios liberen óvulos y también hacen que el moco cervical sea más espeso, lo que no permite que los espermatozoides lleguen el óvulo. El parche no es transparente, por lo que este método anticonceptivo es visible.",
                ref:"Recuperado - 2017: https://www.your-life.com/es/metodos-anticonceptivos/anticonceptivos-de-corta-duracion/parche-anticonceptivo/"

        }, {
                nombre: "Dispositivo intrauterino",
                aplicacion: false,
                control: true,
                visible: true,
                inyectable: false,
                ingerible: false,
                insercion: true,
                interrupcion: false,
                uso: 2,
                costo: 650000,
                url:"https://www.your-life.com/static/images/contraception-methods/intrauterine-system/header.png",
                resumen:"El SIU es un dispositivo pequeño, suave, en forma de T, con un reservorio que contiene la hormona progestina que un profesional médico coloca en la matriz. El SIU actúa liberando continuamente una dosis baja de la progestina dentro de la matriz. Ésta hace que el moco del cérvix sea más espeso, lo que dificulta el movimiento de los espermatozoides para llegar al óvulo y también adelgaza el recubrimiento del útero. Con 99.8% de efectividad, estás tan protegida como podrías estarlo por un método anticonceptivo.",
                ref:"Recuperado - 2017:https://www.your-life.com/es/metodos-anticonceptivos/anticonceptivos-reversibles-de-larga-duracion/sistema-intrauterino/"
        }
    ];
     

        db.collection("metodos").insertMany(metodos, function (err, res) {
            if (err) throw err;
            console.log("Number of documents inserted: " + res.insertedCount);
            console.log(res);
            db.close();
        }); 
          /*
        db.collection("usuarios").find({}).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
        });
     
        db.collection("metodos").deleteMany({}, function (err, obj) {
            if (err) throw err;
            console.log(obj.result.n + " document(s) deleted");
            db.close();
        });
      
      */


});

//============================================================================

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/index.html");

});

app.post('/registro', (req, res) => {

    var targetUser = {
        email: req.body.email
    };

    db.collection("usuarios").find(targetUser).toArray((err, coincidencias) => {
        if (!err && coincidencias.length == 0) {

            var nuevoUsuario = {
                nombre: req.body.nombre,
                edad: req.body.edad,
                email: req.body.email,
                psw: req.body.psw,
                conPareja: false,
                aplicacion: null,
                control: null,
                visibible: null,
                inyectable: null,
                ingerible: null,
                insercion: null,
                interrupcion: null,
                uso: null,
                costo: null,
                pareja: {
                    nombre: "",
                    irControl: null,
                    inyectable: null,
                    insercion: null,
                    uso: null,
                    costo: null
                }
            }

            db.collection("usuarios").insertOne(nuevoUsuario, (error, result) => {
                if (error) throw error;

                db.collection("metodos").find({}).toArray((er, mets) => {
                    if (er) throw er;
                    res.json({
                        mensaje: "in",
                        usuario: nuevoUsuario,
                        metodos: mets

                    });
                });
            });


        } else {
            res.json({
                mensaje: "out"
            });
        }
    });

});

app.post('/ingreso', (req, res) => {

    var targetUser = {
        email: req.body.email,
        psw: req.body.psw
    };
    console.log(targetUser);
    var noIncluir = {
        psw: false
    }

    db.collection("usuarios").find(targetUser, noIncluir).toArray((err, coincidencias) => {
        if (err) throw err;
        if (coincidencias.length > 0) {

            db.collection("metodos").find({}).toArray((error, mets) => {
                if (error) throw error;

                res.json({
                    mensaje: 'in',
                    usuario: coincidencias[0],
                    metodos: mets
                });

            });


        } else {
            res.json({
                mensaje: 'usuario o contraseña incorrecto'
            });
        }
    });
});

app.post('/confirmaPareja', (req, res) => {

    var targetUser = {
        email: req.body.email
    };

    var values = {
        $set: {
            conPareja: true,
            "pareja.nombre": req.body.nombre
        }
    };

    db.collection("usuarios").update(targetUser, values, (err, result) => {
        if (err) throw err;

        var noIncluir = {
            psw: false
        };

        db.collection("usuarios").find(targetUser, noIncluir).toArray((error, coincidencias) => {
            if (error) throw error;
            console.log(coincidencias[0]);
            res.json({
                mensaje: ':v',
                usuario: coincidencias[0]
            });

        });


    });


});

app.post('/eliminarPareja', (req, res) => {

    var targetUser = {
        email: req.body.email
    };

    var values = {
        $set: {
            conPareja: false,
            "pareja.nombre": ""
        }
    };

    db.collection("usuarios").update(targetUser, values, (err, result) => {
        if (err) throw err;

        var noIncluir = {
            psw: false
        };

        db.collection("usuarios").find(targetUser, noIncluir).toArray((error, coincidencias) => {
            if (error) throw error;
            console.log(coincidencias[0]);
            res.json({
                mensaje: ':v',
                usuario: coincidencias[0]
            });

        });


    });


});

app.post('/actualizar/preferencias', (req, res) => {




});


app.use("/public", express.static("public"));
app.use("/js", express.static('public/js'));
app.use("/libs", express.static('public/libs'));
app.use("/imgs", express.static('public/imgs'));
app.use("/css", express.static('public/css'));

app.listen(process.env.PORT || 8081);
