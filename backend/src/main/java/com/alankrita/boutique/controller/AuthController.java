package com.alankrita.boutique.controller;

import com.alankrita.boutique.dto.ApiDtos.*;
import com.alankrita.boutique.model.User;
import com.alankrita.boutique.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController @RequestMapping("/api/auth")
public class AuthController {
  private final AuthService auth; public AuthController(AuthService auth) { this.auth = auth; }
  @PostMapping("/register") @ResponseStatus(HttpStatus.CREATED) public AuthResponse register(@Valid @RequestBody RegisterRequest request) { return auth.register(request); }
  @PostMapping("/login") public AuthResponse login(@Valid @RequestBody LoginRequest request) { return auth.login(request); }
  @GetMapping("/me") public UserResponse me(@RequestHeader(value = "Authorization", required = false) String token) { return AuthService.toUser(auth.authenticatedUser(token)); }
  @PutMapping("/me") public UserResponse update(@RequestHeader(value = "Authorization", required = false) String token, @Valid @RequestBody ProfileRequest request) { User user = auth.authenticatedUser(token); return auth.updateProfile(user, request); }
  @PostMapping("/logout") @ResponseStatus(HttpStatus.NO_CONTENT) public void logout(@RequestHeader(value = "Authorization", required = false) String token) { auth.logout(token); }
}
