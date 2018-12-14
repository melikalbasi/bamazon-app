DROP DATABASE IF EXISTS top_albumsDB;

CREATE DATABASE top_albumsDB;

USE top_albumsDB;

CREATE TABLE top3000 (
  position INT NOT NULL,
  artist VARCHAR(100) NULL,
  album VARCHAR(100) NULL,
  year INT NULL,
  raw_pop_world_score DECIMAL (10,4) NULL,
  raw_pop_US_score DECIMAL (10,4) NULL,
  raw_pop_UK_score DECIMAL (10,4) NULL,
  raw_pop_eur_score DECIMAL (10,4) NULL,
  raw_pop_rest_score DECIMAL (10,4) NULL,
  PRIMARY KEY (position)
);

SELECT * FROM top3000;