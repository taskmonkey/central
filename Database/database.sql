DROP DATABASE IF EXISTS taskmon;

CREATE DATABASE taskmon;

USE taskmon;

DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS users_tasks;

CREATE TABLE users (
    id int NOT NULL AUTO_INCREMENT,
    username VARCHAR(255) UNIQUE,
    image VARCHAR(255) DEFAULT "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg",
    title VARCHAR(255) DEFAULT "Task Monkey",
    status VARCHAR(255) DEFAULT "Active",
    PRIMARY KEY (id)

);

CREATE TABLE tasks (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255),
    description VARCHAR(255),
    parentid INT DEFAULT NULL,
    budget_hours int NOT NULL,
    actual_hours int DEFAULT 0,
    owner INT DEFAULT NULL,
    status INT DEFAULT -1,
    deficiency INT DEFAULT 0,
    assignee VARCHAR(255),
    PRIMARY KEY (id),
    FOREIGN KEY (parentid) REFERENCES tasks (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (owner) REFERENCES users (id)
);

CREATE TABLE users_tasks (
    id int NOT NULL AUTO_INCREMENT,
    user_id int,
    tasks_id int,
    difficulty int,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (tasks_id) REFERENCES tasks (id)
);
