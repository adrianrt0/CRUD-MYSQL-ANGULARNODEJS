create database datos1;

use datos1;

create table game(
    id int(11) not null auto_increment primary key,
    title VARCHAR(180),
    description VARCHAR(255),
    image VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

describe game;