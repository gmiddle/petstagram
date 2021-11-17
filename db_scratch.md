# Scratch File

## PSQL commands

```psql
CREATE USER spacestagram_user WITH PASSWORD 'password' SUPERUSER;

CREATE DATABASE spacestagram_db WITH OWNER spacestagram_user;
```

## Sequelize commands



```bash
npx sequelize model:generate --name User --attributes username:string,email:string,hashedPassword:string,bio:string,profilePic:string

npx sequelize model:generate --name Post --attributes description:string,imgUrl:string,userId:integer

npx sequelize model:generate --name Comment --attributes content:string,postId:integer,userId:integer

npx sequelize model:generate --name Follow --attributes accepted:boolean,followerId:integer,followingId:integer

npx sequelize model:generate --name Like --attributes userId:integer,postId:integer


npx sequelize seed:generate --name demo-user
npx sequelize seed:generate --name seed_posts
npx sequelize seed:generate --name seed_comments
npx sequelize seed:generate --name seed_likes
npx sequelize seed:generate --name seed_follows

npx dotenv sequelize db:migrate

npx dotenv sequelize db:migrate:undo:all

npx dotenv sequelize db:seed:all

npx dotenv sequelize db:seed:undo:all

npx dotenv sequelize db:drop

npx dotenv sequelize db:create
```

## Combined Code for drop/migrate/seed

local reset only

```bash
npx dotenv sequelize db:drop && npx dotenv sequelize db:create && npx dotenv sequelize db:migrate && npx dotenv sequelize db:seed:all
```

Heroku reset

```bash
npx dotenv sequelize db:seed:undo:all && npx dotenv sequelize db:migrate:undo:all && npx dotenv sequelize db:migrate && npx dotenv sequelize db:seed:all


heroku run npm run sequelize db:migrate

heroku run npm run sequelize db:seed:all


heroku run npx sequelize-cli db:seed:undo:all
heroku run npx sequelize-cli db:migrate:undo:all
heroku run npx sequelize-cli db:migrate
heroku run npx sequelize-cli db:seed:all
```

Seed only reset

```bash
npx dotenv sequelize db:seed:undo:all && npx dotenv sequelize db:seed:all
```