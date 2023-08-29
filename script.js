let firstNumb = 0;
let SecondNumb = 0;

let ChangingSecondNumb = false;
let Action = "";
let result = "";

let calculated = false;

var ClickSound = new Audio("ClickSound.mp3");

function playSound(){
    ClickSound.pause();
    ClickSound.currentTime = 0; 
    ClickSound.play();
}

function cleanResult(){
    document.getElementById("Result").innerHTML = result;
}
function changeDisplayNumber(result){
    document.getElementById("Result").innerHTML = result;
    firstNumb = result;

    calculated = true;
}
function calculate(n1, operator, n2){
    
    if (operator === '+') {

      result = parseFloat(n1) + parseFloat(n2);
      changeDisplayNumber(result);

    } else if (operator === '-') {

      result = parseFloat(n1) - parseFloat(n2);
      changeDisplayNumber(result);

    } else if (operator === '*') {
      result = parseFloat(n1) * parseFloat(n2)
      changeDisplayNumber(result);


    } else if (operator === '/') {
      result = parseFloat(n1) / parseFloat(n2)
      changeDisplayNumber(result);

    }

}   

document.getElementById("ButtonsContainer").addEventListener("click",(e) => {
    e.target.classList.toggle("click");
    setTimeout(() => e.target.classList.toggle("click"), 110);
    playSound();


    var move = e.target.innerHTML;
    if (Number.isInteger(parseInt(move))){
        if (ChangingSecondNumb){
            if (SecondNumb == 0){
                SecondNumb = move;

                document.getElementById("Result").innerHTML = SecondNumb;
            }
            else {
                if (!calculated){
                    SecondNumb = SecondNumb + move;
                    document.getElementById("Result").innerHTML = SecondNumb;
                }
                else{
                    SecondNumb = move;
                    document.getElementById("Result").innerHTML = SecondNumb;

                    calculated = false;
                }
            }
        }
        else{
            if (firstNumb == 0){
                firstNumb = move;
                document.getElementById("Result").innerHTML = firstNumb;
            }
            else {
                firstNumb = firstNumb + move;
                document.getElementById("Result").innerHTML = firstNumb;
            }
        }
    }
    else if(move == "="){
        if (ChangingSecondNumb){
            firstNumb = parseInt(firstNumb);
            SecondNumb = parseInt(SecondNumb);
            calculate(firstNumb, Action, SecondNumb);
        }
    }
    else if (move == "-/+"){
        if (!ChangingSecondNumb){
            if (Array.from("" + firstNumb)[0] != "-"){
                firstNumb = parseInt("-" + document.getElementById("Result").innerHTML);
                document.getElementById("Result").innerHTML = firstNumb;    
            } 
            else{
                firstNumb = firstNumb.toString().substring(1);
                firstNumb = parseInt(firstNumb);

                document.getElementById("Result").innerHTML = firstNumb;
            }
        }
        else{
            if (Array.from("" + SecondNumb)[0] != "-"){
                SecondNumb = parseInt("-" + document.getElementById("Result").innerHTML);
                document.getElementById("Result").innerHTML = SecondNumb;
            }
            else{
                SecondNumb = SecondNumb.toString().substring(1);
                SecondNumb = parseInt(SecondNumb);
                document.getElementById("Result").innerHTML = SecondNumb;
            }
        }
    }
    else{
        ChangingSecondNumb = true;

        if (move == "+"){
            Action = "+";
        }
        else if(move == "-"){
            Action = "-";
        }
        else if(move == "*"){
            Action = "*";
        }
        else if (move == "/"){
            Action = "/";
        }
        else if (move == "C"){
            if (ChangingSecondNumb){
                firstNumb = 0;
                SecondNumb = 0;

                ChangingSecondNumb = false;
                cleanResult();
                document.getElementById("Result").innerHTML = firstNumb;
            }
            else {
                firstNumb = 0;
                document.getElementById("Result").innerHTML = firstNumb;
            }
        }
        else if (move == "X"){
            SecondNumb = 0;
            document.getElementById("Result").innerHTML = 0;
        }
    }
})
