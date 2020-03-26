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

    const start_time = moment(hourlyData[index].startTime).format("YYYY-MM-DD HH:mm:ss");
    const end_time = moment(hourlyData[index].endTime).format("YYYY-MM-DD HH:mm:ss");


    $(".reserve").on("click", function () {
        //make API call to get current user info
        const playerId = parseInt(localStorage.getItem("userId"));
        const courtId = parseInt(localStorage.getItem("court"));

        //API CALL to save user info
        $.get(`/api/userProfile/${playerId}`)
            .then(res => {
                const court = {
                    start_time: start_time,
                    end_time: end_time,
                    partner: true,
                    CourtId: parseInt(courtId),
                    PlayerId: parseInt(playerId),
                    PlayerName: `${res.first_name} ${res.last_name}`
                }

                //API CALL to reserve A COURT
                $.post("/api/reserve", court)
                    .then(res => {
                        window.location.replace("/reserve");
                    })
                    .catch(err => {
                        console.log(err);
                    });
            })
            .catch(err => {
                console.log(err);
            });
    })


})