package com.sanketh.lms.controller;

import com.sanketh.lms.entity.User;
import com.sanketh.lms.jwt.AuthRequest;
import com.sanketh.lms.jwt.JwtUtils;
import com.sanketh.lms.service.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@Tag(name = "Auth")
@AllArgsConstructor
@Slf4j
@CrossOrigin("*")
public class AuthController {

    private UserService userService;

    private AuthenticationManager authenticationManager;

    private JwtUtils jwtUtils;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        return userService.registerUser(user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest authRequest) throws Exception {
        this.authenticate(authRequest.getEmailId(), authRequest.getPassword());
        UserDetails userDetails = this.userService.loadUserByUsername(authRequest.getEmailId());
        String token = this.jwtUtils.generateToken(userDetails.getUsername());
        return ResponseEntity.ok().body(token);
    }

    private void authenticate(String username,String password) throws Exception {
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(username,password);
        try {
            this.authenticationManager.authenticate(authenticationToken);
        } catch (DisabledException e) {
            throw new DisabledException("user is disabled");
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("bad credentials");
        }
    }

}
