$(document).ready(function () {
    var url = "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=info%7Cpageviews&list=search&utf8=1&srsearch=Albert%20Einstein";

    $.ajax({
        url: url,
        type: 'GET',
        crossDomain: true,
        headers: {
            'Api-User-Agent': 'WikipediaViewer/1.0',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        xhrFields: {
            withCredentials: false
        },
        success: function (data) {
            console.log(data);
        }
    });
});