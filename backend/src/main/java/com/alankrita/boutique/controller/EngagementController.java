package com.alankrita.boutique.controller;

import com.alankrita.boutique.dto.ApiDtos.*;
import com.alankrita.boutique.model.ContactMessage;
import com.alankrita.boutique.model.NewsletterSubscription;
import com.alankrita.boutique.repository.ContactMessageRepository;
import com.alankrita.boutique.repository.NewsletterSubscriptionRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class EngagementController {
  private final ContactMessageRepository messages;
  private final NewsletterSubscriptionRepository subscriptions;

  public EngagementController(ContactMessageRepository messages, NewsletterSubscriptionRepository subscriptions) {
    this.messages = messages;
    this.subscriptions = subscriptions;
  }

  @PostMapping("/contact")
  @ResponseStatus(HttpStatus.CREATED)
  public SubmissionResponse contact(@Valid @RequestBody ContactMessageRequest request) {
    messages.save(new ContactMessage(request));
    return new SubmissionResponse("Thank you for your message! We will get back to you soon.");
  }

  @PostMapping("/subscriptions")
  @ResponseStatus(HttpStatus.CREATED)
  public SubmissionResponse subscribe(@Valid @RequestBody SubscribeRequest request) {
    String email = request.email().trim().toLowerCase();
    if (!subscriptions.existsByEmail(email)) subscriptions.save(new NewsletterSubscription(email));
    return new SubmissionResponse("Thanks for subscribing!");
  }
}
