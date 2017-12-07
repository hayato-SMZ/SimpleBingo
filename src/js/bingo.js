var Bingo = function(){
  var dropList = [];
  var unDrop = [];
  var strageName = "smzSimpleBingo";
  this.init = function(maxNumber){
    unDropinit(maxNumber);
  };

  this.dataLoad = function(){
    var loadData = localStorage.getItem(strageName);
    var parseData = JSON.parse(loadData);
    dropList = parseData.dropList;
    unDrop = parseData.unDrop;
  };

  var saveBingoData = function(){
    console.log(unDrop);
    localStorage.setItem(strageName,JSON.stringify({"dropList":dropList, "unDrop":unDrop}));
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
    choiceNumber = unDrop[choice];
    unDrop = unDrop.slice(0,choice).concat(unDrop.slice(choice + 1, unDrop.length));
    dropList[choiceNumber] = true;
    saveBingoData();
    return choiceNumber[0];
  };

  this.getdropList = function(){
    return dropList;
  };
};

var view = function(){
  var bingoIns;
  var numberObj = document.querySelector(".current .number");
  var numbersObj = document.querySelector(".dropList .numbers");
  var shuffle = new ShuffleText(numberObj);
  var newgame = document.getElementById("newgame");
  var loadgame = document.getElementById("loadgame");
  var currentNumber = 0;
  newgame.addEventListener("click",function(){
    document.querySelector(".main").style.display = "block";
    document.querySelector(".menu").style.display = "none";
    bingoIns = new Bingo();
    bingoIns.init(document.querySelector("#maxNumber").value);
  });
  loadgame.addEventListener("click",function(){
    document.querySelector(".main").style.display = "block";
    document.querySelector(".menu").style.display = "none";
    bingoIns = new Bingo();
    bingoIns.init(document.querySelector("#maxNumber").value);
    bingoIns.dataLoad();
    setDropTextList(bingoIns.getdropList());
  });
  document.getElementById("gotoNext").addEventListener("click",function(e){
    currentNumber = bingoIns.drop();
    numberObj.textContent = "00";
    shuffleNumber = (currentNumber < 10)? "0"+ currentNumber : currentNumber;
    shuffle.setText(""+shuffleNumber);
    shuffle.start();
  });
  document.getElementById("hideCurrent").addEventListener("click",function(){
    document.querySelector(".numbers").style["font-size"] = "1.5em";
    document.querySelector(".current").style.display = "none";
  });
  document.getElementById("showCurrent").addEventListener("click",function(){
    document.querySelector(".numbers").style["font-size"] = "1em";
    document.querySelector(".current").style.display = "block";
  });

  numberObj.addEventListener("click",function(){
    shuffle.stop();
    shuffle.setText(""+currentNumber);
    numberObj.textContent = currentNumber;
    setDropTextList(bingoIns.getdropList(), currentNumber);
  });

  var addDropNumber = function(number, flag){
    var numberDom = document.createElement("div");
    numberDom.className = (flag)? "number isCurrent" : "number";
    numberDom.textContent = number;
    numbersObj.appendChild(numberDom);
  };

  var setDropTextList = function(dropList, currentNumber){
    numbersObj.innerHTML = "";
    for(var i = 0; i < dropList.length ;i++){
      if(dropList[i]){
        addDropNumber(i, i == currentNumber);
      }
    }
  };
};
(function(){
  view();
}());
