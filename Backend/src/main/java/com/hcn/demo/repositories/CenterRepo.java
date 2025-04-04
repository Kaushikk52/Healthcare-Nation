package com.hcn.demo.repositories;

import com.hcn.demo.models.Center;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CenterRepo extends JpaRepository<Center,String>, JpaSpecificationExecutor<Center> {

    List<Center> findByType(Center.CenterType type);
}
