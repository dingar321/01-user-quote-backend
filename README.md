# 01-user-quote-backend
## General info
This is the first project in the "SkillUp Mentor" program. The assignment is a full-stack application that allows the users to register and login, write *one* paragraph of a motivational quote, view other users quotes and vote on them eq. Upvote and down vote. Technologies that will be used in this project: Typescript NestJs, PostgreSQL, DBeaver, Docker, Swagger.

The main purpose of this project is to learn full-stack development and the workflow that comes with developing full-stack applications. The second purpose is to learn new technologies such as in this case: Typescript NestJs and PostgreSQL as well as many other libraries that are described below.

This repository is the back-end part of the project. It is an API written in NestJs that has a database using PostgreSQL running virtually in a Docker container. To make life easier I am also using a UDT tool called DBeaver to view my database. The database contains two tables "users" and "quotes" that are connected through a one-to-one relation. To test the API I am using the Swagger library.

## Setup
To setup the API first we need to configure the ".env" file with the database information and the "docker-compose.yml" to start a PostgreSQL image in a container (both files are located in the root directory). To start the docker image type the command in the CLI  `npm docker-compose up -d` and if we want to stop it simply type `npm docker-compose down`. If we ever change the database entities we can simply generate a new migration by typing `npx typeorm migration:generate -n <name>` and to apply the changes type `npx typeorm migration:run`.

## NestJs librarys
- Passport: a popular node.js authentication library. It is an essential part of almost every application. </br>
To test the tokens go to: https://jwt.io/ and for a really good tutorial: https://tinyurl.com/2spzsd4x </br>
Library installation command: </br>
`npm install --save @nestjs/jwt passport-jwt` </br>
`npm install --save-dev @types/passport-jwt` </br>

- TypeORM: a tool that maps entities to database tables, works really well with PostgreSQL </br>
Library installation command: </br>
`$ npm i --save @nestjs/typeorm typeorm`

- Swagger: a language-agnostic format used to describe and test RESTful APIs </br>
Documentation for setup: https://docs.nestjs.com/openapi/introduction
A guide on how to use: https://tinyurl.com/52nxbxnz
Library installation command: </br>
`npm install --save @nestjs/swagger swagger-ui-express` </br>

- Bcrypt: A library to help you hash passwords. </br>
Good read for safety tips: https://tinyurl.com/msxnrbw3 </br>
Import: `import * as bcrypt from 'bcrypt';`</br> 
Library installation command:  </br> 
`$ npm i bcrypt` </br>
`$ npm i -D @types/bcrypt` </br>

- Directory structure: not a library, but a very good read </br>
 https://tinyurl.com/yckkw29h


