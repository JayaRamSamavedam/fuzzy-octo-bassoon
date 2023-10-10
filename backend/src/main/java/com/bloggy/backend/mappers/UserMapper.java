package com.bloggy.backend.mappers;

import com.bloggy.backend.dtos.SignUpDto;
import com.bloggy.backend.dtos.UserDto;
import com.bloggy.backend.entites.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserDto toUserDto(User user);

    @Mapping(target = "password", ignore = true)
    User signUpToUser(SignUpDto signUpDto);

}