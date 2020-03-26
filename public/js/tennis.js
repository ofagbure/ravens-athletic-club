$(document).ready(function () {

  $(".court").on("click", function () {
    console.log("you cliked", $(this).attr("name"));
    localStorage.setItem("court", $(this).attr("name"));
    window.location.replace("/reserve");
    //res.redirect(307, "/api/login");
  })



  //join another player
  let joinPlayer = $(".join_player");

  joinPlayer.on("click", function () {
    let reservationId = parseInt($(this).attr("data-reserveId"));
    console.log("reservationId = " + reservationId)
    const PlayerId = parseInt(localStorage.getItem("userId"));

    //API CALL to reserve A COURT
    $.get(`/api/userProfile/${PlayerId}`)
      .then(res => {

        const PartnerName = `${res.first_name} ${res.last_name}`;

        const reservation = {
          reservationId: parseInt(reservationId),
          PartnerId: parseInt(PlayerId),
          partner: 0,
          PartnerName: PartnerName
        }

        //API CALL to reserve A COURT
        $.post("/api/reserve/update", reservation)
          .then(res => {
            //refreshh members page
            location.reload(true);
            // window.location.replace("/tennis");

          })
          .catch();
      })
      .catch();
  })
})