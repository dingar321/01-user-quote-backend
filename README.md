# 01-user-quote-backend
First project of the "SkillUp Mentor" program.

## General info
Full-stack application that will allow the user to register, write one paragraph of a motivational quote, review other already registered users and their quotes and upvote or downvote already published quote.

The project containts an ".env" file which needs to be configured before using. 

## Purpose of the project
The main purpose of the project is to learn full-stack development. The second purpose is to learn new technologies such as Typescript NestJs, PostgreSQL, TypeORM.

## Technologies
- NestJs
- PostgreSQL
- DBeaver
- TypeORM
- Swagger

## Contributors
- Dino Garić

## Usefull link
- Directory structure: https://tinyurl.com/yckkw29h
- Authentications (JWT Tokens): https://tinyurl.com/2spzsd4x
- Password hashing: https://tinyurl.com/y25vtdvd

## Encountered errors
- PosgreSQL's tool "pgAdmin" didnt sucesfully install on my computer database cluster initialisation failed. So i switched to "Docker" and created a container. After that was created i used an UDM called "DBeaver" to manipulate with my database.
- When trying to generate a new migration, the terminal throws back *Error during migration generation: error: password authentication failed for user "Dino"*. The problem is that the ".env" and "ormconfig.js" file contain a diffrenet user. Still looking for a solution.
