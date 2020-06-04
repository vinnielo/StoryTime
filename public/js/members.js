$(document).ready(function() {
    var kidList = $("tbody");
    var kidContainer = $(".kid-container");

    $(document).on("click", ".delete-author", handleDeleteButtonPress);

    function addKidStart() {
        const newKid = {
            name: $(".kidNameText").val().trim(),
            guardian: $(".guardianNameText").val().trim(),
            // sibling: $("").val().trim(),
            // pet: $("").val().trim(),
        };
        $.ajax("/api/kids", {
            type: "POST",
            data: newKid
        }).then(
            function () {
                console.log("created new Kid");
                // Reload the page to get the updated list
                location.reload();
            }
        );
    }


    // Function for creating a new list row for authors
    function createKidRow(kidData) {
        var newTr = $("<tr>");
        newTr.data("kid", kidData);
        newTr.append("<td>" + kidData.name + "</td>");
        return newTr;
    }

$("#saveKid").on("click", function (event) {
    event.preventDefault();
   if ($(".kidNameText").val()){
    $(".kidNameText").addClass("is-valid");
    $(".kidNameText").removeClass("is-invalid")
   }else{
    $(".kidNameText").removeClass("is-valid");
    $(".kidNameText").addClass("is-invalid");
   }
   if ($(".guardianNameText").val()){
    $(".guardianNameText").addClass("is-valid");
    $(".guardianNameText").removeClass("is-invalid")
   }else{
    $(".guardianNameText").removeClass("is-valid");
    $(".guardianNameText").addClass("is-invalid");
   }
   if ($(".kidNameText").val()===true && $(".guardianNameText").val()==true){
       addKidStart();
   }else{
       alert("Please fill out all required fields")
   }
});
    // Function for retrieving authors and getting them ready to be rendered to the page
    function getKids() {
        $.get("/api/kids", function(data) {
        var rowsToAdd = [];
        for (var i = 0; i < data.length; i++) {
            rowsToAdd.push(createKidRow(data[i]));
        }
        renderKidList(rowsToAdd);
        nameInput.val("");
        });
    }

    // A function for rendering the list of authors to the page
    function renderKidList(rows) {
        kidList.children().not(":last").remove();
        kidContainer.children(".alert").remove();
        if (rows.length) {
        console.log(rows);
        kidList.prepend(rows);
        }
    }
    // Function for handling what happens when the delete button is pressed
  function handleDeleteButtonPress() {
    var listItemData = $(this).parent("td").parent("tr").data("kid");
    var id = listItemData.id;
    $.ajax({
      method: "DELETE",
      url: "/api/kids/" + id
    })
      .then(getKids);
  }
})
