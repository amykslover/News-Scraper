    //Route for home page
    app.get('/', function(request, response) {
        response.render('index.handlebars'); // load the index.ejs file
    });

    //Route for showing the profile page
    app.get('/articles', function(request, response) {
        response.render('profile.ejs', {
            user : request.user // get the user out of session and pass to template
        });
    });

    //This is the page where a user will be able to enter data about the encounter they are creating
    app.get('/saved', function(request, response) {
        response.render('create.ejs', {
            user : request.user // get the user out of session and pass to template
        });
    });