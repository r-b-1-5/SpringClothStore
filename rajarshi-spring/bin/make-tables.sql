DROP TABLE discount;
DROP TABLE new_arrival;
DROP TABLE product;
DROP TABLE category;

DROP TABLE order_item;
DROP TABLE order_detail;

DROP TABLE user;

DROP TABLE drop_off_point;

CREATE TABLE category(
    id INTEGER PRIMARY KEY,
    category_name CHAR(128) UNIQUE
);

CREATE TABLE product(
    id INTEGER PRIMARY KEY,
    product_name CHAR(256),
    product_description CHAR(1024),
    category_id INTEGER REFERENCES category(id),
    price NUMBER(10),
    image_file_url CHAR(1024),
    footnote CHAR(1024),

    availabile_quantity INTEGER,
    inventory_quantity INTEGER
);

CREATE TABLE discount(
    id INTEGER PRIMARY KEY,
    product_id INTEGER REFERENCES product(id),
    discount_percentage NUMBER(5, 2)
);

CREATE TABLE new_arrival(
    id INTEGER PRIMARY KEY,
    product_id INTEGER REFERENCES product(id)
);

CREATE TABLE user(
    id INTEGER PRIMARY KEY,
    user_username CHAR(256),
    user_password CHAR(256)
);

CREATE TABLE order_detail(
    id INTEGER PRIMARY KEY,

    -- Basic shipping info.
    email_address CHAR(256),
    mobile_number CHAR(256),
    first_name CHAR(256),
    last_name CHAR(256),
    shipping_address CHAR(256),
    shipping_city CHAR(256),
    shipping_state CHAR(256),
    shipping_country CHAR(256),
    shipping_zip_code CHAR(256),

    -- Delivery method.
    delivery_method CHAR(256),

    -- Payment details.
    card_number CHAR(256),
    card_cvv CHAR(256),
    card_expiration CHAR(256),
    card_first_name CHAR(256),
    card_last_name CHAR(256),
    total_cost NUMBER(17, 2),

    user_id INTEGER REFERENCES user(id)
);

CREATE TABLE order_item(
    id INTEGER PRIMARY KEY,
    order_detail_id INTEGER REFERENCES order_detail(id),
    product_id INTEGER REFERENCES product(id)
);

CREATE TABLE drop_off_point(
    id INTEGER PRIMARY KEY,
    latitude NUMBER(10, 7),
    longitude NUMBER(10, 7),
    _address CHAR(256),
    city CHAR(256),
    state CHAR(256),
    country CHAR(256),
    zip_code CHAR(256),
    contact CHAR(256)
);
