package com.alankrita.boutique.model;

import jakarta.persistence.*;
import java.time.Instant;

@Entity @Table(name = "sessions")
public class Session {
  @Id private String token;
  @ManyToOne(optional = false) @JoinColumn(name = "user_id") private User user;
  @Column(name = "expires_at", nullable = false) private Instant expiresAt;
  public String getToken() { return token; } public void setToken(String value) { token = value; }
  public User getUser() { return user; } public void setUser(User value) { user = value; }
  public Instant getExpiresAt() { return expiresAt; } public void setExpiresAt(Instant value) { expiresAt = value; }
}
