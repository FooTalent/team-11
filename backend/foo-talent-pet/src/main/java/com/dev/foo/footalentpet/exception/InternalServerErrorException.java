package com.dev.foo.footalentpet.exception;

public class InternalServerErrorException extends BaseException {

    private static final String CODE = "500";

    public InternalServerErrorException(String message) {
        super(CODE, message);
    }
}
