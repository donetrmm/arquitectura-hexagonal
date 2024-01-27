-- Crear el esquema hexa
CREATE SCHEMA hexa;

USE hexa;

-- Crear la tabla products
CREATE TABLE products (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255),
    price INT
);

-- Crear la tabla promotions
CREATE TABLE promotions (
    id VARCHAR(50) PRIMARY KEY,
    description VARCHAR(255)
);
