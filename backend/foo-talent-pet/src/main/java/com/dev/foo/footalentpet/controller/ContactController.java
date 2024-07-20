package com.dev.foo.footalentpet.controller;

import com.dev.foo.footalentpet.model.request.ContactRequestDTO;
import com.dev.foo.footalentpet.service.ContactService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Contact", description = "Contact operations")
@RestController
@RequestMapping("/contact")
public class ContactController {
    @Autowired
    private ContactService contactService;

    @Operation(summary = "Send contact message", description = "Send contact message", responses = {
            @ApiResponse(responseCode = "200", description = "Successfully sent contact message"),
            @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content(schema = @Schema(implementation = ProblemDetail.class)))
    })
    @PostMapping
    public ResponseEntity<Void> sendContactMessage(@RequestBody ContactRequestDTO contactRequestDTO) {
        contactService.sendContactMessage(contactRequestDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
