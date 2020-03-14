DROP DATABASE IF EXISTS ravens_athletic;

CREATE DATABASE ravens_athletic;

USE ravens_athletic;

CREATE TABLE IF NOT EXISTS reservation (
    id INT(12) NOT NULL AUTO_INCREMENT,
    checkinTime DATETIME NOT NULL,
    checkoutTime DATETIME NOT NULL,
    reservation_detail_id int(12) NOT NULL,
    PRIMARY KEY(id)
);


CREATE TABLE IF NOT EXISTS reservation_court (
    id INT(12) NOT NULL AUTO_INCREMENT,
    reservation_id int(12) NOT NULL,
    court_id int(12) NOT NULL,
    PRIMARY KEY(id)
);

-- 1 - Fundamental Awareness (basic knowledge)
-- 2 - Novice (limited experience)
-- 3 - Intermediate (practical application)
-- 4 - Advanced (applied theory)
-- 5 - Expert (recognized authority)


CREATE TABLE IF NOT EXISTS players (
    id INT(12) NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    need_partner BOOLEAN DEFAULT false,
    skill_level INT(1),
    activity VARCHAR(255) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS court (
   id INT(12) NOT NULL AUTO_INCREMENT,
   court_numb INT(6) NOT NULL,
   address VARCHAR(255) NOT NULL,
    PRIMARY KEY(id)
);

INSERT INTO court (court_numb, address) VALUES (001, "Alpharetta"),(002, "Duluth"),(003, "Atlanta");

INSERT INTO players (first_name, last_name, need_partner, activity) VALUES ('Mesay', 'Bekele', true, 'Tennis'),('James', 'Craine', false, 'Tennis'),('Femi', 'Fagbure', true, 'Tennis');

SELECT * FROM court;
SELECT * FROM players;


