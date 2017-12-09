mongodb.MongoClient.connect(process.env.MONGODB_URI, function (error, database) {
  if (error) {
    console.log(error);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database Connection Ready");

  // Initialize the app.
  var server = app.listen(PORT, function () {
    var port = server.address().port;
    console.log("RUNNING ON PORT " + PORT + "!");
  });
});