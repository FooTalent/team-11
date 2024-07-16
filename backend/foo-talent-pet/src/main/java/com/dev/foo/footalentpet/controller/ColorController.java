package com.dev.foo.footalentpet.controller;

import com.dev.foo.footalentpet.model.response.ColorResponseDTO;
import com.dev.foo.footalentpet.service.ColorService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Tag(name = "Color", description = "Color operations")
@RestController
@RequestMapping("/colors")
public class ColorController {
    @Autowired
    private ColorService colorService;

    @Operation(summary = "Get all colors", description = "Get all colors with data", responses = {
            @ApiResponse(responseCode = "200", description = "Successfully get colors"),
            @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content(schema = @Schema(implementation = ProblemDetail.class)))
    })
    @GetMapping
    public List<ColorResponseDTO> findAll() {
        return colorService.findAll();
    }
}
