# PERN-Yelp

A yelp clone with built using the PERN stack. No ORM is used in this project and raw SQL queries are written for the backend. The database server is a postgres server on a docker container, the data is persisted in a docker volume. The focus is mainly on the backend and functionality rather than UI in this project. I made this mainly to learn about SQL, Postgres and Docker.

## Commands:

### API

Pull the required nodejs and postgres images from the docker hub, if not present in your system already. Then make a new table in a database in the postgres docker container for the backend:
```bash
docker-compose up -d
# Assuming that the name of the nodejs container is yelp_server
docker exec -it yelp_server bash
npm run migrate
exit
```

Open psql in the postgres docker container:
```bash
# Assuming that the 
# - name of the postgres container is pg_db
# - in the .env file: postgres database name is yelp, user name is docker and the port number is 5432
docker exec -it pg_db psql -U docker -d yelp -p 5432
```

Test that the api is working:
```bash
# Assuming server port is 3000 in the .env file
curl -X GET http://localhost:3000/api/v1/restaurants
```

Close the server and the database's docker containers:
```bash
docker-compose down
```

Remove the persisted data in the docker volumes for the database:
```bash
docker volume rm api_data
```

### Frontend

```bash
npm run dev
```