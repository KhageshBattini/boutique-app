INSERT INTO product_images (product_id, image_order, image_url)
SELECT product_id, image_order, image_url
FROM (
  SELECT
    product.id AS product_id,
    ROW_NUMBER() OVER (PARTITION BY product.id ORDER BY RAND()) AS image_order,
    gallery.image_url AS image_url
  FROM products AS product
  CROSS JOIN (
    SELECT 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&h=500&fit=crop' AS image_url
    UNION ALL SELECT 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=500&fit=crop'
    UNION ALL SELECT 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=400&h=500&fit=crop'
    UNION ALL SELECT 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop'
    UNION ALL SELECT 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=500&fit=crop'
    UNION ALL SELECT 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400&h=500&fit=crop'
  ) AS gallery
  WHERE gallery.image_url <> product.image_url
) AS shuffled_gallery
WHERE image_order <= 3;
