package com.dev.foo.footalentpet.service;

import java.util.List;

public interface EmailService {
    void sendSimpleMessage(String to, String subject, String text);

    void sendHtmlMessage(String to, String subject, String htmlText);

    void sendHtmlMessageToUsers(List<String> to, String subject, String htmlText);
}
