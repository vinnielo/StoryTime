$(document).ready(function () {

  // ----------------------------------------------------------------
  // kid add to DB function with validators

  $("#saveKid").on("click", function (event) {
    event.stopPropagation();
    if ($(".kidNameText").val()) {
      $(".kidNameText").addClass("is-valid");
      $(".kidNameText").removeClass("is-invalid");
    } else {
      $(".kidNameText").removeClass("is-valid");
      $(".kidNameText").addClass("is-invalid");
    }
    if ($(".guardianNameText").val()) {
      $(".guardianNameText").addClass("is-valid");
      $(".guardianNameText").removeClass("is-invalid");
    } else {
      $(".guardianNameText").removeClass("is-valid");
      $(".guardianNameText").addClass("is-invalid");
    }
    // Not Required Validators
    if ($(".guardianNameText2").val()) {
      $(".guardianNameText2").addClass("is-valid");
    }
    if ($(".favSiblingText").val()) {
      $(".favSiblingText").addClass("is-valid");
    }
    if ($(".favoriteToyText").val()) {
      $(".favoriteToyText").addClass("is-valid");
    }
    if ($(".petNameText").val()) {
      $(".petNameText").addClass("is-valid");
    }
    //If required fields are entered addKidStart else alert
    if ($(".kidNameText").val() !== "" && $(".guardianNameText").val() !== "") {
      var kidData = {
        name: $("#kidName").val().trim(),
        pet: $("#petName").val().trim(),
        sibling: $("#favSibling").val().trim(),
        guardian: $("#guardFriendName").val().trim(),
        guardian1: $("#guardFriendName2").val().trim(),
        toy: $("#favoriteToy").val().trim(),
      };
      // console.log(kidData);


      $("#kidName").val("");
      $("#petName").val("");
      $("#favSibling").val("");
      $("#guardFriendName").val("");
      $("#guardFriendName2").val("");
      $("#favoriteToy").val("");
      addKidDb(kidData);
      
    } else {
      alert("Please fill out all required fields")
    }
    refreshLists();
  });
  //Renders kids to the dropdown inside the modal & refreshes the kid list 
  refreshLists = function () {
    console.log("refresh lists being called")
    renderKidList();
    renderKidOptions();
    renderGuardianOptions();
    $('#addKidModal').modal('toggle')
  };

  function addKidDb(data) {
    // console.log(data);
    $.post("/api/kid", data)
      .then(
        refreshLists()
      )
      .catch(handleLoginErr);
  }

  function renderKidList() {
    // console.log("renderkid function invoked");
    $.get("/api/kid", function (data) {
      // console.log("data: ", data);
      let kidMarkup = "";
      for (let i = 0; i < data.length; i++) {
        let kidListItem = `<li class="list-group-item"><span>${data[i].name}</span> <button data-id="${data[i].id}" class="btn btn-primary deleteBtn">Delete</button></li>`;
        kidMarkup = kidMarkup + kidListItem
        // console.log("kid created", kidMarkup)
      }
      $(".kidsList").html(kidMarkup);
    });
  };

  function renderKidOptions() {
    // console.log("renderkidoptions function invoked");
    $.get("/api/kid", function (data) {
      console.log("data: ", data);
      let kidMarkup = "<option selected>Choose ...</option>";
      for (let i = 0; i < data.length; i++) {
        let kidListOption = `<option>${data[i].name}</option>`;
        kidMarkup = kidMarkup + kidListOption
        // console.log("kid created", kidMarkup)
      }
      $(".selectChildDD").html(kidMarkup);
    });
  };

  function renderGuardianOptions() {
    // console.log("renderGuardianOptions function invoked");
    $.get("/api/kid", function (data) {
      // console.log("data: ", data);
      let guardianMarkup = "<option selected>Choose ...</option>";
      for (let i = 0; i < data.length; i++) {
        let guardianListOption = `<option>${data[i].guardian}</option>`;
        guardianMarkup = guardianMarkup + guardianListOption
        // console.log("guardian created", guardianMarkup)
      }
      $(".guardianDD").html(guardianMarkup);
    });
  };

  function handleLoginErr(err) {
    // $("#alert .msg").text(err.responseJSON);
    // $("#alert").fadeIn(500);
    alert("kid already exists")
  }




  // --------------------------------------------------------------------
  // story create function
  var storySession= []

  $("#storyCreateBtn1").on("click", function (event) {
    event.stopPropagation();
    event.preventDefault();
    if ($(".selectChildDD").val() !== "Choose...") {
      $(".selectChildDD").addClass("is-valid");
      $(".selectChildDD").removeClass("is-invalid");
    } else {
      $(".selectChildDD").removeClass("is-valid");
      $(".selectChildDD").addClass("is-invalid");
    }
    if ($(".ageRangeDD").val() !== "Choose...") {
      $(".ageRangeDD").addClass("is-valid");
      $(".ageRangeDD").removeClass("is-invalid");
    } else {
      $(".ageRangeDD").removeClass("is-valid");
      $(".ageRangeDD").addClass("is-invalid");
    }
    if ($(".storyTitleDD").val() !== "Choose...") {
      $(".storyTitleDD").addClass("is-valid");
      $(".storyTitleDD").removeClass("is-invalid");
    } else {
      $(".storyTitleDD").removeClass("is-valid");
      $(".storyTitleDD").addClass("is-invalid");
    }
    if ($(".selectChildDD").val() !== "Choose..." && $(".guardianDD").val() !== "Choose..." && $(".storyTitleDD").val() !== "Choose...") {
      //   This will trigger the generate story functionality
      // console.log($(".selectChildDD").val())
      if ($(".storyTitleDD").val() === "My favorite letter (Ages: 0-3)") {
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
        // console.log(letterStory)
        $("#storyContainer").removeAttr("style")
        storySession.push(letterStory)
        // window.location.replace("/story")
      } else if ($(".storyTitleDD").val() === "PottyTime (Ages: 0-3)") {
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
        storySession.push(pottyStory)

      } else if ($(".storyTitleDD").val() === "I love you, SOOOO much (Ages: 0-3)") {
        let loveYou = `

          <h2 class="storyName">I Love You, SOOO Much!</h2><br>

          <p><span class="nameG">${$(".guardianDD").val()}</span> loves you,
          It’s true!</p>
 
          <p><span class="nameG">${$(".guardianDD").val()}</span> loves you,
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
        storySession.push(loveYou)

      } else if ($(".storyTitleDD").val() === "I love to count (Ages: 0-3)") {
        let iloveToCount = `
        <h2 class="storyName">I Love to Count!</h2><br>
        <p> <span class="nameK">${$(".selectChildDD").val()}</span> loves to count every day,
        Counting numbers is how we play,</p>
 
        <p><span class="nameG">${$(".guardianDD").val()}</span> loves to count out loud to me,
        1 and 2 and even 3,</p>
 
        <p>Counting’s like a magic trick,
        From 4 to 5 and on to  6,</p>
 
        <p><span class="nameG">${$(".guardianDD").val()}</span> count all the time,
        7 and 8 and don’t forget 9</p>
 
        <p>After we count to 9 is when,
        <span class="nameK">${$(".selectChildDD").val()}</span> gets to scream, 10!!!!!</p>
        `

        $("#story").html(iloveToCount);
        $("#storyContainer").removeAttr("style");
        storySession.push(iloveToCount);

      } else if ($(".storyTitleDD").val() === "To the moon and back (Ages: 3-7)") {
        let toTheMoonAndBack = `
        <h2 class="storyName">To the Moon & Back!</h2><br>

        <p> <span class="nameK">${$(".selectChildDD").val()}</span> woke up one day and looked at the moon and sky and stars,
        <span class="nameK">${$(".selectChildDD").val()}</span> loved the way the stars twinkled and the sky went on forever and the moon shone so bright,
        <span class="nameK">${$(".selectChildDD").val()}</span> asked <span class="nameG">${$(".guardianDD").val()}</span> “I want to go to space!  Want to come with me?”
        <span class="nameG">${$(".guardianDD").val()}</span> said “Of course!”
        </p>
 
        <p> <span class="nameK">${$(".selectChildDD").val()}</span> found an old cardboard box and with a little imagination turned it into a spaceship,
        <span class="nameK">${$(".selectChildDD").val()}</span> said “<span class="nameG">${$(".guardianDD").val()}</span>, get in!”
        <span class="nameG">${$(".guardianDD").val()}</span> jumped in and the spaceship rumbled and shook,
        It shot up into the sky till the earth looked as small as a ball</p>
 
        <p> <span class="nameK">${$(".selectChildDD").val()}</span> saw the shining stars zoom past the ship,
        <span class="nameK">${$(".selectChildDD").val()}</span> screamed “did you see that <span class="nameG">${$(".guardianDD").val()}</span>?”
        <span class="nameK">${$(".selectChildDD").val()}</span> saw the moon get bigger and bigger,
        <span class="nameG">${$(".guardianDD").val()}</span> said “its glowing so bright”,</p>
 
        <p> <span class="nameK">${$(".selectChildDD").val()}</span> saw a space ship fly past,
        It was heading quickly back to earth
        <span class="nameK">${$(".selectChildDD").val()}</span> said “It’s like a different world up here”
        ${$(".guardianDD").val()} said “It’s not another world, it’s our universe”</p>

        <p> <span class="nameK">${$(".selectChildDD").val()}</span> and <span class="nameG">${$(".guardianDD").val()}</span> started to miss home.
        They both said “Maybe we should come back down to earth”
        They zoomed back home at super speed,
        And agreed to come back in their cardboard spaceship another day.</p>
        `

        $("#story").html(toTheMoonAndBack);
        $("#storyContainer").removeAttr("style");
        storySession.push(toTheMoonAndBack);

      } else if ($(".storyTitleDD").val() === "Save the kingdom (Ages: 3-7)") {
        let saveTheKingdom = `
        <h2 class="storyName">Save the Kingdom!</h2><br>

        <p> <span class="nameK">${$(".selectChildDD").val()}</span> was sleeping one day when <span class="nameG">${$(".guardianDD").val()}</span> woke them up,
        “I need your help  <span class="nameK">${$(".selectChildDD").val()}</span>.  We need to rescue someone from a magical castle,”
        <span class="nameK">${$(".selectChildDD").val()}</span> asked “Is it princess?”
        <span class="nameG">${$(".guardianDD").val()}</span> said “No!  It’s a princess and a knight a shining armor”
        </p>
 
        <p> <span class="nameK">${$(".selectChildDD").val()}</span> and <span class="nameG">${$(".guardianDD").val()}</span> ran out the door on their magical castle rescue adventure,
        <span class="nameG">${$(".guardianDD").val()}</span> brought the food and water,
        <span class="nameK">${$(".selectChildDD").val()}</span> brought a blanket and a stick,
        Together,  <span class="nameK">${$(".selectChildDD").val()}</span> and <span class="nameG">${$(".guardianDD").val()}</span> had everything they needed,</p>
 
        <p> <span class="nameK">${$(".selectChildDD").val()}</span> and <span class="nameG">${$(".guardianDD").val()}</span> saw something running towards them from far away,
        It was a magic dragon that wanted to protect the magic castle,
        <span class="nameK">${$(".selectChildDD").val()}</span> said “I wont hurt him”
        <span class="nameK">${$(".selectChildDD").val()}</span> threw the blanket over the dragon and then <span class="nameG">${$(".guardianDD").val()}</span> and  <span class="nameK">${$(".selectChildDD").val()}</span> ran away,
        </p>
 
        <p> <span class="nameK">${$(".selectChildDD").val()}</span> and <span class="nameG">${$(".guardianDD").val()}</span> saw the castle at the same time,
        “There it is!” they shouted,
        “There’s the castle with the knight and princess!”
        The slowly snuck up to the castle, careful not to make a noise.
        </p>

        <p>Same <span class="nameG">${$(".guardianDD").val()}</span> tried to open the castle door but it was stuck
        They used  <span class="nameK">${$(".selectChildDD").val()}</span>'s stick to pry it open and were so surprised by what they found
        They rescued the princess and knight
        But they also found different <span class="nameG">${$(".guardianDD").val()}</span> in there and rescued them  too!!!
        </p>
 `
        $("#story").html(saveTheKingdom);
        $("#storyContainer").removeAttr("style");
        storySession.push(saveTheKingdom);

      } else if ($(".storyTitleDD").val() === "You are super! (Ages: 3-7)") {
        let youAreSuper = `
        <h2 class="storyName">You are Super!</h2><br>

        <p>One day  <span class="nameK">${$(".selectChildDD").val()}</span> picked up their basketball,
        But something was different about their ball today,
        The ball gave  <span class="nameK">${$(".selectChildDD").val()}</span> a funny feeling,
        Like the basketball was giving them super powers!!!!
        </p>
 
        <p> <span class="nameK">${$(".selectChildDD").val()}</span> was walking outside when <span class="nameG">${$(".guardianDD").val()}</span> said,
        “Don’t run so fast!”
        So  <span class="nameK">${$(".selectChildDD").val()}</span> said,
        “Okay, I’ll just fly instead!”
        </p>
 
        <p> <span class="nameK">${$(".selectChildDD").val()}</span> jumped UP,
        But instead of falling back down,
        <span class="nameK">${$(".selectChildDD").val()}</span> stayed up,
        And held the basketball tight in their hand!
        </p>
 
        <p> <span class="nameK">${$(".selectChildDD").val()}</span> flew out the door and soared hi in the air,
        <span class="nameK">${$(".selectChildDD").val()}</span> could see his whole neighborhood,
        <span class="nameK">${$(".selectChildDD").val()}</span> saved a cat stuck in a tree!
        <span class="nameK">${$(".selectChildDD").val()}</span> helped an old lady cross the road!</p>

        <p> <span class="nameK">${$(".selectChildDD").val()}</span> saw <span class="nameG">${$(".guardianDD").val()}</span>  along with their entire family, all of their pets and all of their friends.
        <span class="nameG">${$(".guardianDD").val()}</span> said “That’s looks so fun!”
        The dog said “Take me too!”
        <span class="nameK">${$(".selectChildDD").val()}</span> came back down and even though  <span class="nameK">${$(".selectChildDD").val()}</span> wasn’t flying anymore,  <span class="nameK">${$(".selectChildDD").val()}</span> was still a superhero!
        </p>
 `
        $("#story").html(youAreSuper);
        $("#storyContainer").removeAttr("style");
        storySession.push(youAreSuper);
      } else if ($(".storyTitleDD").val() === "The great pet adventure (Ages 3-7)") {
        let theGreatPetAdventure = `
        <h2 class="storyName">The Great Pet Adventure!</h2>

        <p>One day  <span class="nameK">${$(".selectChildDD").val()}</span> and Spot the dog decided to go out on an adventure,
        <span class="nameK">${$(".selectChildDD").val()}</span> and Spot would explore in search of new fun discoveries,
        <span class="nameK">${$(".selectChildDD").val()}</span> ran out the door and Spot followed with it tail wagging,
        Spot was excited to follow and protect  <span class="nameK">${$(".selectChildDD").val()}</span>!
        </p>
 
        <p>They found green grass and rolled around and played,
        They heard birds chirping and Spot tried to chase them,
        They discovered a BIG tree and  <span class="nameK">${$(".selectChildDD").val()}</span> tried to climb it,
        Spot jumped up and ran in circles waiting for  <span class="nameK">${$(".selectChildDD").val()}</span> to come back down.
        </p>
 
        <p> <span class="nameK">${$(".selectChildDD").val()}</span> and Spot ran through fields and discovered a stream,
        <span class="nameK">${$(".selectChildDD").val()}</span> asked Spot “Do you think there were pirates or boats or mermaids here?”,
        Spot grinned widely and let out a loud “Yes!”,
        After they explored the stream they ran off to discover more.
        </p>
 
        <p> <span class="nameK">${$(".selectChildDD").val()}</span> and Spot ran up a mountain,
        <span class="nameK">${$(".selectChildDD").val()}</span> tripped and hurt his hand,
        Spot licked his hand to make it all better,
        And then they ran back down.
        </p>

        <p> <span class="nameK">${$(".selectChildDD").val()}</span> and Spot were tired and decided to go home,
        They walked passed the mountains, the fields and the streams, and 
        Spot's tail wagged all the way.
        They got home and rested, ready for an adventure the next day.        
        </p>
 `
        $("#story").html(theGreatPetAdventure);
        $("#storyContainer").removeAttr("style");
        storySession.push(theGreatPetAdventure);
      } else if ($(".storyTitleDD").val() === "Fire! (Ages: 7 & Up)") {
        let fire = `
        <h2 class="storyName">Fire!</h2><br>

        <p> <span class="nameK">${$(".selectChildDD").val()}</span> told <span class="nameG">${$(".guardianDD").val()}</span> one day that they were adventurous,
        <span class="nameK">${$(".selectChildDD").val()}</span> said they wanted to help people,
        To make sure they’re safe,
        To protect them and rescue them when they’re in trouble,
        <span class="nameG">${$(".guardianDD").val()}</span> said “That’s what a fireman does!”
        </p>
 
        <p>So  <span class="nameK">${$(".selectChildDD").val()}</span> asked “How can I be a fireman?”
        <span class="nameG">${$(".guardianDD").val()}</span> said “First be healthy. 
        Eat all your veggies and brush your teeth and exercise,
        Because when we’re healthy and strong,
        We can help other people better.”
        </p>
 
        <p> <span class="nameK">${$(".selectChildDD").val()}</span> said “And then?”
        <span class="nameG">${$(".guardianDD").val()}</span> said “Then study hard and learn as much as you can.
        Because when we become as smart as we can,
        We can use what we learn to teach other people to be safe,
        And we can help them with our knowledge if they’re ever in trouble."</p>
 
        <p> <span class="nameK">${$(".selectChildDD").val()}</span> said “And then?”
        <span class="nameG">${$(".guardianDD").val()}</span> said “And then be brave.
        Because when we’re brave we can do hard things,
        And we can help people when they’re going through hard things,
        And we teach other people to be brave.”        
        </p>

        <p> <span class="nameK">${$(".selectChildDD").val()}</span> said “And then I can be a fireman?”
        And <span class="nameG">${$(".guardianDD").val()}</span> Said “YES!  When you’re healthy and smart and brave
        You can be a fireman!
        In fact, when you’re healthy and strong and brave,
        You can be anything you want to be in this world!”                
        </p>
 `
        $("#story").html(fire);
        $("#storyContainer").removeAttr("style");
        storySession.push(fire);
      } else if ($(".storyTitleDD").val() === "The great family adventure (Ages: 7 & Up)") {
        let familyAdventure = `
        <h2 class="storyName">The Great Family Adventure!</h2><br>

        <p> <span class="nameK">${$(".selectChildDD").val()}</span> woke up one day and said
        “I want to travel and I want to go on an adventure!”
        And <span class="nameG">${$(".guardianDD").val()}</span>  said “I do too”
        The only thing better than an adventure is an adventure with family,
        So  <span class="nameK">${$(".selectChildDD").val()}</span> said “You and I should go on an adventure together!”
        </p>
 
        <p> <span class="nameK">${$(".selectChildDD").val()}</span> and <span class="nameG">${$(".guardianDD").val()}</span> packed up their bags and prepared for an amazing adventure,
        And they rode their bikes to the beach.
        The sand was soft the waves were big and the sun was bright,
        <span class="nameK">${$(".selectChildDD").val()}</span> played in the sand,
        <span class="nameG">${$(".guardianDD").val()}</span> swam in the ocean.
        </p>
 
        <p>We  dug for treasures,
        And built castles made of sand,
        We chased the waves,
        And swam in the water,
        And played tag all over the beach.
        </p>
 
        <p> <span class="nameK">${$(".selectChildDD").val()}</span> got their clothes wet,
        And <span class="nameG">${$(".guardianDD").val()}</span> shared their towel,
        So <span class="nameG">${$(".guardianDD").val()}</span> helped <span class="nameK">${$(".selectChildDD").val()}</span> play in the water,
        They played together till it started to get cold.                
        </p>

        <p> <span class="nameK">${$(".selectChildDD").val()}</span> and <span class="nameG">${$(".guardianDD").val()}</span> decided to go home,
        They were all tired from a fun filled day,
        They couldn’t wait to go home to sleep,
        <span class="nameK">${$(".selectChildDD").val()}</span> said “Nothing is better than an adventure,
        Except an adventure together!!!”                        
        </p>
 `
        $("#story").html(familyAdventure);
        $("#storyContainer").removeAttr("style");
        storySession.push(familyAdventure);
      }

    } else {
      alert("Please fill out all required fields")
    }
    $('#createStoryModal').modal('toggle')
  });

  $(document).on("click", ".deleteBtn", handleKidDelete);

function handleKidDelete(){
   console.log($(this).data("id"));
    var currentKid = $(this).data("id")
    deleteKid(currentKid);
}

//API call to delete Kid
  function deleteKid(id) {
  $.ajax({
    method:"DELETE",
    url: "/api/kid/" + id
  })
    .then(function(){
      renderKidList();
    })
  }


  // Node Mailer on click event
  var to;
  var body;
  $("#nodemailerBtn").on("click",function(){     
      to=$("#nodemailerEmail").val();
      body=storySession
      console.log(to);
      console.log(body)
      $.post("/send",{to:to, body:body[0]},function(data){
      if(data=="sent"){
        console.log("email sent")
      }
      $('#nodemailerModal').modal('toggle')

});
  });

})

