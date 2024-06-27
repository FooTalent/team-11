package com.dev.foo.footalentpet.exception;

import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class BaseException extends RuntimeException {

    private final String code;
    private final String message;
    private final LocalDateTime date;

    public BaseException(String code, String message) {
        this.code = code;
        this.message = message;
        this.date = LocalDateTime.now();
    }
}
