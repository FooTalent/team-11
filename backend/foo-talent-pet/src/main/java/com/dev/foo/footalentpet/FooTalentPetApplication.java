package com.dev.foo.footalentpet;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
public class FooTalentPetApplication {

    public static void main(String[] args) {

        SpringApplication.run(FooTalentPetApplication.class, args);
    }

}
