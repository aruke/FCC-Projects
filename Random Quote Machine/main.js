$(document).ready(function () {

    var colors = ["aqua", "aquamarine", "blueviolet", "cadetblue", "coral", "crimson"];

    // Init quote with my own :P
    var quote = {
        quote: 'Perfect happiness is like software without bugs. Both don\'t exist.',
        author: 'RK'
    };

    var setQuote = function(){
        $("#quote-text").html(quote.quote);
        $("#quote-author").html(quote.author);
    };

    setQuote();

    $('#btn-new-quote').click(function(){

        // Disable Buttons
        $('#btn-new-quote').addClass('disabled');
        $('#btn-tweet').addClass('disabled');

        // Make aPI call to get new quote
        $.ajax({
            type: "GET",
            url: "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=movies",
            headers : {
                'X-Mashape-Key': '9NVtQv0LD0mshZJA4oNcmABHiNRjp1gzffCjsnaOkp5ejAAvsG',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            },
            success: function (response) {
                console.log(response);
                quote = response;
                setQuote();

                // Enable Buttons
                $('#btn-new-quote').removeClass('disabled');
                $('#btn-tweet').removeClass('disabled');
            },
            error: function(error){
                console.log(error);
                // Enable Buttons
                $('#btn-new-quote').removeClass('disabled');
                $('#btn-tweet').removeClass('disabled');
            }
        });
    });

});