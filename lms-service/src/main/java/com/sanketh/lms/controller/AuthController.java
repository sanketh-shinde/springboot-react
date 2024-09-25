package com.sanketh.lms.controller;

import com.sanketh.lms.dto.UserDTO;
import com.sanketh.lms.entity.User;
import com.sanketh.lms.jwt.AuthRequest;
import com.sanketh.lms.jwt.JwtResponse;
import com.sanketh.lms.jwt.JwtUtils;
import com.sanketh.lms.repository.UserRepository;
import com.sanketh.lms.service.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@Tag(name = "Auth")
@AllArgsConstructor
@Slf4j
@CrossOrigin("*")
public class AuthController {

    private UserService userService;
    private UserRepository userRepository;
    private ModelMapper modelMapper;

    private AuthenticationManager authenticationManager;

    private JwtUtils jwtUtils;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        return userService.registerUser(user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest authRequest) throws Exception {
        this.authenticate(authRequest.getEmailId(), authRequest.getPassword());
        UserDetails userDetails = userService.loadUserByUsername(authRequest.getEmailId());
        String token = jwtUtils.generateToken(userDetails.getUsername());
        User user = userRepository.findByEmailId(userDetails.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("User not availbale"));
        return ResponseEntity.ok().body(
                new JwtResponse(token, modelMapper.map(user, UserDTO.class))
        );
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
