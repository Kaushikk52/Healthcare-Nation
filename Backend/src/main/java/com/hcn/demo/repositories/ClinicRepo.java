package com.hcn.demo.repositories;

import com.hcn.demo.models.Clinic;
import com.hcn.demo.models.Hospital;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface ClinicRepo extends JpaRepository<Clinic,String>,JpaSpecificationExecutor<Clinic> {


}
