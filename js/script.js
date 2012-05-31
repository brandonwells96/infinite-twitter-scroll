$(document).ready( function(){
    var perPage = 10, // How many posts per page set
     pageNum = 1, // The Page number to pass to api
     query = "";

    //on click lets do it!
    $('#run_search').click(function(){
        query = $('#twit_search').val();
        //encode and decode entries in case of hash tags in query
        query = encodeURIComponent(query);
        queryd = decodeURIComponent(query);
        //empty the tweets box to prepare for new search
        $('#tweets').html('');
        //console.log(query);
        Tweets();
    });
    //if user presses enter, trigger our search button!
    $('input#twit_search').keypress(function (e) {
        if (e.keyCode == '13') { //the enter key is pressed
            e.preventDefault();
            $('#run_search').trigger('click');
        }
    });


    // Pull in the Tweets!
    function Tweets() {
       var url = "http://search.twitter.com/search.json?q="+query+"&rpp="+perPage+"&result_type=mixed&page="+pageNum+"&callback=?";
             
       $.getJSON(url,function(data) {
        if(data.results.length > 0){
            $('#tweets').html('<h3>Your search results for: <strong>'+queryd+'</strong></h3>');
          $(data.results).each(function(i, data) {
            //pass our variables to add function
            addTweets(data.text, data.from_user, data.profile_image_url);
          });
          } else {
            $('#tweets').append('<h3>Sorry No Results Found for: <strong>'+queryd+'</strong></h3>');
          }
          console.log(data);
          $('#main article:nth-child(even)').addClass('even');
       });
    }

    function addTweets(text, user, avatar){
        $('#tweets').append('<article><a class="username" target="_blank" href="http://twitter.com/'+user+'">'+user+'</a><aside><p><strong><a class="avatar" target="_blank" href="http://twitter.com/'+user+'"><img src="'+avatar+'"/></a></strong></p></aside><aside><p>'+text+'</p>'+'</aside></article>');
    }
});//doc ready