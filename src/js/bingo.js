var Bingo = function(){
  var dropList = [];
  var unDrop = [];
  var init = function(maxNumber){
    unDropinit(maxNumber);
  };

  var unDropinit = function(maxNumber){
    unDrop.length = 0;
    for(var i = 0; i< maxNumber; i++){
      unDrop[i] = i + 1;
      dropList[i + 1] = false;
    }
  };

  var drop = function(){
    var choice = Math.floor(Math.random() * unDrop.length);
    choiceNumber = unDrop.slice(choice,choice + 1);
    dropList[choiceNumber] = true;
    return choiceNumber;
  };

  var getdropList = function(){
    return dropList;
  };
};
