## This repository is an api to manage the VisualMeeting application plugins. This api is responsible for managing plugin upload, plugin versioning and user management.

You can find repository of VisualMeeting here: [VisualMeeting](https://github.com/brutalzinn/zoom-monitor-googlesheets)


## Requeriments:

1. ElasticSearch
2. Relational database compatible with Sequelize ORM
3. RabbitMQ server( not implement yet )

## Installation with Docker:

1. Open the cloned folder
2. Run this command:
```
$ docker-compose up
```
3. Wait docker compose run all requeriments to a container

## Installation without Docker:

Waiting readme update..


## Small Elastic Search Helper CLI

This project has a small elastic search cli to help my development with elastic search engine. This project its my first time using this. Soo.. i wrote a small cli using commander package to give me a best first time user experience

Use this command to view all commands avaible:

```
$ node elastic-sync.js
```

## Package Commands avaible

    "start": "node ./app.js" - to start normal mode,
    "dev": "nodemon -L ./app.js - to start with nodemon",
    "refresh": "npx sequelize-cli db:migrate:undo:all && npx sequelize-cli db:migrate && node ./elastic-sync.js del:all && npx sequelize-cli db:seed --seed user.js" - sometimes i need to perform some changes in database.. this command execute a clear on database and clear all indexs in elastic search





