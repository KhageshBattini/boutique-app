package com.alankrita.boutique.repository;

import com.alankrita.boutique.model.NewsletterSubscription;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NewsletterSubscriptionRepository extends JpaRepository<NewsletterSubscription, Long> {
  boolean existsByEmail(String email);
}
