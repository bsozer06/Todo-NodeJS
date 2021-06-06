CREATE DATABASE todo_database;

--\c into to todo_Database

CREATE TABLE todo (
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);