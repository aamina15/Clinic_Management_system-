package com.clinic.management.user.service;

import com.clinic.management.dto.ApiResponse;
import com.clinic.management.user.dto.RoleDto;
import com.clinic.management.user.entity.Role;
import com.clinic.management.user.mapper.UserMapper;
import com.clinic.management.user.repository.RoleRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class RoleService {

    private final RoleRepository roleRepository;
    private final UserMapper userMapper;

    public RoleService(RoleRepository roleRepository, UserMapper userMapper) {
        this.roleRepository = roleRepository;
        this.userMapper = userMapper;
    }

    @Transactional(readOnly = true)
    public ApiResponse<List<RoleDto>> findAll() {
        List<RoleDto> roles = roleRepository.findAll().stream()
                .map(userMapper::toRoleDto)
                .collect(Collectors.toList());
        return ApiResponse.success("Roles retrieved successfully", roles);
    }

    @Transactional
    public ApiResponse<RoleDto> create(RoleDto roleDto) {
        Role role = new Role();
        role.setName(roleDto.getName());
        role.setDescription(roleDto.getDescription());
        Role saved = roleRepository.save(role);
        return ApiResponse.success("Role created successfully", userMapper.toRoleDto(saved));
    }

    @Transactional(readOnly = true)
    public ApiResponse<RoleDto> findById(UUID id) {
        return roleRepository.findById(id)
                .map(role -> ApiResponse.success("Role retrieved successfully", userMapper.toRoleDto(role)))
                .orElseGet(() -> ApiResponse.error("Role not found"));
    }
}
