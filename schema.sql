create database if not exists villagers;

use villagers;

create table users (
    id integer PRIMARY KEY AUTO_INCREMENT,
    tg_id integer UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    villagers integer NOT NULL
);