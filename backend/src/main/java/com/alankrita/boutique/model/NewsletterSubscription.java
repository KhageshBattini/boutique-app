package com.alankrita.boutique.model;

import jakarta.persistence.*;

@Entity
@Table(name = "newsletter_subscriptions")
public class NewsletterSubscription {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
  @Column(nullable = false, unique = true, length = 255) private String email;

  protected NewsletterSubscription() {}

  public NewsletterSubscription(String email) { this.email = email.trim().toLowerCase(); }
}
