function getData() {
    $("#headlineBtn").on("click", function() { // START ON CLICK

        event.preventDefault();
        $("#headlineInput").empty();
        $("#headlineDate").empty();
        var url = "https://newsapi.org/v2/everything?";
        var q = $("#headlineInput").val().trim();

        var sources = "abc-news, associated-press, bloomberg, buzzfeed, cnn, google-news, the-washington-post";
        var from = $("#headlineDate").val().trim();
        var sortBy = "popularity";
        var apiKey = "850d4c0cc9124a158a98cfda121f721d";
        console.log(q);
        console.log(url);
        console.log(from);

        var queryURL = url + "q="+q+"&sources="+sources+"&from="+from+"&sortBy="+sortBy+"&apiKey="+apiKey;

        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {
        
// displaying the search result in a div
            
            for (i = 0; i < 10; i++) {
            
            var newArticles = $("<div>");

            $(newArticles).append("<div>" + response.result[i].title + "</div>");
            $(newArticles).append("<div>" + response.result[i].description + "</div>");
            $(newArticles).append("<div>" + response.result[i] + "</div>");
        
            $("#resultsView").append(newArticles);

            };

          })




    })
};
    getData();
