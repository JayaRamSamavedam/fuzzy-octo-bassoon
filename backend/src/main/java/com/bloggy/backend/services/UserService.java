package com.bloggy.backend.services;

import com.bloggy.backend.dtos.CredentialsDto;
import com.bloggy.backend.dtos.SignUpDto;
import com.bloggy.backend.dtos.UserDto;
import com.bloggy.backend.entites.User;
import com.bloggy.backend.exceptions.AppException;
import com.bloggy.backend.mappers.UserMapper;
import com.bloggy.backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.nio.CharBuffer;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository ;

    private final PasswordEncoder passwordEncoder;

    private final UserMapper userMapper;
    

	public UserDto login(CredentialsDto credentialsDto) {
//		finding the user in repository
		
        User user = userRepository.findByLogin(credentialsDto.getLogin())
                .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));

//        if password matches re  map the user to dto and send
        if (passwordEncoder.matches(CharBuffer.wrap(credentialsDto.getPassword()), user.getPassword())) {
            return userMapper.toUserDto(user);
        }
//        else throw exception
        
        throw new AppException("Invalid password", HttpStatus.BAD_REQUEST);
    }

    public UserDto register(SignUpDto userDto) {
//    	finding if there are any usernames are there in the database
        Optional<User> optionalUser = userRepository.findByLogin(userDto.getLogin());
//        if its peresent it will throw exception
        if (optionalUser.isPresent()) {
            throw new AppException("Login already exists", HttpStatus.BAD_REQUEST);
        }
//        Mapping the data transfer object to the user object
        
        User user = userMapper.signUpToUser(userDto);
//        hashing the password here
        user.setPassword(passwordEncoder.encode(CharBuffer.wrap(userDto.getPassword())));
//        saving the user in the database
        User savedUser = userRepository.save(user);
//        again mapping tp the Data transfer object
        return userMapper.toUserDto(savedUser);
    }

    public UserDto findByLogin(String login) {
        User user = userRepository.findByLogin(login)
                .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));
        return userMapper.toUserDto(user);
    }

}