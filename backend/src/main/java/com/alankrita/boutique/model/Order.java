package com.alankrita.boutique.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity @Table(name = "orders")
public class Order {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
  @ManyToOne(optional = false) @JoinColumn(name = "user_id") private User user;
  @Column(name = "full_name", nullable = false) private String fullName; @Column(nullable = false) private String address; @Column(nullable = false) private String city;
  @Column(name = "zip_code", nullable = false) private String zipCode; @Column(name = "country_code", nullable = false) private String countryCode;
  @Column(name = "mobile_number", nullable = false) private String mobileNumber; @Column(nullable = false) private BigDecimal total;
  @Column(nullable = false) private String status = "PLACED"; @Column(name = "created_at", nullable = false) private Instant createdAt = Instant.now();
  @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true) private List<OrderItem> items = new ArrayList<>();
  public void setUser(User value) { user = value; } public void setFullName(String value) { fullName = value; } public void setAddress(String value) { address = value; }
  public void setCity(String value) { city = value; } public void setZipCode(String value) { zipCode = value; } public void setCountryCode(String value) { countryCode = value; }
  public void setMobileNumber(String value) { mobileNumber = value; } public void setTotal(BigDecimal value) { total = value; }
  public void addItem(OrderItem item) { item.setOrder(this); items.add(item); } public Long getId() { return id; } public BigDecimal getTotal() { return total; }
}
