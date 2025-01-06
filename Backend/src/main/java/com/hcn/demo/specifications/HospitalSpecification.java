package com.hcn.demo.specifications;

import com.hcn.demo.models.Hospital;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class HospitalSpecification {

    public static Specification<Hospital> findByCriteria(Map<String,Object> filters){
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if(filters.containsKey("type")){
                String type = (String) filters.get("type");
                predicates.add(criteriaBuilder.equal(root.get("type"),type));
            }

            // Combine all predicates with AND operator
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));

        };
    }
}
