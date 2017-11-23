var Bingo = function(){
  var dropList = [];
  var unDrop = [];
  this.init = function(maxNumber){
    unDropinit(maxNumber);
  };

  var unDropinit = function(maxNumber){
    unDrop.length = 0;
    for(var i = 0; i< maxNumber; i++){
      unDrop[i] = i + 1;
      dropList[i + 1] = false;
    }
  };

  this.drop = function(){
    var choice = Math.floor(Math.random() * unDrop.length);
    choiceNumber = unDrop.slice(choice,choice + 1);
    dropList[choiceNumber] = true;
    return choiceNumber[0];
  };

  this.getdropList = function(){
    return dropList;
  };
};
var view =function(){
  var bingoIns;
  var numberObj = document.querySelector(".current .number");
  var numbersObj = document.querySelector(".dropList .numbers");
  var shuffle = new ShuffleText(numberObj);
  var newgame = document.getElementById("newgame");
  var currentNumber = 0;
  newgame.addEventListener("click",function(){
    document.querySelector(".main").style.display = "block";
    document.querySelector(".menu").style.display = "none";
    bingoIns = new Bingo();
    bingoIns.init(document.querySelector("#maxNumber").value);
  });
  document.getElementById("gotoNext").addEventListener("click",function(e){
    currentNumber = bingoIns.drop();
    numberObj.textContent = "---";
    shuffle.start();
    shuffle.setText(""+currentNumber);
  });
  document.getElementById("hideCurrent").addEventListener("click",function(){
    console.log("click");
    document.querySelector(".current").style.display = "none";
  });
  document.getElementById("showCurrent").addEventListener("click",function(){
    document.querySelector(".current").style.display = "block";
  });

  numberObj.addEventListener("click",function(){
    shuffle.stop();
    numberObj.textContent = currentNumber;
    setDropTextList(bingoIns.getdropList());
  });

  var addDropNumber = function(number){
    var numberDom = document.createElement("div");
    numberDom.className = "number";
    numberDom.textContent = number;
    numbersObj.appendChild(numberDom);
  };

  var setDropTextList = function(dropList){
    numbersObj.innerHTML = "";
    for(var i = 0; i < dropList.length ;i++){
      if(dropList[i]){
        addDropNumber(i);
      }
    }
  };
};
(function(){
  view();
}());
