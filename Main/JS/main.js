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
            cajaSeccion.setAttribute("id", "progreso")
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


        if (data.error) {
            console.log("error mortifero")
        } else {
            console.log("todo chill no te preocupes")
            console.log(data[0].id_ejercicio)
        }


        let ejercicios = Array.from(ejercicioArea.children)

        ejercicios.forEach(element => {

            let id = element.getAttribute("id")
            if (id == "ejercicio") {
                console.log(id)
                let name = element.getAttribute("name");
                console.log(name)

                if (name <= data[0].id_ejercicio) {
                    element.style.backgroundColor = "#fffb00";
                    element.style.color = "black"
                    element.textContent = "Completado -> " + element.textContent
                    element.style.pointerEvents = "none"; // Agregamos esta línea
                }

            }

        });

    })
    .catch(error => console.error("Error:", error));