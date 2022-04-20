const express = require("express");
const bp = require('body-parser');
const router = express.Router();
var path = require('path')
const {google} = require("googleapis");
const https = require("https");
const apikey = "503A0495-5E16-4D84-828E-A26F20C79E2A";
app.use(bp.urlencoded({extended:true}));
router
    .route("/")
    .get((req, res) => res.render(path.resolve("public/html/index.ejs")))
     router.post("/", ((req, res) => {
             let summarysstring = req.body.sumarrys;
             // let coin = req.body.sumaryys;
             // let fiat = req.body.currency;
             // let url = "https://rest.coinapi.io/v1/exchangerate/" + coin + "/" + fiat + "?apikey=" + apikey;
             // https.get(url , function (response) {
             //     response.on('data', data => {
             //         let gri = JSON.parse(data)
             //         let rate = gri.rate
             //         res.send("The rate of " + coin + " in " + fiat + " is equal to " + rate)
             //     })
             // })
             const {google} = require('googleapis');
             require('dotenv').config();


// Provide the required configuration
             const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);
             const calendarId = process.env.CALENDAR_ID;

// Google calendar API settings
             const SCOPES = 'https://www.googleapis.com/auth/calendar';
             const calendar = google.calendar({version : "v3"});

             const auth = new google.auth.JWT(
                 CREDENTIALS.client_email,
                 null,
                 CREDENTIALS.private_key,
                 SCOPES
             );
            const TIMEOFFSET = '+00:00';

// Get date-time string for calender
            const dateTimeForCalander = () => {

                let date = new Date();

                let year = date.getFullYear();
                let month = date.getMonth() + 1;
                if (month < 10) {
                    month = `0${month}`;
                }
                let day = date.getDate();
                if (day < 10) {
                    day = `0${day}`;
                }
                let hour = date.getHours();
                if (hour < 10) {
                    hour = `0${hour}`;
                }
                let minute = date.getMinutes();
                if (minute < 10) {
                    minute = `0${minute}`;
                }

                let newDateTime = `${year}-${month}-${day}T${hour}:${minute}:00.000${TIMEOFFSET}`;

                let event = new Date(Date.parse(newDateTime));

                let startDate = event;
                // Delay in end time is 1
                let endDate = new Date(new Date(startDate).setHours(startDate.getHours()+3));

                return {
                    'start': startDate,
                    'end': endDate
                }
            };

            console.log(dateTimeForCalander())
// Insert new event to Google Calendar
            const insertEvent = async (event) => {

                try {
                    let response = await calendar.events.insert({
                        auth: auth,
                        calendarId: calendarId,
                        resource: event
                    });

                    if (response['status'] == 200 && response['statusText'] === 'OK') {
                        return 1;
                    } else {
                        return 0;
                    }
                } catch (error) {
                    console.log(`Error at insertEvent --> ${error}`);
                    return 0;
                }
            };

            let dateTime = dateTimeForCalander();
            let event = {
                'summary': `${summarysstring}`,
                'description': `This is the description.`,
                'start': {
                    'dateTime': dateTime['start'],
                    'timeZone': 'Asia/Kolkata'
                },
                'end': {
                    'dateTime': dateTime['end'],
                    'timeZone': 'Asia/Kolkata'
                }
            };

            insertEvent(event)
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                });



        })
    )


module.exports =router;