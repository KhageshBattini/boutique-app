package com.alankrita.boutique.repository;

import com.alankrita.boutique.model.WishlistItem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface WishlistItemRepository extends JpaRepository<WishlistItem, Long> {
  boolean existsByUser_IdAndProduct_Id(Long userId, Long productId);
  List<WishlistItem> findAllByUser_IdOrderByIdDesc(Long userId);
  void deleteByUser_IdAndProduct_Id(Long userId, Long productId);
}
