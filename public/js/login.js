$(document).ready(function() {
    // Getting references to our form and inputs
  
    var emailInput = $("#emailLogin");
    var passwordInput = $("#userPassword");
  


    // When the form is submitted, we validate there's an email and password entered
    $("#loginBtn1").on("click", function(event) {
      event.preventDefault();
       console.log("working")

       if($("#emailLogin").val()){
        $(".loginEmailText").addClass("is-valid");
        $(".loginEmailText").removeClass("is-invalid");
       }else{
        $(".loginEmailText").removeClass("is-valid");
        $(".loginEmailText").addClass("is-invalid");
       }
       if($("#userPassword").val()){
        $(".loginPasswordText").addClass("is-valid");
        $(".loginPasswordText").removeClass("is-invalid");
       }else{
        $(".loginPasswordText").removeClass("is-valid");
        $(".loginPasswordText").addClass("is-invalid");
       }

       if($(".loginEmailText").val() !== "" && $(".loginPasswordText").val() !== ""){
        var userData = {
          email: emailInput.val().trim(),
          password: passwordInput.val().trim()
        };
        console.log("working")

        // if (!userData.email || !userData.password) {
        //   return ;
        // }

        
      // If we have an email and password we run the loginUser function and clear the form
      loginUser(userData.email, userData.password);
      emailInput.val("");
      passwordInput.val("");

       }else{
         alert("Enter valid information")
       }

  
    });
  
    // loginUser does a post to our "api/user_data" route and if successful, redirects us the the members page
    function loginUser(email, password) {
      $.post("/api/login", {
        email: email,
        password: password
      })
        .then(function() {
          window.location.replace("/members");
          // If there's an error, log the error
        })
        .catch(handleLoginErr);
    }

    function handleLoginErr(err){
      alert("email or password do not match system")
    }
  });
  