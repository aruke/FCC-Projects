$(document).ready(function () {

    $loader = $('#loader');
    $clear_search = $('#clear-search');
    $link_random_article = $('#link-random-article');
    $search_result_container = $('#search-result-container');
    $search_input = $('#search-input');
    $search_results = $("#search-results");

    const IDLE = 0;
    const LOADING = 1;
    const RESULT = 2;

    var setViewState = function (state) {
        switch (state) {
            case IDLE:
                $loader.fadeOut(150);
                $loader.addClass('hide');

                $clear_search.fadeOut(100);
                $clear_search.addClass('hide');

                $link_random_article.fadeIn(100);
                $link_random_article.removeClass('hide');

                $search_result_container.fadeOut(100);
                break;
            case LOADING:
                $link_random_article.fadeOut(150, function () {
                    $loader.removeClass('hide');
                    $loader.fadeIn(150);
                });
                $link_random_article.addClass('hide');

                $clear_search.fadeOut(100);
                $clear_search.addClass('hide');

                $search_result_container.fadeOut(100);
                $search_result_container.addClass('hide');
                break;
            case RESULT:
                $loader.fadeOut(150);
                $loader.addClass('hide');

                $clear_search.removeClass('hide');
                $clear_search.fadeIn(100);

                $link_random_article.fadeOut(100);
                $link_random_article.addClass('hide');

                $search_result_container.fadeIn(100);
                $search_result_container.removeClass('hide');
                break;
        }
    };

    $search_input.val('');
    setViewState(IDLE);

    var searchString = function () {
        var string = $search_input.val();
        setViewState(LOADING);
        var url = "https://en.wikipedia.org/w/api.php?origin=*";

        dataobj = {
            action: 'query',
            format: 'json',
            prop: ['info', 'pageviews', 'fullurl'],
            list: 'search',
            srsearch: encodeURI(string)
        };

        $.ajax({
            url: url,
            type: 'POST',
            crossDomain: true,
            data: dataobj,
            dataType: 'json',
            headers: {
                'Api-User-Agent': 'WikipediaViewer/1.1 (http://rajanikant.me/WikipediaViewer/; WikipediaViewer@rajanikant.me)'
            },
            success: function (data) {

                setViewState(RESULT);

                var resultArr = data.query.search;
                $search_results.empty();

                if (resultArr.length > 0) {
                    for (var i = 0; i < resultArr.length; i++) {
                        var obj = resultArr[i];
                        var title = obj['title'];
                        console.log(obj);
                        var snippet = obj['snippet'];
                        $search_results.append(['<li class="collection-item">',
                            '<a target="_blank" href="', 'https://en.wikipedia.org/wiki/', encodeURI(title), '">',
                            '<div class="waves-effect result-card">',
                            '<div class="result-title">', title, '</div>',
                            '<div class="result-snippet">', snippet, '</div>',
                            '</div>',
                            '</a>',
                            '</li>'].join(''));
                    }
                }else {
                    $search_results.append(['<li class="collection-item">',
                        '<div class="result-card-empty center-align">',
                        '<div class="result-title">', 'No results found.', '</div>',
                        '</div>',
                        '</li>'].join(''));
                }
            }
        });
    };

    $search_input.on('change', function () {
        searchString();
    });

    $('#search-icon').on('click', function () {
        if ($search_input.val() !== '') {
            searchString()
        }
    });

    $search_input.on('input', function () {
        if ($(this).val() !== '') {
            $('#search-icon').addClass('clickable-search-icon btn-flat');

        } else {
            $('#search-icon').removeClass('clickable-search-icon btn-flat');
        }
    });

    $clear_search.on('click', function () {
        $search_input.val('');
        setViewState(IDLE)
    });
});