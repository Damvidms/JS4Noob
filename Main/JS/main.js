let progresoArea = document.getElementById("progreso")
let ejercicioArea = document.getElementById("ejercicios")

fetch("../PHP/main.php", {
    method: "GET",
})
    .then(response => response.json())
    .then(data => {
        console.log(data)
        data.forEach(element => {
            let cajaSeccion = document.createElement("label")
            cajaSeccion.textContent = element.seccion
            cajaSeccion.setAttribute("id", "progresos")
            cajaSeccion.setAttribute("name", element.id)
            progresoArea.append(cajaSeccion);

            let cajaEjercicio = document.createElement("label")
            cajaEjercicio.textContent = element.descripcion;
            cajaEjercicio.setAttribute("id", "ejercicio")
            cajaEjercicio.setAttribute("name", element.id)
            ejercicioArea.appendChild(cajaEjercicio)



            cajaEjercicio.addEventListener("click", () => {
                location.href = `../../Ejercicio/indices.html?id=${element.id}`
            })



        });


    })
    .catch(error => console.error("Error:", error));



fetch("../PHP/progresoActual.php", {
    method: "GET",
})
    .then(response => response.json())
    .then(data => {

        console.log(data)
        let ejercicios = Array.from(ejercicioArea.children)

        if (data.error) {
            console.log("error mortifero")

            ejercicios.forEach(element => {
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

            ejercicios.forEach(element => {

                let id = element.getAttribute("id")
                if (id == "ejercicio") {
                    console.log(id)
                    let name = element.getAttribute("name");
                    console.log(name)

                    if (name <= data[0].id_ejercicio) {
                        element.style.backgroundColor = "#fffb00";
                        element.style.color = "black"
                        element.textContent = "Completado"
                        element.style.pointerEvents = "none";
                    }

                    if (name > parseInt(data[0].id_ejercicio) + 1) {
                        element.style.pointerEvents = "none"
                        element.textContent = "Bloqueado"
                        element.style.backgroundColor = "#fffb00";
                        element.style.color = "black"
                    }

                }

            });
        }



        let progreso = Array.from(progresoArea.children)

        if (data.error) {
            console.log("error mortifero")

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

            progreso.forEach(element => {

                let id = element.getAttribute("id")
                if (id == "progreso") {
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