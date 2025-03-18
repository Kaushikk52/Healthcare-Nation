package com.hcn.demo.repositories;

import com.hcn.demo.models.Transport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransportRepo extends JpaRepository<Transport,String> {
}
