$(document).ready(function() {
  $(".court").on("click", function () {
    console.log("you cliked", $(this).attr("name"));
    localStorage.setItem("court", $(this).attr("name"));
    window.location.replace("/reserve");
  })
});