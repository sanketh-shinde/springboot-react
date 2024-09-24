package com.sanketh.lms.service;

import com.sanketh.lms.dto.UserDTO;
import com.sanketh.lms.entity.User;
import com.sanketh.lms.exception.UserNotFoundException;
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

    private User login(String emailId, String password) {
        return userRepository.findByEmailIdAndPassword(emailId, password)
                .orElseThrow(() -> new UserNotFoundException("User does not exists"));
    }

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
    public ResponseEntity<?> loginUser(String emailId, String password) {
        User fetchedUser = login(emailId, password);

        if (fetchedUser.getId() != null) {
            UserDTO userDTO = modelMapper.map(fetchedUser, UserDTO.class);
            log.info("User Fetched: {}", userDTO);

            return ResponseEntity
                    .status(HttpStatus.FOUND)
                    .body(userDTO);
        }

        log.info("Wrong Credentials");

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body("Wrong Credentials Please Check");
    }

//    @Override
//    public ResponseEntity<?> updateUserEmail(String emailId) {
//
//        UserDetail userDetail= (UserDetail) SecurityContextHolder.getContext()
//                                                .getAuthentication()
//                                                .getPrincipal();
//
//        log.info("userDetails: {}", userDetail);
//
//        User fetchedUser = login(emailId, password);
//
//        if (fetchedUser.getId() != null) {
//            fetchedUser.setEmailId(newEmailId);
//            User user = userRepository.save(fetchedUser);
//            UserDTO userDTO = modelMapper.map(user, UserDTO.class);
//
//            log.info("Updated Email Id Successfully: {}", userDTO);
//
//            return ResponseEntity
//                    .status(HttpStatus.OK)
//                    .body(userDTO);
//        }
//
//        log.info("Wrong Credentials, Try Again");
//
//        return ResponseEntity
//                .status(HttpStatus.NOT_FOUND)
//                .body("Wrong Credentials. Please Check");
//    }

    @Override
    public ResponseEntity<?> updateUserPassword(String emailId, String password, String newPassword) {
        User fetchedUser = login(emailId, password);

        if (fetchedUser.getId() != null) {
            fetchedUser.setEmailId(newPassword);
            User user = userRepository.save(fetchedUser);
            UserDTO userDTO = modelMapper.map(user, UserDTO.class);

            log.info("Updated Password Successfully: {}", userDTO);

            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(userDTO);
        }

        log.info("Wrong Credentials, Try Again");

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body("Wrong Credentials. Please Check");
    }

}
