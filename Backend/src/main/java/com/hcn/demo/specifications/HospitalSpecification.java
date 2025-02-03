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

    public static Specification<Hospital> hasSpecialities(List<String> specialities){
        return ((root, query, criteriaBuilder) -> {
           return root.join("specialities").get("name").in(specialities);
        });
    }

    public static Specification<Hospital> hasBrands(List<String> brands){
        return ((root, query, criteriaBuilder) ->{
          return root.join("brands").get("name").in(brands);
        });
    }


//    public static Specification<Hospital> hasDepartments(String[] departments){
//        return ((root, query, criteriaBuilder) -> {
//            return root.get(Arrays.stream(departments).);
//        });
//    }
}
