$(document).ready( function(){ 
    // How many posts per page set
    var perPage = 10;
     
    // The Page number to pass to api
    var pageNum = 1;

    var query = "Broncos";

    // Pull in the Tweets!
    function Tweets() {
       var url = "http://search.twitter.com/search.json?q="+query+"&rpp="+perPage+"&result_type=mixed&page="+pageNum+"&callback=?";
             
       $.getJSON(url,function(data) {
          $(data.results).each(function(i, data) {

            $('#tweets').append('<article>'+'<p><strong><a class="tweet-user" target="_blank" href="http://twitter.com/'+data.from_user+'">'+data.from_user+'</a></strong></p><p>'+data.text+'</p>'+'</article>');
          });
          //console.log(data);
       });

}
    //lets do it!
    Tweets();
});//doc ready