package com.hcn.demo.repositories;

import com.hcn.demo.models.Hospital;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface HospitalRepo extends JpaRepository<Hospital,String>, JpaSpecificationExecutor<Hospital> {


}
