var obj = document.querySelectorAll(".drum");
function playDrum(val){
    var music;
    switch (val){
        case "w":
            music = new Audio("sounds/tom-1.mp3");
            break;
        case "a":
            music = new Audio("sounds/tom-2.mp3");
            break;
        case "s":
            music = new Audio("sounds/tom-3.mp3");
            break;
        case "d":
            music = new Audio("sounds/tom-4.mp3");
            break;
        case "j":
            music = new Audio("sounds/snare.mp3");
            break;
        case "k":
            music = new Audio("sounds/kick-bass.mp3");
            break;
        case "l":
            music = new Audio("sounds/crash.mp3");
            break;
        default :
            break;
        }
    music.play(); 
}

for (var i =0;i < obj.length;i++){
    obj[i].addEventListener("mousedown",function (){
        this.classList.add("pressed");
        console.log(this.innerHTML);
        playDrum(this.innerHTML);

    });
    obj[i].addEventListener("mouseup",function (){
        this.classList.remove("pressed");
    }); 
}

//for keyboard;
document.addEventListener("keydown",function (event){
    var selector = "." + event.key + ".drum";
    var obj = document.querySelector(selector);
    if (obj != null){
        obj.classList.add("pressed");
        console.log(obj);
        playDrum(event.key);
    }
})
document.addEventListener("keyup",function (event){
    var selector = "." + event.key + ".drum";
    var obj = document.querySelector(selector);
    if (obj != null){
        obj.classList.remove("pressed");
    }
})