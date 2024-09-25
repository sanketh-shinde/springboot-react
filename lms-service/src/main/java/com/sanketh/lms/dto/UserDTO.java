package com.sanketh.lms.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserDTO {

    private Integer id;
    private String name;
    private String emailId;
    private String mobileNumber;
    private String roles;

}
