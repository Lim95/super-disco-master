const BEFORE = 0;
const AFTER = 1;
var tasks = {};
var backgroundFlag = BEFORE;

$("#currentDay").text(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));
setInterval(function () {
    $("#currentDay").text(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));
}, 1000);

var saveTasks = function() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

var loadTasks = function() {
    tasks = JSON.parse(localStorage.getItem("tasks"));

    $(".schedule-event-p").each(function( index ) {
        if(tasks[index]) {
            $( this ).text(tasks[index]);
        }
    });
};


function getCurrentTimeEvent() {
    var currentTime = moment().format("hA");

    $(".schedule-time").each(function( index ) {
        if ($( this ).text().trim() === currentTime) {
            $( this ).next().css("background-color", "red");
            backgroundFlag = AFTER;    
        }
        else {
            switch(backgroundFlag) {
                case BEFORE:
                    $( this ).next().css("background-color", "gray");
                    break;
                case AFTER:
                    $( this ).next().css("background-color", "blue");
                    break;
                default:
                    break;
            }
        }
    });    
};

$(".schedule").on("click", "p", function() {
    // get current text of p element
    var text = $(this).text();

    // replace p element with a new textarea
    var textInput =$("<textarea>").addClass("form-control").val(text);
    $(this).replaceWith(textInput);

    // auto focus new element
    textInput.trigger("focus");
});

$("button").click( function() {
    // get current value of textarea
    var text = $(".form-control").val();
    // console.log(text);
    
    // get the position 
    var index = $(".form-control").closest(".schedule").index();

    tasks[index] = text;
    saveTasks();

    //recreate p element
    var taskP = $("<p>").text(text);

    // replace textarea with new content
    $(".form-control").replaceWith(taskP);
});



loadTasks();
getCurrentTimeEvent();