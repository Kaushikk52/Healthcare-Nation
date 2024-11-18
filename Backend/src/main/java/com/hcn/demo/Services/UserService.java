package com.hcn.demo.Services;

import com.hcn.demo.Models.User;
import com.hcn.demo.Repositories.UserRepo;
import com.hcn.demo.Security.JwtHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;

@Service
public class UserService implements UserDetailsService {


    private UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtHelper helper;

    @Autowired
    public UserService(UserRepo userRepo, PasswordEncoder passwordEncoder,JwtHelper helper) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
        this.helper = helper;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepo.findByEmail(username);
        if(user.equals(null)){
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        return user;
    }

    public List<User> getAllUsers(){
        List<User> users = userRepo.findAll();
        return users;
    }

    public User getUserById(String id){
        User user = userRepo.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        return user;
    }

    public User getCurrentUserRole(Principal principal){
        User currentUser = (User) this.loadUserByUsername(principal.getName());
        return  currentUser;
    }

    public User addUser(User user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        String token = this.helper.generateToken(user);
        user.setToken(token);
        User savedUser =  userRepo.save(user);
        return savedUser;
    }

}
