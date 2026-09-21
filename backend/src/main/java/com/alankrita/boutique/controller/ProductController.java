package com.alankrita.boutique.controller;

import com.alankrita.boutique.dto.ApiDtos.ProductResponse;
import com.alankrita.boutique.model.Product;
import com.alankrita.boutique.repository.ProductRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController @RequestMapping("/api/products")
public class ProductController {
  private final ProductRepository products; public ProductController(ProductRepository products) { this.products = products; }
  @GetMapping public List<ProductResponse> all() { return products.findAll().stream().map(this::toResponse).toList(); }
  private ProductResponse toResponse(Product product) { return new ProductResponse(product.getId(), product.getName(), product.getPrice(), product.getDescription(), product.getImageUrl(), product.getCategory(), product.isNewArrival()); }
}
