package com.dev.foo.footalentpet.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Health", description = "Health check")
@RestController
public class HealthCheckController {

    @Operation(summary = "Health check", description = "Health check", responses = {
            @ApiResponse(responseCode = "200", description = "Api working fine"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return new ResponseEntity<>("It's working fine :)", org.springframework.http.HttpStatus.OK);
    }

}
