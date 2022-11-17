CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE accounts (
    account_id serial NOT NULL,
    uuid uuid DEFAULT uuid_generate_v4() NOT NULL,
    username varchar(20) NOT NULL,
    password text NOT NULL,
    account_type varchar(5) NOT NULL,
    PRIMARY KEY ("account_id"),
);

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

CREATE TABLE delete_requests (
    delete_request_id serial NOT NULL,
    user_id int NOT NULL,
    PRIMARY KEY(delete_request_id),
    CONSTRAINT fk_user
        FOREIGN KEY(user_id)
            REFERENCES accounts(account_id)
            ON DELETE CASCADE
);