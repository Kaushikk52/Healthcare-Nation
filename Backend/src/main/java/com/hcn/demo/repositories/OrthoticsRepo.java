package com.hcn.demo.repositories;

import com.hcn.demo.models.Orthotics;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface OrthoticsRepo extends JpaRepository<Orthotics,String>, JpaSpecificationExecutor<Orthotics> {
}
