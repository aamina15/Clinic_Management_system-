package com.clinic.management.user.service;

import com.clinic.management.dto.ApiResponse;
import com.clinic.management.user.dto.UserRequestDto;
import com.clinic.management.user.dto.UserResponseDto;
import com.clinic.management.user.entity.Role;
import com.clinic.management.user.entity.User;
import com.clinic.management.user.mapper.UserMapper;
import com.clinic.management.user.repository.RoleRepository;
import com.clinic.management.user.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final UserMapper userMapper;

    public UserService(UserRepository userRepository, RoleRepository roleRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.userMapper = userMapper;
    }

    @Transactional(readOnly = true)
    public ApiResponse<List<UserResponseDto>> findAll() {
        List<UserResponseDto> users = userRepository.findAll().stream()
                .map(userMapper::toResponseDto)
                .collect(Collectors.toList());
        return ApiResponse.success("Users retrieved successfully", users);
    }

    @Transactional(readOnly = true)
    public ApiResponse<UserResponseDto> findById(UUID id) {
        return userRepository.findById(id)
                .map(user -> ApiResponse.success("User retrieved successfully", userMapper.toResponseDto(user)))
                .orElseGet(() -> ApiResponse.error("User not found"));
    }

    @Transactional
    public ApiResponse<UserResponseDto> create(UserRequestDto requestDto) {
        if (userRepository.existsByEmail(requestDto.getEmail())) {
            return ApiResponse.error("Email already exists");
        }
        if (userRepository.existsByUsername(requestDto.getUsername())) {
            return ApiResponse.error("Username already exists");
        }

        Role role = roleRepository.findById(requestDto.getRoleId())
                .orElseThrow(() -> new IllegalArgumentException("Role not found"));

        User user = userMapper.toEntity(requestDto, role);
        User saved = userRepository.save(user);
        return ApiResponse.success("User created successfully", userMapper.toResponseDto(saved));
    }
}
