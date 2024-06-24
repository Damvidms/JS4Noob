let cajaTotal = document.getElementById("teoria")
fetch('Teoria.php', {
    method: 'POST',
    
})
.then(response => response.json())
.then(data => {
    
    data.forEach(element => {
        console.log(element)
        let caja = document.createElement("label");
        caja.textContent = element.titulo;
        caja.setAttribute("class", "teoria")
        caja.setAttribute("id", element.id)
        cajaTotal.appendChild(caja)

        caja.addEventListener("click", ()=>{
            window.location.href = `../TeoriaPersonal/tp.html?id=${element.id}`
        })
    });
})