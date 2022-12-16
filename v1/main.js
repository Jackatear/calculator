// #################################################################
// PLAN 

// 1) on button press, add every button to an array named "preOperation"
// --> this button will take the textContent of all of the buttons pressed
// --> EXCLUDING: delete, clear, =

// 2) delete -> this button will remove the most recent addition to the preOperation array
//           -> if preOperation array length = 0, this is essentially the same as clear. 
// --> clear -> this button totally empties the preOperation array and operation array, restarting the program
// --> = -> this button will take us to step 3)

// 3) Once = has been pressed 
// --> i) we will run a function on the preOperation array:
//     -- example: preOperation = [1,1,1,1,1,+,+,+,19,19,*,7,7,/,/, 1]
//     --          operation = function(preOperation) {... return shortenedOperation}
//     --          operation = [11111, +, 1919, *, 77, /, 1]

// --> ii) This operation will become the secondary, smaller text we see on the calculator screen
//     -- So the use can see what they have done

// --> iii) we will create a variable = to the result of the operation

// --> iv) display the result as the main text on calculator screen

// 4) we must now expect more input, therefore we must make the resulting string 
//      /answer the first element in the preOperation array again, and await more input
//      until = or clear is pressed again.

// #################################################################

// FUNCTIONS //

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


const buttons = document.querySelectorAll("button");
const screenText = document.querySelector("#bottomText");
const topText = document.querySelector("#topText");
let preOperation = [];
let operation;
let answer;
let memory = [];



buttons.forEach((button) => {
    button.addEventListener('click', () => {
        if (button.id != 'delete' && button.id != 'clear' && button.id != 'equals'){
            if (preOperation.length < 20){
                preOperation.push(button.textContent);
                console.log(preOperation);
            };

            // Show on screen
            screenText.textContent = preOperation.join('');

        }
        if (button.id == 'delete') {
            if (preOperation.length > 0){
                preOperation.pop();
                console.log(preOperation);
                screenText.textContent = preOperation.join('');
            } else {
                operation = [];
                screenText.textContent = '.';
                topText.textContent = '.';
            }
            topText.textContent = '.';
        }
        if (button.id == 'clear') {
            // resets all variables
            preOperation = [];
            operation = [];
            answer = 0;
            topText.textContent = '.';
            screenText.textContent = '.';
            // console.log(preOperation, operation, ans);
        }

        if (button.id === 'equals') {
            if (preOperation.length > 0){
                operation = toOperation(preOperation);
            };
            let toEvaluate = operation;
            if (operation[0] == '*' || operation[0] == '/' || operation[0] == '+'){
                operation[0] = '0';
            };
            if(operation[operation.length - 1] == '+' || operation[operation.length - 1] == '-' || operation[operation.length - 1] == '*' || operation[operation.length - 1] == '/'){
                operation.pop();
                console.log("caught");
            };
            console.log(operation[operation.length - 1])
            
            answer = eval(operation.join(''));


            // Display on Screen 
            screenText.textContent = answer;
            // Move operation string top line
            topText.textContent = preOperation.join('');
            preOperation = [];
            let temp = [];
            temp.push(String(answer).split(''));
            temp[0].forEach((n) => {
                preOperation.push(n);
            })

            console.log(preOperation);
            
            
        }

    })
})











        // if (button.id === "clear"){
        //     textToBeDisplayed = [0];
        //     textToBeDisplayed.pop();
        //     screenText.textContent = '~';
        // } 
        // else {
        //     if (textToBeDisplayed.length < 20){
        //         textToBeDisplayed.push(button.textContent);
        //         let str = textToBeDisplayed.join('');
        //         screenText.textContent = str;
        //     };
        // }y