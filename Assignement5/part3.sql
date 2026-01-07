/***********************************************************************************************************/
/ Part 3: (Using Node.js and MySQL) Answer the Questions below based on the given Scenario                  /
/ The small retail store needs a database to manage information about its products, suppliers, and sales.   /  
/ Database Requirements                                                                                     /
/***********************************************************************************************************/
1. Products Table:
o ProductID: Unique identifier for each product (integer, primary key, auto-increment).
o ProductName: Name of the product (text).
o Price: Price of the product (decimal).
o StockQuantity: Quantity of the product in stock (integer).
o SupplierID: ID of the supplier providing the product (integer, foreign key referencing Suppliers).
2. Suppliers Table:
o SupplierID: Unique identifier for each product (integer, primary key, auto-increment).
o SupplierName: Name of the supplier (text).
Assignment5
2
o ContactNumber: Supplier’s contact number (text).
3. Sales Table:
o SaleID: Unique identifier for each product (integer, primary key, auto-increment).
o ProductID: Reference to the product sold (integer, foreign key referencing Products).
o QuantitySold: Quantity of the product sold (integer).
o SaleDate: Date of sale (date).
(Using Node.js and MySQL) generate queries that perform the following tasks (8 Grades):
*/

-- ? 1- Create the required tables for the retail store database based on the tables structure and relationships.

-- *suppliers table
CREATE TABLE Suppliers(
    SupplierID int(20) PRIMARY KEY AUTO_INCREMENT,
    SupplierName varchar(100),
    ContactNumber varchar(20)
);

-- * products table
CREATE TABLE Products(
    ProductID int(20) PRIMARY KEY AUTO_INCREMENT,
    ProductName varchar(100),
    Price decimal,
    StockQuantity int,
    SupplierID int,
    FOREIGN KEY (SupplierID) REFERENCES Suppliers(SupplierID)
);

-- * sales table
CREATE TABLE Sales(
    SaleID int(20) PRIMARY KEY AUTO_INCREMENT,
    ProductID int,
    QuantitySold int,
    SaleDate date,
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);

-- -----------------------------------------------------------------

-- ? 2- Add a column “Category” to the Products table. 

Alter TABLE Products ADD COLUMN Category varchar(100);

-- -----------------------------------------------------------------

-- ? 3- Remove the “Category” column from Products.

Alter TABLE Products DROP COLUMN Category ;

-- -----------------------------------------------------------------

-- ? 4- Change “ContactNumber” column in Suppliers to VARCHAR (15).

ALTER TABLE Suppliers MODIFY COLUMN ContactNumber varchar(15);

-- -----------------------------------------------------------------

-- ? 5- Add a NOT NULL constraint to ProductName.

ALTER TABLE Products MODIFY COLUMN ProductName NOT NULL;

-- -----------------------------------------------------------------

-- ? 6- Perform Basic Inserts:

-- ?   a. Add a supplier with the name 'FreshFoods' and contact number '01001234567'.
    
    INSERT INTO Suppliers (SupplierName,ContactNumber) VALUES ("FreshFoods","01001234567");

-- -----------------------------------------------------------------

-- ?   b. Insert the following three products, all provided by 'FreshFoods':
-- ?      i. 'Milk' with a price of 15.00 and stock quantity of 50.
-- ?      ii. 'Bread' with a price of 10.00 and stock quantity of 30.
-- ?      iii. 'Eggs' with a price of 20.00 and stock quantity of 40.
    
    INSERT INTO products (ProductName,Price,StockQuantity,SupplierID)
    VALUES ("Milk",15.00,50,1),
    ("Bread",10.00,30,1),
    ("Eggs",20.00,40,1);

-- ?   c. Add a record for the sale of 2 units of 'Milk' made on '2025-05-20'.
    INSERT INTO sales (ProductID,QuantitySold,SaleDate) VALUES (1,2,'2025-05-20');

-- ? 7- Update the price of 'Bread' to 25.00.

UPDATE products SET Price=25.00 WHERE ProductName='Bread';

-- ? 8- Delete the product 'Eggs'.

DELETE FROM products WHERE ProductName='eggs';

-- -----------------------------------------------------------------

-- ? 9- Retrieve the total quantity sold for each product.

SELECT P.ProductName ,SUM(S.QuantitySold) AS TotalSold
FROM products P 
LEFT JOIN sales S  ON P.ProductID=S.ProductID
GROUP BY P.ProductName;

-- -----------------------------------------------------------------

-- ? 10-Get the product with the highest stock.

SELECT ProductName,StockQuantity FROM products ORDER BY (StockQuantity) DESC LIMIT 1;

-- -----------------------------------------------------------------

-- ? 11-Find suppliers with names starting with 'F'.

SELECT * FROM suppliers WHERE SupplierName LIKE "F%";

-- -----------------------------------------------------------------

-- ? 12-Show all products that have never been sold.

SELECT P.ProductName FROM products P 
LEFT JOIN sales S  ON P.ProductID=S.ProductID
WHERE S.QuantitySold IS NULL;

-- -----------------------------------------------------------------

-- ? 13-Get all sales along with product name and sale date.

SELECT P.ProductName,S.SaleDate FROM products P 
LEFT JOIN sales S  ON P.ProductID=S.ProductID;

-- -----------------------------------------------------------------

-- ? 14-Create a user “store_manager” and give them SELECT, INSERT, and UPDATE permissions on all tables.

CREATE USER "store_manager"@"localhost" IDENTIFIED BY "password@123";
Grant SELECT, INSERT, UPDATE ON *.* TO "store_manager"@"localhost";

-- -----------------------------------------------------------------

-- ? 15-Revoke UPDATE permission from “store_manager”.

REVOKE UPDATE ON *.* FROM "store_manager"@"localhost";

-- -----------------------------------------------------------------

-- ? 16-Grant DELETE permission to “store_manager” only on the Sales table.

Grant DELETE ON sales TO "store_manager"@"localhost";


