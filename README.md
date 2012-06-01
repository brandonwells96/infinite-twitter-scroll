/* ==|== Infinite Twitter Search =====================================================
   Brandon Wells - Brandon@brandonrwells.com

   The problem:

	Using any API available to you, create a page with a search bar that shows the retrieved results. As the user scrolls, continue to show more and more results until there are no more results to show. Do this all without ever reloading the page. 

	Notes:

	* API call should not return all results at once
	* API call should return JSON
	* You may use jQuery, but no other plugins




	Initial solution thought:
	1) Pass URL encoded search box input to Twitter API
	2) Return results limited by 'rpp' to return only ten results at a time
	3) If scrolled to bottom of results section, display next results


	Problems encountered (and solutions):
	 
	Problem: Multiple scroll events fired while scrolling 
	Solution: Added an if statement to check if the last AJAX request was done yet, if not exit, else allow the event to fire
	 
	Problem: Twitter API kept pulling repeated tweets 
	Solution: Changed the get URL after the first request to include a max_id variable saying get results that are greater than the last set's ID



 ===================================================================================*/