$(document).ready(function () {
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
  let cancelJoin = $(".cancelJoin");

  let currentTime = $("#current_time");

  let paginatePartnerReservation = $(".paginate");

  //add date to the jumbotron in the form -> Saturday, January 11th
  var todayDate = moment().format("MMMM Do YYYY, h:mm:ss a");
  currentTime.text(todayDate);

  //cancel join partner reservation
  cancelJoin.on("click", function () {

    let reservationId = parseInt($(this).attr("data-reservationId"));
    console.log("reservationId = " + reservationId)
    const PlayerId = parseInt(localStorage.getItem("userId"));


    const reservation = {
      reservationId: parseInt(reservationId),
      PartnerId: null,
      partner: 1,
      PartnerName: null,
    }

    //API CALL to reserve A COURT
    $.post("/api/reserve/update", reservation).then(res => {
        //refreshh members page
        location.reload(true);
      })
      .catch();
  })


  //update user
  const editUser = $("#editUser");

  editUser.on("click", function (event) {
    event.preventDefault();

    const name = $("#name");
    const favoriteactivity = $("#favoriteactivity");
    const skilllevel = $("#skilllevel");
    const partner = $("#partner");

    //enable input fields
    name.prop("disabled", false);
    favoriteactivity.prop("disabled", false);
    skilllevel.prop("disabled", false);
    partner.prop("disabled", false);

  });

  //save user update
  const saveUser = $("#saveUser");

  saveUser.on("click", function () {

    const name = $("#name");
    const favoriteactivity = $("#favoriteactivity");
    const skilllevel = $("#skilllevel");
    const partner = $("#partner");

    //split name into firstname and lastname\
    const nameVal = name.val().trim();

    //capture values
    const userData = {
      first_name: nameVal.slice(0, nameVal.indexOf(" ")),
      last_name: nameVal.slice(nameVal.indexOf(" "), nameVal.length),
      skill_level: skilllevel.val().trim(),
      activity: favoriteactivity.val().trim(),
      need_partner: partner.val().trim(),
    }

    //disable input fields
    name.prop("disabled", true);
    favoriteactivity.prop("disabled", true);
    skilllevel.prop("disabled", true);
    partner.prop("disabled", true);
    const playerId = parseInt(localStorage.getItem("userId"));

    //make API request to update user
    $.post(`/api/userProfile/${playerId}`, userData)
      .then(res => {
        //refreshh members page
        location.reload(true);
      })
      .catch(err => {
        console.log(err);
      });
  });


  // //pagination 
  // paginatePartnerReservation.on('click', function(){

  // })
});