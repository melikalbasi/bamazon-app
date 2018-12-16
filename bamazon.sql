DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100),
  department_name VARCHAR(100),
  price DECIMAL(10,2),
  stock_quantity INT,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
  ("Dyson Vacuum V10", "Home", 399.99, 100000), 
  ("Nespresso Creatista", "Home", 529.99, 200000),
  ("Vegan Cookbook", "Books", 25, 250000),
  ("Apple AirPods", "Technology", 150, 150000),
  ("Apple Watch", "Technology", 415, 500000),
  ("Heat on Blu-Ray", "Movies", 19, 200000),
  ("Nintendo Switch", "Video Games", 299, 200000),
  ("Super Smash Bros", "Video Games", 59, 1700000),
  ("PlayStation 4", "Video Games", 415, 5000000),
  ("Echo Dot", "Technology", 40, 9000000);