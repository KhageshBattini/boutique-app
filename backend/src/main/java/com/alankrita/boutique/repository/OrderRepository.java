package com.alankrita.boutique.repository;
import com.alankrita.boutique.model.Order;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
  @EntityGraph(attributePaths = "items")
  List<Order> findAllByUser_IdOrderByCreatedAtDesc(Long userId);
}
