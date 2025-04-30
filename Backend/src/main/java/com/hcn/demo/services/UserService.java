package com.hcn.demo.services;

import com.hcn.demo.models.User;
import com.hcn.demo.repositories.UserRepo;
import com.hcn.demo.security.JwtHelper;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
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
        if(user == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        return user;
    }

    public List<User> getAllUsers(){
        return userRepo.findAll();
    }

    public User getUserById(String id){
        return userRepo.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User getCurrentUserRole(Principal principal){
        return (User) this.loadUserByUsername(principal.getName());
    }

    public String checkAndRenewToken(User user){
        String token = user.getToken();
        try{
            boolean isExpired = this.helper.isTokenExpired(token);
        }catch(ExpiredJwtException e){
            String newToken = this.helper.generateToken(user);
            user.setToken(newToken);
            userRepo.save(user);
            return newToken;
        }
        return token;
    }

    public User addUser(User user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        String token = this.helper.generateToken(user);
        user.setToken(token);
        return userRepo.save(user);
    }

    public User editRoleById(String id){
        User existingUser = this.getUserById(id);
        User.UserRole role = existingUser.getRole();
        if(role.equals(User.UserRole.ROLE_USER)){
            existingUser.setRole(User.UserRole.ROLE_ADMIN);
        }else {
            existingUser.setRole(User.UserRole.ROLE_USER);
        }
        return userRepo.save(existingUser);
    }

    public void deleteUser(Principal principal){
        User principalUser = (User) loadUserByUsername(principal.getName());
        userRepo.delete(principalUser);
    }

}
