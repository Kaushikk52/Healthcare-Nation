package com.hcn.demo.specifications;

import com.hcn.demo.models.Address;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

public class GenericSpecification<T>  {

    public static <T> Specification<T> findByCriteria(Map<String,Object> filters){
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if(filters.containsKey("type")){
                String type = (String) filters.get("type");
                predicates.add(criteriaBuilder.equal(root.get("facilityType"),type));
            }

            if(filters.containsKey("location")){
                String location = (String) filters.get("location");
                Join<T, Address> addressJoin = root.join("address");
                predicates.add(criteriaBuilder.equal(addressJoin.get("state"),location));
            }

            if(filters.containsKey("search")){
                String search = (String) filters.get("search");
                predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("name")),"%" + search.toLowerCase() + "%"));
            }


            if(filters.containsKey("ownership")){
                String ownership = (String) filters.get("ownership");
                predicates.add(criteriaBuilder.equal(root.get("ownership"),ownership));
            }

            if(filters.containsKey("centerType")){
                String centerType = (String) filters.get("centerType");
                predicates.add(criteriaBuilder.equal(root.get("type"),centerType));
            }

            if(filters.containsKey("specialities")){
                List<String> specialities = (List<String>) filters.get("specialities");
                for (String speciality : specialities) {
                    predicates.add(criteriaBuilder.like(root.get("specialities"), "%" + speciality + "%"));
                }
            }

            if(filters.containsKey("brands")){
                List<String> brands = (List<String>) filters.get("brands");
                for (String brand : brands) {
                    predicates.add(criteriaBuilder.like(root.get("brands"), "%" + brand + "%"));
                }
            }

            if(filters.containsKey("diagnostics")){
                List<String> diagnostics = (List<String>) filters.get("diagnostics");
                for (String diagnostic : diagnostics) {
                    predicates.add(criteriaBuilder.like(root.get("diagnostics"), "%" + diagnostic + "%"));
                }
            }

            if(filters.containsKey("services")){
                List<String> services = (List<String>) filters.get("services");
                for (String service : services) {
                    predicates.add(criteriaBuilder.like(root.get("services"), "%" + service + "%"));
                }
            }

            if(filters.containsKey("psu")){
                List<String> psu = (List<String>) filters.get("psu");
                for (String p : psu) {
                    predicates.add(criteriaBuilder.like(root.get("psu"), "%" + p + "%"));
                }
            }

            if(filters.containsKey("accreditations")){
                List<String> accreditations = (List<String>) filters.get("accreditations");
                for (String acc : accreditations) {
                    predicates.add(criteriaBuilder.like(root.get("accreditations"), "%" + acc + "%"));
                }
            }

            if(filters.containsKey("concerns")){
                List<String> concerns = (List<String>) filters.get("concerns");
                for (String concern : concerns) {
                    predicates.add(criteriaBuilder.like(root.get("concerns"), "%" + concern + "%"));
                }
            }

            if(filters.containsKey("insurance")){
                List<String> insurance = (List<String>) filters.get("insurance");
                for (String i : insurance) {
                    predicates.add(criteriaBuilder.like(root.get("insurance"), "%" + i + "%"));
                }
            }

            if(filters.containsKey("tpa")){
                List<String> tpa = (List<String>) filters.get("tpa");
                for (String t : tpa) {
                    predicates.add(criteriaBuilder.like(root.get("tpa"), "%" + t + "%"));
                }
            }

            if(filters.containsKey("altMed")){
                List<String> altMed = (List<String>) filters.get("altMed");
                for (String a : altMed) {
                    predicates.add(criteriaBuilder.like(root.get("altMed"), "%" + a + "%"));
                }
            }

            // Combine all predicates with AND operator
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));

        };
    }

    public static <T> Specification<T> hasType(String type){
        return (root,query,cb) -> cb.equal(root.get("facility_type"),type);
    }

    public static <T> Specification<T> hasSpecialities(List<String> specialities){
        return (root,query,cb) -> root.get("specialities").in(specialities);
    }

    public static <T> Specification<T> hasBrands(List<String> brands){
        return (root,query,cb) -> root.get("brands").in(brands);
    }

    public static <T> Specification<T> hasDiagnostics(List<String> diagnostics){
        return (root, query, cb) -> root.get("diagnostics").in(diagnostics);
    }

    public static <T> Specification<T> hasServices(List<String> services){
        return (root,query,cb) -> root.get("services").in(services);
    }

    public static <T> Specification<T> hasPrivateSectorCompanies(List<String> psu){
        return (root,query,cb) -> root.get("psu").in(psu);
    }


}
