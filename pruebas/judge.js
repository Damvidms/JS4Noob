const RESULT_CODE = {
    AC: 'AC',
    WA: 'WA',
    CE: 'CE',
    RE: 'RE',
    TLE: 'TLE'
};

class Judge {
    constructor(schema, functionCode, timeout = 3000) {
        this.schema = schema;
        this.schema.testCases.forEach((testCase) => {
          testCase.input = JSON.parse(testCase.input); // Quitar contrabarras adicionales
        });
        this.functionCode = functionCode;
        this.timeout = timeout;
      }

    t(any) {
        return JSON.stringify(any);
    }

    addWrapper(schema, code, testCase) {
        const input = JSON.parse(testCase.input); // Quitar contrabarras adicionales
        return `
          ${code}
          (() => _.isEqual(${schema.funcName}.apply(null, ${this.t(input)}), ${this.t(testCase.output)}))()
        `;
      }

    async runTest(testCase) {
        try {
            const vm = require('vm');
            vm.runInNewContext(this.functionCode); // Evalúa la función del usuario de manera segura
        } catch (e) {
            return RESULT_CODE.RE; // Error en la evaluación del código
        }

        const wrapperedCode = this.addWrapper(this.schema, this.functionCode, testCase);
        try {
            let result;
            const executeWithTimeout = () => {
                return new Promise((resolve, reject) => {
                    const timer = setTimeout(() => {
                        reject(new Error('Script execution timed out.'));
                    }, this.timeout);

                    try {
                        result = vm.runInNewContext(wrapperedCode); // Ejecuta el código con el caso de prueba
                        clearTimeout(timer);
                        resolve(result);
                    } catch (err) {
                        clearTimeout(timer);
                        reject(err);
                    }
                });
            };

            return executeWithTimeout().then(
                (result) => result? RESULT_CODE.AC : RESULT_CODE.WA, // Evaluación exitosa o incorrecta
                (error) => error.message === 'Script execution timed out.'? RESULT_CODE.TLE : RESULT_CODE.WA // Tiempo de ejecución excedido
            );
        } catch (e) {
            return e.message === 'Script execution timed out.'? RESULT_CODE.TLE : RESULT_CODE.WA; // Tiempo de ejecución excedido
        }
    }

    async run() {
        const testCase = this.schema.testCases[0]; // Obtiene el primer caso de prueba del esquema
        const result = await this.runTest(testCase); // Ejecuta el caso de prueba
        const score = result === 'AC'? 100 : 0; // Calcula la puntuación basada en el resultado
        return {
            score: score,
            result: [result]
        };
    }
}