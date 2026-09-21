package com.alankrita.boutique.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity @Table(name = "products")
public class Product {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
  @Column(nullable = false) private String name;
  @Column(nullable = false, precision = 12, scale = 2) private BigDecimal price;
  @Column(nullable = false, columnDefinition = "TEXT") private String description;
  @Column(name = "image_url", nullable = false, columnDefinition = "TEXT") private String imageUrl;
  @Column(nullable = false) private String category;
  @Column(name = "is_new_arrival", nullable = false) private boolean newArrival;
  public Long getId() { return id; } public String getName() { return name; } public BigDecimal getPrice() { return price; }
  public String getDescription() { return description; } public String getImageUrl() { return imageUrl; } public String getCategory() { return category; }
  public boolean isNewArrival() { return newArrival; }
}
