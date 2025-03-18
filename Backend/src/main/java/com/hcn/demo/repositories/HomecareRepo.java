package com.hcn.demo.repositories;

import com.hcn.demo.models.Homecare;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HomecareRepo extends JpaRepository<Homecare,String> {
}
