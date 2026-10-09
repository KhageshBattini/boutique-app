package com.alankrita.boutique.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

public final class ApiDtos {
  private ApiDtos() {}
  public record UserResponse(Long id, String email, String firstName, String lastName, String profilePicture) {}
  public record AuthResponse(String token, UserResponse user) {}
  public record RegisterRequest(@NotBlank String firstName, @NotBlank String lastName, @Email String email, @Size(min = 6) String password) {}
  public record LoginRequest(@Email String email, @NotBlank String password) {}
  public record ProfileRequest(@NotBlank String firstName, @NotBlank String lastName, @Email String email, String profilePicture) {}
  public record ProductResponse(Long id, String name, BigDecimal price, String description, String image, String category, boolean newArrival) {}
  public record OrderLineRequest(@NotNull @Positive Long productId, @Min(1) int quantity) {}
  public record CreateOrderRequest(@NotEmpty List<@Valid OrderLineRequest> items, @NotBlank String fullName, @NotBlank String address, @NotBlank String city, @Pattern(regexp = "\\d{6}") String zipCode, @NotBlank String countryCode, @Pattern(regexp = "\\d{10}") String mobileNumber) {}
  public record OrderResponse(Long id, BigDecimal total, String status) {}
  public record CartQuantityRequest(@Min(1) int quantity) {}
  public record CartItemResponse(Long productId, String name, BigDecimal price, String image, int quantity) {}
  public record OrderItemResponse(String productName, BigDecimal unitPrice, int quantity) {}
  public record OrderHistoryResponse(Long id, Instant createdAt, String status, BigDecimal total, List<OrderItemResponse> items) {}
  public record ContactMessageRequest(@NotBlank @Size(max = 100) String name, @NotBlank @Email @Size(max = 255) String email, @NotBlank @Size(max = 200) String subject, @NotBlank @Size(max = 5000) String message) {}
  public record SubscribeRequest(@NotBlank @Email @Size(max = 255) String email) {}
  public record SubmissionResponse(String message) {}
}
