package com.dev.foo.footalentpet.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.client.HttpServerErrorException;

@ControllerAdvice
public class GlobalExcepcionHandler {

    @ExceptionHandler(InternalServerErrorException.class)
    public ResponseEntity<ErrorResponse> handleInternalServerError(InternalServerErrorException ex) {
        ErrorResponse errorResponse = new ErrorResponse(ex.getCode(), ex.getMessage(), ex.getDate());
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(NotFoundException ex) {
        ErrorResponse errorResponse = new ErrorResponse(ex.getCode(), ex.getMessage(), ex.getDate());
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }
}
