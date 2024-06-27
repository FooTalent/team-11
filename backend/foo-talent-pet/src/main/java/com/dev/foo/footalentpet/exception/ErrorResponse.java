package com.dev.foo.footalentpet.exception;

import java.time.LocalDateTime;

public record ErrorResponse(String code, String message, LocalDateTime date) {

}
