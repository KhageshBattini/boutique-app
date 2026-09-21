package com.alankrita.boutique.repository;
import com.alankrita.boutique.model.Session;
import org.springframework.data.jpa.repository.JpaRepository;
public interface SessionRepository extends JpaRepository<Session, String> {}
