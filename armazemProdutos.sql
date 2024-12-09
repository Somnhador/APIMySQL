create database armazem;
use armazem;

create table produtos(
id int auto_increment primary key,
nome varchar(255) not null,
quantidade int not null,
preco decimal(10, 2)
);

INSERT INTO produtos (nome, quantidade, preco) VALUES
('Controle', 5, 100.5),
('Teclado', 2, 38.99);