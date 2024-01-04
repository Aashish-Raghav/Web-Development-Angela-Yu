var playing = 0;
var currLevel = 1;
var userInput = "";
var str = "";
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// making colors clickable
function clicked(obj){
    obj.on("mousedown",function() { 
        obj.addClass("pressed");
        switch (obj.attr("id")){
            case "green" :
                var music = new Audio("sounds/green.mp3");
                music.play();
                userInput += "1";
                break;
            case "red" :
                var music = new Audio("sounds/red.mp3");
                music.play();
                userInput += "2";
                break;
            case "yellow" :
                var music = new Audio("sounds/yellow.mp3");
                music.play();
                userInput += "3";
                break;
            case "blue" :
                var music = new Audio("sounds/blue.mp3");
                music.play();
                userInput += "4";
                break;
            default :
                break;
        }
        if (userInput != str.slice(0,userInput.length)){
            //game over;
            $("body").addClass("game-over");
            sleep(200).then(() => { $("body").removeClass("game-over"); });
            var music = new Audio("sounds/wrong.mp3");
                music.play();
            str = "";
            playing = 0;
            userInput = "";
            currLevel = 1;
            $("#level-title").text("Game Over! Press any key to Restart");
        }
        else if (userInput.length == currLevel){
            //level up;
            str = "";
            userInput = "";
            currLevel++;
            sleep(1000).then( ()=> {playGame();});
        }

    })
    obj.on("mouseup",function (){
        obj.removeClass("pressed");
    })
}
clicked($(".btn.green"));
clicked($(".btn.red"));
clicked($(".btn.yellow"));
clicked($(".btn.blue"));



//play game function
function playGame(){
    //set heading to currLevel;
    if ($("body").hasClass("game-over")){
        $("body").removeClass("game-over");
    }
    $("#level-title").text("Level " + currLevel);
    //generate currlevel random no [1,4];
    for (var i =0;i < currLevel;i++){
        var randNo = Math.floor(Math.random()*4)+1;
        str += randNo;
    }
    
    //animate the pattern;
    for (var i = 0;i < currLevel;i++){
        var t = str[i];
        switch (t){
            case "1":
                sleep(i*500).then(() => { 
                    $(".btn.green").addClass("pressed"); 
                    var music = new Audio("sounds/green.mp3");
                    music.play();
                });
                sleep(i*500+400).then(() => { $(".btn.green").removeClass("pressed"); });
                break;
            case "2":
                sleep(i*500).then(() => { 
                    $(".btn.red").addClass("pressed");
                    var music = new Audio("sounds/red.mp3");
                    music.play();
                });
                sleep(i*500+400).then(() => { $(".btn.red").removeClass("pressed"); });
                break;
            case "3":
                sleep(i*500).then(() => { 
                    $(".btn.yellow").addClass("pressed");
                    var music = new Audio("sounds/yellow.mp3");
                    music.play();
                });
                sleep(i*500+400).then(() => { $(".btn.yellow").removeClass("pressed"); });
                break;
            case "4":
                sleep(i*500).then(() => { 
                    $(".btn.blue").addClass("pressed");
                    var music = new Audio("sounds/blue.mp3");
                    music.play();
                });
                sleep(i*500+400).then(() => { $(".btn.blue").removeClass("pressed"); });
                break;
            default :
                console.log("default");
                break;
        }
    }
    console.log(str);
}

$(document).keypress(function(){
    if (!playing){
        playing = 1;
        sleep(200).then( ()=> {playGame();});
    }
});