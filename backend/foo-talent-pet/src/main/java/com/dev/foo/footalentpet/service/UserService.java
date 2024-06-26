package com.dev.foo.footalentpet.service;


import com.dev.foo.footalentpet.model.entity.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {
    List<User> getAllUsers();
}
