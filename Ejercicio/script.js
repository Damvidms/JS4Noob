const submitButton = document.getElementById('submit');
const userFunctionTextarea = document.getElementById('user-function');
const resultParagraph = document.getElementById('result');
const seccion = document.getElementById('seccion');
const descripcion = document.getElementById('descripcion');



window.addEventListener('load', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const idEjercicio = urlParams.get('id');
    console.log(idEjercicio)
    const formData = new FormData();
    formData.append('id', idEjercicio);
    fetch('exercise.php', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })

});

submitButton.addEventListener('click', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const idEjercicio = urlParams.get('id');
    const formData = new FormData();
    formData.append('id', idEjercicio);
    fetch('exercise.php', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(exercise => {
            console.log('Exercise:', exercise);
            let userFunctionCode = userFunctionTextarea.value;
            console.log('User function code:', userFunctionCode);
            const funcName = exercise.funcName;
            console.log('Function name:', funcName);
            const inputParams = exercise.inputParams;
            console.log('Input params:', inputParams);
            const inputValues = exercise.inputValues;
            console.log('Input values:', inputValues);
            const expectedOutput = exercise.expectedOutput;
            console.log('Expected output:', expectedOutput);
            //
            // ReFmover la declaración de la función si existe

            if (userFunctionCode.startsWith('function')) {
                userFunctionCode = userFunctionCode.replace(/function\s*\w*\([^)]*\)\s*\{/, '').replace(/\}$/, '');
            }

            console.log('Processed user function code:', userFunctionCode);

            try {
                console.log("inputvalues " + inputValues)
                console.log("inputParams " + inputParams)
                const userFunction = new Function(...inputParams, userFunctionCode);
                console.log('User function:', userFunction);

                const result = userFunction.apply(null, inputValues);
                console.log(result)
                const resultString = String(result);


                if (resultString == expectedOutput) {
                    resultParagraph.textContent = '¡Correcto!';
                } else {
                    resultParagraph.textContent = `Incorrecto. La respuesta correcta es ${expectedOutput}, pero obtuve ${result}.`;
                }
            } catch (error) {
                console.error('Error:', error);
                resultParagraph.textContent = `Error: ${error.message}`;
            }
        });
});
