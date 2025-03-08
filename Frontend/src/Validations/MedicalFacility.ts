import * as yup from "yup";

export const MedicalFacilitySchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    address: yup.object({
      street: yup.string().required("Street is required"),
      city: yup.string().required("City is required"),
      state: yup.string().required("State is required"),
      zipCode: yup.string().matches(/^\d{6}$/, "Zip code must be 6 digits").required("Zip code is required"),
      country: yup.string().required("Country is required"),
    }).required(),

    bed: yup.number().min(1, "Bed count must be at least 1").required("Bed count is required"),
    website: yup.string().url("Website must be a valid URL").required("Website is required"),
    openDay: yup.string().required("Opening day is required"),
    closeDay: yup.string().required("Closing day is required"),
    hours: yup.string().required("Hours are required"),
    description: yup.string().required("Description is required"),
    phone: yup.array()
      .of(yup.string().matches(/^\d{10}$/, "Phone number must be exactly 10 digits"))
      .min(1, "At least one phone number is required")
      .required("Phone numbers are required"),

    images: yup.array().of(yup.string()).required("Images are required"),
    videos: yup.array().of(yup.string().url("Each video must be a valid URL")),


    ownership: yup.string().oneOf(["PRIVATE", "PUBLIC", "GOVERNMENT"], "Invalid ownership type").required("Ownership type is required"),
    facilityType: yup.string().oneOf(["HOSPITAL", "CLINIC", "DIAGNOSTIC_CENTER"], "Invalid facility type").required("Facility type is required"),
  
    brands: yup.array().of(yup.string()),
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
