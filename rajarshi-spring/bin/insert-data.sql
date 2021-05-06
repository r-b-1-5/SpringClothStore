INSERT INTO category VALUES(1, 'Laptops');
INSERT INTO category VALUES(2, 'Home appliances');
INSERT INTO category VALUES(3, 'Smartphones'); 

INSERT INTO product VALUES(1, "Lenovo Legion", 
    "The new Lenovo Legion comes packed with the state-of-the-art processors from Intel and AMD. Combined with the latest graphics from NVIDIA and a 16GB DDR4 memory, it can handle even the heaviest of workloads. And yes, it can run Crysis.", 
    1, 139999, "products/1/lenovo-legion.jpeg", "Free shipping till 25th December.", 0, 0);
INSERT INTO product VALUES(2, "Samsung Smart TV", 
    "The new Lenovo Legion comes packed with the state-of-the-art processors from Intel and AMD. Combined with the latest graphics from NVIDIA and a 16GB DDR4 memory, it can handle even the heaviest of workloads. And yes, it can run Crysis.", 
    2, 39990, "products/2/samsung-smart-tv.png", "Free shipping till 25th December.", 0, 0);
INSERT INTO product VALUES(3, "Asus ROG Phone", 
    "The new Lenovo Legion comes packed with the state-of-the-art processors from Intel and AMD. Combined with the latest graphics from NVIDIA and a 16GB DDR4 memory, it can handle even the heaviest of workloads. And yes, it can run Crysis.", 
    3, 55999, "products/3/asus-rog-phone.jpeg", "Free shipping till 25th December.", 0, 0);
INSERT INTO product VALUES(4, "LG 260L Refrigerator", 
    "The new Lenovo Legion comes packed with the state-of-the-art processors from Intel and AMD. Combined with the latest graphics from NVIDIA and a 16GB DDR4 memory, it can handle even the heaviest of workloads. And yes, it can run Crysis.", 
    2, 31050, "products/4/lg-260l-refrigerator.jpg", "Free shipping till 25th December.", 0, 0);
INSERT INTO product VALUES(5, "Nokia 2.4", 
    "The new Lenovo Legion comes packed with the state-of-the-art processors from Intel and AMD. Combined with the latest graphics from NVIDIA and a 16GB DDR4 memory, it can handle even the heaviest of workloads. And yes, it can run Crysis.", 
    3, 11499, "products/5/nokia-2.4.png", "Free shipping till 25th December.", 0, 0);
INSERT INTO product VALUES(6, "Alienware", 
    "The new Lenovo Legion comes packed with the state-of-the-art processors from Intel and AMD. Combined with the latest graphics from NVIDIA and a 16GB DDR4 memory, it can handle even the heaviest of workloads. And yes, it can run Crysis.", 
    1, 224000, "products/6/alienware.png", "Free shipping till 25th December.", 0, 0);

INSERT INTO discount VALUES(1, 1, 50);
INSERT INTO discount VALUES(2, 2, 10);
INSERT INTO discount VALUES(3, 3, 15);

INSERT INTO new_arrival VALUES(1, 1);
INSERT INTO new_arrival VALUES(2, 5);
INSERT INTO new_arrival VALUES(3, 6);

INSERT INTO user VALUES(1, "arpan", "password");

INSERT INTO drop_off_point VALUES(
    1, 22.594044, 88.385956, "8A Main Road", "Kolkata", "West Bengal", "India", "700060", "+91 12345 12345"
);
INSERT INTO drop_off_point VALUES(
    2, 22.596111, 88.365278, "Canal Road, Sovabazaar", "Kolkata", "West Bengal", "India", "700050", "+91 033 1234 1234"
);
INSERT INTO drop_off_point VALUES(
    3, 22.572737, 88.420923, "Oersted Connector, Salt Lake", "Kolkata", "West Bengal", "India", "700066", "+91 033 9999 1234"
);
