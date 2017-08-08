DROP DATABASE IF EXISTS taskmon;

CREATE DATABASE taskmon;

USE taskmon;

DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS users_tasks;

CREATE TABLE users (
    id int NOT NULL AUTO_INCREMENT,
    username VARCHAR(255) UNIQUE,
    token VARCHAR(255),
    PRIMARY KEY (id)

);

CREATE TABLE tasks (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255),
    parentid INT DEFAULT NULL,
    budget_hours int NOT NULL,
    actual_hours int DEFAULT NULL,
    owner INT DEFAULT NULL,
    status INT DEFAULT -1,
    PRIMARY KEY (id),
    FOREIGN KEY (parentid) REFERENCES tasks (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (owner) REFERENCES users (id)
);

CREATE TABLE users_tasks (
    id int NOT NULL AUTO_INCREMENT,
    user_id int,
    tasks_id int,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (tasks_id) REFERENCES tasks (id)
);