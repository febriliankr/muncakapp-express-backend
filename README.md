# Backend for MuncakApp

## Todo List

- [ ] kurang encryption untuk passwordnya
- [ ] CRUD Functions untuk Admin dan Products

## Heroku Setting ENV variables

heroku config:set DB_NAME=thenameofthedb

## Heroku Deploying

```
git add .
git commit -m "x"
git push heroku master
```

## Running on local server

`node index.js`

## Questions arising while coding

Gimana caranya bikin auto increment setiap insert data baru? SOLVED

```
ALTER TABLE sellers ADD id_seller int(11) NOT NULL AUTO_INCREMENT,
ADD PRIMARY KEY(id_seller)
```

## REST API ROUTES

- /getSellers `GET`
- /getSeller/:id `GET`
- /deleteSeller/:id `GET`
- /addSeller `POST`
- /updateSeller/:id `POST`