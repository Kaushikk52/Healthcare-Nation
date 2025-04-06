package com.hcn.demo.repositories;

import com.hcn.demo.models.BaseFacility;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface BaseFacilityRepo<T extends BaseFacility> extends JpaRepository<T, String> {

}
