CREATE DATABASE storefront;
USE storefront;

CREATE TABLE items (
	item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
	item_name VARCHAR(30) NOT NULL,
	category_name VARCHAR(30) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	quantity INTEGER(11) NOT NULL,
	PRIMARY KEY items(item_id)
	);
	
	INSERT INTO items (item_name, category_name, price, quantity)
	VALUES ('Milk', 'Groceries', 3.16, 10),
	('Toilet Paper', 'Household', 2.99, 10),
	('Dawn', 'Cleaning', 3.00, 10),
	('Comet', 'Cleaning', 2.40, 10),
	('Cotton T-Shirt 5 Pack', 'Clothing', 5.00, 10),
	('Denim Jeans', 'Clothing', 25.00, 10),
	('USB Cable', 'Electronics', 20.00, 10),
	('Shoes', 'Recreation', 60.00, 10),
	('Phone Case', 'Electronics', 30.00, 10),
	('Digital Watch', 'Accessories', 40.00, 10);
	
	CREATE TABLE categories (
	category_id INTEGER (10) AUTO_INCREMENT NOT NULL,
	category_name VARCHAR (250) NOT NULL,
	PRIMARY KEY (category_id)
);
INSERT INTO categories (category_name)
VALUES ("Groceries"),
	   ("Household"),
	   ("Cleaning"),
       ("Clothing"),
	   ("Electronics"),
	   ("Recreation"),
	   ("Accessories");
	
