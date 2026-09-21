package com.alankrita.boutique.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity @Table(name = "order_items")
public class OrderItem {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
  @ManyToOne(optional = false) @JoinColumn(name = "order_id") private Order order;
  @ManyToOne(optional = false) @JoinColumn(name = "product_id") private Product product;
  @Column(name = "product_name", nullable = false) private String productName; @Column(name = "unit_price", nullable = false) private BigDecimal unitPrice;
  @Column(nullable = false) private int quantity;
  public void setOrder(Order value) { order = value; } public void setProduct(Product value) { product = value; }
  public void setProductName(String value) { productName = value; } public void setUnitPrice(BigDecimal value) { unitPrice = value; } public void setQuantity(int value) { quantity = value; }
}
