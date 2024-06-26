package com.dev.foo.footalentpet.service.impl;

import com.dev.foo.footalentpet.helper.GenericMapperUtil;
import com.dev.foo.footalentpet.model.response.UserResponseDTO;
import com.dev.foo.footalentpet.repository.UserRepository;
import com.dev.foo.footalentpet.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final GenericMapperUtil mapperUtil;



    @Override
    public List<UserResponseDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(match -> mapperUtil.mapToDto(match, UserResponseDTO.class))
                .toList();
    }


}
