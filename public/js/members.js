$(document).ready(function() {  

    // ----------------------------------------------------------------
    // kid add to DB function with validators

$("#saveKid").on("click", function (event) {
  event.stopPropagation();
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
   // Not Required Validators
   if ($(".guardianNameText2").val()){
    $(".guardianNameText2").addClass("is-valid");
   }
   if ($(".favSiblingText").val()){
    $(".favSiblingText").addClass("is-valid");
   }
   if ($(".favoriteToyText").val()){
    $(".favoriteToyText").addClass("is-valid");
   }
   if ($(".petNameText").val()){
    $(".petNameText").addClass("is-valid");
   }
   //If required fields are entered addKidStart else alert
   if ($(".kidNameText").val() !== "" && $(".guardianNameText").val() !== ""){
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
//Renders kids to the dropdown inside the modal & refreshes the kid list 
$(".refreshBtn").on("click", async function(){
    await renderKidList();
    renderKidOptions();
});

function addKidDb(data) {
    console.log(data);
    $.post("/api/kid", data)
      .then(
        window.location.reload()
       )
      .catch(handleLoginErr);
  }

  function renderKidList(){
      console.log("renderkid function invoked");
      $.get("/api/kid", function(data) {
        console.log("data: ", data);
        let kidMarkup = "";
        for (let i = 0; i < data.length; i++) {
            let kidListItem = `<li><span>${data[i].name}</span> <button>Edit</button></li>`;
           kidMarkup = kidMarkup + kidListItem
            console.log("kid created", kidMarkup)
        }
        $(".kidsList").html(kidMarkup);
      });
  };

  function renderKidOptions(){
    console.log("renderkidoptions function invoked");
    $.get("/api/kid", function(data) {
      console.log("data: ", data);
      let kidMarkup = "<option selected>Choose ...</option>";
      for (let i = 0; i < data.length; i++) {
          let kidListOption = `<option>${data[i].name}</option>`;
         kidMarkup = kidMarkup + kidListOption
          console.log("kid created", kidMarkup)
      }
      $(".selectChildDD").html(kidMarkup);
    });
};

  function handleLoginErr(err) {
    // $("#alert .msg").text(err.responseJSON);
    // $("#alert").fadeIn(500);
    alert("kid already exists")
  }




// --------------------------------------------------------------------
// story create function


$("#storyCreateBtn1").on("click", function (event) {
    event.stopPropagation();
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
      // console.log($(".selectChildDD").val())
      if($(".storyTitleDD").val()=== "My favorite letter (Ages: 0-3)"){
        let letterStory = `<h2>Letter story 0-3</h2>
       <p>${$(".selectChildDD").val()} wants to choose their favorite letter,
        But can’t decide which is better,
         
        Is it A B C or D?
        Which letter is best for me?
         
        Is E F G H I or maybe J,
        Which letter would ${$(".selectChildDD").val()}  like to say?
         
        K L M N O or P?
        What’s your favorite letter you see?
         
        Q R S T or U?
        I can’t choose a letter,  ${$(".selectChildDD").val()}  can you?
         
        V X Y or Z?
        All the letters are beautiful to me!!!<p>
        `
        $("#story").html(letterStory)
        console.log(letterStory)
        $("#storyContainer").removeAttr("style")
   
        // window.location.replace("/story")
      }

   }else{
       alert("Please fill out all required fields")
   }
});

    
})
