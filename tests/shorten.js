
function toOperation(preOperation){
    longArray = preOperation;
    // we want this to become [1234,'-',213];

    longStr = longArray.join('')
    console.log(longStr);


    let operandPattern = /[+/*-.]+/g;
    let numberPattern = /[0-9]+/g;

    const opArr = [...longStr.matchAll(operandPattern)];
    const noArr = [...longStr.matchAll(numberPattern)];

    const conArray = noArr.concat(opArr);

    const sortConArray = conArray.sort((a,b) => {
        if (a.index > b.index){
            return 1;
        } else {
            return -1;
        }
    })

    let operation = [];

    sortConArray.forEach((element) => {
        operation.push(element[0]);
    })

    for (let i = 0; i < operation.length; i++){
        if (operation[i].match(operandPattern)){
            if (operation[i].length > 1){
                let x = operation[i].slice(-1);
                operation[i] = x;
            }
        }
    }

    return operation;
};


preOperation = ['6', '+', '6', '*', '/', '6', '+', '5', '+', '-', '1'];
operation = toOperation(preOperation)
console.log(eval(operation.join('')));