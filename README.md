
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
  
 ```npm install```

 ```npm run start```

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
