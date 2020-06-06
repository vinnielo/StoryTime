$(document).ready(function() {  

    // ----------------------------------------------------------------
    // kid add to DB function with validators

$("#saveKid").on("click", function (event) {
    event.preventDefault();
   if ($(".kidNameText").val()){
    $(".kidNameText").addClass("is-valid");
    $(".kidNameText").removeClass("is-invalid");
   }else{
    $(".kidNameText").removeClass("is-valid");
    $(".kidNameText").addClass("is-invalid");
   }
   if ($(".guardianNameText").val()){
    $(".guardianNameText").addClass("is-valid");
    $(".guardianNameText").removeClass("is-invalid");
   }else{
    $(".guardianNameText").removeClass("is-valid");
    $(".guardianNameText").addClass("is-invalid");
   }
   if ($(".guardianNameText2").val()){
    $(".guardianNameText2").addClass("is-valid");
    $(".guardianNameText2").removeClass("is-invalid");
   }else{
    $(".guardianNameText2").removeClass("is-valid");
    $(".guardianNameText2").addClass("is-invalid");
   }
   if ($(".favSiblingText").val()){
    $(".favSiblingText").addClass("is-valid");
    $(".favSiblingText").removeClass("is-invalid");
   }else{
    $(".favSiblingText").removeClass("is-valid");
    $(".favSiblingText").addClass("is-invalid");
   }
   //If required fields are entered addKidStart else alert
   if ($(".kidNameText").val() !== null && $(".guardianNameText").val() !== null){
    var kidData = {
        name: $("#kidName").val().trim(),
        pet: $("#petName").val().trim(),
        sibling: $("#favSibling").val().trim(),
        guardian: $("#guardFriendName").val().trim(),
        guardian1: $("#guardFriendName2").val().trim(),
        toy: $("#favoriteToy").val().trim(),
      };
      console.log(kidData);
  
     
      $("#kidName").val("");
      $("#petName").val("");
      $("#favSibling").val("");
      $("#guardFriendName").val("");
      $("#guardFriendName2").val("");
      $("#favoriteToy").val("");
      addKidDb(kidData);

   }else{
       alert("Please fill out all required fields")
   }
});

function addKidDb(data) {
    console.log(data);
    $.post("/api/kid", data)
      .then(
        window.location.reload()
       )
      .catch(handleLoginErr);
  }
// --------------------------------------------------------------------
// story create function


$("#storyCreateBtn").on("click", function (event) {
    event.preventDefault();
   if ($(".selectChildDD" ).val() !== "Choose..."){
    $(".selectChildDD").addClass("is-valid");
    $(".selectChildDD").removeClass("is-invalid");
   }else{
    $(".selectChildDD").removeClass("is-valid");
    $(".selectChildDD").addClass("is-invalid");
   }
   if ($(".ageRangeDD").val() !== "Choose..."){
    $(".ageRangeDD").addClass("is-valid");
    $(".ageRangeDD").removeClass("is-invalid");
   }else{
    $(".ageRangeDD").removeClass("is-valid");
    $(".ageRangeDD").addClass("is-invalid");
   }
   if ($(".storyTitleDD").val() !== "Choose..."){
    $(".storyTitleDD").addClass("is-valid");
    $(".storyTitleDD").removeClass("is-invalid");
   }else{
    $(".storyTitleDD").removeClass("is-valid");
    $(".storyTitleDD").addClass("is-invalid");
   }
   if ($(".selectChildDD").val() !== "Choose..." && $(".ageRangeDD").val() !== "Choose..." && $(".storyTitleDD").val() !== "Choose..."){
    //   This will trigger the generate story functionality
      

   }else{
       alert("Please fill out all required fields")
   }
});
    
})
