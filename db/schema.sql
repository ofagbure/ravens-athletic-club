DROP DATABASE if exists HawksAthletics;

CREATE DATABASE HawksAthletics;

USE HawksAthletics;

DROP TABLE if exists UserProfiles;

CREATE TABLE UserProfiles
(
  UserID INT PRIMARY KEY NOT NULL,
  UserFirstName VARCHAR (100) NOT NULL,
  UserLastName VARCHAR (100) NOT NULL,
  UserName VARCHAR(50) NOT NULL,
  UserPassword VARCHAR(50) NOT NULL,
  UserEmail VARCHAR(100) NOT NULL,
  PartnerPreference BOOLEAN NOT NULL
);

DROP TABLE if exists Courts;

CREATE TABLE Courts
(
  CourtName INT NOT NULL AUTO_INCREMENT,
  9am VARCHAR(50),
  10am VARCHAR(50),
  11am VARCHAR(50),
  12noon VARCHAR(50),
  1pm VARCHAR(50),
  2pm VARCHAR(50),
  3pm VARCHAR(50),
  4pm VARCHAR(50)
);

DROP TABLE if exists Reservations;

CREATE TABLE Reservations
(
    CourtName INT NOT NULL,
    TimeSlot VARCHAR(6) NOT NULL,
    UserName VARCHAR(30) NOT NULL,
    PartnerPresent BOOLEAN NOT NULL
);


