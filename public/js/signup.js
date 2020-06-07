$(document).ready(function () {
  console.log("hello world");
  // Getting references to our form and input
  var signUpForm = $(".signup");
  var emailInput = $("#userCreateEmail");
  var passwordInput = $("#userCreatePassword");
  var firstNameInput = $("#userFirstName");
  var lastNameInput = $("#userLastName");

  // When the signup button is clicked, we validate the email and password are not blank
  $("#submitSignUp").on("click", function (event) {
    event.preventDefault();

    if ($("#userCreateEmail").val()) {
      $(".userEmailText").addClass("is-valid");
      $(".userEmailText").removeClass("is-invalid");
    } else {
      $(".userEmailText").removeClass("is-valid");
      $(".userEmailText").addClass("is-invalid");
    }
    if ($("#userCreatePassword").val()) {
      $(".userPasswordText").addClass("is-valid");
      $(".userPasswordText").removeClass("is-invalid");
    } else {
      $(".userPasswordText").removeClass("is-valid");
      $(".userPasswordText").addClass("is-invalid");
    }
    if ($("#userFirstName").val()) {
      $(".userFirstNameText").addClass("is-valid");
      $(".userFirstNameText").removeClass("is-invalid");
    } else {
      $(".userFirstNameText").removeClass("is-valid");
      $(".userFirstNameText").addClass("is-invalid");
    }
    if ($("#userLastName").val()) {
      $(".userLastNameText").addClass("is-valid");
      $(".userLastNameText").removeClass("is-invalid");
    } else {
      $(".userLastNameText").removeClass("is-valid");
      $(".userLastNameText").addClass("is-invalid");
    }

    //If required fields are entered attempt log in
    if ($(".userEmailText").val() !== "" && $(".userPasswordText").val() !== ""
      && $(".userFirstNameText").val() !== "" && $(".userLastNameText").val() !== "") {
      console.log("working!")
      var userData = {
        email: emailInput.val().trim(),
        password: passwordInput.val().trim(),
        firstName: firstNameInput.val().trim(),
        lastName: lastNameInput.val().trim(),
      };
      signUpUser(userData);
      emailInput.val("");
      passwordInput.val("");
      firstNameInput.val("");
      lastNameInput.val("");
    } else {
      console.log("else working!")
      alert("Enter all required fields")
    }
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(data) {
    console.log(data);
    $.post("/api/signup", data)
      .then(function (data) {
        window.location.replace("/members");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    // $("#alert .msg").text(err.responseJSON);
    // $("#alert").fadeIn(500);
    alert("Email already exists")
  }



});
