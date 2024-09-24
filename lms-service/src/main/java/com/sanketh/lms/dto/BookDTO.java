package com.sanketh.lms.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class BookDTO {

    private Integer id;
    private String name;
    private String author;
    private double price;
    private boolean isAvailable;

}
