$(document).ready(function () {


  $.getJSON("/", function(data) {
    console.log("Articles Retrieved")
  });



  //User clicks the Add Note button. If there is a note, then display the note
  $(document).on("click", "#addNote", function() {
    // $('#note-modal-body').empty();
    // $('#note-modal-footer').empty();
    $('#noteModal').modal('show');

    // Save the id from the button
    var thisId = $(this).attr("data-id");
    console.log(thisId);

    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    }).done(function(data) {

      console.log(data);
      
      if (data.note) {
        var noteContents = data.note;
        $('#noteform').prepend(noteContainer);
        $(noteContainer) = ('<div class="noteSummary"></div>');
        $('#note-modal-body').append(noteContainer);
        noteBody = ("<p>" + data.note.body + "</p>");
        $(noteContainer).append(noteBody);

      } 

      else {
      $('#noteform').prepend('<div id="noteEmpty">No notes for this article yet. Add note below: </div>')
      // $('#note-modal-body').append('<div id="noteform" class="form-group"></div>')
      // $('#noteform').append('<textarea class="form-control" rows="5" id="noteBody placeholder="Enter Note Text""></textarea>')
      $('#note-modal-footer').append('<button type="submit" id="saveNote" class="btn btn-primary" data-id=' + data._id +'>Save</button>');

      }
    });

  });

  // When you click the savenote button
  $(document).on("click", "#saveNote", function() {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");
    var noteObject = { body: $("#noteBody").val() };
    console.log(thisId);
    console.log(noteObject);

    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: noteObject
    }).done(function(data) {
        // Log the response
        console.log(data);
        // Empty the notes section
        $("#notes").empty();
      });

    // Also, remove the values entered in the input and textarea for note entry
    $("#noteBody").val("");
    $("#noteEmpty").remove();
  });

  // When you click the savenote button
  $(document).on("click", "#saveNote", function() {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");
    var noteObject = { body: $("#noteBody").val() };
    console.log(thisId);
    console.log(noteObject);

    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: noteObject
    }).done(function(data) {
        // Log the response
        console.log(data);
        // Empty the notes section
        $("#notes").empty();
      });

    // Also, remove the values entered in the input and textarea for note entry
    $("#noteBody").val("");
    $("#noteEmpty").remove();
  });



})





