package com.hcn.demo.repositories;

import com.hcn.demo.models.Enquiry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EnquiryRepo extends JpaRepository<Enquiry,String> {
}
