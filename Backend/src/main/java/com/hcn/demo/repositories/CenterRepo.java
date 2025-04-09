package com.hcn.demo.repositories;

import com.hcn.demo.models.Center;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CenterRepo extends BaseFacilityRepo<Center>, JpaSpecificationExecutor<Center> {

    List<Center> findByType(Center.CenterType type);
}
