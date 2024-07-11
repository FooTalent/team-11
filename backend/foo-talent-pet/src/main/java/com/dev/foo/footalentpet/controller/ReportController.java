package com.dev.foo.footalentpet.controller;

import com.dev.foo.footalentpet.model.request.ReportRequestDTO;
import com.dev.foo.footalentpet.service.ReportService;
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

@Tag(name = "Report", description = "Report operations")
@RestController
@RequestMapping("/report")
public class ReportController {

    @Autowired
    private ReportService reportService;

    @Operation(summary = "Report post", description = "Report post", responses = {
            @ApiResponse(responseCode = "200", description = "Successfully reported post"),
            @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content(schema = @Schema(implementation = ProblemDetail.class)))
    })
    @PostMapping("/post")
    public ResponseEntity<Void> reportPost(@RequestBody ReportRequestDTO reportRequestDTO) {
        reportService.generatePostReport(reportRequestDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Operation(summary = "Report comment", description = "Report comment", responses = {
            @ApiResponse(responseCode = "200", description = "Successfully reported comment"),
            @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content(schema = @Schema(implementation = ProblemDetail.class)))
    })
    @PostMapping("/comment")
    public ResponseEntity<Void> reportComment(@RequestBody ReportRequestDTO reportRequestDTO) {
        reportService.generateCommentReport(reportRequestDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
