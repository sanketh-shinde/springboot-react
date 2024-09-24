package com.sanketh.lms.controller;

import com.sanketh.lms.service.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
@Tag(name = "Users")
@AllArgsConstructor
public class UserController {

    private UserService userService;

//    @PatchMapping("/updateEmail/{emailId}")
//    public void updateEmail(@PathVariable String emailId) {
//        userService.updateUserEmail(emailId);
//    }

}
