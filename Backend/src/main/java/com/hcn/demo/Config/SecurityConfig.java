package com.hcn.demo.Config;


import com.hcn.demo.security.JwtAuthenticationEntryPoint;
import com.hcn.demo.security.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractAuthenticationFilterConfigurer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.LogoutConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtAuthenticationEntryPoint point;
    private final JwtAuthenticationFilter filter;

    @Value("${frontendUrl.path}")
    private String frontendUrl;

    public SecurityConfig(JwtAuthenticationEntryPoint point, JwtAuthenticationFilter filter) {
        this.point = point;
        this.filter = filter;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))

                .authorizeHttpRequests(auth -> auth
                        // Allow OPTIONS requests
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        // Authentication endpoints
                        .requestMatchers(HttpMethod.POST, "/v1/api/auth/**").permitAll()

                        // Users endpoints
                        .requestMatchers(HttpMethod.GET, "/v1/api/user/**").permitAll()

                        // Facilities endpoints
                        .requestMatchers(HttpMethod.GET, "/v1/api/facility/type/**",
                        "/v1/api/facility/id/**","/v1/api/facility/filter","/v1/api/facility/current-user").permitAll()
                        .requestMatchers(HttpMethod.POST, "/v1/api/facility/**").authenticated()
                        .requestMatchers(HttpMethod.PUT ,"/v1/api/facility/edit/**").authenticated()
                        .requestMatchers(HttpMethod.DELETE , "/v1/api/facility/delete/**").authenticated()

                        //Saved Facility endpoints
                        .requestMatchers(HttpMethod.GET,"/v1/api/saved/**").authenticated()
                        .requestMatchers(HttpMethod.POST, "/v1/api/saved/**").authenticated()
                        .requestMatchers(HttpMethod.DELETE, "/v1/api/saved/**").authenticated()

                        //Reviews endpoints
                        .requestMatchers(HttpMethod.GET ,"/v1/api/review/**").permitAll()

                        //Ratings endpoints
                        .requestMatchers(HttpMethod.GET ,"/v1/api/rating/**").permitAll()

                        //Orthotics endpoints
                        .requestMatchers(HttpMethod.GET,
                                "/v1/api/orthotics/all", "/v1/api/orthotics/id/**","/v1/api/orthotics/filter").permitAll()
                        .requestMatchers(HttpMethod.POST, "/v1/api/orthotics/**").authenticated()

                        //Homecare endpoints
                        .requestMatchers(HttpMethod.GET,
                                "/v1/api/homecare/all", "/v1/api/homecare/id/**","/v1/api/homecare/filter").permitAll()
                        .requestMatchers(HttpMethod.POST, "/v1/api/homecare/**").authenticated()

                        //Transport endpoints
                        .requestMatchers(HttpMethod.GET,
                                "/v1/api/transport/all", "/v1/api/transport/id/**","/v1/api/transport/filter").permitAll()
                        .requestMatchers(HttpMethod.POST, "/v1/api/transport/**").authenticated()

                        //Bank endpoints
                        .requestMatchers(HttpMethod.GET,
                                "/v1/api/bank/all", "/v1/api/bank/id/**","/v1/api/bank/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/v1/api/bank/**").authenticated()

                        //Diagnostics endpoints
                        .requestMatchers(HttpMethod.GET,
                                "/v1/api/diagnostics/all", "/v1/api/diagnostics/id/**","/v1/api/diagnostics/filter").permitAll()
                        .requestMatchers(HttpMethod.POST, "/v1/api/diagnostics/**").authenticated()


                        // Images endpoints
                        .requestMatchers(HttpMethod.POST, "/v1/api/images/upload/single").permitAll()
                        .requestMatchers(HttpMethod.POST, "/v1/api/images/upload/multiple/**").permitAll()

                )
                .exceptionHandling(ex -> ex.authenticationEntryPoint(point))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .formLogin(AbstractAuthenticationFilterConfigurer::permitAll)
                .logout(LogoutConfigurer::permitAll)
                .addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList(frontendUrl));
        configuration.setAllowedMethods(Arrays.asList("*"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }


}
