import * as yup from "yup";

export const MedicalFacilitySchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    address: yup.object({
      street: yup.string().required("Street is required"),
      city: yup.string().required("City is required"),
      state: yup.string().required("State is required"),
      zipCode: yup.string().matches(/^\d{6}$/, "Zip code must be 6 digits").required("Zip code is required"),
      landmark: yup.string().required("Landmark is required"),
    }).required(),

    website: yup.string().url("Website must be a valid URL").required("Website is required"),
    openDay: yup.string().required("Opening day is required"),
    closeDay: yup.string().required("Closing day is required"),
    hours: yup
  .number()
  .typeError("Hours must be a number")
  .required("Hours are required")
  .min(1, "Hours must be at least 1")
  .max(24, "Hours cannot exceed 24")
  .integer("Hours must be a whole number"),

    description: yup.string().required("Description is required"),
    phoneNumbers: yup.array()
        .of(
          yup.string().matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
          .min(1, "At least one phone number is required")
        .required("Phone numbers are required")
        ),

    facts:yup.array().of(yup.string()),
    achievements:yup.array().of(yup.string()),
    images: yup.array().of(yup.string()).required("Images are required"),
    videos: yup.array().of(yup.string()).required("Videos are required"),
    ownership: yup.string().oneOf(["PRIVATE", "PUBLIC", "GOVERNMENT"], "Invalid ownership type").required("Ownership type is required"),
    facilityType: yup.string().oneOf(["hospitals", "clinics", "DIAGNOSTIC_CENTER"], "Invalid facility type").required("Facility type is required"),
  
    brands: yup.array().of(yup.string()).max(1, "Only 1 brand allowed"),
    diagnostics: yup.array().of(yup.string()),
    specialities: yup.array().of(yup.string()).required("Specialities are required"),
    services: yup.array().of(yup.string()).required("Services are required"),
    psu: yup.array().of(yup.string()),
    accreditations: yup.array().of(yup.string()),
    concerns: yup.array().of(yup.string()),
    insurance: yup.array().of(yup.string()),
    tpa: yup.array().of(yup.string()),
    altMed: yup.array().of(yup.string()),
  
    avgRating: yup.number().min(0, "Rating cannot be negative").max(5, "Rating cannot exceed 5").required("Average rating is required"),
 
});
