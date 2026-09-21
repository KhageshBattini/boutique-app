package com.alankrita.boutique.controller;

import com.alankrita.boutique.dto.ApiDtos.*;
import com.alankrita.boutique.service.AuthService;
import com.alankrita.boutique.service.OrderService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController @RequestMapping("/api/orders")
public class OrderController {
  private final AuthService auth; private final OrderService orders;
  public OrderController(AuthService auth, OrderService orders) { this.auth = auth; this.orders = orders; }
  @PostMapping @ResponseStatus(HttpStatus.CREATED) public OrderResponse create(@RequestHeader(value = "Authorization", required = false) String token, @Valid @RequestBody CreateOrderRequest request) { return orders.create(auth.authenticatedUser(token), request); }
}
