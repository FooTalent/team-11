package com.dev.foo.footalentpet.service.impl;


import com.dev.foo.footalentpet.model.entity.User;
import com.dev.foo.footalentpet.repository.UserRepository;
import com.dev.foo.footalentpet.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    @Autowired
    private final UserRepository userRepository;

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }


}
