package com.alankrita.boutique.repository;

import com.alankrita.boutique.model.ShoppingCartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface ShoppingCartItemRepository extends JpaRepository<ShoppingCartItem, Long> {
  Optional<ShoppingCartItem> findByUser_IdAndProduct_Id(Long userId, Long productId);
  List<ShoppingCartItem> findAllByUser_Id(Long userId);
  void deleteByUser_IdAndProduct_Id(Long userId, Long productId);
  void deleteAllByUser_Id(Long userId);
}
