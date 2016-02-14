//GLOBAL VARIABLES

var textBox = document.getElementById("screen"); //the screen element
var numbers = [];
var operators = [];
var ans = 0;
var thisNumber = ""; //The number that is being entered

//FUNCTIONS

function buttonClick(buttonText){
  switch(buttonText){
    case "AC":
      numbers = [];
      operators = [];
      thisNumber = "";
      textBox.innerText = "";
      break;
    case "CE":
      if(thisNumber != ""){
        thisNumber = "";  //clears the number that's being entered
      }
      else{ //else, clears the last operator
        operators.splice(operators.length-1,1)
      }
      var displayString = "";
      for(var i = 0; i < operators.length;i++){ //makes a string from the already entered numbers & operators

        if(numbers[i] !== undefined)//this is the case where a lot of operators have been entered for no reason
        {
          displayString += numbers[i] + operators[i];
        }
        else{
          displayString += operators[i];
        }
      }
      textBox.innerText = displayString;
      break;
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
    case "0":
    case ".":
      textBox.innerText += buttonText;
      thisNumber += buttonText;
      break;
    case "%":
    case "/":
    case "*":
    case "-":
    case "+":
      if(thisNumber !== ""){ //If more operators entered after each other, don't store the empty strings as numbers
        numbers.push(parseFloat(thisNumber));
        thisNumber = "";
      }
      operators.push(buttonText);
      textBox.innerText += buttonText;
      break;
    case "=":
      numbers.push(parseFloat(thisNumber));

      if(operators.length >= numbers.length){ //Error case(s)
        textBox.innerHTML ="Syntax Error"
        console.log(operators.length);
        console.log(numbers.length);
      }
      else{
        var result = calculateResult();
        thisNumber = result;
        textBox.innerHTML = result;
      }

      numbers = [];
      break;
  }
}

function calculateResult(){

  if(operators.indexOf("*") != -1 || operators.indexOf("/") != -1 || operators.indexOf("%") != -1){ //if there is multiplying, dividing, or modulo, those operations are done first
    for(var i = 0; i < operators.length;i++){ 
      switch(operators[i]){ //does the operation, stores the result in the former number, and splices the latter and the poerator
        case "*":
          numbers[i] = numbers[i] * numbers[i+1]; 
          numbers.splice(i + 1, 1);
          operators.splice(i,1);
          i -= 1; //This is to avoid skipping an operator, because of the splice
          break;
        case "/":
          numbers[i] = numbers[i] / numbers[i+1];
          numbers.splice(i + 1, 1);
          operators.splice(i,1);
          i -= 1; //This is to avoid skipping an operator, because of the splice
          break;
        case "%":
          numbers[i] = numbers[i] % numbers[i+1];
          numbers.splice(i + 1, 1);
          operators.splice(i,1);
          i -= 1; //This is to avoid skipping an operator, because of the splice
          break;
      }
    }
  }

  for(var i = 0; i < operators.length;i++){//This does the same as above, just with the + and - operators
    switch(operators[i]){
      case "+":
        numbers[0] += numbers[i + 1];
        numbers.splice(i + 1, 1);
        operators.splice(i,1);
        i -= 1; //This is to avoid skipping an operator, because of the splice
        break;
      case "-":
        numbers[0] -= numbers[i + 1];
        numbers.splice(i + 1, 1);
        operators.splice(i,1);
        i -= 1; //This is to avoid skipping an operator, because of the splice
        break;
    }
  }

  return numbers[0];
}
