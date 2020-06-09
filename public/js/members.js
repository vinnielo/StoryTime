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
            let kidListItem = `<li class="list-group-item"><span>${data[i].name}</span> <button class="btn btn-primary editBtn">Edit</button></li>`;
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
        let letterStory = `<h2 class="storyName">My Favorite Letter</h2><br>
       <p><span class="nameK">${$(".selectChildDD").val()}</span> wants to choose their favorite letter,
        But can’t decide which is better,</p>
         
        <p>Is it A B C or D?
        Which letter is best for me?</p>
        
        <p>Is E F G H I or maybe J,
        Which letter would <span class="nameK">${$(".selectChildDD").val()}</span>  like to say?</p>
         
        <p>K L M N O or P?
        What’s your favorite letter you see?</p>
         
        <p>Q R S T or U?
        I can’t choose a letter,  <span class="nameK">${$(".selectChildDD").val()}</span>  can you?</p>
         
        <p>V X Y or Z?
        All the letters are beautiful to me!!!</p>
        `
        $("#story").html(letterStory)
        console.log(letterStory)
        $("#storyContainer").removeAttr("style")
   
        // window.location.replace("/story")
      } else if($(".storyTitleDD").val()=== "PottyTime (Ages: 0-3)"){
        let pottyStory = `
        <h2 class="storyName">PottyTime!</h2><br>
        <p>Sometimes I peepee or poopoo,
        <span class="nameK">${$(".selectChildDD").val()}</span>, is that something that you do?</p>
         
        <p>Of course! We all pee or poo a bit!
        So the potty is where we go sit!</p>
         
        <p>Mommy pees, Daddy pees, <span class="nameK">${$(".selectChildDD").val()}</span> pees too!
        And sometimes we also go poo!</p>
         
        <p>We all sit on the potty when we have to go,
        The best place to pee and poo that I know!</p>
         
        <p>So next time you pee or poo, go to the potty and scream out loud!
        Mommy and daddy will be so proud!</p>
        `
        $("#story").html(pottyStory)
        $("#storyContainer").removeAttr("style")

      } else if($(".storyTitleDD").val() === "I love you, SOOOO much (Ages: 0-3)"){
          let loveYou = `

          <h2 class="storyName">I Love You, SOOO Much!</h2><br>

          <p>Mommy loves you,
          It’s true!</p>
 
          <p>Daddy loves you,
          Through and through,</p>
          
          <p>They keep you safe all day,
          So you can sleep, eat and play away,</p>
          
          <p>They love you a bunch,
          At breakfast, dinner and even lunch,</p>
          
          <p>They are so proud
          when <span class="nameK">${$(".selectChildDD").val()}</span>  plays, laughs and sings out loud.</p>

          `

          $("#story").html(loveYou);
          $("#storyContainer").removeAttr("style");

      } else if($(".storyTitleDD").val() === "I love to count (Ages: 0-3)"){

      } else if ($(".storyTitleDD").val() === "To the moon and back (Ages: 3-7)"){

      } else if ($(".storyTitleDD").val() === "Save the kingdom (Ages: 3-7)"){

      } else if ($(".storyTitleDD").val() === "You are super! (Ages: 3-7)"){

      } else if ($(".storyTitleDD").val() === "The great pet adventure (Ages 3-7)"){

      } else if ($(".storyTitleDD").val() === "Fire! (Ages: 7 & Up)"){

      } else if ($(".storyTitleDD").val() === "The great family adventure (Ages: 7 & Up)"){

      }

   }else{
       alert("Please fill out all required fields")
   }
});

    
})
