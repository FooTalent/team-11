package com.dev.foo.footalentpet.service;

public interface EmailService {
    void sendSimpleMessage(String to, String subject, String text);

    void sendHtmlMessage(String to, String subject, String htmlText);
}
