package com.dev.foo.footalentpet.exception;

public class UnauthorizedException extends BaseException {

    private static final String CODE = "401";

    public UnauthorizedException(String message) {
        super(CODE, message);
    }
}
