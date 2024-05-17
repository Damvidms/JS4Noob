let form = document.getElementsByTagName("form")[0];

form.addEventListener("submit", function (e) {
    e.preventDefault();

    let formData = new FormData(this);

    formData.forEach((dato) => {
        console.log(dato);
    });

    fetch("../PHP/Inicio.php", {
        method: "POST",
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.success) {
                window.location.href = "../../Main/HTML/main.html";
            } else {
                alert(data.message);
            }
        })
        .catch(error => console.error("Error:", error));
});
