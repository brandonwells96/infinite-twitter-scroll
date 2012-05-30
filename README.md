/* ==|== Infinite Twitter Search =====================================================
   Brandon Wells - Brandon@brandonrwells.com

   The problem:

	Using any API available to you, create a page with a search bar that shows the retrieved results. As the user scrolls, continue to show more and more results until there are no more results to show. Do this all without ever reloading the page. 

	Notes:

	* API call should not return all results at once
	* API call should return JSON
	* You may use jQuery, but no other plugins




	Initial Solution thought:
	1)pass url encoded search box input to twitter api
	2)return results limited by 'rpp' to return only ten results at a time
	3)if scrolled to bottom of results section display next results
 ===================================================================================*/