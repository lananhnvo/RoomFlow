-- SQL CODE TO IMPLEMENT DATABASE

-- HOTEL CHAIN
CREATE TABLE HotelChain (
	chain VARCHAR(100) PRIMARY KEY NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone_num VARCHAR(16) NOT NULL,
	central_office_address VARCHAR(255) NOT NULL,
	num_of_hotels INT NOT NULL
);

INSERT INTO HotelChain(chain, central_office_address, email, phone_num, num_of_hotels) VALUES 
('Celestia', '88 Celestial Blvd', 'info@celestia.com', '+16-474-612-8270', 8),
('Emporia', '101 Empire Way', 'info@emporia.com', '+97-280-235-4155', 8),
('Jade Empire', '369 Jade Court', 'info@jadeempire.com', '+34-734-629-4512', 8),
('Lotus Luxe', '275 Lotus Lane', 'info@lotusluxe.com', '+42-552-727-4368', 8),
('Mystica', '444 Mystic Road', 'info@mystica.com', '+10-197-763-2688', 8);

-- EMPLOYEE
CREATE TABLE Employee (
  SIN INT PRIMARY KEY NOT NULL, 
  full_name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  --works_at VARCHAR (255) NOT NULL,
  --FOREIGN KEY (works_at) REFERENCES Hotel(address),
  position VARCHAR (255) NOT NULL
);

SELECT * FROM Employee;

ALTER TABLE Employee
ADD COLUMN works_at VARCHAR (255) NOT NULL;

ALTER TABLE Employee
ADD CONSTRAINT fk_works_at
FOREIGN KEY (works_at) REFERENCES Hotel(address);

ALTER TABLE Hotel
ADD CONSTRAINT manager FOREIGN KEY (manager) REFERENCES Employee(SIN); -- add manager FK

CREATE TYPE category_type AS ENUM ('economy', 'mid-range', 'luxury');

CREATE TABLE Hotel (
    address VARCHAR(255) PRIMARY KEY NOT NULL,
    chain VARCHAR(100) NOT NULL,
    FOREIGN KEY (chain) REFERENCES HotelChain(chain),
    area VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone_num VARCHAR(16) NOT NULL,
	rating INT NOT NULL,
    CHECK (rating >= 1),
    CHECK (rating <= 5),
    category category_type NOT NULL,
	num_of_rooms INT NOT NULL,
    manager INT,
    FOREIGN KEY (manager) REFERENCES Employee(SIN)
);

SELECT * FROM Hotel;

ALTER TABLE Hotel
ADD UNIQUE (address);

INSERT INTO Hotel(address, chain, area, email, phone_num, rating, category, num_of_rooms, manager) VALUES 

-- HOTELS FOR CELESTIA (8)
('41 Meteor Meadow', 'Celestia', 'Dreamscape Delta', '41@celestia.com', '+75-882-849-7611', 1, 'economy', 5, NULL),
('42 Meteor Meadow', 'Celestia', 'Dreamscape Delta', '42mm@celestia.com', '+37-166-329-5887', 1, 'economy', 5, NULL),
('43 Meteor Meadow', 'Celestia', 'Dreamscape Delta', '43mm@celestia.com', '+27-363-825-9563', 2, 'economy', 5, NULL),
('44 Meteor Meadow', 'Celestia', 'Dreamscape Delta', '44mm@celestia.com', '+58-672-709-8901', 3, 'mid-range', 5, NULL),
('45 Nebula Nook', 'Celestia', 'Mystic Mountain', '45nn@celestia.com', '+70-565-128-9028', 3, 'mid-range', 5, NULL),
('46 Nebula Nook', 'Celestia', 'Mystic Mountain', '46nn@celestia.com', '+32-741-223-6055', 4, 'luxury', 5, NULL),
('47 Nebula Nook', 'Celestia', 'Mystic Mountain', '47nn@celestia.com', '+38-597-462-2750', 5, 'luxury', 5, NULL),
('48 Nebula Nook', 'Celestia', 'Mystic Mountain', '48nn@celestia.com', '+81-188-380-9986', 5, 'luxury', 5, NULL),

-- HOTELS FOR EMPORIA (8)
('51 Azure Boulevard', 'Emporia', 'Eternal Gardens', '51ab@emporia.com', '+20-471-953-8762', 1, 'economy', 5, NULL),
('52 Azure Boulevard', 'Emporia', 'Eternal Gardens', '52ab@emporia.com', '+1-115-584-1555', 1, 'economy', 5, NULL),
('53 Azure Boulevard', 'Emporia', 'Eternal Gardens', '53ab@emporia.com', '+54-502-978-6888', 2, 'economy', 5, NULL),
('54 Azure Boulevard', 'Emporia', 'Eternal Gardens', '54ab@emporia.com', '+27-702-258-1718', 3, 'mid-range', 5, NULL),
('55 Golden Gateway', 'Emporia', 'Liberty Square', '55gg@emporia.com', '+50-423-799-5458', 3, 'mid-range', 5, NULL),
('56 Golden Gateway', 'Emporia', 'Liberty Square', '56gg@emporia.com', '+66-205-931-4702', 4, 'luxury', 5, NULL),
('57 Golden Gateway', 'Emporia', 'Liberty Square', '57gg@emporia.com', '+14-939-121-6581', 5, 'luxury', 5, NULL),
('58 Golden Gateway', 'Emporia', 'Liberty Square', '58@emporia.com', '+27-110-597-2387', 5, 'luxury', 5, NULL),

-- HOTELS FOR JADE EMPIRE (8)
('61 Dragonfly Trail', 'Jade Empire', 'Fortress of Fortitude', '61dt@jadeempire.com', '+38-260-846-6476', 1, 'economy', 5, NULL),
('62 Dragonfly Trail', 'Jade Empire', 'Fortress of Fortitude', '62dt@jadeempire.com', '+89-815-546-4557', 1, 'economy', 5, NULL),
('63 Dragonfly Trail', 'Jade Empire', 'Fortress of Fortitude', '63dt@jadeempire.com', '+38-996-460-4035', 2, 'economy', 5, NULL),
('64 Dragonfly Trail', 'Jade Empire', 'Fortress of Fortitude', '64dt@jadeempire.com', '+72-367-436-8684', 3, 'mid-range', 5, NULL),
('65 Emerald Pathway', 'Jade Empire', 'Palace of Peace', '65ep@jadeempire.com', '+53-883-335-6467', 3, 'mid-range', 5, NULL),
('66 Emerald Pathway', 'Jade Empire', 'Palace of Peace', '66ep@jadeempire.com', '+26-818-826-3029', 4, 'luxury', 5, NULL),
('67 Emerald Pathway', 'Jade Empire', 'Palace of Peace', '67ep@jadeempire.com', '+93-544-902-1444', 5, 'luxury', 5, NULL),
('68 Emerald Pathway', 'Jade Empire', 'Palace of Peace', '68ep@jadeempire.com', '+92-637-174-3163', 5, 'luxury', 5, NULL),

-- HOTELS FOR LOTUS LUXE (8)
('71 Phoenix Avenue', 'Lotus Luxe', 'Garden of Harmony', '71pa@lotusluxe.com', '+44-777-801-9809', 1, 'economy', 5, NULL),
('72 Phoenix Avenue', 'Lotus Luxe', 'Garden of Harmony', '72pa@lotusluxe.com', '+2-902-958-4868', 1, 'economy', 5, NULL),
('73 Phoenix Avenue', 'Lotus Luxe', 'Garden of Harmony', '73pa@lotusluxe.com', '+21-356-814-9203', 2, 'economy', 5, NULL),
('74 Phoenix Avenue', 'Lotus Luxe', 'Garden of Harmony', '74pa@lotusluxe.com', '+65-282-751-9827', 3, 'mid-range', 5, NULL),
('75 Tiger Tail', 'Lotus Luxe', 'Temple of Tranquility', '75tt@lotusluxe.com', '+23-646-518-4266', 3, 'mid-range', 5, NULL),
('76 Tiger Tail', 'Lotus Luxe', 'Temple of Tranquility', '76tt@lotusluxe.com', '+31-381-759-2937', 4, 'luxury', 5, NULL),
('77 Tiger Tail', 'Lotus Luxe', 'Temple of Tranquility', '77tt@lotusluxe.com', '+50-108-739-9199', 5, 'luxury', 5, NULL),
('78 Tiger Tail', 'Lotus Luxe', 'Temple of Tranquility', '78tt@lotusluxe.com', '+96-206-305-1190', 5, 'luxury', 5, NULL),

-- HOTELS FOR MYSTICA (8)
('81 Starlight Street', 'Mystica', 'Realm of Bliss', '81ss@mystica.com', '+64-334-456-3674', 1, 'economy', 5, NULL),
('82 Starlight Street', 'Mystica', 'Realm of Bliss', '82ss@mystica.com', '+83-337-444-6630', 1, 'economy', 5, NULL),
('83 Starlight Street', 'Mystica', 'Realm of Bliss', '83ss@mystica.com', '+90-434-563-1427', 2, 'economy', 5, NULL),
('84 Starlight Street', 'Mystica', 'Realm of Bliss', '84ss@mystica.com', '+27-930-199-2401', 3, 'mid-range', 5, NULL),
('85 Sunbeam Way', 'Mystica', 'Sector of Serenity', '85sw@mystica.com', '+97-237-369-3922', 3, 'mid-range', 5, NULL),
('86 Sunbeam Way', 'Mystica', 'Sector of Serenity', '86sw@mystica.com', '+46-858-153-8079', 4, 'luxury', 5, NULL),
('87 Sunbeam Way', 'Mystica', 'Sector of Serenity', '87sw@mystica.com', '+18-548-499-5927', 5, 'luxury', 5, NULL),
('88 Sunbeam Way', 'Mystica', 'Sector of Serenity', '88sw@mystica.com', '+18-548-499-5927', 5, 'luxury', 5, NULL);

-- ROOM
CREATE TABLE Room (
  room_num INT NOT NULL,
  hotel VARCHAR(255) NOT NULL,
  FOREIGN KEY (hotel) REFERENCES Hotel(address),
  PRIMARY KEY (room_num, hotel),
  price numeric(6, 2) NOT NULL,
  capacity INT NOT NULL,
  view view_type NOT NULL,
  tv BOOLEAN NOT NULL,
  fridge BOOLEAN NOT NULL,
  ac BOOLEAN NOT NULL,
  extendable BOOLEAN NOT NULL,
  problem BOOLEAN NOT NULL,
  status VARCHAR(100) NOT NULL DEFAULT 'available'
);

-- HOTEL ROOM INSERTION
INSERT INTO Room(room_num, hotel, price, capacity, view, tv, fridge, ac, extendable, problem, status) VALUES
-- CELESTIA ROOMS
(1, '41 Meteor Meadow', 70.60, 1, 'sea', false, false, false, true, false, 'available'),
(2, '41 Meteor Meadow', 123.44, 2, 'sea', false, false, true, true, false, 'available'),
(3, '41 Meteor Meadow', 170.53, 3, 'mountain', true, false, false, true, false, 'available'),
(4, '41 Meteor Meadow', 220.98, 4, 'mountain', false, false, false, true, false, 'available'),
(5, '41 Meteor Meadow', 248.87, 5, 'sea', true, true, true, true, false, 'available'),
(1, '42 Meteor Meadow', 75.43, 1, 'sea', false, false, true, true, false, 'available'),
(2, '42 Meteor Meadow', 132.87, 2, 'mountain', true, false, true, true, false, 'available'),
(3, '42 Meteor Meadow', 145.32, 3, 'sea', true, false, false, true, false, 'available'),
(4, '42 Meteor Meadow', 197.54, 4, 'mountain', false, true, false, true, false, 'available'),
(5, '42 Meteor Meadow', 249.34, 5, 'sea', true, true, true, true, false, 'available'),
(1, '43 Meteor Meadow', 56.88, 1, 'mountain', true, false, true, true, false, 'available'),
(2, '43 Meteor Meadow', 68.90, 2, 'mountain', true, true, true, true, false, 'available'),
(3, '43 Meteor Meadow', 120.44, 3, 'sea', true, false, false, true, false, 'available'),
(4, '43 Meteor Meadow', 134.09, 4, 'sea', false, true, true, true, false, 'available'),
(5, '43 Meteor Meadow', 190.87, 5, 'sea', false, true, false, true, false, 'available'),
(1, '44 Meteor Meadow', 251.98, 1, 'mountain', true, true, true, true, false, 'available'),
(2, '44 Meteor Meadow', 289.45, 2, 'sea', true, true, true, true, false, 'available'),
(3, '44 Meteor Meadow', 315.52, 3, 'sea', true, true, false, true, false, 'available'),
(4, '44 Meteor Meadow', 370.33, 4, 'mountain', false, true, true, true, false, 'available'),
(5, '44 Meteor Meadow', 410.56, 5, 'sea', false, true, false, true, false, 'available'),
(1, '45 Nebula Nook', 350.54, 1, 'sea', true, true, true, true, false, 'available'),
(2, '45 Nebula Nook', 370.55, 2, 'sea', false, true, true, true, false, 'available'),
(3, '45 Nebula Nook', 420.98, 3, 'sea', true, false, true, true, false, 'available'),
(4, '45 Nebula Nook', 454.99, 4, 'sea', false, true, true, true, false, 'available'),
(5, '45 Nebula Nook', 489.32, 5, 'mountain', false, true, false, true, false, 'available'),
(1, '46 Nebula Nook', 510.98, 1, 'mountain', true, true, false, true, false, 'available'),
(2, '46 Nebula Nook', 545.67, 2, 'sea', true, true, true, true, false, 'available'),
(3, '46 Nebula Nook', 590.43, 3, 'sea', true, false, true, true, false, 'available'),
(4, '46 Nebula Nook', 610.98, 4, 'sea', true, false, true, true, false, 'available'),
(5, '46 Nebula Nook', 625.76, 5, 'sea', false, true, false, true, false, 'available'),
(1, '47 Nebula Nook', 578.54, 1, 'mountain', true, true, false, true, false, 'available'),
(2, '47 Nebula Nook', 590.32, 2, 'sea', true, true, true, true, false, 'available'),
(3, '47 Nebula Nook', 605.76, 3, 'sea', false, false, true, true, false, 'available'),
(4, '47 Nebula Nook', 639.65, 4, 'sea', false, false, true, true, false, 'available'),
(5, '47 Nebula Nook', 655.8, 5, 'mountain', false, true, false, true, false, 'available'),
(1, '48 Nebula Nook', 654.32, 1, 'sea', true, false, false, true, false, 'available'),
(2, '48 Nebula Nook', 678.45, 2, 'mountain', true, true, true, true, false, 'available'),
(3, '48 Nebula Nook', 719.54, 3, 'mountain', true, true, true, true, false, 'available'),
(4, '48 Nebula Nook', 734.23, 4, 'sea', false, true, true, true, false, 'available'),
(5, '48 Nebula Nook', 749.89, 5, 'mountain', true, true, false, true, false, 'available'),
-- EMPORIA ROOMS
(1, '51 Azure Boulevard', 70.60, 1, 'sea', false, false, false, true, false, 'available'),
(2, '51 Azure Boulevard', 123.44, 2, 'sea', false, false, true, true, false, 'available'),
(3, '51 Azure Boulevard', 170.53, 3, 'mountain', true, false, false, true, false, 'available'),
(4, '51 Azure Boulevard', 220.98, 4, 'mountain', false, false, false, true, false, 'available'),
(5, '51 Azure Boulevard', 248.87, 5, 'sea', true, true, true, true, false, 'available'),
(1, '52 Azure Boulevard', 75.43, 1, 'sea', false, false, true, true, false, 'available'),
(2, '52 Azure Boulevard', 132.87, 2, 'mountain', true, false, true, true, false, 'available'),
(3, '52 Azure Boulevard', 145.32, 3, 'sea', true, false, false, true, false, 'available'),
(4, '52 Azure Boulevard', 197.54, 4, 'mountain', false, true, false, true, false, 'available'),
(5, '52 Azure Boulevard', 249.34, 5, 'sea', true, true, true, true, false, 'available'),
(1, '53 Azure Boulevard', 56.88, 1, 'mountain', true, false, true, true, false, 'available'),
(2, '53 Azure Boulevard', 68.90, 2, 'mountain', true, true, true, true, false, 'available'),
(3, '53 Azure Boulevard', 120.44, 3, 'sea', true, false, false, true, false, 'available'),
(4, '53 Azure Boulevard', 134.09, 4, 'sea', false, true, true, true, false, 'available'),
(5, '53 Azure Boulevard', 190.87, 5, 'sea', false, true, false, true, false, 'available'),
(1, '54 Azure Boulevard', 251.98, 1, 'mountain', true, true, true, true, false, 'available'),
(2, '54 Azure Boulevard', 289.45, 2, 'sea', true, true, true, true, false, 'available'),
(3, '54 Azure Boulevard', 315.52, 3, 'sea', true, true, false, true, false, 'available'),
(4, '54 Azure Boulevard', 370.33, 4, 'mountain', false, true, true, true, false, 'available'),
(5, '54 Azure Boulevard', 410.56, 5, 'sea', false, true, false, true, false, 'available'),
(1, '55 Golden Gateway', 350.54, 1, 'sea', true, true, true, true, false, 'available'),
(2, '55 Golden Gateway', 370.55, 2, 'sea', false, true, true, true, false, 'available'),
(3, '55 Golden Gateway', 420.98, 3, 'sea', true, false, true, true, false, 'available'),
(4, '55 Golden Gateway', 454.99, 4, 'sea', false, true, true, true, false, 'available'),
(5, '55 Golden Gateway', 489.32, 5, 'mountain', false, true, false, true, false, 'available'),
(1, '56 Golden Gateway', 510.98, 1, 'mountain', true, true, false, true, false, 'available'),
(2, '56 Golden Gateway', 545.67, 2, 'sea', true, true, true, true, false, 'available'),
(3, '56 Golden Gateway', 590.43, 3, 'sea', true, false, true, true, false, 'available'),
(4, '56 Golden Gateway', 610.98, 4, 'sea', true, false, true, true, false, 'available'),
(5, '56 Golden Gateway', 625.76, 5, 'sea', false, true, false, true, false, 'available'),
(1, '57 Golden Gateway', 578.54, 1, 'mountain', true, true, false, true, false, 'available'),
(2, '57 Golden Gateway', 590.32, 2, 'sea', true, true, true, true, false, 'available'),
(3, '57 Golden Gateway', 605.76, 3, 'sea', false, false, true, true, false, 'available'),
(4, '57 Golden Gateway', 639.65, 4, 'sea', false, false, true, true, false, 'available'),
(5, '57 Golden Gateway', 655.8, 5, 'mountain', false, true, false, true, false, 'available'),
(1, '58 Golden Gateway', 654.32, 1, 'sea', true, false, false, true, false, 'available'),
(2, '58 Golden Gateway', 678.45, 2, 'mountain', true, true, true, true, false, 'available'),
(3, '58 Golden Gateway', 719.54, 3, 'mountain', true, true, true, true, false, 'available'),
(4, '58 Golden Gateway', 734.23, 4, 'sea', false, true, true, true, false, 'available'),
(5, '58 Golden Gateway', 749.89, 5, 'mountain', true, true, false, true, false, 'available');
-- JADE EMPIRE ROOMS
(1, '61 Dragonfly Trail', 70.60, 1, 'sea', false, false, false, true, false, 'available'),
(2, '61 Dragonfly Trail', 123.44, 2, 'sea', false, false, true, true, false, 'available'),
(3, '61 Dragonfly Trail', 170.53, 3, 'mountain', true, false, false, true, false, 'available'),
(4, '61 Dragonfly Trail', 220.98, 4, 'mountain', false, false, false, true, false, 'available'),
(5, '61 Dragonfly Trail', 248.87, 5, 'sea', true, true, true, true, false, 'available'),
(1, '62 Dragonfly Trail', 75.43, 1, 'sea', false, false, true, true, false, 'available'),
(2, '62 Dragonfly Trail', 132.87, 2, 'mountain', true, false, true, true, false, 'available'),
(3, '62 Dragonfly Trail', 145.32, 3, 'sea', true, false, false, true, false, 'available'),
(4, '62 Dragonfly Trail', 197.54, 4, 'mountain', false, true, false, true, false, 'available'),
(5, '62 Dragonfly Trail', 249.34, 5, 'sea', true, true, true, true, false, 'available'),
(1, '63 Dragonfly Trail', 56.88, 1, 'mountain', true, false, true, true, false, 'available'),
(2, '63 Dragonfly Trail', 68.90, 2, 'mountain', true, true, true, true, false, 'available'),
(3, '63 Dragonfly Trail', 120.44, 3, 'sea', true, false, false, true, false, 'available'),
(4, '63 Dragonfly Trail', 134.09, 4, 'sea', false, true, true, true, false, 'available'),
(5, '63 Dragonfly Trail', 190.87, 5, 'sea', false, true, false, true, false, 'available'),
(1, '64 Dragonfly Trail', 251.98, 1, 'mountain', true, true, true, true, false, 'available'),
(2, '64 Dragonfly Trail', 289.45, 2, 'sea', true, true, true, true, false, 'available'),
(3, '64 Dragonfly Trail', 315.52, 3, 'sea', true, true, false, true, false, 'available'),
(4, '64 Dragonfly Trail', 370.33, 4, 'mountain', false, true, true, true, false, 'available'),
(5, '64 Dragonfly Trail', 410.56, 5, 'sea', false, true, false, true, false, 'available'),
(1, '65 Emerald Pathway', 350.54, 1, 'sea', true, true, true, true, false, 'available'),
(2, '65 Emerald Pathway', 370.55, 2, 'sea', false, true, true, true, false, 'available'),
(3, '65 Emerald Pathway', 420.98, 3, 'sea', true, false, true, true, false, 'available'),
(4, '65 Emerald Pathway', 454.99, 4, 'sea', false, true, true, true, false, 'available'),
(5, '65 Emerald Pathway', 489.32, 5, 'mountain', false, true, false, true, false, 'available'),
(1, '66 Emerald Pathway', 510.98, 1, 'mountain', true, true, false, true, false, 'available'),
(2, '66 Emerald Pathway', 545.67, 2, 'sea', true, true, true, true, false, 'available'),
(3, '66 Emerald Pathway', 590.43, 3, 'sea', true, false, true, true, false, 'available'),
(4, '66 Emerald Pathway', 610.98, 4, 'sea', true, false, true, true, false, 'available'),
(5, '66 Emerald Pathway', 625.76, 5, 'sea', false, true, false, true, false, 'available'),
(1, '67 Emerald Pathway', 578.54, 1, 'mountain', true, true, false, true, false, 'available'),
(2, '67 Emerald Pathway', 590.32, 2, 'sea', true, true, true, true, false, 'available'),
(3, '67 Emerald Pathway', 605.76, 3, 'sea', false, false, true, true, false, 'available'),
(4, '67 Emerald Pathway', 639.65, 4, 'sea', false, false, true, true, false, 'available'),
(5, '67 Emerald Pathway', 655.8, 5, 'mountain', false, true, false, true, false, 'available'),
(1, '68 Emerald Pathway', 654.32, 1, 'sea', true, false, false, true, false, 'available'),
(2, '68 Emerald Pathway', 678.45, 2, 'mountain', true, true, true, true, false, 'available'),
(3, '68 Emerald Pathway', 719.54, 3, 'mountain', true, true, true, true, false, 'available'),
(4, '68 Emerald Pathway', 734.23, 4, 'sea', false, true, true, true, false, 'available'),
(5, '68 Emerald Pathway', 749.89, 5, 'mountain', true, true, false, true, false, 'available'),
-- LOTUS LUXE ROOMS
(1, '71 Phoenix Avenue', 70.60, 1, 'sea', false, false, false, true, false, 'available'),
(2, '71 Phoenix Avenue', 123.44, 2, 'sea', false, false, true, true, false, 'available'),
(3, '71 Phoenix Avenue', 170.53, 3, 'mountain', true, false, false, true, false, 'available'),
(4, '71 Phoenix Avenue', 220.98, 4, 'mountain', false, false, false, true, false, 'available'),
(5, '71 Phoenix Avenue', 248.87, 5, 'sea', true, true, true, true, false, 'available'),
(1, '72 Phoenix Avenue', 75.43, 1, 'sea', false, false, true, true, false, 'available'),
(2, '72 Phoenix Avenue', 132.87, 2, 'mountain', true, false, true, true, false, 'available'),
(3, '72 Phoenix Avenue', 145.32, 3, 'sea', true, false, false, true, false, 'available'),
(4, '72 Phoenix Avenue', 197.54, 4, 'mountain', false, true, false, true, false, 'available'),
(5, '72 Phoenix Avenue', 249.34, 5, 'sea', true, true, true, true, false, 'available'),
(1, '73 Phoenix Avenue', 56.88, 1, 'mountain', true, false, true, true, false, 'available'),
(2, '73 Phoenix Avenue', 68.90, 2, 'mountain', true, true, true, true, false, 'available'),
(3, '73 Phoenix Avenue', 120.44, 3, 'sea', true, false, false, true, false, 'available'),
(4, '73 Phoenix Avenue', 134.09, 4, 'sea', false, true, true, true, false, 'available'),
(5, '73 Phoenix Avenue', 190.87, 5, 'sea', false, true, false, true, false, 'available'),
(1, '74 Phoenix Avenue', 251.98, 1, 'mountain', true, true, true, true, false, 'available'),
(2, '74 Phoenix Avenue', 289.45, 2, 'sea', true, true, true, true, false, 'available'),
(3, '74 Phoenix Avenue', 315.52, 3, 'sea', true, true, false, true, false, 'available'),
(4, '74 Phoenix Avenue', 370.33, 4, 'mountain', false, true, true, true, false, 'available'),
(5, '74 Phoenix Avenue', 410.56, 5, 'sea', false, true, false, true, false, 'available'),
(1, '75 Tiger Tail', 350.54, 1, 'sea', true, true, true, true, false, 'available'),
(2, '75 Tiger Tail', 370.55, 2, 'sea', false, true, true, true, false, 'available'),
(3, '75 Tiger Tail', 420.98, 3, 'sea', true, false, true, true, false, 'available'),
(4, '75 Tiger Tail', 454.99, 4, 'sea', false, true, true, true, false, 'available'),
(5, '75 Tiger Tail', 489.32, 5, 'mountain', false, true, false, true, false, 'available'),
(1, '76 Tiger Tail', 510.98, 1, 'mountain', true, true, false, true, false, 'available'),
(2, '76 Tiger Tail', 545.67, 2, 'sea', true, true, true, true, false, 'available'),
(3, '76 Tiger Tail', 590.43, 3, 'sea', true, false, true, true, false, 'available'),
(4, '76 Tiger Tail', 610.98, 4, 'sea', true, false, true, true, false, 'available'),
(5, '76 Tiger Tail', 625.76, 5, 'sea', false, true, false, true, false, 'available'),
(1, '77 Tiger Tail', 578.54, 1, 'mountain', true, true, false, true, false, 'available'),
(2, '77 Tiger Tail', 590.32, 2, 'sea', true, true, true, true, false, 'available'),
(3, '77 Tiger Tail', 605.76, 3, 'sea', false, false, true, true, false, 'available'),
(4, '77 Tiger Tail', 639.65, 4, 'sea', false, false, true, true, false, 'available'),
(5, '77 Tiger Tail', 655.8, 5, 'mountain', false, true, false, true, false, 'available'),
(1, '78 Tiger Tail', 654.32, 1, 'sea', true, false, false, true, false, 'available'),
(2, '78 Tiger Tail', 678.45, 2, 'mountain', true, true, true, true, false, 'available'),
(3, '78 Tiger Tail', 719.54, 3, 'mountain', true, true, true, true, false, 'available'),
(4, '78 Tiger Tail', 734.23, 4, 'sea', false, true, true, true, false, 'available'),
(5, '78 Tiger Tail', 749.89, 5, 'mountain', true, true, false, true, false, 'available'),
-- MYSTICA ROOMS
(1, '81 Starlight Street', 70.60, 1, 'sea', false, false, false, true, false, 'available'),
(2, '81 Starlight Street', 123.44, 2, 'sea', false, false, true, true, false, 'available'),
(3, '81 Starlight Street', 170.53, 3, 'mountain', true, false, false, true, false, 'available'),
(4, '81 Starlight Street', 220.98, 4, 'mountain', false, false, false, true, false, 'available'),
(5, '81 Starlight Street', 248.87, 5, 'sea', true, true, true, true, false, 'available'),
(1, '82 Starlight Street', 75.43, 1, 'sea', false, false, true, true, false, 'available'),
(2, '82 Starlight Street', 132.87, 2, 'mountain', true, false, true, true, false, 'available'),
(3, '82 Starlight Street', 145.32, 3, 'sea', true, false, false, true, false, 'available'),
(4, '82 Starlight Street', 197.54, 4, 'mountain', false, true, false, true, false, 'available'),
(5, '82 Starlight Street', 249.34, 5, 'sea', true, true, true, true, false, 'available'),
(1, '83 Starlight Street', 56.88, 1, 'mountain', true, false, true, true, false, 'available'),
(2, '83 Starlight Street', 68.90, 2, 'mountain', true, true, true, true, false, 'available'),
(3, '83 Starlight Street', 120.44, 3, 'sea', true, false, false, true, false, 'available'),
(4, '83 Starlight Street', 134.09, 4, 'sea', false, true, true, true, false, 'available'),
(5, '83 Starlight Street', 190.87, 5, 'sea', false, true, false, true, false, 'available'),
(1, '84 Starlight Street', 251.98, 1, 'mountain', true, true, true, true, false, 'available'),
(2, '84 Starlight Street', 289.45, 2, 'sea', true, true, true, true, false, 'available'),
(3, '84 Starlight Street', 315.52, 3, 'sea', true, true, false, true, false, 'available'),
(4, '84 Starlight Street', 370.33, 4, 'mountain', false, true, true, true, false, 'available'),
(5, '84 Starlight Street', 410.56, 5, 'sea', false, true, false, true, false, 'available'),
(1, '85 Sunbeam Way', 350.54, 1, 'sea', true, true, true, true, false, 'available'),
(2, '85 Sunbeam Way', 370.55, 2, 'sea', false, true, true, true, false, 'available'),
(3, '85 Sunbeam Way', 420.98, 3, 'sea', true, false, true, true, false, 'available'),
(4, '85 Sunbeam Way', 454.99, 4, 'sea', false, true, true, true, false, 'available'),
(5, '85 Sunbeam Way', 489.32, 5, 'mountain', false, true, false, true, false, 'available'),
(1, '86 Sunbeam Way', 510.98, 1, 'mountain', true, true, false, true, false, 'available'),
(2, '86 Sunbeam Way', 545.67, 2, 'sea', true, true, true, true, false, 'available'),
(3, '86 Sunbeam Way', 590.43, 3, 'sea', true, false, true, true, false, 'available'),
(4, '86 Sunbeam Way', 610.98, 4, 'sea', true, false, true, true, false, 'available'),
(5, '86 Sunbeam Way', 625.76, 5, 'sea', false, true, false, true, false, 'available'),
(1, '87 Sunbeam Way', 578.54, 1, 'mountain', true, true, false, true, false, 'available'),
(2, '87 Sunbeam Way', 590.32, 2, 'sea', true, true, true, true, false, 'available'),
(3, '87 Sunbeam Way', 605.76, 3, 'sea', false, false, true, true, false, 'available'),
(4, '87 Sunbeam Way', 639.65, 4, 'sea', false, false, true, true, false, 'available'),
(5, '87 Sunbeam Way', 655.8, 5, 'mountain', false, true, false, true, false, 'available'),
(1, '88 Sunbeam Way', 654.32, 1, 'sea', true, false, false, true, false, 'available'),
(2, '88 Sunbeam Way', 678.45, 2, 'mountain', true, true, true, true, false, 'available'),
(3, '88 Sunbeam Way', 719.54, 3, 'mountain', true, true, true, true, false, 'available'),
(4, '88 Sunbeam Way', 734.23, 4, 'sea', false, true, true, true, false, 'available'),
(5, '88 Sunbeam Way', 749.89, 5, 'mountain', true, true, false, true, false, 'available');

INSERT INTO Employee (SIN, full_name, address, works_at, position) VALUES
-- CELESTIAL HOTEL MANAGERS
(414141, 'Sarah Smith','630 Valley Road', '41 Meteor Meadow','manager'),
(424242, 'John Brown', '766 Park Ave', '42 Meteor Meadow','manager'),
(434343, 'Daniel Baker', '575 Cherry Way', '43 Meteor Meadow','manager'),
(444444, 'Abigail Wilson','200 Cedar Place', '44 Meteor Meadow','manager'),
(454545, 'Samuel Thompson', '45 North St', '45 Nebula Nook','manager'),
(464646, 'Alex Wright', '20 Sunset Boulevard', '46 Nebula Nook','manager'),
(474747, 'Smith John', '134 Fort Boulevard', '47 Nebula Nook','manager'),
(484848, 'Jane Doe', '41 Springfield Place', '48 Nebula Nook','manager'),
-- EMPORIA HOTEL MANAGERS
(515151, 'Madison Moore', '76 Hilton Way', '51 Azure Boulevard','manager'),
(525252, 'John Doe', '543 Popper Place', '52 Azure Boulevard','manager'),
(535353, 'Mia Lee', '43 Poppy Way', '53 Azure Boulevard','manager'),
(545454, 'Mia Gomez', '23 Hilton Street', '54 Azure Boulevard','manager'),
(555555, 'Nicole Lee', '11 Gladstone Ave', '55 Golden Gateway','manager'),
(565656, 'Nicole Gomez', '43 Laurier St', '56 Golden Gateway','manager'),
(575757, 'Omar Baker', '32 Rideau Place', '57 Golden Gateway','manager'),
(585858, 'Nick Koll', '123 Elgin Street', '58 Golden Gateway','manager'),
-- JADE EMPIRE HOTEL MANAGERS
(616161, 'Chase Morton', '43 Meadow Boulevard', '61 Dragonfly Trail','manager'),
(626262, 'Benjamin Johnson', '241 Somerset Way', '62 Dragonfly Trail','manager'),
(636363, 'Maddie Morgan', '33 Bristol Avenue', '63 Dragonfly Trail','manager'),
(646464, 'Noah Ark', '111 Rolling Stone Ct', '64 Dragonfly Trail','manager'),
(656565, 'Ava Lennon', '90 University Way', '65 Emerald Pathway','manager'),
(666666, 'Amelia Lennon', '85 Henderson Way','66 Emerald Pathway','manager'),
(676767, 'Matthew Hill', '45 Mann Avenue', '67 Emerald Pathway','Manager'),
(686868, 'Taylor Brett', '32 Leblanc Street', '68 Emerald Pathway','Manager'),
-- LOTUS LUXE HOTEL MANAGERS
(717171, 'Nicki Minaj', '48th Place', '71 Phoenix Avenue','manager'),
(727272, 'Pink Panther', '80 Bay Way', '72 Phoenix Avenue','manager'),
(737373, 'Peter Mills', '231 Benedict Eggs', '73 Phoenix Avenue','manager'),
(747474, 'Darren Ritter', '98 Goulborn Ave', '74 Phoenix Avenue','manager'),
(757575, 'Blake Gallow', '12 Prague Avenue', '75 Tiger Tail','manager'),
(767676, 'Cindy Herman', '40 Osgoode Street', '76 Tiger Tail','manager'),
(777777, 'Emily Foster', '129 Kent Place', '77 Tiger Tail','manager'),
(787878, 'Jeff Clark','72 Executive Boulevard', '78 Tiger Tail','manager'),
-- MYSTICA HOTEL MANAGERS
(818181, 'Faye Webster', '32 Great Street','81 Starlight Street','manager'),
(828282, 'Donald Glover', '87 Smith Avenue','82 Starlight Street','manager'),
(838383, 'Childish Gambino', '24 Les Way','83 Starlight Street','manager'),
(848484, 'Steve Lacy', '76 N Side','84 Starlight Street','manager'),
(858585, 'Frank Ocean', '43 Godspeed Way','85 Sunbeam Way','manager'),
(868686, 'Adele', '65 Laurel Avenue','86 Sunbeam Way','manager'),
(878787, 'Mitski','30 Hometown Street' ,'87 Sunbeam Way','manager'),
(888888, 'Zendaya', '87 Challengers Street','88 Sunbeam Way','manager');

-- CELESTIA HOTEL MANAGERS
UPDATE Hotel SET manager=414141 WHERE address='41 Meteor Meadow';
UPDATE Hotel SET manager=424242 WHERE address='42 Meteor Meadow';
UPDATE Hotel SET manager=434343 WHERE address='43 Meteor Meadow';
UPDATE Hotel SET manager=444444 WHERE address='44 Meteor Meadow';
UPDATE Hotel SET manager=454545 WHERE address='45 Nebula Nook';
UPDATE Hotel SET manager=464646 WHERE address='46 Nebula Nook';
UPDATE Hotel SET manager=474747 WHERE address='47 Nebula Nook';
UPDATE Hotel SET manager=484848 WHERE address='48 Nebula Nook';

-- EMPORIA HOTEL MANAGERS
UPDATE Hotel SET manager=515151 WHERE address='51 Azure Boulevard';
UPDATE Hotel SET manager=525252 WHERE address='52 Azure Boulevard';
UPDATE Hotel SET manager=535353 WHERE address='53 Azure Boulevard';
UPDATE Hotel SET manager=545454 WHERE address='54 Azure Boulevard';
UPDATE Hotel SET manager=555555 WHERE address='55 Golden Gateway';
UPDATE Hotel SET manager=565656 WHERE address='56 Golden Gateway';
UPDATE Hotel SET manager=575757 WHERE address='57 Golden Gateway';
UPDATE Hotel SET manager=585858 WHERE address='58 Golden Gateway';

-- JADE EMPIRE HOTEL MANAGERS
UPDATE Hotel SET manager=616161 WHERE address='61 Dragonfly Trail';
UPDATE Hotel SET manager=626262 WHERE address='62 Dragonfly Trail';
UPDATE Hotel SET manager=636363 WHERE address='63 Dragonfly Trail';
UPDATE Hotel SET manager=646464 WHERE address='64 Dragonfly Trail';
UPDATE Hotel SET manager=656565 WHERE address='65 Emerald Pathway';
UPDATE Hotel SET manager=666666 WHERE address='66 Emerald Pathway';
UPDATE Hotel SET manager=676767 WHERE address='67 Emerald Pathway';
UPDATE Hotel SET manager=686868 WHERE address='68 Emerald Pathway';

-- LOTUS LUXE HOTEL MANAGERS
UPDATE Hotel SET manager=717171 WHERE address='71 Phoenix Avenue';
UPDATE Hotel SET manager=727272 WHERE address='72 Phoenix Avenue';
UPDATE Hotel SET manager=737373 WHERE address='73 Phoenix Avenue';
UPDATE Hotel SET manager=747474 WHERE address='74 Phoenix Avenue';
UPDATE Hotel SET manager=757575 WHERE address='75 Tiger Tail';
UPDATE Hotel SET manager=767676 WHERE address='76 Tiger Tail';
UPDATE Hotel SET manager=777777 WHERE address='77 Tiger Tail';
UPDATE Hotel SET manager=787878 WHERE address='78 Tiger Tail';

-- MYSTICA HOTEL MANAGERS
UPDATE Hotel SET manager=818181 WHERE address='81 Starlight Street';
UPDATE Hotel SET manager=828282 WHERE address='82 Starlight Street';
UPDATE Hotel SET manager=838383 WHERE address='83 Starlight Street';
UPDATE Hotel SET manager=848484 WHERE address='85 Starlight Street';
UPDATE Hotel SET manager=858585 WHERE address='85 Sunbeam Way';
UPDATE Hotel SET manager=868686 WHERE address='86 Sunbeam Way';
UPDATE Hotel SET manager=878787 WHERE address='87 Sunbeam Way';
UPDATE Hotel SET manager=888888 WHERE address='88 Sunbeam Way';

-- CUSTOMER
CREATE TABLE Customer (
  SIN INT PRIMARY KEY NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

-- BOOKING
CREATE TABLE Booking (
  room_num INT NOT NULL,
  hotel VARCHAR(255) NOT NULL,
  customer INT,
  employee INT,
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP NOT NULL,
  isPaid BOOLEAN NOT NULL DEFAULT false,
  FOREIGN KEY (hotel, room_num) REFERENCES Room(hotel, room_num),
  FOREIGN KEY (customer) REFERENCES Customer(SIN),
  FOREIGN KEY (employee) REFERENCES Employee(SIN),
  PRIMARY KEY (hotel, room_num, start_date)
);

-- 7) INDEXES
CREATE INDEX room_status_index on Room (status);
CREATE INDEX hotel_area_index on Hotel (area);
CREATE INDEX room_capacity_index on Room (capacity);

-- 8) VIEWS

-- VIEW 1: AVAILABLE ROOMS PER AREA
CREATE VIEW available_rooms_per_area AS
SELECT
  h.area,
  COUNT(*) AS available_rooms
FROM
  Room r
JOIN 
  Hotel h on r.hotel = h.address
WHERE
  r.status = 'available'
GROUP BY
  h.area;

SELECT * FROM available_rooms_per_area;

-- VIEW 2: HOTEL CAPACITY
CREATE VIEW hotel_capacity AS
SELECT
  h.address,
  SUM(r.capacity) AS total_capacity
FROM
  Room r
JOIN
  Hotel h ON r.hotel = h.address
GROUP BY
  h.address;

SELECT * FROM hotel_capacity;

