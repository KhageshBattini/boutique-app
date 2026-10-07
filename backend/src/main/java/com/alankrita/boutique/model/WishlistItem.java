package com.alankrita.boutique.model;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "wishlist_items", uniqueConstraints = @UniqueConstraint(name = "uk_wishlist_user_product", columnNames = {"user_id", "product_id"}))
public class WishlistItem {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
  @ManyToOne(optional = false) @JoinColumn(name = "user_id", nullable = false) private User user;
  @ManyToOne(optional = false) @JoinColumn(name = "product_id", nullable = false) private Product product;
  @Column(name = "created_at", nullable = false, updatable = false) private Instant createdAt = Instant.now();

  protected WishlistItem() {}
  public WishlistItem(User user, Product product) { this.user = user; this.product = product; }
  public Product getProduct() { return product; }
}
