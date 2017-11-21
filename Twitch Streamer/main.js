$(document).ready(function () {

    var $main_card = $('#main-card');
    var $banner_image = $('#banner-image');
    var $profile_image = $('#profile-image');
    var $display_name = $('#display-name');
    var $streaming_status = $('#streaming-status');
    var $status = $('#status');
    var $bio = $('#bio');
    var $views = $('#num_views');
    var $followers = $('#num_followers');
    var $loader = $('#loader');

    const INIT = 0;
    const RESULT = 1;

    var setViewState = function (state) {
        switch (state) {
            case INIT:
                $loader.fadeIn('slow');
                $loader.show();
                break;
            case RESULT:
                $loader.fadeOut(function(){
                    $loader.addClass('hide');
                    $main_card.fadeIn('slow');
                    $main_card.removeClass('hide');
                });
                break;
        }
    };

    setViewState(INIT);

    var channel_url = "https://wind-bow.glitch.me/twitch-api/channels/freecodecamp";
    var user_url = "https://wind-bow.glitch.me/twitch-api/users/freecodecamp";
    var stream_url = "https://wind-bow.glitch.me/twitch-api/streams/freecodecamp";

    var resultObj = {
        banner_img_url : '',
        profile_img_url : '',
        streaming_status : '',
        display_name : '',
        status :'',
        bio : ''
    };

    var chainRequests = function () {
        var reqChannelInfo = function () {
            return $.ajax({
                url: channel_url,
                type: 'GET',
                crossDomain: true
            });
        };

        var reqStreamingInfo = function (obj) {
            resultObj.display_name = obj['display_name'];
            resultObj.followers = obj['followers'];
            resultObj.profile_img_url = obj['logo'];
            resultObj.banner_img_url = obj['profile_banner'];
            resultObj.status = obj['status'];
            resultObj.twitchtv_url = obj['url'];
            resultObj.views = obj['views'];
            return $.ajax({
                url: stream_url,
                type: 'GET',
                crossDomain: true
            });
        };

        var reqUserInfo = function (obj) {
            resultObj.streaming = obj['stream'] !== null;
            console.log(obj);
            console.log('in reUserInfo');
            return $.ajax({
                url: user_url,
                type: 'GET',
                crossDomain: true
            });
        };

        var changeUI = function (obj) {
            console.log(obj);
            console.log("Done");
            resultObj.bio = obj['bio'];
            console.log(resultObj);

            $banner_image.attr('src', resultObj.banner_img_url);
            $profile_image.attr('src', resultObj.profile_img_url);
            $display_name.text(resultObj.display_name);
            $display_name.attr('href', resultObj.twitchtv_url);

            $status.text(resultObj.status);
            $bio.text(resultObj.bio);
            if (resultObj.streaming){
                $streaming_status.addClass('green-text');
                $streaming_status.text('Streaming Now');
            } else {
                $streaming_status.addClass('gray-text');
                $streaming_status.text('Offline');
            }
            $views.text(resultObj.views);
            $followers.text(resultObj.followers);

            setViewState(RESULT);
        };

        reqChannelInfo().then(reqStreamingInfo).then(reqUserInfo).then(changeUI);
    };

    chainRequests();


});