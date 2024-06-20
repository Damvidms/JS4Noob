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