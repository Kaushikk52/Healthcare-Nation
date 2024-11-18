package com.hcn.demo.Controllers;

import com.hcn.demo.Models.JwtRequest;
import com.hcn.demo.Models.JwtResponse;
import com.hcn.demo.Models.User;
import com.hcn.demo.Security.JwtHelper;
import com.hcn.demo.Services.UserService;
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
    private UserService userServ;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private AuthenticationManager manager;

    @Autowired
    private JwtHelper helper;


    @PostMapping(value = "/register")
    public ResponseEntity<?> register(@RequestBody User user){
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
    public ResponseEntity<?> login(@RequestBody JwtRequest request){
        try{
            this.doAuthenticate(request.getEmail(), request.getPassword());
            User userDetails = (User)userDetailsService.loadUserByUsername(request.getEmail());
            JwtResponse response = JwtResponse.builder()
                    .jwtToken(userDetails.getToken())
                    .name(userDetails.getUsername())
                    .role(String.valueOf(userDetails.getRole()))
                    .build();
            return new ResponseEntity<>(response, HttpStatus.OK);
        }catch(Exception e){
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
