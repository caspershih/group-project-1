//on.document function
$(document).ready(function() {
    //To hide results container on page load
    $(".resultsContainer").hide();

function getData() {
    $("#headlineBtn").on("click", function() { // START ON CLICK

        event.preventDefault();
        $("#headlineInput").empty();
        $("#headlineDate").empty();
    //To show results container on click    
        $(".resultsContainer").show();
       
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
          })
          .then(function(response){
            console.log(response);



          })




    })
};
    getData();

//end brackets for on.document function
});