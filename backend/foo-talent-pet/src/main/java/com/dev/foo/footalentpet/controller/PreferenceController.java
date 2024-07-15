package com.dev.foo.footalentpet.controller;

import com.dev.foo.footalentpet.model.enums.Gender;
import com.dev.foo.footalentpet.model.enums.PostStatus;
import com.dev.foo.footalentpet.model.enums.SpeciesType;
import com.dev.foo.footalentpet.model.request.PreferenceRequestDTO;
import com.dev.foo.footalentpet.model.response.PreferenceResponseDTO;
import com.dev.foo.footalentpet.model.response.UserResponseDTO;
import com.dev.foo.footalentpet.service.PreferenceService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@Tag(name = "Preference", description = "Preference operations")
@RestController
@RequestMapping("/preferences")
public class PreferenceController {
    @Autowired
    private PreferenceService preferenceService;

    @Operation(summary = "Save preference", description = "Save preference", responses = {
            @ApiResponse(responseCode = "201", description = "Successfully saved preference"),
            @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content(schema = @Schema(implementation = ProblemDetail.class)))
    })
    @PostMapping
    public ResponseEntity<PreferenceResponseDTO> savePreference(@RequestBody PreferenceRequestDTO preferenceRequestDTO) {
        PreferenceResponseDTO preference = preferenceService.save(preferenceRequestDTO);
        return new ResponseEntity<>(preference, HttpStatus.CREATED);
    }

    @Operation(summary = "Get preferences by user", description = "Get preferences by user", responses = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved preferences"),
            @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content(schema = @Schema(implementation = ProblemDetail.class)))
    })
    @GetMapping("/user")
    public ResponseEntity<List<PreferenceResponseDTO>> getPreferencesByUser() {
        return ResponseEntity.ok(preferenceService.getByUser());
    }

    @GetMapping("/user/preferences")
    public ResponseEntity<List<UserResponseDTO>> getUserByPreference(@RequestParam(required = false) PostStatus postStatus,
                                                                     @RequestParam(required = false) SpeciesType speciesType,
                                                                     @RequestParam(required = false) Gender gender,
                                                                     @RequestParam(required = false) String province,
                                                                     @RequestParam(required = false) String city,
                                                                     @RequestParam(required = false) String locality,
                                                                     @RequestParam(required = false) List<UUID> tagIds,
                                                                     @RequestParam(required = false) List<UUID> colorIds) {
        PreferenceRequestDTO preferenceRequestDTO = new PreferenceRequestDTO(postStatus, speciesType, gender, province, city, locality, colorIds, tagIds);
        return ResponseEntity.ok(preferenceService.getUserByPreference(preferenceRequestDTO));
    }
}
