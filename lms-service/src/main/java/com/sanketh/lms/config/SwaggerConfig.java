package com.sanketh.lms.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;


@OpenAPIDefinition(
        info = @Info(
                title = "Library Management System",
                description = "API for library management system",
                summary = "api for library management system",
                version = "v1.0",
                contact = @Contact(
                        name = "Sanketh Shinde",
                        email = "sanketh@gmail.com",
                        url = "http://www.google.com"
                )
        ),
        security = @SecurityRequirement(
                name = "jwt auth"
        )
)
@SecurityScheme(
        name = "jwt auth",
        in = SecuritySchemeIn.HEADER,
        type = SecuritySchemeType.HTTP,
        bearerFormat = "JWT",
        scheme = "Bearer",
        description = "using jwt authorization"
)
public class SwaggerConfig {
}
