package com.alankrita.boutique.repository;
import com.alankrita.boutique.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
public interface ProductRepository extends JpaRepository<Product, Long> {}
