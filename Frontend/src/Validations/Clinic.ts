import * as Yup from "yup";

export const clinicValidationSchema = Yup.object({
  name: Yup.string().required("Clinic Name is required"),
  phone: Yup.string().matches(/^\d{10}$/, "Phone number must be exactly 10 digits and contain only numbers").required("Phone no. is required"),
  address: Yup.object().shape({
    landmark: Yup.string().required("Landmark is required"),
    city: Yup.string().required("City is required"),
    street: Yup.string().required("Street is required"),
    zipCode: Yup.string().matches(/^\d{6}$/, "Zip Code must be exactly 6 digits and contain only numbers")
    .required("Zip Code is required"),
  }),

  beds: Yup.number().required("Number of beds is required").min(0, "Cannot be negative"),
  ownership: Yup.string().required("Ownership type is required").oneOf(["Private", "Government"]),
  description: Yup.string().required("Description is required"),
  images: Yup.array().of(Yup.mixed()).optional(),
  departments: Yup.array().of(Yup.string()).min(1, "At least one department is required"),
  specialities: Yup.array().of(Yup.string()).min(1, "At least one speciality is required"),
  specialitiesImgs: Yup.array().of(Yup.mixed()).optional(),
  altMeds: Yup.array().of(Yup.string()).min(1, "At least one alternative medicine is required"),
  concerns: Yup.array().of(Yup.string()).min(1, "At least one concern is required"),
  services: Yup.array().of(Yup.string()).min(1, "At least one service is required"),
  avgRating: Yup.number().default(0).optional()
});