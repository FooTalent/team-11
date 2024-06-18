package com.dev.foo.footalentpet.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthCheckController {

    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return new ResponseEntity<>("It's working fine :)", org.springframework.http.HttpStatus.OK);
    }

}
