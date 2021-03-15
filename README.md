# flight-scheduler
## Instructions to run the demo application

Open cmd or terminal depending on your machine

 ### Clone app to local
    Prerequisites: Node, Mongodb, Docker & Docker-compose

 ### Set up env
 create .env file at the root dir with the following variables:
    
    DB_NAME=admin_flights
    DB_URI=mongodb://mongo:27017
    PORT=3001
    REACT_APP_FLIGHTS_API_ENDPOINT=/api/flights

### Build docker image

    docker-compose up --build web mongo

Go to [App](http://localhost:3001)