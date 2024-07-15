package com.dev.foo.footalentpet.service.impl;

import com.dev.foo.footalentpet.mapper.PreferenceDTOMapper;
import com.dev.foo.footalentpet.mapper.UserDTOMapper;
import com.dev.foo.footalentpet.model.entity.Preference;
import com.dev.foo.footalentpet.model.entity.PreferenceColor;
import com.dev.foo.footalentpet.model.entity.PreferenceTag;
import com.dev.foo.footalentpet.model.entity.User;
import com.dev.foo.footalentpet.model.request.PreferenceRequestDTO;
import com.dev.foo.footalentpet.model.response.PreferenceResponseDTO;
import com.dev.foo.footalentpet.model.response.UserResponseDTO;
import com.dev.foo.footalentpet.repository.PreferenceColorRepository;
import com.dev.foo.footalentpet.repository.PreferenceRepository;
import com.dev.foo.footalentpet.repository.PreferenceTagRepository;
import com.dev.foo.footalentpet.repository.specification.PreferenceSpecifications;
import com.dev.foo.footalentpet.service.EmailService;
import com.dev.foo.footalentpet.service.PreferenceService;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.HashSet;
import java.util.List;
import java.util.UUID;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@Service
public class PreferenceServinceImpl implements PreferenceService {

    private static final org.slf4j.Logger log = LoggerFactory.getLogger(PreferenceServinceImpl.class);
    Logger logger = Logger.getLogger(PreferenceServinceImpl.class.getName());

    @Autowired
    private PreferenceRepository preferenceRepository;
    @Autowired
    private PreferenceDTOMapper preferenceDTOMapper;
    @Autowired
    private PreferenceColorRepository preferenceColorRepository;
    @Autowired
    private PreferenceTagRepository preferenceTagRepository;
    @Autowired
    private UserDTOMapper userDTOMapper;
    @Autowired
    private EmailService emailService;

    @Value("${frontend.url}")
    private String frontendUrl;

    @Override
    public PreferenceResponseDTO save(PreferenceRequestDTO preferenceRequestDTO) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

        Preference preference = preferenceDTOMapper.preferenceRequestDtoToPreference(preferenceRequestDTO);
        preference.setUser(currentUser);

        Preference savedPreference = preferenceRepository.save(preference);

        List<PreferenceColor> preferenceColors = preference.getPreferenceColors().stream()
                .map(color -> new PreferenceColor(savedPreference, color.getColor()))
                .toList();

        List<PreferenceTag> preferenceTags = preference.getPreferenceTags().stream()
                .map(tag -> new PreferenceTag(savedPreference, tag.getTag()))
                .toList();

        preferenceColorRepository.saveAll(preferenceColors);
        preferenceTagRepository.saveAll(preferenceTags);

        savedPreference.setPreferenceColors(new HashSet<>(preferenceColors));
        savedPreference.setPreferenceTags(new HashSet<>(preferenceTags));

        return preferenceDTOMapper.preferenceToPreferenceResponseDto(savedPreference);
    }

    @Override
    public List<PreferenceResponseDTO> getByUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

        List<Preference> preferences = preferenceRepository.findByUser(currentUser);

        return preferences.stream()
                .map(preferenceDTOMapper::preferenceToPreferenceResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<UserResponseDTO> getUserByPreference(PreferenceRequestDTO preferenceRequestDTO) {
        Specification<Preference> specification = Specification.where(null);

        specification = specification.and(PreferenceSpecifications.matchByRequestDTO(preferenceRequestDTO));

        List<Preference> preferences = preferenceRepository.findAll(specification);
        return preferences.stream()
                .map(Preference::getUser)
                .map(userDTOMapper::userToUserResponseDto)
                .collect(Collectors.toList());

    }

    @Override
    public void sendEmailToUsers(PreferenceRequestDTO preferenceRequestDTO, UUID postId) throws IOException {
        List<UserResponseDTO> users = getUserByPreference(preferenceRequestDTO);
        List<String> emails = users.stream()
                .map(UserResponseDTO::email)
                .toList();

        if (emails.isEmpty()) {
            return;
        }
        String message = new String(Files.readAllBytes(new File("src/main/resources/templates/notification.html").toPath()));
        message = message.replace("{frontendUrl}", frontendUrl);
        message = message.replace("{postId}", postId.toString());
        emailService.sendHtmlMessageToUsers(emails, "Nueva publicacion - Pet Quest", message);
    }
}
