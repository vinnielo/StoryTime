function addKidStart() {
    const newkid = {
        name: $("kidNameText").val().trim(),
        guardian: $("guardianNameText").val().trim(),
        sibling: $("").val().trim(),
        pet: $("").val().trim(),
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





$("#saveKid").on("click", function (event) {
    event.preventDefault();
    addKidStart();
});