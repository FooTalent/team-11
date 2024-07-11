package com.dev.foo.footalentpet.service.impl;

import com.dev.foo.footalentpet.model.request.ContactRequestDTO;
import com.dev.foo.footalentpet.service.ContactService;
import com.dev.foo.footalentpet.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ContactServiceImpl implements ContactService {
    @Autowired
    private EmailService emailService;

    @Override
    public void sendContactMessage(ContactRequestDTO contactRequestDTO) {
        String messageHtml = "<h1>Mensaje de contacto</h1><p>Nombre: " + contactRequestDTO.name() + "</p><p>Email: " + contactRequestDTO.email() + "</p><p>Mensaje: " + contactRequestDTO.message() + "</p>";
        emailService.sendHtmlMessage("petquest11@gmail.com", "Mensaje de contacto de " + contactRequestDTO.name(), messageHtml);
    }
}
