# Indie Campers Technical Assessment

## Instructions to run the application

1. Clone the repository.

> git clone https://github.com/BernardoFMF/indie-campers-challenge.git

2. Install [PostgreSQL](https://www.postgresql.org/download/).

3. Create a database on PostgreSQL.

4. Run the scripts present on the [sql_scripts]() directory in the following order:

    1. **create.sql**
    2. **functions.sql**
    3. **insert.sql**

    It's important to run all the above scripts, as the assessment requirements do not require any creation endpoints, and so data insertion with the script is important.
    
    
    If you need to delete the tables you can also run the **drop.sql** script.

5. Install [NodeJs](https://nodejs.org/en/).

6. Install all necessary dependencies, running the following command on the [server](https://github.com/BernardoFMF/indie-campers-challenge/tree/main/server) directory.

    - If you are using npm:
        > npm install
    - If you are using yarn:
        > yarn install

7. Add the following environment variable to your machine. Must follow the pattern "key"="value":

- **PORT** - represents the port in which the server will run.
- **INDIE_DB_CONNECTION_STRING** - represents the connection string to connect to the database. It follows the format:

    > postgres://\<**user**>:\<**password**>@\<**host:port**>/\<**database name**>

- [OPTIONAL] **CORS_ORIGIN** - optional environment variable. Specifies the origin of the HTTP request. If you don't add this variable, by default the origin will be **localhost:3000**.

8. To start the server use the following command on the [server](https://github.com/BernardoFMF/indie-campers-challenge/tree/main/server) directory.

    - If you are using npm:
        > npm run dev
    - If you are using yarn:
        > yarn dev

## Additional notes

- If you want to see the documentation, follow the steps from the section above and access the following endpoint:

HTTP method | Path 
--- | --- 
GET | /api-docs

- Otherwise the following table contains a brief description of all endpoints:

HTTP method | Path | Params | Query | Body | Description
--- | --- | --- | --- | --- | --- 
GET | /api/routes | none | **start_location** - string; **end_location** - string | none | Fetches a list of routes that have the same start_location and end_location sent
GET | /api/routes/:id | **id** - integer | none | none | Fetches a specific route
GET | / api/landmarks/geo | none | **latitude** - numeric string; **longitude** - numeric string | none | Fetches the closest landmark given the geographic point