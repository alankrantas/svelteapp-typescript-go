CREATE TABLE "products" (
	"id"	INTEGER NOT NULL UNIQUE, -- product ID
	"name"	TEXT NOT NULL,
	"category"	TEXT NOT NULL,
	"description"	TEXT,
	"price"	REAL NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);

CREATE TABLE "orders" (
	"id"	INTEGER NOT NULL, -- order ID
	"product_id"	INTEGER NOT NULL, -- product ID
	"quantity"	INTEGER NOT NULL
);

INSERT INTO "main"."products" (
	"id",
	"name",
	"category",
	"description",
	"price"
)
VALUES
	('1', 'Kayak', 'Watersports', 'A boat for one person', '275.0'),
	('2', 'Lifejacket', 'Watersports', 'Protective and fashionable', '48.95'),
	('3', 'Soccer Ball', 'Soccer', 'FIFA-approved size and weight', '19.5'),
	('4', 'Corner Flags', 'Soccer', 'Give your playing field a professional touch', '34.95'),
	('5', 'Stadium', 'Soccer', 'Flat-packed 35,000-seat stadium', '79500.0'),
	('6', 'Thinking Cap', 'Chess', 'Improve brain efficiency by 75%', '16.0'),
	('7', 'Unsteady Chair', 'Chess', 'Secretly give your opponent a disadvantage', '29.95'),
	('8', 'Human Chess Board', 'Chess', 'A fun game for the family', '75.0'),
	('9', 'Bling Bling King', 'Chess', 'Gold-plated, diamond-studded King', '1200.0');