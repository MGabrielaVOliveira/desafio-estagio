
CREATE DATABASE petshop;


USE petshop;


CREATE TABLE pets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tipo VARCHAR(50) NOT NULL,
  nome VARCHAR(100) NOT NULL,
  dono_nome VARCHAR(100) NOT NULL,
  telefone VARCHAR(15), 
  data_nascimento DATE NOT NULL
);

SHOW DATABASES;
USE PETSHOP;
DESCRIBE pets;