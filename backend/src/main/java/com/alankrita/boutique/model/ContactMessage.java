package com.alankrita.boutique.model;

import com.alankrita.boutique.dto.ApiDtos.ContactMessageRequest;
import jakarta.persistence.*;

@Entity
@Table(name = "contact_messages")
public class ContactMessage {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
  @Column(nullable = false, length = 100) private String name;
  @Column(nullable = false, length = 255) private String email;
  @Column(nullable = false, length = 200) private String subject;
  @Column(nullable = false, length = 5000) private String message;

  protected ContactMessage() {}

  public ContactMessage(ContactMessageRequest request) {
    this.name = request.name().trim();
    this.email = request.email().trim().toLowerCase();
    this.subject = request.subject().trim();
    this.message = request.message().trim();
  }
}
