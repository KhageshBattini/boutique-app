package com.alankrita.boutique.repository;
import com.alankrita.boutique.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
public interface OrderRepository extends JpaRepository<Order, Long> {}
