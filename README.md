# BuyHDB

App created using PERN stack (PostgreSQL, ExpressJS, ReactJS, Node.js) as capstone project for General Assembly Software Engineering Immersive Program (Batch 39).

The main purpose of BuyHDB is to assist users in making informed decisions before buying or selling their HDB flats. BuyHDB aims to provide users with a general idea of trends in the resale HDB market.

## Table of Contents

1. Technologies used
2. Installation and Setup
3. Front-End (ReactJS)
4. Back-End (ExpressJS)
5. Planned Next Steps

## Technologies used

React, Express, PostgreSQL, Node.js -- ReactJS for front-end, ExpressJS for back-end, PostgreSQL for database.

Bcrypt was used to hash account passwords.

JSON Web Tokens (JWT) was used to manage logging in/out of BuyHDB.

Bootstrap and MaterialsUI (MUI) were used as CSS framework.

## Installation and Setup

Clone this repository. You will need `node` and `npm` installed globally on your machine.

Install dependencies

```
npm install
```

Commands

```
// start React app
npm start

// start Express
npm run dev

// visit BuyHDB app at localhost:3000
```

## Front-End (ReactJS)

BuyHDB uses ReactJS as front-end framework, repository can be found [here](/frontend/)

- React app includes a login page, user home page, admin home page, where users/admins can carry out tasks from the home page upon logging in.
- User/admin home page includes a navigation bar for users/admins to navigate to other pages within their accounts.

Application Structure

```
--> Login Page
    |--> User Home Page
        // Note: pages below are also accessible from users' navigation bar
        |--> Search Page
        |--> Resources Page
        |--> View Saved Listings Page
        |--> Request Delete Account Page
        |--> Logout
    |--> Admin Home Page
        // Note: pages below are also accessible from admins' navigation bar
        |--> User Accounts Overview
        |--> Delete User Account Requests
        |--> Admin Accounts Overview
        |--> Logout
    |--> Create Account Page
        |--> Sign Up form
```

## Back-End (ExpressJS)

BuyHDB uses ExpressJS as back-end framework, repository can be found [here](/backend/)

Postman was used to test the backend before frontend was available.

### Back-End API Endpoints

`server.js` is the entry point to BuyHDB app, it defines the ExpressJS server. It also contains the route definitions for the APIs. There are a total of 20 APIs used.

#### Shared Routes

1. `POST` `/login` - Login into BuyHDB app for both User and Admin accounts

#### Users Routes

1. `PUT` `/user-create-account` - Create a new User Account
2. `PUT` `/user-create-details` - Create personal details for a new User Account
3. `GET` `/user-get-user-details` - Retrieves personal details for a particular user account
4. `PATCH` `/user-update-details`- Update personal details for a particular user account
5. `PUT` `/user-create-listing` - Saves a past resale transaction record selected by user
6. `POST` `/user-get-all-saved-listings` - Retrieves all past resale transaction records saved by user
7. `DELETE` `/user-delete-one-saved-listing`- Deletes a saved past resale transaction record selected by user
8. `DELETE` `/user-delete-all-saved-listings` - Deletes all past resale transaction record saved by a user
9. `PUT` `/user-create-delete-request` - Creates a delete account request by a user

#### Admin Routes

1. `GET` `/admin-get-all-user-accounts` - Retrieves all user accounts login details (username, password)
2. `GET` `/admin-get-all-user-details` - Retrieves all users' personal details
3. `GET` `/admin-get-all-users-saved-listings` - Retrieves all users' saved listings
4. `DELETE` `/admin-delete-user-saved-listing` - Deletes a user's saved listing
5. `PATCH` `/admin-update-user-account` - Updates a user account's (selected by Admin) login details (username, password)
6. `DELETE` `/admin-delete-user-account` - Deletes a user account (selected by Admin)
7. `GET` `/admin-get-delete-requests` - Retrieves all delete user account requests
8. `GET` `/admin-get-all-admin-accounts` - Retrieves all admin accounts login details (username, password)
9. `DELETE` `/admin-delete-admin-account`- Deletes an admin account
10. `PUT` `/admin-create-account` - Creates an admin account

#### Controllers

`queries.js` connects BuyHDB app to PostgreSQL database (buy_hdb). It also contains the controller definitions for the APIs.

### Database

PostgreSQL was used as database for this app. A total of 4 tables were created (`accounts`, `users_details`, `saved_listings`, `delete_requests`).

1. To create `buy_hdb` database

```
CREATE DATABASE buy_hdb
```

2. To create `UUID` extension

```
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

3. To create `accounts` table

```
CREATE TABLE accounts (
    account_id serial NOT NULL,
    uuid uuid DEFAULT uuid_generate_v4() NOT NULL,
    username varchar(20) NOT NULL,
    password text NOT NULL,
    account_type varchar(5) NOT NULL,
    PRIMARY KEY ("account_id"),
);
```

4. To create `users_details` table

```
CREATE TABLE users_details (
    detail_id serial NOT NULL,
    user_id int NOT NULL,
    given_name varchar(20) NOT NULL,
    current_town varchar(20) NOT NULL,
    current_flat_type varchar(20) NOT NULL,
    current_flat_model varchar(20) NOT NULL,
    current_monthly_combined_income numeric(7,2) NOT NULL,
    current_younger_age numeric(2,0) NOT NULL,
    PRIMARY KEY(detail_id),
    CONSTRAINT fk_user
        FOREIGN KEY(user_id)
            REFERENCES accounts(account_id)
            ON DELETE CASCADE
);
```

5. To create `saved_listings` table

```
CREATE TABLE saved_listings (
    saved_listing_id serial NOT NULL,
    user_id int NOT NULL,
    saved_street_name text NOT NULL,
    saved_block varchar(4) NOT NULL,
    saved_storey_range text NOT NULL,
    saved_floor_area_sqm numeric(3,0) NOT NULL,
    saved_resale_price numeric(7,0) NOT NULL,
    saved_remaining_lease text NOT NULL,
    saved_flat_type varchar(20) NOT NULL,
    saved_flat_model varchar(20) NOT NULL,
    saved_town varchar(20) NOT NULL,
    saved_listing_hdb_id numeric(7,0) NOT NULL,
    PRIMARY KEY(saved_listing_id),
    CONSTRAINT fk_user
        FOREIGN KEY(user_id)
            REFERENCES accounts(account_id)
            ON DELETE CASCADE
);
```

6. To create `delete_requests` table

```
CREATE TABLE delete_requests (
    delete_request_id serial NOT NULL,
    user_id int NOT NULL,
    PRIMARY KEY(delete_request_id),
    CONSTRAINT fk_user
        FOREIGN KEY(user_id)
            REFERENCES accounts(account_id)
            ON DELETE CASCADE
);
```

## Planned Next Steps

### Mortgage Calculator

- The Mortgage Calculator provides a rough idea as to the affordability of HDB flats based on their income and age.
- Users input their personal details such as Combined Monthly Household Income and Current Younger Age. These details will be used to generate rough estimations as to housing mortgage loans that the user can potentially take, either with HDB or with local banks.

### Displaying past resale transactions on a map view using OneMap API

- To allow users to see past resale transactions records by clicking on a particular block on the map
- To provide users with a general idea of resale flats pricing at a certain area on the map
