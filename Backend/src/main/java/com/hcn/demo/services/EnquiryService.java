package com.hcn.demo.services;

import com.hcn.demo.models.Enquiry;
import com.hcn.demo.repositories.EnquiryRepo;
import org.springframework.stereotype.Service;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

@Service
public class EnquiryService {

    @Autowired
    private EnquiryRepo enquiryRepo;

    @Autowired
    private JavaMailSender emailSender;

    public String notifyEnquiry(Enquiry enquiry) throws MessagingException{
        try{
            String userEmail = enquiry.getEmail();
            if (userEmail != null) {
                SimpleMailMessage message = new SimpleMailMessage();
                message.setFrom("kaushikkarnik635@gmail.com");
                message.setTo(userEmail);
                message.setSubject("User Contact Enquiry");
                message.setText("Your Enquiry has been successfully received");
                emailSender.send(message);
            }
            enquiryRepo.save(enquiry);
            return "Enquiry mail successfully sent";
        }catch (Exception e) {
            throw new RuntimeException("Error during Sending notification : "+e.getMessage());
        }
    }
}
