package com.hcn.demo.repositories;

import com.hcn.demo.models.Orthotics;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrthoticsRepo extends JpaRepository<Orthotics,String> {
}
