package com.alankrita.boutique.service;

import com.alankrita.boutique.dto.ApiDtos.*;
import com.alankrita.boutique.model.Session;
import com.alankrita.boutique.model.User;
import com.alankrita.boutique.repository.SessionRepository;
import com.alankrita.boutique.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.UUID;

@Service
public class AuthService {
  private final UserRepository users; private final SessionRepository sessions; private final PasswordEncoder passwords;
  public AuthService(UserRepository users, SessionRepository sessions, PasswordEncoder passwords) { this.users = users; this.sessions = sessions; this.passwords = passwords; }
  public AuthResponse register(RegisterRequest request) {
    String email = request.email().trim().toLowerCase();
    if (users.existsByEmailIgnoreCase(email)) throw new ResponseStatusException(HttpStatus.CONFLICT, "An account already uses this email address");
    User user = new User(); user.setEmail(email); user.setFirstName(request.firstName().trim()); user.setLastName(request.lastName().trim()); user.setPasswordHash(passwords.encode(request.password()));
    return createSession(users.save(user));
  }
  public AuthResponse login(LoginRequest request) {
    User user = users.findByEmailIgnoreCase(request.email().trim()).orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password"));
    if (!passwords.matches(request.password(), user.getPasswordHash())) throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password");
    return createSession(user);
  }
  public User authenticatedUser(String authorization) {
    if (authorization == null || !authorization.startsWith("Bearer ")) throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Sign in is required");
    Session session = sessions.findById(authorization.substring(7)).orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Your session is invalid"));
    if (session.getExpiresAt().isBefore(Instant.now())) { sessions.delete(session); throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Your session has expired"); }
    return session.getUser();
  }
  public UserResponse updateProfile(User user, ProfileRequest request) {
    String email = request.email().trim().toLowerCase();
    users.findByEmailIgnoreCase(email).filter(existing -> !existing.getId().equals(user.getId())).ifPresent(existing -> { throw new ResponseStatusException(HttpStatus.CONFLICT, "An account already uses this email address"); });
    user.setEmail(email); user.setFirstName(request.firstName().trim()); user.setLastName(request.lastName().trim()); user.setProfilePicture(request.profilePicture()); return toUser(users.save(user));
  }
  public void logout(String authorization) { if (authorization != null && authorization.startsWith("Bearer ")) sessions.deleteById(authorization.substring(7)); }
  private AuthResponse createSession(User user) { Session session = new Session(); session.setToken(UUID.randomUUID().toString()); session.setUser(user); session.setExpiresAt(Instant.now().plus(7, ChronoUnit.DAYS)); sessions.save(session); return new AuthResponse(session.getToken(), toUser(user)); }
  public static UserResponse toUser(User user) { return new UserResponse(user.getId(), user.getEmail(), user.getFirstName(), user.getLastName(), user.getProfilePicture()); }
}
