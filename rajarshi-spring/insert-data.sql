INSERT INTO category VALUES(1, 'Jacket');
INSERT INTO category VALUES(2, 'Shirts');
INSERT INTO category VALUES(3, 'Trousers'); 

DELETE * from product; 

INSERT INTO product VALUES(1, "Nike Jacket", 
    "Wear the best cloth :P", 
    1, 12999, "products/1/1.jpg", "Free shipping till 25th May.", 0, 0);
INSERT INTO product VALUES(2, "Reebok Trousers", 
    "Wear the best cloth :P", 
    2, 9990, "products/2/2.png", "Free shipping till 25th May.", 0, 0);
INSERT INTO product VALUES(3, "Adidas Shirt", 
    "Wear the best cloth :P", 
    3, 5999, "products/3/3.jpg", "Free shipping till 25th May.", 0, 0);
INSERT INTO product VALUES(4, "Nike Shorts", 
    "Wear the best cloth :P", 
    2, 3050, "products/4/4.jpg", "Free shipping till 25th May.", 0, 0);
INSERT INTO product VALUES(5, "Reebok Shirt", 
    "Wear the best cloth :P", 
    3, 3499, "products/5/5.jpg", "Free shipping till 25th May.", 0, 0);
INSERT INTO product VALUES(6, "Adidas Trousers", 
    "Wear the best cloth :P", 
    1, 4000, "products/6/6.jpg", "Free shipping till 25th May.", 0, 0);

INSERT INTO discount VALUES(1, 1, 50);
INSERT INTO discount VALUES(2, 2, 10);
INSERT INTO discount VALUES(3, 3, 15);

INSERT INTO new_arrival VALUES(1, 1);
INSERT INTO new_arrival VALUES(2, 5);
INSERT INTO new_arrival VALUES(3, 6);

INSERT INTO user VALUES(1, "xd", "password");
INSERT INTO user VALUES(2, "rb", "password");


INSERT INTO drop_off_point VALUES(
    1, 22.594044, 88.385956, "8A Main Road", "Kolkata", "West Bengal", "India", "700060", "+91 12345 12345"
);
INSERT INTO drop_off_point VALUES(
    2, 22.596111, 88.365278, "Canal Road, Sovabazaar", "Kolkata", "West Bengal", "India", "700050", "+91 033 1234 1234"
);
INSERT INTO drop_off_point VALUES(
    3, 22.572737, 88.420923, "Oersted Connector, Salt Lake", "Kolkata", "West Bengal", "India", "700066", "+91 033 9999 1234"
);
