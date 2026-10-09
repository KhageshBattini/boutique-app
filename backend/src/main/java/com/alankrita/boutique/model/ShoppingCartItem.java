package com.alankrita.boutique.model;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "shopping_cart_items", uniqueConstraints = @UniqueConstraint(name = "uk_cart_user_product", columnNames = {"user_id", "product_id"}))
public class ShoppingCartItem {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
  @ManyToOne(optional = false) @JoinColumn(name = "user_id", nullable = false) private User user;
  @ManyToOne(optional = false) @JoinColumn(name = "product_id", nullable = false) private Product product;
  @Column(nullable = false) private int quantity;
  @Column(name = "created_at", nullable = false, updatable = false) private Instant createdAt = Instant.now();

  protected ShoppingCartItem() {}
  public ShoppingCartItem(User user, Product product) { this.user = user; this.product = product; }
  public Product getProduct() { return product; }
  public int getQuantity() { return quantity; }
  public void setQuantity(int value) { quantity = value; }
}
