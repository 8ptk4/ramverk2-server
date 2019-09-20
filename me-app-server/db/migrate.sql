CREATE TABLE IF NOT EXISTS users (
    username VARCHAR(255) NOT NULL,
    email VARCHAR(60) NOT NULL,
    password VARCHAR(255) NOT NULL,
    birthdate VARCHAR(255) NOT NULL,

    UNIQUE(username)
);