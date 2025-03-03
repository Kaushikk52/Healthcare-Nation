import * as Yup from "yup";

export const MedicalFacilitySchema = Yup.object().shape({
  name: Yup.string().required("Facility name is required"),
  phone: Yup.array()
    .of(Yup.string().matches(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"))
    .min(1, "At least one phone number is required"),
  images: Yup.array().of(Yup.string().url("Invalid image URL")),
  address: Yup.object().shape({
    street: Yup.string().required("Street is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    zipCode: Yup.string().matches(/^\d{5,6}$/, "Invalid ZIP code"),
    country: Yup.string().required("Country is required"),
  }),
  website: Yup.string().url("Invalid website URL"),
  bed: Yup.number().min(0, "Beds cannot be negative").required("Number of beds is required"),
  ownership: Yup.mixed().oneOf(["PRIVATE", "GOVERNMENT"]).required("Ownership type is required"),
  description: Yup.string().required("Description is required"),
  brands: Yup.array().of(Yup.string()).min(1, "At least one brand is required"),
  openDay: Yup.string().required("Opening day is required"),
  closeDay: Yup.string().required("Closing day is required"),
  hours: Yup.string().required("Working hours are required"),

  facilityType: Yup.mixed().oneOf(["HOSPITAL", "CLINIC"]).required("Facility type is required"),
  specialities: Yup.array().of(Yup.string()).min(1, "At least one speciality is required"),
  diagnosticServices: Yup.array().of(Yup.string()),
  alternativeMedicines: Yup.array().of(Yup.string()),
  publicSectorSchemes: Yup.array().of(Yup.string()),

  accreditations: Yup.array().of(Yup.string()),
  concerns: Yup.array().of(Yup.string()),
  acceptedInsurances: Yup.array().of(Yup.string()),
  thirdPartyAdministrators: Yup.array().of(Yup.string()),

  ratings: Yup.array().of(
    Yup.object().shape({
      id: Yup.number().required(),
      userId: Yup.number().required(),
      medicalFacilityId: Yup.number().required(),
      rating: Yup.number().min(0).max(5).required("Rating must be between 0 and 5"),
      comment: Yup.string(),
    })
  ),
  reviews: Yup.array().of(
    Yup.object().shape({
      id: Yup.number().required(),
      userId: Yup.number().required(),
      medicalFacilityId: Yup.number().required(),
      reviewText: Yup.string().required("Review text is required"),
      createdAt: Yup.string().required(),
    })
  ),
  avgRating: Yup.number().min(0).max(5).required("Average rating is required"),
});
