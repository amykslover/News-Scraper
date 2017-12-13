	    //This is where the summary for each article is, if there is a summary
	 //    $('.blurb').each(function(i, element) {
		//     var result = {};
		//     result.summary = $(this).text();
		//     console.log(result)
		// })
		// $('.no-skin .flex-item').children()['1'].children[0].children).data
		// $('.no-skin .flex-item').children()['1'].children[0].children[0].parent.attribs.href)
		// console.log("==============>",$('.no-skin .flex-item').children()['2'].children[0].data)


	    $('.no-skin .flex-item').each(function(i, element) {
	      var result = {};

	      // Add the text and href of every link, and save them as properties of the result object
	      if($(this).children()[`${i+1}`].children[0].children[0].data) {
		      result.title = $(this).children()[`${i+1}`].children[0].children[0].data;
		      result.link = $(this).children()[`${i+1}`].children[0].children[0].parent.attribs.href;
		      result.summary = $(this).children()[`${i+2}`].children[0].data;
	      }

	      console.log(result);
	      // Create a new Article using the `result` object built from scraping
	      
	      // db.Article
	      //   .create(result)
	      //   .then(function(dbArticle) {
	      //     // If we were able to successfully scrape and save an Article, send a message to the client
	      //   })
	      //   .catch(function(error) {
	      //     // If an error occurred, send it to the client
	      //     console.log("Line 76 in api-routes")
	      //     res.json(error);
	      //   });
	    });