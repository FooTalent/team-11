package com.dev.foo.footalentpet;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
@OpenAPIDefinition(servers = {@Server(url = "/api", description = "Default Server URL")}, info = @Info(title = "Pet-Quest API", version = "1.0", description = "API for Pet-Quest"))
public class FooTalentPetApplication {

    public static void main(String[] args) {

        SpringApplication.run(FooTalentPetApplication.class, args);
    }

}
