# Smartcar API

The Generic Motors (GM) car company has terrible API. It returns badly structured JSON which isn't always consistent. Smartcar needs to adapt the API into a cleaner format. 

### Requirement
1. Docker (https://www.docker.com/get-started)

## The flow will be something like this:
   ![Image of Flow](./smartcar_api_flow.png)

### Deployment
   1. Clone the repo `git clone git@github.com:patelya22/smartCarAPI.git`
   2. Build the Project locally.
      ```
         docker-compose build
      ```
   3. Runing the server
      ```
         docker-compose up
      ```
   4. You should be able to see server up and running. you can check at http://localhost:3000/healthcheck-basic
   5. To see API documentation please visit http://localhost:3000/api-docs/

### Testing
   This project has the workflow set up for testing. whenever there is going to be a new commit, the auto run will run the test. :) 
   To test it locally please run the following.
   ```npm run test```
