package com.sanketh.lms.service;

import com.sanketh.lms.dto.UserDTO;
import com.sanketh.lms.entity.User;
import com.sanketh.lms.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;

    private PasswordEncoder encoder;

    private ModelMapper modelMapper;

    @Override
    public UserDetails loadUserByUsername(String emailId) throws UsernameNotFoundException {
        return (UserDetails) userRepository.findByEmailId(emailId)
                .orElseThrow(() -> new UsernameNotFoundException("username not found"));
    }

    @Override
    public ResponseEntity<?> registerUser(User user) {

        user.setPassword(encoder.encode(user.getPassword()));
        user.setRoles(user.getRoles());
        User savedUser = userRepository.save(user);

        if (savedUser.getId() != null) {
            UserDTO userDTO = modelMapper.map(savedUser, UserDTO.class);
            log.info("User Created: {}", userDTO);
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(userDTO);
        }

        log.info("Something Went Wrong");

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body("Something Went Wrong");
    }

    @Override
    public ResponseEntity<?> updateUser(User user) {
        User fetchedUser = userRepository.findById(user.getId())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        user.setPassword(fetchedUser.getPassword());
        User savedUser = userRepository.save(user);

        if (savedUser.getId() != null) {
            UserDTO userDTO = modelMapper.map(savedUser, UserDTO.class);
            log.info("User updated: {}", userDTO);
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(userDTO);
        }

        log.info("Something Went Wrong");

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body("Something Went Wrong");
    }

}
