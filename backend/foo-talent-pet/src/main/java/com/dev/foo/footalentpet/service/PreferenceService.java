package com.dev.foo.footalentpet.service;

import com.dev.foo.footalentpet.model.request.PreferenceRequestDTO;
import com.dev.foo.footalentpet.model.response.PreferenceResponseDTO;
import com.dev.foo.footalentpet.model.response.UserResponseDTO;

import java.util.List;
import java.util.UUID;

public interface PreferenceService {
    PreferenceResponseDTO save(PreferenceRequestDTO preferenceRequestDTO);

    List<PreferenceResponseDTO> getByUser();

    List<UserResponseDTO> getUserByPreference(PreferenceRequestDTO preferenceRequestDTO);

    void sendEmailToUsers(PreferenceRequestDTO preferenceRequestDTO, UUID postId);
}
