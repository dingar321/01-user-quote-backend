# 01-user-quote-backend
## General info
This is the first project in the "SkillUp Mentor" program. The assignment is a full-stack application that allows the users to register and login, write *one* paragraph of a motivational quote, view other users quotes and vote on them eq. Upvote and down vote. Technologies that will be used in this project: Typescript NestJs, PostgreSQL, DBeaver, Docker, Swagger.

The main purpose of this project is to learn full-stack development and the workflow that comes with developing full-stack applications. The second purpose is to learn new technologies such as in this case: Typescript NestJs and PostgreSQL as well as many other libraries that are described below.

This repository is the back-end part of the project. It is an API written in NestJs that has a database using PostgreSQL running virtually in a Docker container. To make life easier I am also using a UDT tool called DBeaver to view my database. The database contains two tables "users" and "quotes" that are connected through a one-to-one relation. The passwords are hashed using the Bcrypt library. To test the API I am using the Swagger library.

## Setup
To setup the API first we need to configure the ".env" file with the database information and the "docker-compose.yml" to start a PostgreSQL image in a container (both files are located in the root directory). To start the docker image type the command in the CLI  `docker-compose up -d` and if we want to stop it simply type `docker-compose down`. If we ever change the database entities we can simply generate a new migration by typing `npx typeorm migration:generate -n <name>` and to apply the changes type `npx typeorm migration:run`.

## NestJs librarys
- <b>Passport:</b> a popular node.js authentication library. It is an essential part of almost every application. </br>
To test the tokens go to: https://jwt.io/ and for a really good tutorial: https://tinyurl.com/2spzsd4x </br>
Library installation command: </br>
`npm install --save @nestjs/jwt passport-jwt` </br>
`npm install --save-dev @types/passport-jwt` </br>
`npm  i -S @nestjs/passport` </br>

- <b>TypeORM:</b> a tool that maps entities to database tables, works really well with PostgreSQL </br>
Library installation command: </br>
`$ npm i --save @nestjs/typeorm typeorm`<br>

- <b>Swagger:</b> a language-agnostic format used to describe and test RESTful APIs </br>
Documentation for setup: https://docs.nestjs.com/openapi/introduction <br>
A guide to enable token setup in Swagger: https://tinyurl.com/y6zxj6sz <br>
A guide on how to use: https://tinyurl.com/52nxbxnz <br>
Library installation command: </br>
`npm install --save @nestjs/swagger swagger-ui-express` </br>

- <b>Bcrypt:</b> A library to help you hash passwords. </br>
Good read for safety tips: https://tinyurl.com/msxnrbw3 </br>
Import: `import * as bcrypt from 'bcrypt';`
Library installation command:  </br> 
`$ npm i bcrypt` </br>
`$ npm i -D @types/bcrypt` </br>

- <b>Directory structure:</b> not a library, but a very good read </br>
 https://tinyurl.com/yckkw29h <br>

## Usefull links
- Authentication acces in NestJs Swagger Explorer: <br>
https://stackoverflow.com/questions/54802832/is-it-possible-to-add-authentication-to-access-to-nestjs-swagger-explorer
