$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  //user profile locators
  let username = $("#username");
  let memberid = $("#memberid");
  let membersince = $("#membersince");
  let name = $("#name");
  let partner = $("#partner");
  let skillLevel = $("#skill-input");
  let favoriteActivity = $("#favorite-activity");


  $.get("/api/user_data").then(data1 => {
    $.get(`/api/userProfile/${data1.id}`).then(data2 => {
      username.text(username.text() + data1.email);
      memberid.text(memberid.text() + data1.id);
      membersince.text(membersince.text() + data2.createdAt);
      name.text(name.text() + `${data2.first_name} ${data2.last_name}`);
      partner.text(partner.text() + data2.need_partner);
      skillLevel.text(skillLevel.text() + data2.skill_level);
      favoriteActivity.text(favoriteActivity.text() + data2.activity);
  });

});


// $(".court").on("click", function () {
//   console.log("you cliked", $(this).attr("name"));
//   localStorage.setItem("court", $(this).attr("name"));
//   window.location.replace("/reserve");
// })
});