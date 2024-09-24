package com.sanketh.lms.jwt;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class AuthRequest {

    private String emailId;
    private String password;

}
