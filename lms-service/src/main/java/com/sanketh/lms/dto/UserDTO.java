package com.sanketh.lms.dto;

import lombok.*;

import java.util.Set;

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

}
