CREATE DATABASE db_escuela;
USE db_escuela;

CREATE TABLE carreras (
  id VARCHAR(10) PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL
);

CREATE TABLE alumnos (
  id VARCHAR(10) PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  id_carrera VARCHAR(10),
  FOREIGN KEY (id_carrera) REFERENCES carreras(id)
);

--cambia tu usuario y la contra
ALTER USER 'root'@'localhost' 
IDENTIFIED WITH mysql_native_password
BY 'password';

FLUSH PRIVILEGES;
