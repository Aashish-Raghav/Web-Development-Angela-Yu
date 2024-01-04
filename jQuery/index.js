$("h1").addClass("big-title");
$("h1").click(function(){
    $("h1").toggleClass("big-title");
});

$("button").click(function(){
    $("h1").toggleClass("prp");
})

$(document).keypress(function(){
    $("h1").text(event.key); 
})