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
      console.log(kidData);


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

  });
  //Renders kids to the dropdown inside the modal & refreshes the kid list 
  $(".refreshBtn").on("click", async function () {
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

  function renderKidList() {
    console.log("renderkid function invoked");
    $.get("/api/kid", function (data) {
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

  function renderKidOptions() {
    console.log("renderkidoptions function invoked");
    $.get("/api/kid", function (data) {
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
    if ($(".selectChildDD").val() !== "Choose..." && $(".ageRangeDD").val() !== "Choose..." && $(".storyTitleDD").val() !== "Choose...") {
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
        console.log(letterStory)
        $("#storyContainer").removeAttr("style")

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

      } else if ($(".storyTitleDD").val() === "I love you, SOOOO much (Ages: 0-3)") {
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

      } else if ($(".storyTitleDD").val() === "I love to count (Ages: 0-3)") {
        let iloveToCount = `
        <h2 class="storyName">I Love to Count!</h2><br>
        <p>KID loves to count every day,
        Counting numbers is how we play,</p>
 
        <p>PARRENT1 loves to count out loud to me,
        1 and 2 and even 3,</p>
 
        <p>Counting’s like a magic trick,
        From 4 to 5 and on to  6,</p>
 
        <p>PARENT2 count all the time,
        7 and 8 and don’t forget 9</p>
 
        <p>After we count to 9 is when,
        KID gets to scream, 10!!!!!</p>
        `

        $("#story").html(iloveToCount);
        $("#storyContainer").removeAttr("style");

      } else if ($(".storyTitleDD").val() === "To the moon and back (Ages: 3-7)") {
        let toTheMoonAndBack = `
        <h2 class="storyName">To the Moon & Back!</h2><br>

        <p>KID woke up one day and looked at the moon and sky and stars,
        KID loved the way the stars twinkled and the sky went on forever and the moon shone so bright,
        KID asked PET, PARRENT or SIBLING “I want to go to space!  Want to come with me?”
        SAME PET, PARRENT or SIBLING said “Of course!”
        </p>
 
        <p>KID found an old cardboard box and with a little imagination turned it into a spaceship,
        KID said “SAME PET, PARRENT or SIBLING, get in!”
        SAME PET, PARRENT or SIBLING jumped in and the spaceship rumbled and shook,
        It shot up into the sky till the earth looked as small as a ball</p>
 
        <p>KID saw the shining stars zoom past the ship,
        KID screamed “did you see that SAME PET, PARRENT or SIBLING?”
        KID saw the moon get bigger and bigger,
        SAME PET, PARRENT or SIBLING said “its glowing so bright”,</p>
 
        <p>KID saw a space ship fly past,
        It was heading quickly back to earth
        KID said “It’s like a different world up here”
        SAME PET, PARENT or SIBLING said “It’s not another world, it’s our universe”</p>

        <p>KID and SAME PET, PARENT or SIBLING started to miss ANOTHER PET, PARENT or SIBLING,
        They both said “Maybe we should come back down to earth”
        They zoomed back home at super speed,
        And agreed to come back in their cardboard spaceship another day.</p>
        `

        $("#story").html(toTheMoonAndBack);
        $("#storyContainer").removeAttr("style");

      } else if ($(".storyTitleDD").val() === "Save the kingdom (Ages: 3-7)") {
        let saveTheKingdom = `
        <h2 class="storyName">Save the Kingdom!</h2><br>

        <p>KID was sleeping one day when PARENT, SIBLING or PET woke them up,
        “I need your help KID.  We need to rescue someone from a magical castle,”
        KID asked “Is it princess?”
        SAME PARENT or SIBLING said “No!  It’s a princess and a knight a shining armor”
        </p>
 
        <p>KID and Same PARENT or SIBLING ran out the door on their magical castle rescue adventure,
        Same PARENT, SIBLING or PET brought the food and water,
        KID brought a blanket and a stick,
        Together, KID and Same PARENT, SIBLING or PET had everything they needed,</p>
 
        <p>Kid and Same PARENT, SIBLING or PET saw something running towards them from far away,
        It was a magic dragon that wanted to protect the magic castle,
        KID said “I wont hurt him”
        KID threw the blanket over the dragon and then Same PARENT, SIBLING or PET and KID ran away,
        </p>
 
        <p>KID and Same PARENT, SIBLING or PET saw the castle at the same time,
        “There it is!” they shouted,
        “There’s the castle with the knight and princess!”
        The slowly snuck up to the castle, careful not to make a noise.
        </p>

        <p>Same PARENT, SIBLING or PET tried to open the castle door but it was stuck
        They used KID’s stick to pry it open and were so surprised by what they found
        They rescued the princess and knight
        But they also found different PARENT, SIBLING or PET in there and rescued them  too!!!
        </p>
 `
        $("#story").html(saveTheKingdom);
        $("#storyContainer").removeAttr("style");

      } else if ($(".storyTitleDD").val() === "You are super! (Ages: 3-7)") {
        let youAreSuper = `
        <h2 class="storyName">You are Super!</h2><br>

        <p>One day KID picked up their FAVORITE TOY if no toy is entered, default to ball.,
        But something was different about their FAVORITE TOY today,
        FAVORITE TOY gave KID a funny feeling,
        Like FAVORITE TOY was giving them super powers!!!!
        </p>
 
        <p>KID was walking outside when PARENT1 said,
        “Don’t run so fast!”
        So KID said,
        “Okay, I’ll just fly instead!”
        </p>
 
        <p>KID jumped UP,
        But instead of falling back down,
        KID stayed up,
        And held FAVORITE TOY tight in their hand!
        </p>
 
        <p>KID flew out the door and soared hi in the air,
        KID could see his whole neighborhood,
        KID saved a cat stuck in a tree!
        KID helped an old lady cross the road!</p>

        <p>KID saw PET, PARRENT or SIBLING and PET, PARRENT or SIBLING and PET, PARRENT or SIBLING and PET, PARRENT or SIBLING
        PET, PARRENT or SIBLING said “That’s looks so fun!”
        Different PET, PARRENT or SIBLING said “Take me too!”
        KID came back down and even though KID wasn’t flying anymore, KID was still a superhero!
        </p>
 `
        $("#story").html(youAreSuper);
        $("#storyContainer").removeAttr("style");
      } else if ($(".storyTitleDD").val() === "The great pet adventure (Ages 3-7)") {
        let theGreatPetAdventure = `
        <h2 class="storyName">The Great Pet Adventure!</h2><br>

        <p>One day KID and PET decided to go out on an adventure,
        KID and PET would explore in search of new fun discoveries,
        KID ran out the door and PET followed with their tail wagging,
        PET was excited to follow and protect KID!
        </p>
 
        <p>They found green grass and rolled around and played,
        They heard birds chirping and PET tried to chase them,
        They discovered a BIG tree and KID tried to climb it,
        PET jumped up and ran in circles waiting for KID to come back down.
        </p>
 
        <p>KID and PET ran through fields and discovered a stream,
        KID asked PET “Do you think there were pirates or boats or mermaids here?”,
        PET grinned widely and let out a loud animal noise to say “Yes!”,
        After they explored the stream they ran off to discover more.
        </p>
 
        <p>KID and PET ran up a mountain,
        KID tripped and hurt his hand,
        PET licked his hand to make it all better,
        And then they ran back down.
        </p>

        <p>KID and PET were tired and decided to go home,
        They walked through the mountain and field and stream,
        PET’S tail wagging all the way,
        They got home and rested, ready for an adventure the next day.        
        </p>
 `
        $("#story").html(theGreatPetAdventure);
        $("#storyContainer").removeAttr("style");
      } else if ($(".storyTitleDD").val() === "Fire! (Ages: 7 & Up)") {
        let fire = `
        <h2 class="storyName">Fire!</h2><br>

        <p>KID told PARENT or SIBLING one day that they were adventurous,
        KID said they wanted to help people,
        To make sure they’re safe,
        To protect them and rescue them when they’re in trouble,
        And Same PARENT or SIBLING said “That’s what a fireman does!”
        </p>
 
        <p>So KID asked “How can I be a fireman?”
        Same PARENT or SIBLING said “First be healthy. 
        Eat all your veggies and brush your teeth and exercise,
        Because when we’re healthy and strong,
        We can help other people better.”
        </p>
 
        <p>KID said “And then what?”
        Same PARENT or SIBLING said “Then study hard and learn as much as you can.
        Because when we become as smart as we can,
        We can use what we learn to teach other people to be safe,
        And we can help them with our knowledge if they’re ever in trouble."</p>
 
        <p>KID said “And then what?”
        Same PARENT or SIBLING said “And then be brave.
        Because when we’re brave we can do hard things,
        And we can help people when they’re going through hard things,
        And we teach other people to be brave.”        
        </p>

        <p>KID said “And then I can be a fireman?”
        And Same PARENT or SIBLING Said “YES!  When you’re healthy and smart and brave
        You can be a fireman!
        In fact, when you’re healthy and strong and brave,
        You can be anything you want to be in this world!”                
        </p>
 `
        $("#story").html(fire);
        $("#storyContainer").removeAttr("style");
      } else if ($(".storyTitleDD").val() === "The great family adventure (Ages: 7 & Up)") {
        let familyAdventure = `
        <h2 class="storyName">The Great Family Adventure!</h2><br>

        <p>KID woke up one day and said
        “I want to travel and I want to go on an adventure!”
        And PARENT or SIBLING or PET  said “I do too”
        The only thing better than an adventure is an adventure with family,
        So KID said “Me and XXX and YYY should go on an adventure together!”
        </p>
 
        <p>KID and XXX and YYY packed up their bags and prepared for an amazing adventure,
        And they rode their bikes to the beach,
        The sand was soft the waves were big and the sun was bright,
        KID played in the sand,
        XXX played in the ocean,
        YYY laid out in the sun.
        </p>
 
        <p>They all dug for treasures,
        And built castles made of sand,
        They chased the waves,
        And swam in the water,
        And played tag all over the beach.
        "</p>
 
        <p>KID got their clothes wet,
        And XXX shared their towel,
        YYY couldn’t swim great,
        So XXX helped YYY play in the water,
        They all played together till it started to get cold.                
        </p>

        <p>KID and XXX and YYY decided to go home,
        They were all tired from a fun filled day,
        They couldn’t wait to go home to sleep,
        KID said “Nothing is better than an adventure,
        Except an adventure together!!!”                        
        </p>
 `
        $("#story").html(familyAdventure);
        $("#storyContainer").removeAttr("style");
      }

    } else {
      alert("Please fill out all required fields")
    }
  });


})



$(document).ready(function(){
  var to;
  $("#nodemailerBtn").click(function(){     
      to=$("#nodemailerEmail").val();
      console.log(to);
      $.post("http://localhost:8080/send",{to:to},function(data){
      if(data=="sent")
      {
       $("#nodemailerBtn").empty()

      }

});
  });
});