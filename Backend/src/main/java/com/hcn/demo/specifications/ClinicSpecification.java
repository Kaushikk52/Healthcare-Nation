package com.hcn.demo.specifications;

import com.hcn.demo.models.Clinic;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class ClinicSpecification {

    public static Specification<Clinic> findByCriteria(Map<String,Object> filters){
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if(filters.containsKey("type")){
                String type = (String) filters.get("type");
                predicates.add(criteriaBuilder.equal(root.get("type"),type));
            }

            if(filters.containsKey("services")){
                List<String> services = (List<String>) filters.get("services");
                predicates.add((root.get("services").in(services)));
            }

            if (filters.containsKey("locations")) {
                List<String> locations = (List<String>) filters.get("locations");
                predicates.add(root.join("details").get("location").in(locations));
            }

            // Combine all predicates with AND operator
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));

        };
    }
}
