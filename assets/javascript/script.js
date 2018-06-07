//on.document function
$(document).ready(function() {
    //To hide results container on page load

    $(".resultsContainer").hide();
    var queryGEO = "http://ip-api.com/json";

    $.ajax({
        url: queryGEO,
        method: "GET"
    })

    .then(function(response) {
        console.log(response)
        var country = response.countryCode;
        console.log(country);
    })
function getData() {
    $("#headlineBtn").on("click", function() { // START ON CLICK

        event.preventDefault();
        $("#headlineInput").empty();
        $("#headlineDate").empty();
    //To show results container on click    
        $(".resultsContainer").show();
       
        var url = "https://newsapi.org/v2/everything?";
        var q = $("#headlineInput").val().trim();

        var sources = "npr, abc-news, associated-press, bloomberg, buzzfeed, cnn, google-news, the-washington-post";
        var from = $("#headlineDate").val().trim();
        var sortBy = "popularity";
        var apiKey = "850d4c0cc9124a158a98cfda121f721d";
        console.log(q);
        console.log(url);
        console.log(from);

        var queryURL = url + "q="+q+"&sources="+sources+"&from="+from+"&sortBy="+sortBy+"&apiKey="+apiKey;

        $.ajax({ // Start Ajax call
            url: queryURL,
            method: "GET"
          })  // End Ajax call
          .then(function(response){ // Stat response
            console.log(response);
            console.log("data: "+response.articles[0].title);
            console.log("length: "+response.articles.length);

            for (i = 0; i < response.articles.length; i++) {
                var artTitle = $('<a>').text('Headline: ' + '"' + response.articles[i].title + '"');
                //Can we add a target='_blank' attr here? So link opens in new window.
                artTitle.attr("href", response.articles[i].url);
                // var artUrl = response.articles[i].url;
                var artAuthor = response.articles[i].author;
                var artSource = response.articles[i].source.name;
                //Need to format date
                var artDate = response.articles[i].publishedAt;

               
               // create separate Divs for byBlock

                var titleDiv = $("<div>");
                titleDiv.addClass("myTitle");

                var dateDiv = $("<div>");
                dateDiv.addClass("byDiv");

                var authDiv = $("<div>");
                authDiv.addClass("byDiv");

                var sourceDiv = $("<div>");
                sourceDiv.addClass("mySource");

                
                // define byBlock

                var textAuthor = authDiv.append("Author: " + artAuthor);
                var textSource = sourceDiv.append("Source: " + artSource);
                var textDate = dateDiv.append("Date Published: " + moment(artDate).format("MM/DD/YYYY"));

                var myResults = titleDiv.append(textSource).append(artTitle).append(textDate).append(textAuthor);

                $("#resultsView").append(myResults); // display results to html

            }


          }) // End response

          $("#resultsSection").css("display", "block");
          $(".resultsHeader").css("display", "block");


    })
};
    getData();

//end brackets for on.document function
});
