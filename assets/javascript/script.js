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
        var country = response.countryCode;
        countryCode = country;
        
    //Adds current location info to location div on UI
    $("#location").text("Current location: " + response.city);
        

    })
function getData() {
    $("#headlineBtn").on("click", function() { // START ON CLICK
        event.preventDefault();
        $("#resultsView").empty();

// var url = "https://newsapi.org/v2/top-headlines?";
        var url = "https://newsapi.org/v2/everything?";
        var q = $("#headlineInput").val().trim();
        var sources = "la-times, yahoo, reuters, npr.org, BBC, abc-news, msnbc, mother-jones, occupy-democrats, fox-news, the-federalist, american-spectator, breitbart-news, the blaze, drudge-report, associated-press, bloomberg, buzzfeed, cnn, google-news, the-washington-post, al-jazeera";
        var from = $("#headlineDate").val().trim();
        var sortBy = "relevancy";
        var apiKey = "850d4c0cc9124a158a98cfda121f721d";
        var language;

        if (countryCode === "US"){
            language = 'en'
        }
        console.log(q);
        console.log(url);
        console.log(from);

        //var queryURL = url + "q="+q+"&category="+category+"&country="+countryCode+"&apiKey="+apiKey;
        var queryURL = url + "q="+q+"&sources="+sources+"&from="+from+"&sortBy="+sortBy+"&language="+language+"&apiKey="+apiKey;

        if (q === "") {
            $(".modal").css("display", "block");
            return;
        }
        
       //To show results container on click    
       $(".resultsContainer").show();
        $(".resultsHeader").show();
        $.ajax({ // Start Ajax call
            url: queryURL,
            method: "GET"
          })  // End Ajax call
          .then(function(response){ // Stat response
            console.log(response);
            console.log("length: "+response.articles.length);
            console.log("results: "+response.totalResults);

          //Assign bias rating to known media sources
            var L = ["Occupy Democrats", "Huffington Post", "Mother Jones", "MSNBC", "Buzzfeed"];
            var CL = ["Yahoo", "CNN", "The New York Times", "The Washington Post", "CBS News", "ABC News"];
            var C = ["Al Jazeera", "LA Times", "Bloomberg", "Reuters", "BBC", "Associated Press", "USA Today", "The Wall Street Journal", "Npr.org", "The Hill", "CNBC"];
            var CR = ["Fox News", "Google News", "The Blaze"];
            var R = ["The Federalist", "Breitbart News", "American Spectator", "The Drudge Report"];

            //Assign image for each Bias Rating
            var imageL = "./assets/images/l.png";
            var imageCL = "./assets/images/cl.png";
            var imageC = "./assets/images/c.png";
            var imageCR = "./assets/images/cr.png";
            var imageR = "./assets/images/r.png";
            var imageNone = "./assets/images/norating.png";


            console.log(imageL);

            if (response.totalResults === 0) { // Return No Results
                $("#resultsView").append($("<a>").text("No Results"));
            }

            //Create variables for response data
            for (i = 0; i < response.articles.length; i++) {
                var artTitle = $("<h2>").text("Headline: " + response.articles[i].title);
                var artUrl = response.articles[i].url;
                var artAuthor = response.articles[i].author;
                var artSource = response.articles[i].source.name;
                var artDate = response.articles[i].publishedAt;

                //Create class attributes for response data
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

                //Add section at top of results view that defines the  keyword/phrase in the search 
                var qDiv = $("#searchResult");
                qDiv.html("Your Keyword Search: " + q);

                //Add section at top of results view that defines the date selected in the search
                var qDiv = $("#dateResult");
                qDiv.html("Selected Date: " + moment(from).format("MMMM DD, YYYY"));
                
                // define byBlock
                var textAuthor = authDiv.append("Author: " + artAuthor);
                var textSource = sourceDiv.append("Source: " + artSource);
                var textDate = dateDiv.append("Date Published: " + moment(artDate).format("MMMM DD, YYYY"));

                //Add Biad Rating for each source returned based on name
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
                
                //Add source data to UI based on search value
                divA.append(biasImage).append(textSource).append(artTitle).append(textDate).append(textAuthor);
                

                $("#resultsView").append(divA); // display results to html

            }


          }) // End response

          $("#headlineInput").val("");
          $("#headlineDate").val("");

    }) // End onClick

    $(".close").on("click", function(){
        $(".modal").css("display", "none");
    });
};

getData();

//end brackets for on.document function

