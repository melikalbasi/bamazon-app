DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100),
  department_name VARCHAR(100),
  price DECIMAL(10,2),
  stock_quantity INT,
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
  ("Dyson Vacuum V10", "Home", 399.99, 100), 
  ("Nespresso Creatista Plus", "Home", 529.99, 200),
  ("Vegan Cookbook", "Books", 25, 250),
  ("Apple AirPods", "Technology", 150, 150),
  ("Apple Watch", "Technology", 415, 50),
  ("Heat on Blu-Ray", "Movies", 19, 200),
  ("Nintendo Switch", "Video Games", 299, 200),
  ("Super Smash Bros", "Video Games", 59, 170),
  ("PlayStation 4", "Video Games", 415, 50),
  ("Echo Dot", "Technology", 40, 900);