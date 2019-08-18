$(document).ready(function() {
    var topics = ["animals", "sports", "food"];
    function displayGifs () {
        var gifTopic = $(this).attr("data-topic");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifTopic + "&api_key=AgGNoRb6jMyKoWczzEFRhnyDwv2WDBQN";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            var results = response.data;
            for (var i =0; i < results.length; i++) {
                if (results[i].rating !== "pg-13" || results[i].rating !== "pg" || results[i].rating !== "g") {
                    var gifDiv = $("<div>");
                    gifDiv.addClass("gifs");
                    var rating = results[i].rating;
                    var p = $("<p>").text("Rating: " + rating);
                    p.addClass("rate");
                    var topicImage = $("<img>");
                    topicImage.attr("src", results[i].images.fixed_height_still.url);
                    topicImage.attr("data-still", results[i].images.fixed_height_still.url);
                    topicImage.attr("data-animate", results[i].images.fixed_height.url);
                    topicImage.attr("data-state", "still");
                    topicImage.addClass('topicImage');
                    gifDiv.append(p);
                    gifDiv.append(topicImage);
                    $("#gif-view").prepend(gifDiv);
                }
                $(".topicImage").on("click", function() {
                    var state = $(this).attr("data-state");
                    console.log(state);

                    if(state === "still") {
                        $(this).attr("src", $(this).attr("data-animare"));
                        $(this).attr("data-state", "animate");
                    }
                    else {
                        $(this).attr("src", $(this).attr("data-still"));
                        $(this).attr("data-state", "still");
                    }
                });
            }
        });
    }

    function buttons () {
        $("#buttons").empty();
        for (var i = 0; i < topics.length; i++) {
            var btn = $("<button>");
            btn.addClass("topic-btn btn btn-danger");
            btn.attr("data-topic", topics[i]);
            btn.text(topics[i]);
            $("#buttons").append(btn);
        }
    }
    $("#add-gif").on("click", function(event) {
        event.preventDefault();
        var topicGif = $("#gif-input").val().trim();
        topics.push(topicGif);
        buttons();
    });

        $(document).on("click", ".topic-btn", displayGifs);

        buttons();

});
