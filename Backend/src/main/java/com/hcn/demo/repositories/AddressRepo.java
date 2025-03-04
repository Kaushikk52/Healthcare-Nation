package com.hcn.demo.repositories;

import com.hcn.demo.models.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepo extends JpaRepository<Address,String> {
}
