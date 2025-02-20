package com.hcn.demo.controllers;

import com.hcn.demo.models.JwtRequest;
import com.hcn.demo.models.JwtResponse;
import com.hcn.demo.models.User;
import com.hcn.demo.security.JwtHelper;
import com.hcn.demo.services.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping(value = "/v1/api/auth")
public class AuthController {

   @Autowired
    private final UserService userServ;
    private final UserDetailsService userDetailsService;
    private final AuthenticationManager manager;
    private final JwtHelper helper;

    @Autowired
    public AuthController(UserService userServ, UserDetailsService userDetailsService, AuthenticationManager manager, JwtHelper helper){
        this.helper = helper;
        this.manager = manager;
        this.userDetailsService = userDetailsService;
        this.userServ = userServ;
    }


    @PostMapping(value = "/register")
    public ResponseEntity<Map<String, Object>> register(@RequestBody User user){
        try{
            User savedUser =  userServ.addUser(user);
            Map<String, Object> response = new HashMap<>();
            response.put("message", "User registered successfully");
            response.put("user", savedUser);
            log.info("User added Successfully");
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        }catch (Exception e) {
            log.error("Error adding user: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        }
    }

    @PostMapping(value = "/login")
    public ResponseEntity<JwtResponse> login(@RequestBody JwtRequest request){
        try{
            this.doAuthenticate(request.getEmail(), request.getPassword());
            User userDetails = (User)userDetailsService.loadUserByUsername(request.getEmail());
            String token = userServ.checkAndRenewToken(userDetails);
            JwtResponse response = JwtResponse.builder()
                    .jwtToken(token)
                    .name(userDetails.getUsername())
                    .role(String.valueOf(userDetails.getRole()))
                    .build();
            return new ResponseEntity<>(response, HttpStatus.OK);
        }catch(RuntimeException e){
            throw new RuntimeException(e.getMessage());
        }
    }

    private void doAuthenticate(String email,String password){
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(email,password);
        try{
            manager.authenticate(authentication);
        }catch (Exception e){
            throw new RuntimeException("Invalid email or password...");
        }
    }

    @ExceptionHandler(BadCredentialsException.class)
    public String exceptionHandler() {
        return "Credentials Invalid !!";
    }

}
