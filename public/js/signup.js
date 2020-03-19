$(document).ready(function() {
  // Getting references to our form and input
  let signUpForm = $(".signup");
  let emailInput = $("#email-input");
  let passwordInput = $("#password-input");

  let firstNameInput = $("#firstname-input");
  let lastNameInput = $("#lastname-input");
  let activityInput = $("#activity-input");
  let skillInput = $("#skill-input");
  let partnerInput = $("#partner-input");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();
    console.log("userData = ", event)
    let partnerRequested = false;
    if( partnerInput.val().trim() === 2){
      partnerRequested = true;
    } 

    let userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      firstName: firstNameInput.val().trim(),
      lastName: lastNameInput.val().trim(),
      activity: activityInput.val().trim(),
      skillLevel: skillInput.val().trim(),
      partner: partnerRequested
      // email: 'test@test.test',
      // password: 'test',
      // firstName: 'Mesay',
      // lastName: 'Bekele',
      // activity: 'Tennis',
      // skillLevel: '3',
      // partner: true
    };
console.log("userData = ", userData)
    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password, userData.firstName, userData.lastName,userData.activity, userData.skillLevel, userData.partner);
    emailInput.val("");
    passwordInput.val("");
    firstNameInput.val("");
    lastNameInput.val("");
    activityInput.val("");
    skillInput.val("");
    partnerInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password, firstName, lastName, activity, skillLevel, partner) {
    $.post("/api/signup", {
      email: email,
      password: password,
      first_name: firstName,
      last_name: lastName,
      need_partner: partner,
      skill_level:skillLevel,
      activity: activity,
    })
      .then(function (data) {
console.log("dta 101 = ", data);
        window.location.replace("/members");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
      
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  };



//mb

function createUserProfile(firstName, lastName, activity, skillLevel, partner){
  $.post("/api/userProfile", {
    first_name: firstName,
    last_name: lastName,
    need_partner: partner,
    skill_level:skillLevel,
    activity: activity,
  })
    .then(res => {
      res.redirect(307, "/api/login");
    })
    .catch(err => {
      res.status(401).json(err);
    });
}
});

