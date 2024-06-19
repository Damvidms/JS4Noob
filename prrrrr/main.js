async function fetchExercise() {
    try {
        const response = await fetch('getExercise.php', {
            method: 'POST',
            body: new URLSearchParams(), 
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

async function hevaluate() {
    try {
        const functionCode = document.getElementById('functionCode').value;
        console.log('Function Code:', functionCode);

        const exercise = await fetchExercise();
        console.log('Exercise:', exercise);

        // Parsear el input del ejercicio como JSON
        const input = JSON.parse(exercise.input);
        console.log('Input:', input);

        // Construir el esquema del ejercicio
        const exerciseSchema = {
            funcName: exercise.funcName,
            testCases: [{ input: input, output: exercise.output }],
            descripcion: exercise.descripcion
        };

        console.log('Exercise Schema:', exerciseSchema);

        // Crear un objeto Judge y ejecutar la evaluación
        const judge = new Judge(exerciseSchema, functionCode);
        const result = await judge.run();

        // Mostrar el resultado de la evaluación
        console.log('Evaluation Result:', result);
        alert(`Score: ${result.score}\nResults: ${result.result.join(', ')}`);
    } catch (error) {
        console.error('Evaluation error:', error);
        alert('Error evaluating exercise. Please try again.');
    }
}


window.onload = async function () {
    try {
        const exercise = await fetchExercise();

        // Mostrar la descripción del ejercicio
        document.getElementById('description').innerText = exercise.descripcion;

        // Mostrar el input del ejercicio (si existe)
        if (exercise.testCases && exercise.testCases.length > 0) {
            document.getElementById('input').innerText = `Input: ${JSON.stringify(exercise.testCases[0].input)}`;
        } else {
            console.error('Exercise test cases not found or empty');
            alert('Exercise test cases not found or empty. Please check exercise data.');
        }
    } catch (error) {
        console.error('Fetch error:', error);
        alert('Error fetching exercise data. Please try again later.');
    }
};
