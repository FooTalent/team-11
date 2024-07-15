package com.dev.foo.footalentpet.service.impl;

import com.dev.foo.footalentpet.service.EmailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmailServiceImpl implements EmailService {

    @Autowired
    private JavaMailSender emailSender;

    public void sendSimpleMessage(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("petquest11@gmail.com");
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        emailSender.send(message);
    }

    @Override
    public void sendHtmlMessage(String to, String subject, String htmlText) {
        try {
            MimeMessage message = emailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setFrom("petquest11@gmail.com");
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlText, true);

            emailSender.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void sendHtmlMessageToUsers(List<String> to, String subject, String htmlText) {
        try {
            MimeMessage message = emailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setFrom("petquest11@gmail.com");
            helper.setTo(to.toArray(new String[0]));
            helper.setSubject(subject);
            helper.setText(htmlText, true);

            emailSender.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }
}
