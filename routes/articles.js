
    app.get('/articles', isLoggedIn, function(request, response) {

		response.render("index", dbArticle);
    	
    });

