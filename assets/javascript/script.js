var apiKey = "3AHII6xXXUPu9XSCNOSYLQIL1DEWdOGg";

var topics = ["Different Strokes", "Full House", "Webster", "Cosby Show", "Knight Rider", "Roseanne", "Alf", "Seinfeld", "The Wonder Years", "Growing Pains", "Punky Brewster", "Family Matters", "Charles in Charge", "Married with Children", "Mr. Belvedere", "Saved by the Bell", "MacGyver", "Who's the Boss?"];

var buttonClasses = ["btn-primary", "btn-success", "btn-info", "btn-warning", "btn-danger"];

function displayButtons () {
    // Empty Div to display all
    $("#sitcom-buttons").empty();
    // variable to loop through buttonClasses
    var j=0;
    for (i = 0; i < topics.length; i++) {
        // Create button element, set data-name to array element val, set text to array element val
        buttonDiv = $("<button type='button'>").attr("data-name", topics[i]).text(topics[i]);
        // mix in colored buttons
        buttonDiv.attr("class", "sitcom-button btn " + buttonClasses[j]);
        // append button to div
        $("#sitcom-buttons").append(buttonDiv);
        j++;
        if (j === buttonClasses.length) {
            j = 0;
        }
    }
}


displayButtons();

$("#sitcom-submit").on("click", function(e) {
    var sitcomtoAdd = $("#add-sitcom").val();
    e.preventDefault();
    if (sitcomtoAdd) {
        topics.push(sitcomtoAdd);
        displayButtons();
    }
});

$(".sitcom-button").on("click", function() {
    var dataName = $(this).attr("data-name");
    console.log(dataName);

});