package com.hcn.demo.repositories;

import com.hcn.demo.models.Transport;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface TransportRepo extends BaseFacilityRepo<Transport>, JpaSpecificationExecutor<Transport> {
}
