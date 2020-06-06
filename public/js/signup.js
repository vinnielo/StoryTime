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
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      firstName: firstNameInput.val().trim(),
      lastName: lastNameInput.val().trim(),
    };
    console.log(userData);

    // data validation goes here

    // if (!userData.email || !userData.password || !userData.firstName || !userData.lastName) {
    //   return;
    // }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData);
    emailInput.val("");
    passwordInput.val("");
    firstNameInput.val("");
    lastNameInput.val("");
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
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }

 
  
});
