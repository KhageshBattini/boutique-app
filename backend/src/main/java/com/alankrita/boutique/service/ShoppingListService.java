package com.alankrita.boutique.service;

import com.alankrita.boutique.dto.ApiDtos.CartItemResponse;
import com.alankrita.boutique.dto.ApiDtos.ProductResponse;
import com.alankrita.boutique.model.*;
import com.alankrita.boutique.repository.*;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;

@Service
public class ShoppingListService {
  private final ProductRepository products;
  private final ShoppingCartItemRepository cartItems;
  private final WishlistItemRepository wishlistItems;

  public ShoppingListService(ProductRepository products, ShoppingCartItemRepository cartItems, WishlistItemRepository wishlistItems) {
    this.products = products;
    this.cartItems = cartItems;
    this.wishlistItems = wishlistItems;
  }

  @Transactional(readOnly = true)
  public List<ProductResponse> wishlist(User user) {
    return wishlistItems.findAllByUser_IdOrderByIdDesc(user.getId()).stream()
        .map(item -> toResponse(item.getProduct())).toList();
  }

  @Transactional(readOnly = true)
  public List<CartItemResponse> cart(User user) {
    return cartItems.findAllByUser_Id(user.getId()).stream()
        .map(item -> new CartItemResponse(item.getProduct().getId(), item.getProduct().getName(),
            item.getProduct().getPrice(), item.getQuantity(), item.getProduct().getImageUrl()))
        .toList();
  }

  @Transactional
  public ProductResponse addToWishlist(User user, Long productId) {
    Product product = findProduct(productId);
    if (!wishlistItems.existsByUser_IdAndProduct_Id(user.getId(), productId)) {
      wishlistItems.save(new WishlistItem(user, product));
    }
    return toResponse(product);
  }

  @Transactional
  public void removeFromWishlist(User user, Long productId) {
    wishlistItems.deleteByUser_IdAndProduct_Id(user.getId(), productId);
  }

  @Transactional
  public void addToCart(User user, Long productId) {
    Product product = findProduct(productId);
    ShoppingCartItem item = cartItems.findByUser_IdAndProduct_Id(user.getId(), productId)
        .orElseGet(() -> new ShoppingCartItem(user, product));
    item.setQuantity(item.getQuantity() + 1);
    cartItems.save(item);
  }

  @Transactional
  public void updateCartQuantity(User user, Long productId, int quantity) {
    ShoppingCartItem item = cartItems.findByUser_IdAndProduct_Id(user.getId(), productId)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cart item was not found"));
    item.setQuantity(quantity);
    cartItems.save(item);
  }

  @Transactional
  public void removeFromCart(User user, Long productId) {
    cartItems.deleteByUser_IdAndProduct_Id(user.getId(), productId);
  }

  @Transactional
  public void clearCart(User user) {
    cartItems.deleteAllByUser_Id(user.getId());
  }

  @Transactional
  public ProductResponse moveCartItemToWishlist(User user, Long productId) {
    Product product = findProduct(productId);
    if (!wishlistItems.existsByUser_IdAndProduct_Id(user.getId(), productId)) {
      wishlistItems.save(new WishlistItem(user, product));
    }
    cartItems.deleteByUser_IdAndProduct_Id(user.getId(), productId);
    return toResponse(product);
  }

  private Product findProduct(Long productId) {
    return products.findById(productId)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product was not found"));
  }

  private ProductResponse toResponse(Product product) {
    return new ProductResponse(product.getId(), product.getName(), product.getPrice(), product.getDescription(),
        product.getImageUrl(), product.getCategory(), product.isNewArrival());
  }
}
