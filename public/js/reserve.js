$(document).ready(function () {
    //code to generate time data - move to a separate module

    //CREATE active hours array
    var activeHours = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"];

    const index = parseInt(localStorage.getItem("court"));

    //create an object of hourlyData of 'startTime' and 'endTime' between 9am->5pm
    var hourlyData = [{
            startTime: moment().set({
                'hour': 9,
                'minute': 00
            }),
            endTime: moment().set({
                'hour': 10,
                'minute': 00
            }),
        },
        {
            startTime: moment().set({
                'hour': 10,
                'minute': 00
            }),
            endTime: moment().set({
                'hour': 11,
                'minute': 00
            }),
        },
        {
            startTime: moment().set({
                'hour': 11,
                'minute': 00
            }),
            endTime: moment().set({
                'hour': 12,
                'minute': 00
            }),
        },
        {
            startTime: moment().set({
                'hour': 12,
                'minute': 00
            }),
            endTime: moment().set({
                'hour': 13,
                'minute': 00
            }),
        },
        {
            startTime: moment().set({
                'hour': 13,
                'minute': 00
            }),
            endTime: moment().set({
                'hour': 14,
                'minute': 00
            }),
        },
        {
            startTime: moment().set({
                'hour': 14,
                'minute': 00
            }),
            endTime: moment().set({
                'hour': 15,
                'minute': 00
            }),
        },
        {
            startTime: moment().set({
                'hour': 15,
                'minute': 00
            }),
            endTime: moment().set({
                'hour': 16,
                'minute': 00
            }),
        },
        {
            startTime: moment().set({
                'hour': 16,
                'minute': 00
            }),
            endTime: moment().set({
                'hour': 17,
                'minute': 00
            }),
        },
        {
            startTime: moment().set({
                'hour': 17,
                'minute': 00
            }),
            endTime: moment().set({
                'hour': 18,
                'minute': 00
            }),
        },
    ];


    console.log("indeeexxxxx = " + JSON.stringify(hourlyData));
    /////

    console.log("Moment(hourlyData[index].startTime).format =" + moment(hourlyData[index].startTime).format("YYYY-MM-DD HH:mm:ss"));
    const start_time = moment(hourlyData[index].startTime).format("YYYY-MM-DD HH:mm:ss");
    const end_time = moment(hourlyData[index].endTime).format("YYYY-MM-DD HH:mm:ss");


    $(".reserve").on("click", function () {
        const index = parseInt(localStorage.getItem("court"));
        console.log("reservation index = " + index);
        const court = {
            start_time: start_time,
            end_time: end_time,
            court_numb: parseInt(localStorage.getItem("court")),
            player_id: parseInt(localStorage.getItem("userId"))
        }
 
        //API CALL to reserve A COURT
        $.post("/api/reserve", court)
            .then(res => {

                res.render("/reserve");
                // If there's an error, handle it by throwing up a bootstrap alert
            })
            .catch();



//DELETE THIS
        // $.ajax({
        //   url: "/api/court",
        //   type: "POST",
        //   data: court
        // }).then(function (data) {
        //   console.log("we got yhis back ", data);

        //   $.ajax({
        //     url: "/api/court/" + data.court_numb,
        //     type: "GET"
        //   }).then(function (data) {
        //     console.log("second ajax ", data);
        //   })

        // })
    })

});