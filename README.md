<<<<<<< HEAD
<<<<<<< HEAD
# Webservice_change
=======
# Webservice_change_updated
>>>>>>> parent of bca1971 (Updated Readme)
=======
# Webservice_change
>>>>>>> parent of af1d150 (Merge pull request #9 from spmujumdarNEU/Assignment-02)
``Restful API - Node.js``

## About the project
Created a web service using REST API and performed CRU operation using HTTP

## How To Run
* Download Node.js from the official site
* Clone the repository into your local machine using git clone command
* Install PostgreSQL and create database called UserDatabase
* Go to your project folder using cd
* Run npm i command to install all dependencies
* Run npm command start to run the project locally (Run on port 3000)
* Open another terminal and run npm test command to start the unit test
* Using postman run the endpoints mentioned below with appropriate body in JSON format


## Endpoints
* /healthz :

  - *Methods: GET* : 
      - Description: Simple GET api to test (Same as assignment 1).
      - url : /healthz

* /v1/user :
  
  - *Methods: POST* : 
      - url : /v1/user
      - Body: first_name, last_name, username, password
      - Description: Create a new user and store in database

  - *Methods: GET* : 
      - url : /v1/user/self
      - Body: none
      - Description: Fetch data from database

  - *Methods: PUT* : 
      - url : /v1/user/self
      - Body: first_name, last_name, password
      - Description: Update a user details in database

## Features
* Rest APIs
* Base Authentication
* Password Encryption
* Unit Testing 

## Project Structure
* *api.js* : It has it's logic to create server http, routing system and the API services.
* *db.js* : It has database client information
* *controllers/createUser.js* : Logic for creating users that includes create query
* *controllers/updateUser.js* : Logic for updating users that includes update query
* *controllers/viewUser.js* : Logic for view users that includes select query
* *tests/api.test.js* : Contains unit test for api test
* *tests/helper.test.js* : Contains unit test for helper function test
* *utils/helper.js* : Modules for password hash, basic auth and email validation
* *workflow/simple.js* : Github action workflow
  
## Teach Stack
* NodeJs
* ExpressJs Framework
* PostgreSQL
* Jest
* GitHub Action

## External Libraries
* bycrypt
* supertest
