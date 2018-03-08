

// Create Array full of 80s sitcoms
var topics = ["Different Strokes", "Full House", "Webster", "Cosby Show", "Knight Rider", "Roseanne", "Alf", "Seinfeld", "The Wonder Years", "Growing Pains", "Punky Brewster", "Family Matters", "Charles in Charge", "Married with Children", "Mr. Belvedere", "Saved by the Bell", "MacGyver", "Who's the Boss?"];

// Create array to loop through various bootstrap classes
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

// THIS on-click takes what is in the text box, makes it a button, and adds to the top of the page
$("#sitcom-submit").on("click", function(e) {
    var sitcomtoAdd = $("#add-sitcom").val();
    e.preventDefault();
    // make sure it's not blank
    if (sitcomtoAdd) {
        topics.push(sitcomtoAdd);
        displayButtons();
    }
    $("#add-sitcom").val("");
});

// This is the action for the sitcom button being pushed (calls displayGiffs)
$(document).on("click", ".sitcom-button", function() {
    var dataName = $(this).attr("data-name");
    // call displayGifs function
    displayGifs(dataName);
});



function displayGifs(sitcom) {
    
    // API query setup
    var apiKey = "3AHII6xXXUPu9XSCNOSYLQIL1DEWdOGg";
    var limit = 10;
    rating = "pg";
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + sitcom + 
        "&api_key="+ apiKey + "&limit=" + limit + "&rating=" + rating;

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function(response) {
        // Clear current Gifs
        $("#sitcom-display").empty();

        // loop through the 10 items in response (length)
        for (i = 0; i < response.data.length; i++) {
            // Create outside div
            var gifDiv = $("<div class='sitcom-div'>")
            // create ratings div (p)
            var ratingDiv = $("<p>").append($("<h4>").html("Rating: " + response.data[i].rating));
            // create gif div (img) with still img src
            var gifImgDiv = $("<img class='gif'>").attr("src", response.data[i].images.fixed_height_still.url);
            gifImgDiv.attr("data-state", "still");
            // append ratings and gif to outside dif
            gifDiv.append(ratingDiv).append(gifImgDiv);
            // append to html selector div
            $("#sitcom-display").append(gifDiv);
        }
    });
}

// START/STOP GIFS
$(document).on("click", ".gif", function () {
    // get current state (still or animate)
    var state = $(this).attr("data-state");
    // get current src
    var src = $(this).attr("src");
    if (state === "still") {
        // remove '_s.gif'
        src = src.slice(0, -6);
        src += ".gif";
        // change data-state
        $(this).attr("data-state", "animate");
    } else {
        // remove '.gif'
        src = src.slice(0, -4);
        src += "_s.gif";
        $(this).attr("data-state", "still");
    }
    // update src
    $(this).attr("src", src);
});

// on document ready, display buttons from array
$(document).ready(displayButtons());
