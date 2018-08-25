CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INTEGER NOT NULL AUTO_INCREMENT,
    product_name VARCHAR NOT NULL ,
    department_name VARCHAR NOT NULL,
    price INTEGER NOT NULL,
    stock_quantity INTEGER NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name , department_name , price , stock_quantity)
VALUES ("Chocolate Chip Cookies" , "Baked Goods" , 4 , 10);

INSERT INTO products (product_name , department_name , price , stock_quantity)
VALUES ("Tortilla Chips" , "Snacks" , 2 , 5);

INSERT INTO products (product_name , department_name , price , stock_quantity)
VALUES ("Guacamole" , "Dips and Sauces" , 5 , 2);

INSERT INTO products (product_name , department_name , price , stock_quantity)
VALUES ("Strawberries" , "Produce" , 3 , 0);

INSERT INTO products (product_name , department_name , price , stock_quantity)
VALUES ("Sliced Turkey" , "Deli" , 7 , 8);

INSERT INTO products (product_name , department_name , price , stock_quantity)
VALUES ("French Bread" , "Baked Goods" , 2 , 4);

INSERT INTO products (product_name , department_name , price , stock_quantity)
VALUES ("Green Tea" , "Tea and Coffee" , 7 , 15);

INSERT INTO products (product_name , department_name , price , stock_quantity)
VALUES ("Frozen Pizza" , "Frozen Dinners" , 3 , 4);

INSERT INTO products (product_name , department_name , price , stock_quantity)
VALUES ("Ice Cream" , "Frozen Desserts" , 5 , 10);

INSERT INTO products (product_name , department_name , price , stock_quantity)
VALUES ("Ramen Noodles" , "Instant Dinners" , 1 , 25);

