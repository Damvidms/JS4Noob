let url = new URL(window.location.href);
let id = url.searchParams.get('id');

let cajaTotal = document.getElementById("teoria")
let formData = new FormData();
formData.append('id', id);

fetch('tp.php', {
    method: 'POST',
    body: formData
})
.then(response => response.json())
.then(data => {
    console.log(data)
    
    let labelTitulo = document.createElement("label");
    labelTitulo.textContent = data[0].titulo;
    labelTitulo.className = "neon-label";
    cajaTotal.appendChild(labelTitulo);
    
    let labelDescripcion = document.createElement("label");
    labelDescripcion.textContent = data[0].descripcion;
    labelDescripcion.className = "neon-label2";
    cajaTotal.appendChild(labelDescripcion);
})