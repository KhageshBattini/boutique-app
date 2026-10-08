package com.alankrita.boutique.controller;

import com.alankrita.boutique.dto.ApiDtos.*;
import com.alankrita.boutique.model.User;
import com.alankrita.boutique.service.AuthService;
import com.alankrita.boutique.service.ShoppingListService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
public class ShoppingListController {
  private final AuthService auth;
  private final ShoppingListService shoppingLists;

  public ShoppingListController(AuthService auth, ShoppingListService shoppingLists) {
    this.auth = auth;
    this.shoppingLists = shoppingLists;
  }

  @GetMapping("/wishlist")
  public List<ProductResponse> wishlist(@RequestHeader(value = "Authorization", required = false) String token) {
    return shoppingLists.wishlist(auth.authenticatedUser(token));
  }

  @PostMapping("/wishlist/items/{productId}")
  @ResponseStatus(HttpStatus.CREATED)
  public ProductResponse addToWishlist(@RequestHeader(value = "Authorization", required = false) String token, @PathVariable Long productId) {
    return shoppingLists.addToWishlist(auth.authenticatedUser(token), productId);
  }

  @DeleteMapping("/wishlist/items/{productId}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void removeFromWishlist(@RequestHeader(value = "Authorization", required = false) String token, @PathVariable Long productId) {
    shoppingLists.removeFromWishlist(auth.authenticatedUser(token), productId);
  }

  @PostMapping("/cart/items/{productId}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void addToCart(@RequestHeader(value = "Authorization", required = false) String token, @PathVariable Long productId) {
    shoppingLists.addToCart(auth.authenticatedUser(token), productId);
  }

  @GetMapping("/cart")
  public List<CartItemResponse> cart(@RequestHeader(value = "Authorization", required = false) String token) {
    return shoppingLists.cart(auth.authenticatedUser(token));
  }

  @PutMapping("/cart/items/{productId}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void updateCartQuantity(@RequestHeader(value = "Authorization", required = false) String token, @PathVariable Long productId, @Valid @RequestBody CartQuantityRequest request) {
    shoppingLists.updateCartQuantity(auth.authenticatedUser(token), productId, request.quantity());
  }

  @DeleteMapping("/cart/items")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void clearCart(@RequestHeader(value = "Authorization", required = false) String token) {
    shoppingLists.clearCart(auth.authenticatedUser(token));
  }

  @DeleteMapping("/cart/items/{productId}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void removeFromCart(@RequestHeader(value = "Authorization", required = false) String token, @PathVariable Long productId) {
    shoppingLists.removeFromCart(auth.authenticatedUser(token), productId);
  }

  @PostMapping("/wishlist/items/{productId}/move-from-cart")
  public ProductResponse moveCartItemToWishlist(@RequestHeader(value = "Authorization", required = false) String token, @PathVariable Long productId) {
    return shoppingLists.moveCartItemToWishlist(auth.authenticatedUser(token), productId);
  }
}
