//on.document function
$(document).ready(function() {
    //To hide results container on page load

    $(".resultsContainer").hide();
    $(".resultsHeader").hide();

});
    var center = []

    var countryCode;

    var queryGEO = "http://ip-api.com/json";

    $.ajax({
        url: queryGEO,
        method: "GET"
    })

    .then(function(response) {
        console.log(response)
        var country = response.country;
        countryCode = country;

    $("#location").text("Current location: " + country);
        

    })
function getData() {
    $("#headlineBtn").on("click", function() { // START ON CLICK
        event.preventDefault();
        $("#resultsView").empty();

    //To show results container on click    
        $(".resultsContainer").show();
        $(".resultsHeader").show();

       
        var url = "https://newsapi.org/v2/everything?";
        var q = $("#headlineInput").val().trim();

        var category = "general"
        var sources = "npr, abc-news, associated-press, bloomberg, buzzfeed, cnn, google-news, the-washington-post";
        var from = $("#headlineDate").val().trim();
        var sortBy = "relevancy";
        var apiKey = "850d4c0cc9124a158a98cfda121f721d";
        console.log(q);
        console.log(url);
        console.log(from);

        //var queryURL = url + "q="+q+"&category="+category+"&country="+countryCode+"&apiKey="+apiKey;
        var queryURL = url + "q="+q+"&sources="+sources+"&from="+from+"&sortBy="+sortBy+"&apiKey="+apiKey;

        $.ajax({ // Start Ajax call
            url: queryURL,
            method: "GET"
          })  // End Ajax call
          .then(function(response){ // Stat response
            console.log(response);
            console.log("length: "+response.articles.length);
            console.log("results: "+response.totalResults);

          
            var L = ["test"];
            var CL = ["CNN", "The New York Times", "The Washington Post", "CBS News", "ABC News", "Buzzfeed"];
            var C = ["USA Today", "The Wall Street Journal", "Npr.org", "The Hill", "CNBC"];
            var CR = [];
            var R = [];

            var imageL = "./assets/images/l.png";
            // imageL.attr("src", "./assets/images/l.png");
            var imageCL = "./assets/images/cl.png";
            // imageL.attr("src", "./assets/images/cl.png");
            var imageC = "./assets/images/c.png";
            // imageL.attr("src", "./assets/images/c.png");
            var imageCR = "./assets/images/cr.png";
            // imageL.attr("src", "./assets/images/cr.png");
            var imageR = "./assets/images/r.png";
            // imageL.attr("src", "./assets/images/r.png");
            var imageNone = "./assets/images/norating.png";


            console.log(imageL);

            if (response.totalResults === 0) { // Return No Results
                $("#resultsView").append($("<a>").text("No Results"));
            }

            for (i = 0; i < response.articles.length; i++) {
                var artTitle = $("<h2>").text("Headline: " + response.articles[i].title);
                var artUrl = response.articles[i].url;
                var artAuthor = response.articles[i].author;
                var artSource = response.articles[i].source.name;
                var artDate = response.articles[i].publishedAt;

                var divA = $("<a>");
                divA.attr("href", response.articles[i].url);
                divA.attr("target", "_blank");
                divA.addClass("myTitle");

                var dateDiv = $("<div>");
                dateDiv.addClass("byDiv");

                var authDiv = $("<div>");
                authDiv.addClass("byDiv");

                var sourceDiv = $("<div>");
                sourceDiv.addClass("mySource");
                
                // define byBlock
                var textAuthor = authDiv.append("Author: " + artAuthor);
                var textSource = sourceDiv.append("Source: " + artSource);
                var textDate = dateDiv.append("Date Published: " + moment(artDate).format("MMMM DD, YYYY"));


                var biasImage;
                 if (L.indexOf(artSource) === -1) {
                     if (CL.indexOf(artSource) === -1){
                        if (C.indexOf(artSource) === -1) {
                            if (CR.indexOf(artSource) === -1) {
                                if (R.indexOf(artSource) === -1){
                                    biasImage = $("<img class='biasRating'>").attr("src", imageNone);
                                    
                                }else {biasImage = $("<img class='biasRating'>").attr("src",imageR)
                                };
                            } else {biasImage = $("<img class='biasRating'>").attr("src",imageCR).val("Ratings: ")
                            };
                        } else {biasImage = $("<img class='biasRating'>").attr("src",imageC).val("Ratings: ")
                        };
                     } else {
                         biasImage = $("<img class='biasRating'>").attr("src",imageCL).val("Ratings: ")
                     };
                 } else {
                     biasImage = $("<img class='biasRating'>").attr("src",imageL)
                 };
                 console.log("bias: "+biasImage);
                 console.log("array: "+L)
                // var biasRating = $("<a>").text("Rating: ").append(biasImage);

                divA.append(biasImage).append(textSource).append(artTitle).append(textDate).append(textAuthor);
                

                $("#resultsView").append(divA); // display results to html

            }


          }) // End response

          $("#headlineInput").val("");
          $("#headlineDate").val("");

     

    }) // End onClick
};



getData();

//end brackets for on.document function

