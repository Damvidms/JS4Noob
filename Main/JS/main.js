//Seleccionamos por id las dos cajas en las que quiero mostrar 
//los ejercicios y el progreso del usuario
let progresoArea = document.getElementById("progreso")
let ejercicioArea = document.getElementById("ejercicios")

//Primer fetch que se encarga de
//sacar la informacion de los ejercicios de la BBDD
fetch("../PHP/main.php", {
    method: "GET",
})
    //Formateamos la respuesta a formato JSON 
    //por si no lo esta para poder acceder mas 
    //facilmente a su contenido
    .then(response => response.json())
    .then(data => {
        console.log(data)

        // Iteramos sobre data para sacar la 
        //informacion de cada uno de los elementos 
        data.forEach(element => {
            //En esta parte estamos usando el DOM para crear dinamicamente
            // labels que se añadiran a el div correspondiente 
            //le ponemos tambien id y name para poder cambiar su css y 
            //para poder acceder a ellas mas tarde
            let cajaSeccion = document.createElement("label")
            cajaSeccion.textContent = element.seccion
            cajaSeccion.setAttribute("id", "progresos")
            cajaSeccion.setAttribute("name", element.id)
            progresoArea.append(cajaSeccion);

            //En esta parte lo mismo pero en vez de la caja de
            // progreso es en la caja de Ejercicios.
            let cajaEjercicio = document.createElement("label")
            cajaEjercicio.textContent = element.descripcion;
            cajaEjercicio.setAttribute("id", "ejercicio")
            cajaEjercicio.setAttribute("name", element.id)
            ejercicioArea.appendChild(cajaEjercicio)


            //Añadimos a cada uno de los elementos de la caja de ejercicios
            // una redirecion a otra pagina pasando el id del ejercicio como
            // parametro de la url
            cajaEjercicio.addEventListener("click", () => {
                location.href = `../../Ejercicio/indices.html?id=${element.id}`
            })
        });
    })
    //manejo de errores de la solicitud
    .catch(error => console.error("Error:", error));



fetch("../PHP/progresoActual.php", {
    method: "GET",
})
    .then(response => response.json())
    .then(data => {

        console.log(data)
        let ejercicios = Array.from(ejercicioArea.children)

        //Comprobamos si da error, que en este caso lo que significa
        //es que no hay progreso del usuario por lo que se le desabilitaran
        //todos los ejercicios menos el primero
        if (data.error) {

            ejercicios.forEach(element => {
                //Aqui cambiamos los estilos y que sea clicable
                //todos los ejercicios menos el primero
                if (parseInt(element.getAttribute("name")) > 1) {
                    element.style.pointerEvents = "none"
                    element.textContent = "Bloqueado"
                    element.style.backgroundColor = "#fffb00";
                    element.style.color = "black"
                }
            });
        } else {
            console.log("todo chill no te preocupes")
            console.log("Este es el ej ultimo " + data[0].id_ejercicio)
            //Si se encuentra progreso del usuario entonces:
            ejercicios.forEach(element => {
                //sacamos el id del ultimo ejercicio resuelto del usuario
                let id = element.getAttribute("id")
                //comprobamos que sea un ejercicio y no la etiqueta del bloque
                if (id == "ejercicio") {
                    console.log(id)
                    let name = element.getAttribute("name");
                    console.log(name)
                    //Aqui comprobamos si el id del ejercicio es menos o igual
                    //al numero del progreso del usuario entonces se lo marcamos 
                    //como completado
                    if (name <= data[0].id_ejercicio) {
                        element.style.backgroundColor = "#fffb00";
                        element.style.color = "black"
                        element.textContent = "Completado"
                        element.style.pointerEvents = "none";
                    }
                    //Y en el caso que sea 2 mas que por el que va
                    //se lo bloqueamos para que siga el orden 
                    if (name > parseInt(data[0].id_ejercicio) + 1) {
                        element.style.pointerEvents = "none"
                        element.textContent = "Bloqueado"
                        element.style.backgroundColor = "#fffb00";
                        element.style.color = "black"
                    }
                }
            });
        }


        //cogemos todos los hijos de el div progreso
        let progreso = Array.from(progresoArea.children)
        //Comprobamos lo mismo
        if (data.error) {
            console.log("error mortifero")
            //Bloqueamos todo menos el primero
            progreso.forEach(element => {
                if (parseInt(element.getAttribute("name")) > 1) {
                    element.style.pointerEvents = "none"
                    element.textContent = "Bloqueado"
                    element.style.backgroundColor = "#fffb00";
                    element.style.color = "black"
                }
            });
        } else {
            console.log("todo chill no te preocupes")
            console.log("Este es el ej ultimo " + data[0].id_ejercicio)

            //Cambiamos el css de los que estan completados
            progreso.forEach(element => {

                let id = element.getAttribute("id")
                if (id == "progresos") {
                    console.log(id)
                    let name = element.getAttribute("name");
                    console.log(name)

                    if (name <= data[0].id_ejercicio) {
                        element.style.backgroundColor = "#fffb00";
                        element.style.color = "black"
                        element.textContent = "Completado"
                        element.style.pointerEvents = "none";
                    }

                }

            });
        }



    })
    .catch(error => console.error("Error:", error));