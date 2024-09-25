package com.sanketh.lms.jwt;

import com.sanketh.lms.dto.UserDTO;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class JwtResponse {

    private String token;
    private UserDTO userDTO;
    
}
