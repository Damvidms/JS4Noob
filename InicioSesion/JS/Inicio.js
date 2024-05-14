let form = document.getElementsByTagName("form")[0]

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let correo = document.getElementById("username").value
    let contrasenya = document.getElementById("password").value

    let formData = new FormData(this);

    fetch("../PHP/Inicio.php", {
        method: "POST",
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = "../../Main/HTML/main.html";
            } else {
                alert(data.message);
            }
        })
        .catch(error => console.error("Error:", error));

})