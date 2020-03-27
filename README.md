# Ravens Athletic Club

You can visit the deployed site [here](https://secure-beach-74289.herokuapp.com/)

## Table of Contents 

* [User Story](#UserStory)
* [Acceptable Criteria](#AcceptableCriteria)
* [Description](#Description)
* [Technologies Used](#TechnologiesUsed) 
* [License](#License)
* [Badges](#Badges)


## User Story
AS an athletic club manager
I want to be able to manage the courts 
So that I know who is using the tennis courts at any given time

AS a member of Ravens Athletic Club
I want to be able to view available tennis courts
SO that I can make a reservation at any time without coming in

AS a member of Ravens Athletic Club
I want to be able to view hours of operation for the different facilities
So that I know what times I can be at the club to take advantage of them

## Acceptable Criteria
GIVEN that I am an authenticated user
When I log into the application
I get the option to reserve a court
If there is a court available at the time, I will get a confirmation email, and if I had indicated that I would like a partner, a partner is suggested for me
If there is no court available, I am added to the waitlist and moved up if a reservation is cancelled

## Description 
This is an application for an athletic club containing tennis courts, a basketball court, and a pool. At its most basic level, the application requires users to either create an account, or sign into a previously created account

![landingPage](./public/images/landing.png) 

Once logged in, users can view their profile, make edits, as well as see any reservations they may have booked. 

![ProfilePage](./public/images/profile.png)

In the event that a user would like to book a tennis court, if available/ appropriate, the app will also suggest partners for play.

![Reservations](./public/images/reservations.png)

## Technologies Used
This application is built with standard HTML5, and CSS.
It also makes use of the below technologies;

* Sequelize
* Handlebars
* Passport
* MySQL


## License

MIT License

Copyright (c) [2020] [The Witty Ravens]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


## Badges

![GitHub last commit](https://img.shields.io/github/last-commit/mesayb/ravens-athletic-club)
