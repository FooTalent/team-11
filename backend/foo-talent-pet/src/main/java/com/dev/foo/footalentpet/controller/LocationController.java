package com.dev.foo.footalentpet.controller;

import com.dev.foo.footalentpet.model.response.CityResponseDTO;
import com.dev.foo.footalentpet.model.response.LocalityResponseDTO;
import com.dev.foo.footalentpet.model.response.ProvinceResponseDTO;
import com.dev.foo.footalentpet.service.LocationService;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;

import java.util.List;
import java.util.UUID;

@Tag(name = "Location", description = "Location operations")
@RestController
@RequestMapping("/location")
public class LocationController {
    @Autowired
    private LocationService locationService;

    @Operation(summary = "Get all provinces", description = "Get all provinces with data", responses = {
            @ApiResponse(responseCode = "200", description = "Successfully get provinces"),
            @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content(schema = @Schema(implementation = ProblemDetail.class)))
    })
    @GetMapping("/provinces")
    public ResponseEntity<List<ProvinceResponseDTO>> findAllProvinces() {
        return ResponseEntity.ok(locationService.findAllProvinces());
    }

    @Operation(summary = "Get all cities by province", description = "Get all cities by province with data", responses = {
            @ApiResponse(responseCode = "200", description = "Successfully get cities"),
            @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content(schema = @Schema(implementation = ProblemDetail.class)))
    })
    @GetMapping("/{province}/cities")
    public ResponseEntity<List<CityResponseDTO>> findCitiesByProvince(@PathVariable String province) {
        return ResponseEntity.ok(locationService.findCitiesByProvince(province));
    }

    @Operation(summary = "Get all localities by city", description = "Get all localities by city with data", responses = {
            @ApiResponse(responseCode = "200", description = "Successfully get localities"),
            @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content(schema = @Schema(implementation = ProblemDetail.class)))
    })
    @GetMapping("/{city}/localities")
    public ResponseEntity<List<LocalityResponseDTO>> findLocalitiesByCity(@PathVariable String city) {
        return ResponseEntity.ok(locationService.findLocalitiesByCity(city));
    }

}
