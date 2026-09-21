package com.alankrita.boutique.service;

import com.alankrita.boutique.dto.ApiDtos.*;
import com.alankrita.boutique.model.*;
import com.alankrita.boutique.repository.OrderRepository;
import com.alankrita.boutique.repository.ProductRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import java.math.BigDecimal;

@Service
public class OrderService {
  private final ProductRepository products; private final OrderRepository orders;
  public OrderService(ProductRepository products, OrderRepository orders) { this.products = products; this.orders = orders; }
  @Transactional public OrderResponse create(User user, CreateOrderRequest request) {
    Order order = new Order(); order.setUser(user); order.setFullName(request.fullName().trim()); order.setAddress(request.address().trim()); order.setCity(request.city().trim()); order.setZipCode(request.zipCode()); order.setCountryCode(request.countryCode()); order.setMobileNumber(request.mobileNumber());
    BigDecimal total = BigDecimal.ZERO;
    for (OrderLineRequest line : request.items()) {
      Product product = products.findById(line.productId()).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "One of the selected products no longer exists"));
      OrderItem item = new OrderItem(); item.setProduct(product); item.setProductName(product.getName()); item.setUnitPrice(product.getPrice()); item.setQuantity(line.quantity()); order.addItem(item);
      total = total.add(product.getPrice().multiply(BigDecimal.valueOf(line.quantity())));
    }
    order.setTotal(total); Order saved = orders.save(order); return new OrderResponse(saved.getId(), saved.getTotal(), "PLACED");
  }
}
