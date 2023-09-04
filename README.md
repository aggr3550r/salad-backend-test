
## Description

This is a simple server that is powered by NodeJS(ExpressJS), TypeScript and PostgreSQL - a powerful combination of top choice modern technology. It is built in partial fulfilment of the interview requirements at Salad Africa.

## Running the app

In order to run the app, the first thing you need to do is create a .env file in the root of your project. The .env file should be like the one below
```bash
# APP
PG_HOST=localhost
PG_PORT=5432
PG_USER=victor
PG_PASSWORD=killshot
PG_DATABASE=salad_backend_store

# JWT
COOKIE_KEY=695ce164-3133-11ed-a261-0242ac120002
JWT_SECRET=e3376540-31b5-11ed-a261-0242ac120002
JWT_EXPIRES_IN=24h
JWT_COOKIE_EXPIRES_IN=24
```

With that out of the way, there are two possible paths along which to proceed enumerated below:
### * Local Server
### * Dockerfile
-----------------------------------------------------------------------------------------------
#### Local Server 
To run the app on your local machine take the following steps:
- Step One:
  Clone this github reposiory onto your local machine.

- Step Two:
  While you are in the root directory of the project, run the following in your terminal in succession:

  
 ```
 npm install
```

 ```
 npm run start
```

Your server should have started running locally on port 8086 or any other port specified in you _.env_ at this point. You can access the resources at @ **http://localhost:8086/api/v1**


#### Dockerfile
To run the app using the Dockerfile provided, take the following steps:
- Setup:
  Fire up Docker Desktop to make sure that the Docker daemon is up and running
  
- Build the docker image:
  Run the following command in the terminal from the root directory of the project:
 ```
 docker build -t image-name:tag .
 ```
 
 - Run the container:
  Run the following command in the terminal from the root directory of the project:
 ```
docker run -d -p 8080:80 image-name:tag
 ```
  For example, this is the command I personally use:
 ```
 docker run -d -p 3000:3000 salad-backend-image:tag
 ```

#### Note:
If you are to start the application using docker, your local .env will be mounted onto your docker image automatically while building the image.
As a result of this, if your application is to start without any hitches, the **PG_HOST** environment variable in your _.env_ file should be
changed from _localhost_ to _host.docker.internal_.

That should do it, your server is up and ready for use @ **http://host.docker.internal:3000/api/v1** ! 



## Documentation

Here is a link to the clear and concise API documentation published via Postman: **https://documenter.getpostman.com/view/23331716/2s9Y5eLype**

#### Preliminary
The source code itself contains some documentation that gives the reader insight into my thought process regarding some decisions taken and solutions adopted however that might not be enough so I will compliment it with some empha
sis here.

#### Scope
I went ahead to implement some basic functionality using the provided API collection @ **https://graphql.anilist.co**
as a guide. I chose not to implement all of the fields in the API documentation referenced because I thought that it contained a lot of data that would make unnecessarily convoluted the scope of our work as far as this test is concerned.

The aim of the code is to demonstrate technical prowess with the technologies required which I believe is what I have done extensively. 

#### Programming Paradigm
Given the provision of TypeScript, I have gone ahead to adopt a strong OOP style of programming to implement functionalities so as to give us the perfect blend of flexibility and structure to work with.

#### Exception Handling
I have also made sure that the exception handling is exceptional indeed by not only wrapping the entire application in try-catch expressions but also using TypeScript to define exceptions robustly and skillfully choosing where to throw exceptions and where to simply return the contents of exceptions thrown in order for our application to function as reliably as possible and handle errors and exceptions with a minimum of fuss.

As we can see when we look at our application, we have established the concept of our custom _AppError_ which is only used at the service level to communicate exceptions emanating during the execution of service code to external consumers of the service code without deciding exactly how the application renders this exceptions to the final client. 

At the controller level, we have our custom _ResponseModel_ serving as a central interface for communicating information about our application (exceptions and other occurences alike) to the outside world in a consistent manner. This is useful because it serves the client well if it knows exactly where to look for vitals such as _statusCode_, _message_ and _data_ in each response it receives from our application.


#### Database
I applied some database normalization techniques when creating the Page model and its surrounding data -  particularly Likes and Rating. I did this to make sure that I eliminate duplication of business resources even at the data definition level.

At the database level, we try to use the concept of inheritance to reduce the duplication of our code when defining entities that are similar.


