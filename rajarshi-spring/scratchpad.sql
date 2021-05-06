SELECT product.id, product_name, product_description, category_name, new_arrival.id as new_arrival_id, price, discount.id as discount_id, discount_percentage, image_file_url, footnote
FROM product
INNER JOIN category
ON product.category_id = category.id
LEFT JOIN discount
ON product.id = discount.product_id
LEFT JOIN new_arrival
ON product.id = new_arrival.product_id
WHERE product.id = 1;
