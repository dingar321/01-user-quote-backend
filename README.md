<h1 align="center"> 01-user-quote-backend </h1>

<!-- ---------------------------------------------------------------------------------------------------------------------------------------------------- -->
## General info
This is the first project in the "SkillUp Mentor" program. The assignment is a full-stack application that allows the users to register and login, write *one* paragraph of a motivational quote, view other users quotes and vote on them eq. Upvote and down vote. Technologies that will be used in this project: Typescript NestJs, PostgreSQL, DBeaver, Docker, Swagger.

The main purpose of this project is to learn full-stack development and the workflow that comes with developing full-stack applications. The second purpose is to learn new technologies such as in this case: Typescript NestJs and PostgreSQL as well as many other libraries that are described below.

This repository is the back-end part of the project. It is an API written in NestJs that has a database using PostgreSQL running virtually in a Docker container. To make life easier I am also using a UDT tool called DBeaver to view my database. The database contains two tables "users" and "quotes" that are connected through a one-to-one relation. The passwords are hashed using the Bcrypt library. To test the API I am using the Swagger library.

The front-end part of this project: [01-user-quote-frontend](https://github.com/dingar321/01-user-quote-frontend) 
<!-- ---------------------------------------------------------------------------------------------------------------------------------------------------- -->
## Setup
The most important requirement is the [node.js](https://nodejs.org/en/) framework installed. We are also goint to configure the ".env" file with the database information and the "docker-compose.yml" to start a PostgreSQL image in a container (both files are located in the root directory). To start the docker image type the command in the CLI  `docker-compose up -d` and if we want to stop it simply type `docker-compose down`. If we ever change the database entities we can simply generate a new migration by typing `npx typeorm migration:generate -n <name>` and to apply the changes type `npx typeorm migration:run`.
<!-- ---------------------------------------------------------------------------------------------------------------------------------------------------- -->
## Features:
| Feature                   | Protected (logged in) | Input (values that must be provided by the user)                                                                                        | Verification (provided values are sent to the backend for verification)                                                                                                                 | Return (only executes if the verification process was successful)         |
|---------------------------|--------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------|
| **Registration**          | No                                               | The user provides the email (must be unique), first name, last name and password (must be confirmed)                                    | Checks if the provided email is unique, if the values exceed the set character limit and that the passwords is strong enough and matches the confirmation                               | The user is created                                                       |
| **Login**                 | No                                               | The user provides an email and a password                                                                                               | Checks if a user with the provided email exists and that the password matches that user                                                                                                 | The user is authenticated                                                 |
| **Profile page**          | Yes                                              | N/a                                                                                                                                     | Checks if the user exists                                                                                                                                                               | Opens the users profile page                                              |
| **Change password**       | Yes                                              | The user provides a new password and the current registered password (the new password can't be the same as the current registered one) | Checks if the current password is correct and that it's not the same as the new one and checks if the password doesn't exceed the set character limit and it must also be strong enough | The users password is changed to the new one                              |
| **Add or update quote**   | Yes                                              | The user provides a single paragraph quote                                                                                              | Checks if the same quote already exists and the that the quote doesn't exceed the 300 character limit                                                                                   | The users quote is posted or updated if a quote has already been posted   |
| **Feed with user quotes** | No                                               | N/a                                                                                                                                     | N/a                                                                                                                                                                                     | Opens a scrollable feed with all the other users that have posted a quote |
| **Upvoting quotes**       | Yes                                              | N/a                                                                                                                                     | Checks if the user that we want to upvote exist and has a quote                                                                                                                         | Selected quote will be upvoted                                            |
| **Downvoting quotes**     | Yes                                              | N/a                                                                                                                                     | Checks if the user that we want to downvote exist and has a quote                                                                                                                       | Selected quote will be downvoted                                          |
<!-- ---------------------------------------------------------------------------------------------------------------------------------------------------- -->
## NestJs librarys & usefull links
- <b>Passport:</b> a popular node.js authentication library. It is an essential part of almost every application. </br>
[To test the tokens](https://jwt.io/), [A really good tutorial](https://www.youtube.com/watch?v=e5qk1Xruwso) </br>
Library installation command: </br>
`npm install --save @nestjs/jwt passport-jwt` </br>
`npm install --save-dev @types/passport-jwt` </br>
`npm  i -S @nestjs/passport` </br>

- <b>TypeORM:</b> a tool that maps entities to database tables, works really well with PostgreSQL </br>
[One-to-one relations using TypeORM and how to handle them](https://github.com/typeorm/typeorm/blob/master/docs/one-to-one-relations.md), [Cascades and how to handle them using TypeORM](https://github.com/typeorm/typeorm/blob/master/docs/relations.md#cascades) <br>
A good read: [Why working with UUIDs instead of IDs is better](https://itnext.io/why-working-with-uuids-instead-of-ids-is-better-b60d22caf601) <br>
Library installation command: </br>
`$ npm i --save @nestjs/typeorm typeorm`<br>

- <b>Swagger:</b> a language-agnostic format used to describe and test RESTful APIs </br>
[Documentation for setup](https://docs.nestjs.com/openapi/introduction), [A guide to enable token setup in Swagger](https://www.youtube.com/watch?v=r0TP4DdXeIk), [A guide on how to use](https://docs.nestjs.com/openapi/types-and-parameters#types-and-parameters) <br>
[Authentication acces in NestJs Swagger Explorer](https://stackoverflow.com/questions/54802832/is-it-possible-to-add-authentication-to-access-to-nestjs-swagger-explorer) </br>
Library installation command: </br>
`npm install --save @nestjs/swagger swagger-ui-express` </br>

- <b>Bcrypt:</b> A library to help you hash passwords. </br>
[Good read for safety tips](https://codahale.com/how-to-safely-store-a-password/) </br>
Import: `import * as bcrypt from 'bcrypt';`</br> 
Library installation command:  </br> 
`$ npm i bcrypt` </br>
`$ npm i -D @types/bcrypt` </br>
<!-- ---------------------------------------------------------------------------------------------------------------------------------------------------- -->
# License:
This assignment is protected with SkillUp Mentor copyright. The Candidate may upload the assignment on his closed profile on GitHub (or other platform), but any other reproduction and distribution of the assignment itself or the assignment’s solutions without written permission of SkillUp Mentor is prohibited.
