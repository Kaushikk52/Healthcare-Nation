import * as yup from "yup";

export const DiagnosticsSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  address: yup
    .object({
      street: yup.string().required("Street is required"),
      city: yup.string().required("City is required"),
      state: yup.string().required("State is required"),
      zipCode: yup
        .string()
        .matches(/^\d{6}$/, "Zip code must be 6 digits")
        .required("Zip code is required"),
      landmark: yup.string().required("Landmark is required"),
    })
    .required(),

  website: yup
    .string()
    .url("Website must be a valid URL")
    .required("Website is required"),
  openDay: yup.string().required("Opening day is required"),
  closeDay: yup.string().required("Closing day is required"),
  fromTime: yup.string().required("From Time  is required"),
  toTime: yup.string().required("To Time is required"),

  description: yup.string().required("Description is required"),
 phoneNumbers: yup.array()
     .of(
       yup.string().matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
       .min(1, "At least one phone number is required")
     .required("Phone numbers are required")
     ),
  images: yup.array().of(yup.string()).required("Images are required"),
     videos: yup.array().of(yup.string()).required("Videos are required"),
  ownership: yup
    .string()
    .oneOf(["PRIVATE", "PUBLIC", "GOVERNMENT"], "Invalid ownership type")
    .required("Ownership type is required"),
  brands: yup.array().of(yup.string()).max(1, "Only 1 brand allowed"),
  diagnostics: yup.array().of(yup.string()),
  accreditations: yup.array().of(yup.string()),
  psu: yup.array().of(yup.string()),
  insurance: yup.array().of(yup.string()),
  tpa: yup.array().of(yup.string()),
});
