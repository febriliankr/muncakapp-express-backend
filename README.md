# Qs

Gimana caranya bikin auto increment setiap insert data baru? SOLVED

```
ALTER TABLE sellers ADD id_seller int(11) NOT NULL AUTO_INCREMENT,
ADD PRIMARY KEY(id_seller)
```

kurang encryption untuk passwordnya

## Heroku Setting ENV variables

heroku config:set DB_NAME=thenameofthedb