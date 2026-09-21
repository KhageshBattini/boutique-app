package com.alankrita.boutique.model;

import jakarta.persistence.*;
import java.time.Instant;

@Entity @Table(name = "users")
public class User {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
  @Column(nullable = false, unique = true) private String email;
  @Column(name = "password_hash", nullable = false) private String passwordHash;
  @Column(name = "first_name", nullable = false) private String firstName;
  @Column(name = "last_name", nullable = false) private String lastName;
  @Column(name = "profile_picture", columnDefinition = "TEXT") private String profilePicture;
  @Column(name = "created_at", nullable = false, updatable = false) private Instant createdAt = Instant.now();
  public Long getId() { return id; } public String getEmail() { return email; } public void setEmail(String value) { email = value; }
  public String getPasswordHash() { return passwordHash; } public void setPasswordHash(String value) { passwordHash = value; }
  public String getFirstName() { return firstName; } public void setFirstName(String value) { firstName = value; }
  public String getLastName() { return lastName; } public void setLastName(String value) { lastName = value; }
  public String getProfilePicture() { return profilePicture; } public void setProfilePicture(String value) { profilePicture = value; }
}
