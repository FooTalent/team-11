package com.dev.foo.footalentpet.service;

import com.dev.foo.footalentpet.model.request.ContactRequestDTO;

public interface ContactService {
    void sendContactMessage(ContactRequestDTO contactRequestDTO);
}
