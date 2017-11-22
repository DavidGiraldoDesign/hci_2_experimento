function controlador(vista, svg) {

    vista.onRegistro = (nombre, edad, email, psw) => {
        console.log(nombre + " " + edad + " " + email + " " + psw);

        var params = new FormData();
        params.set("nombre", nombre);
        params.set("edad", edad);
        params.set("email", email);
        params.set("psw", psw);

        fetch(`${location.origin}/registro`, {
            method: "POST",
            body: params
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                if (res.mensaje == "in") {
                    vista.setUsuario(res.usuario);
                    vista.setMetodos(res.metodos);
                    vista.renderConsulta();


                }


            });
        vista.renderHome(svg.getLogo());
    };

    vista.onIngreso = (email, psw) => {
        var params = new FormData();
        params.set("email", email);
        params.set("psw", psw);

        fetch(`${location.origin}/ingreso`, {
            method: "POST",
            body: params
        })
            .then((res) => res.json())
            .then((res) => {
                //console.log(res);
                if (res.mensaje == "in") {
                    vista.setUsuario(res.usuario);
                    vista.setMetodos(res.metodos);
                    vista.renderConsulta();
                } else {
                    vista.renderHome(svg.getLogo());
                }

            });
    };

    vista.onConfirmaPareja = (email, nombre) => {
        var params = new FormData();
        params.set("email", email);
        params.set("nombre", nombre);

        fetch(`${location.origin}/confirmaPareja`, {
            method: "POST",
            body: params
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res.mensaje + " " + res.usuario.pareja.nombre);
                vista.setUsuario(res.usuario);
                vista.renderConsultaPareja();
            });

    };

    vista.onEliminarPareja = (email, nombre) => {
        var params = new FormData();
        params.set("email", email);
        fetch(`${location.origin}/eliminarPareja `, {
            method: "POST",
            body: params
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res.mensaje + " " + res.usuario.conPareja);
                vista.setUsuario(res.usuario);
                vista.renderConsultaPareja();
            });
    };

    vista.onPreferir = (item, valor) => {
        console.log(item + " " + valor);
        if (valor == "false") {
            vista.usuario[item] = false;
        }
        if (valor == "true") {
            vista.usuario[item] = true;
        }
        vista.setUsuario(vista.usuario);
        //vista.renderConsultaMujer();
    }
    vista.onActualizarPreferencias = (email,usuario) => {
      /*  var params = new FormData();
        params.set("email", email);
        params.set("usuario", usuario);

        fetch(`${location.origin}/actualizar/preferencias`, {
            method: "POST",
            body: params
        })
            .then((res) => res.json())
            .then((res) => {
                vista.setUsuario(res.usuario);
                vista.renderConsulta();
            });*/
    }

    vista.onLogOut = () => {
        localStorage.removeItem("localUser");
        localStorage.removeItem("localMethods");
        localStorage.removeItem("localRecomendar");
        vista.renderHome(svg.getLogo());
    }


    vista.renderHome(svg.getLogo());

}

controlador(vista, svg);
