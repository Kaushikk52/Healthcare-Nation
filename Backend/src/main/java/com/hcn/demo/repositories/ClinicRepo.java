package com.hcn.demo.repositories;

import com.hcn.demo.models.Clinic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClinicRepo extends JpaRepository<Clinic,String> {


}
