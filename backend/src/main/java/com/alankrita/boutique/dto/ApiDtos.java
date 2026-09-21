package com.alankrita.boutique.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
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
}
