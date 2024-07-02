package com.dev.foo.footalentpet.exception;

public class NotFoundException extends BaseException {

    private static final String CODE = "404";

    public NotFoundException(String message) {
        super(CODE, message);
    }
}
