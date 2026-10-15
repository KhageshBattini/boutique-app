CREATE TABLE product_images (
  product_id BIGINT NOT NULL,
  image_order INT NOT NULL,
  image_url TEXT NOT NULL,
  PRIMARY KEY (product_id, image_order),
  CONSTRAINT fk_product_images_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

INSERT INTO product_images (product_id, image_order, image_url)
SELECT id, 0, image_url FROM products;
