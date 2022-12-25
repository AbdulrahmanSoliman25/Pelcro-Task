# Pelcro Task (Customers Tool)

## Description

```
Customers Tool , admin can login & list,create,update,delete his/ her customer/s.
Also on customer creation system will send a welcome mail to the provided email asychrounsly ...

built with:
    -fontend :  VueJs , Vuex ,VueRouter,Vuetify ,and Axios .
    -Backend :  Php-Laravel
wrapped with Docker and Docker Compose.

```

## Project setup using Docker Compose

```
- kindely make sure that you have docker && docker compose installed on your machine,
in the backend directory just kindely rename ".env.example" file to ".env" AND set your email server credential , then run the following commands in the terminal:

- docker compose up --build

- in another terminal run these commands:
- docker compose run --rm artisan optimize
- docker compose run --rm artisan key:generate
- docker compose run --rm artisan migrate --seed
- docker compose run --rm artisan queue:work

- now you can enjoy the app on http://localhost:3000/

-NOTES  :
The Generated Admin Cridentioals is :
                                    - email : "admin@pelcro.com"
                                    - password : "password"
```
