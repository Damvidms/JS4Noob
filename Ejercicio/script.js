let submitButton = document.getElementById('submit');
let userFunctionTextarea = document.getElementById('user-function');
let resultParagraph = document.getElementById('resultado');
let seccion = document.getElementById('seccion');
let descripcion = document.getElementById('descripcion');

let divEjercicio = document.getElementById("infoEjercicio")
let volver = document.getElementById("volver")

volver.addEventListener("click", ()=>{
    window.location.href = "../Main/HTML/main.html"
})
 
//añadimos el evento de load a la ventana para asegurarnos de que 
//este totalmente cargada antes de emepezar a hacer cosas
window.addEventListener('load', () => {

    //buscamos el id en la url de la ventana
    let urlParams = new URLSearchParams(window.location.search);
    let idEjercicio = urlParams.get('id');
    
    //Creamos un formadata para pasarle la info al php
    //y le ponemos el id del ejercicio
    let formData = new FormData();
    formData.append('id', idEjercicio);
    //peticion fetch de tipo post para pasarle un body
    fetch('exercise.php', {
        method: 'POST',
        body: formData
    })
    //formateamos la respuesta a json para ser mas facil 
    //de manejar
        .then(response => response.json())
        .then(data => {

            //Ya teniendo la informacion del ejercicio vamos a 
            //crear elementos HTML y ponerles el texto que le 
            //corresponde
            let labelTitulo = document.createElement("label");
            labelTitulo.textContent = data.seccion;
            labelTitulo.setAttribute("id", "titulo")
            divEjercicio.append(labelTitulo)

            let labelinfo = document.createElement("label");
            labelinfo.textContent = data.descripcion;
            labelinfo.setAttribute("id", "info")
            divEjercicio.append(labelinfo)

            let labelinfo2 = document.createElement("label");
            labelinfo2.textContent = "Los parametros de la funcion son " + 
            data.inputParams + " que tienen valor/s de " + data.inputValues;
            labelinfo2.setAttribute("id", "info2")
            divEjercicio.append(labelinfo2)

        })
});

submitButton.addEventListener('click', () => {
    let urlParams = new URLSearchParams(window.location.search);
    let idEjercicio = urlParams.get('id');
    let formData = new FormData();
    formData.append('id', idEjercicio);
    //hacemos otra llamada al php para sacar la informacion del ejercicio
    //pasandole el id sacado de la url en formato FormData
    fetch('exercise.php', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(exercise => {
            console.log('Exercise:', exercise);
            //recogemos uno a uno los valores que recibimos del 
            //archivo pasado a json y los almacenamos en variables
            let userFunctionCode = userFunctionTextarea.value;
            let funcName = exercise.funcName;
            let inputParams = exercise.inputParams;
            let inputValues = exercise.inputValues;
            let expectedOutput = exercise.expectedOutput;

            //comprobamos si el input puesto por el usuario empieza 
            //por la palabra function
            //y si es asi se la quitamos con una expresion regular
            if (userFunctionCode.startsWith('function')) {
            userFunctionCode = userFunctionCode.replace(/function\s*\w*\([^)]*\)\s*\{/, '').replace(/\}$/, '');
            }

            try {
                //definimos de manera dinamica los argumentos de la funcion que estamos creando
                //con new Function y le pasamos el cuerpo de esta nueva funcion con 
                //userFunctionCode
                let userFunction = new Function(...inputParams, userFunctionCode);
                //Ejecutamos la funcion que acabamos de crear con los valores del ejercicio
                let result = userFunction.apply(null, inputValues);
                //pasamos el resultado a una string para poder compararlo siempre
                let resultString = String(result);
                //Si el resultado de esta funcion creada por el usuario es igual al resultado esperado
                //del ejercicio es correcto
                if (resultString == expectedOutput) {
                    resultParagraph.textContent = '¡Correcto!';
                    //Dibujo el confeti que esta en otro archiv JS
                    Draw();
                    setTimeout(clearCanvas, 5000);

                    //Creo un formdata con el id de el ejercicio que se acaba de pasar
                    let formData2 = new FormData();
                    formData2.append('id', idEjercicio);

                    //hago una llamada a actualizar progreso.php pasandole el id
                    fetch('actualizarProgreso.php', {
                        method: 'POST',
                        body: formData
                    })
                        .then(response => response.json())
                        .then(data => {

                        })
                } else {
                    //Si la respuesta es incorrecta.
                    resultParagraph.textContent = `Incorrecto. La respuesta correcta es ${expectedOutput}, pero obtuve ${result}.`;
                }
            } catch (error) {
                console.error('Error:', error);
                resultParagraph.textContent = `Error: ${error.message}`;
            }
        });
});
