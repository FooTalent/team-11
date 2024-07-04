package com.dev.foo.footalentpet.exception;

public class InternalServerErrorException extends BaseException {

    private static final String CODE = "500";

    private static final String MESSAGE = "Internal Server Error";

    public InternalServerErrorException() {
        super(CODE, MESSAGE);
    }
}
