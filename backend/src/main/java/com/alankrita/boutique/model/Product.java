package com.alankrita.boutique.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity @Table(name = "products")
public class Product {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
  @Column(nullable = false) private String name;
  @Column(nullable = false, precision = 12, scale = 2) private BigDecimal price;
  @Column(nullable = false, columnDefinition = "TEXT") private String description;
  @Column(name = "image_url", nullable = false, columnDefinition = "TEXT") private String imageUrl;
  @ElementCollection(fetch = FetchType.EAGER)
  @CollectionTable(name = "product_images", joinColumns = @JoinColumn(name = "product_id"))
  @Column(name = "image_url", nullable = false, columnDefinition = "TEXT")
  @OrderColumn(name = "image_order")
  private List<String> images = new ArrayList<>();
  @Column(nullable = false) private String category;
  @Column(name = "is_new_arrival", nullable = false) private boolean newArrival;
  public Long getId() { return id; } public String getName() { return name; } public BigDecimal getPrice() { return price; }
  public String getDescription() { return description; } public String getImageUrl() { return imageUrl; } public String getCategory() { return category; }
  public List<String> getImages() { return images; }
  public boolean isNewArrival() { return newArrival; }
}
