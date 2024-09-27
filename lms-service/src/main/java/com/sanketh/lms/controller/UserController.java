package com.sanketh.lms.controller;

import com.sanketh.lms.entity.User;
import com.sanketh.lms.service.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@Tag(name = "Users")
@AllArgsConstructor
@CrossOrigin("*")
public class UserController {

    private UserService userService;

    @PutMapping("/update")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<?> updateUser(@RequestBody User user) {
        return userService.updateUser(user);
    }

//    @PatchMapping("/updateEmail/{emailId}")
//    public void updateEmail(@PathVariable String emailId) {
//        userService.updateUserEmail(emailId);
//    }

}
