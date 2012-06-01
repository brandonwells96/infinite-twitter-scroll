$(function () {
    //define global variables
    var perPage = 10,
        pageNum = 1,
        ajaxready = 1,
        max_id,
        query,
        queryd,
        url,
        $tweetbox = $('#tweets'),
        $overlay = $("#overlay");


    //add the tweets to our DOM
    function addTweets(text, user, avatar, authored, id) {
        $tweetbox.append('<article id="' + id + '"><p class="usermeta" ><a target="_blank" href="http://twitter.com/' + user + '">' + user + '</a><em>posted on: ' + authored + '</em><p><aside><p><strong><a class="avatar" target="_blank" href="http://twitter.com/' + user + '"><img src="' + avatar + '"/></a></strong></p></aside><aside><p>' + text + '</p>' + '</aside></article>');
    }

    // Pull in the Tweets from Twitter!
    function getTweets(pageNum) {
        ajaxready = 0; //We aren't ready to scroll again until the current fetch is done
        if (pageNum === 1) { //if its the first time run the normal data fetch
            url = "http://search.twitter.com/search.json?q=" + query + "&rpp=" + perPage + "&page=" + pageNum + "&callback=?";
        } else { //if its not the first time use the max_id variable to make sure to get fresh posts not repeats
            url = "http://search.twitter.com/search.json?q=" + query + "&rpp=" + perPage + "&result_type=mixed&page=" + pageNum + "&since_id=" + max_id + "&callback=?";
        }
        $.getJSON(url, function (data) {
            if (data.results.length > 0) { //if we have results
                //set our max_id to the current max_id for new set
                max_id = data.max_id;
                $tweetbox.find('header').html('<h3>Your search results for: <strong>&ldquo;' + queryd + '&rdquo;</strong></h3>');
                $(data.results).each(function (i, data) {
                    //pass our data to the add to DOM function
                    addTweets(data.text, data.from_user, data.profile_image_url, data.created_at, data.id);
                });
            } else {
                $tweetbox.append('<h3 id="nomore">Sorry, there are no further results for: <strong>&ldquo;' + queryd + '&rdquo;</strong></h3>');
            }
            $('#main article:nth-child(even)').addClass('even'); //ie compatible styling classes for even rows

            //fade out the overlay once results are loaded
            $overlay.fadeOut(function () {
                ajaxready = 1; //once results are loaded in we are ready to fire another scrolling call
                $('#twit_count').html(($('#tweets article').size()) + ' Tweets Found!');
            });
        });
    }

    $tweetbox.scroll(function () {
        // once we scroll to he botom then fire the next set of results
        if ($(this)[0].scrollHeight - $(this).scrollTop() === $(this).outerHeight()) {
            pageNum++;
            if (ajaxready === 0 || ($('#nomore').length)) {
                return;
            } //fail out if already loading in content or we've already said theres no more results, stops multiple calls
            getTweets(pageNum);
            $overlay.fadeIn();
        }
    });

    //on click of "go" button lets do it!
    $('#run_search').click(function () {
        query = $('#twit_search').val();
        //encode query in case of hash tags in query
        query = encodeURIComponent(query);
        //decode query so it's readable for our output
        queryd = decodeURIComponent(query);
        //empty the tweets box to prepare for new search, leave room for header
        $tweetbox.fadeIn().html('<header></header>');
        //start off the search at page one
        pageNum = 1;
        getTweets(1);
    });
    //if user presses enter, trigger our search button!
    $('input#twit_search').keypress(function (e) {
        if (e.keyCode == '13') { //the enter key is pressed
            e.preventDefault();
            $('#run_search').trigger('click');
        }
    });

});