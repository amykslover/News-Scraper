$(document).ready(function () {


  $.getJSON("/", function(data) {
    console.log("Articles Retrieved")
  });



  //User clicks the Add Note button which will display notes if there are any.
  $(document).on("click", "#addNote", function() {
    $('#noteModal').modal('show');
    var thisId = $(this).attr("data-id");
    console.log(thisId)
    // $('.noteSummary').remove();
    $('#noteEmpty').remove();

    $.ajax({
      method: "GET",
      url: "/article/" + thisId
    }).done(function(data) {
        console.log(data.note);

        if(data.note) {
          var noteContents = data.note.body;

          $('#noteform').prepend('<div class="noteSummary"></div>');
          $('.noteSummary').append("<p>" + data.note.body + "</p>");
          $('#note-modal-footer').append('<button type="submit" id="saveNote" class="btn btn-primary" data-id='+ thisId +'>Save</button>')
        }
        else {
          $('#noteform').prepend('<div id="noteEmpty">No notes are stored for this article yet.</div>');
          $('#note-modal-footer').append('<button type="submit" id="saveNote" class="btn btn-primary" data-id='+ thisId +'>Save</button>')
        }
    });

  });

  $(document).on("click", "#saveNote", function() {
    var thisId = $(this).attr("data-id");
    var note = $('#noteBody').val();
    console.log(thisId);
    console.log(note);

    var noteObject = { body: note };

    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/article/" + thisId,
      data: noteObject
    }).done(function(data) {

      });
    //Remove the values entered in the input
    $("#noteBody").val("");
    //Remove the empty note indicator
    $("#noteEmpty").remove();
  });


  $("#saveArticle").on("click", function(event) {

    var thisId = $(this).attr("data-id");
    console.log(thisId);

    var newSavedState = {
      saved: true
    };

    $.ajax({
      method: "PUT",
      url: "/articles/" + thisId,
      data: newSavedState
    }).then(function() {
        console.log("Article Saved");
        location.reload();
      })
  });


  $("#unsaveArticle").on("click", function(event) {

    var thisId = $(this).data("id");
    console.log(thisId);

    var newSavedState = {
      saved: false
    };

    $.ajax({
      method: "PUT",
      url: "/articles/" + thisId,
      data: newSavedState
    }).then(function() {
        console.log("Article Unsaved");
        location.reload();
      })
  });


})





