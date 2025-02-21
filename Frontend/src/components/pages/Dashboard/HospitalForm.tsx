import axios from "axios";
import {
  FormikHelpers,
  FormikErrors,
  Formik,
  Field,
  ErrorMessage,
  Form,
  FieldArray,
} from "formik";
import { motion, AnimatePresence } from "framer-motion";
import { jwtDecode } from "jwt-decode";
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  Check,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Trash2,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import DatePicker from "react-datepicker";
import { hospitalValidationSchema } from "@/Validations/Hospital";
import { useNavigate } from "react-router-dom";
import { spec } from "node:test/reporters";

const DatePickerField = ({ field, form }: any) => {
  return (
    <DatePicker
      {...field}
      selected={(field.value && new Date(field.value)) || null}
      dateFormat="dd/MM/yyyy"
      onChange={(date) => form.setFieldValue(field.name, date)}
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
    />
  );
};

export default function HospitalForm() {
  const baseURL = import.meta.env.VITE_APP_BACKEND_BASE_URL;
  const cloudName = import.meta.env.VITE_APP_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_APP_UPLOAD_PRESET;
  const environment = import.meta.env.VITE_APP_ENV || "LOCAL";
  const propertiesPath = `${uploadPreset}/${environment}/Properties`;
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    address: {
      street: "",
      city: "",
      landmark: "",
      zipCode: "",
    },
    phone: "",
    description: "",
    beds: 0,
    ownership: "",
    specialities: [{
        name: "",
        image: null as File | null,
        isMinimized: false,
      }],
    images: [] as File[],
    departments: [] as string[],
    altMeds: [] as string[],
    concerns: [] as string[],
    services: [] as string[],
  };

  const LOCATION_OPTIONS = [
    {
      label: "Bhayandar",
      options: ["Bhayandar East", "Bhayandar West"],
    },
    {
      label: "Mira Road",
      options: ["Mira Road East"],
    },
    {
      label: "Dahisar",
      options: ["Dahisar East", "Dahisar West"],
    },
    {
      label: "Borivali",
      options: ["Borivali East", "Borivali West"],
    },
    {
      label: "Malad",
      options: ["Malad East", "Malad West"],
    },
    {
      label: "Goregaon",
      options: ["Goregaon East", "Goregaon West"],
    },
    {
      label: "Kandivali",
      options: ["Kandivali East", "Kandivali West"],
    },
  ];

  useEffect(() => {
    const token: any = localStorage.getItem("token");
    if (!token) {
      toast.error("Please Login", {
        position: "bottom-right",
        duration: 3000,
      });
    }
    try {
      const decodedToken: any = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        toast.error("Please Login", {
          position: "bottom-right",
          duration: 3000,
        });
        localStorage.removeItem("token");
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  async function uploadSingleImage(image: File,type: string): Promise<string | null> {
    try {

      toast.loading("Uploading Specialities Images ...", {
        position: "bottom-right",
        duration: 2000,
      });

      const formData = new FormData();
      formData.append("file", image);
      formData.append("type", type);

      const res = await axios.post(`${baseURL}/v1/api/images/upload/single`, formData);
      return res.data ?? null;
    } catch (err) {
      console.error("Image upload failed:", err);
      return null;
    }
  }

  async function uploadImages(images: File[], type: string): Promise<string[]> {
    if (!images?.length) {
      showToast("Please select images first", "error");
      return [];
    }

    toast.loading("Uploading Images ...", {
      position: "bottom-right",
      duration: 2000,
    });

    const formData = new FormData();
    images.forEach((image) => formData.append("files", image));
    formData.append("type", type); // Pass the type (e.g., "PROJECT", "PROPERTY")

    try {
      const res = await axios.post(
        `${baseURL}/v1/api/images/upload/multiple/${type}`,
        formData
      );
      return res.data ?? [];
    } catch (err) {
      console.error("Batch upload failed:", err);
      return [];
    }
  }

  function showToast(message: string, type: "success" | "error") {
    toast[type](message, { position: "bottom-right", duration: 3000 });
  }

  async function handleSubmit(
    values: typeof initialValues,
    { setSubmitting, resetForm }: FormikHelpers<typeof initialValues>
  ) {
    if (step !== 4) {
      setSubmitting(false);
      return;
    }

    try {
      setSubmitting(true);
      const imageUrls: any = await uploadImages(values.images, "Hospitals");
      const specialitiesImgs: any = await Promise.all(
        values.specialities.map((speciality) =>
          uploadSingleImage(speciality.image, "Specialities")
        )
      );
      if (imageUrls.length > 0) {
        values.images = imageUrls || [""];
      }

      if(specialitiesImgs.length > 0){
        values.specialities["image"]= specialitiesImgs || [""];
      }

      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${baseURL}/v1/api/hospital/save`,
        { ...values, avgRating: 0.0 },
        { headers: { Authorization: `Bearer ${token}`, timeout: 20000 } }
      );

      if (response.status === 201) {
        showToast("Form submitted successfully!", "success");
        resetForm();
        setStep(1);
      }
    } catch (err: any) {
      if (err.response?.status === 401) {
        showToast("Access denied! Authentication is required", "error");
      } else {
        showToast(`An error occurred: ${err.message}`, "error");
      }
    } finally {
      setSubmitting(false);
    }
  }

  const steps = ["General", "Details", "Images", "Amenities"];

  const getStepFields = (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        return [
          "name",
          "phone",
          "address.street",
          "address.city",
          "address.landmark",
          "address.zipCode",
        ];
      case 2:
        return [
          "description",
          "beds",
          "ownership",
          "specialities.name",
          "specialities.image",
        ];
      case 3:
        return ["images"];
      case 4:
        return ["departments", "altMeds", "concern", "services"];
      default:
        return [];
    }
  };

  const showErrorsToast = (
    errors: FormikErrors<typeof initialValues>,
    stepNumber: number
  ) => {
    const stepFields = getStepFields(stepNumber);
    const errorMessages = stepFields.reduce((acc: string[], field) => {
      const fieldParts = field.split(".");
      let fieldError: any = errors;
      for (const part of fieldParts) {
        fieldError = fieldError && fieldError[part];
      }
      if (fieldError) {
        acc.push(`${field}: ${fieldError}`);
      }
      return acc;
    }, []);

    if (errorMessages.length > 0) {
      toast.error(
        <div>
          <strong>Errors on step {stepNumber}:</strong>
          <ul className="list-disc pl-4 mt-2">
            {errorMessages.map((message, index) => (
              <li key={index}>{message}</li>
            ))}
          </ul>
        </div>,
        { duration: 5000, position: "bottom-right" }
      );
    }
  };

  const hasStepErrors = (
    errors: FormikErrors<typeof initialValues>,
    touched: any,
    stepNumber: number
  ) => {
    const stepFields = getStepFields(stepNumber);
    return stepFields.some((field) => {
      const fieldParts = field.split(".");
      let fieldError: any = errors;
      let fieldTouched: any = touched;
      for (const part of fieldParts) {
        fieldError = fieldError && fieldError[part];
        fieldTouched = fieldTouched && fieldTouched[part];
      }
      return fieldError && fieldTouched;
    });
  };

  const showAllErrors = (errors: FormikErrors<typeof initialValues>) => {
    const allErrorMessages = steps.flatMap((_, index) => {
      const stepNumber = index + 1;
      const stepFields = getStepFields(stepNumber);
      return stepFields.reduce((acc: string[], field) => {
        const fieldParts = field.split(".");
        let fieldError: any = errors;
        for (const part of fieldParts) {
          fieldError = fieldError && fieldError[part];
        }
        if (fieldError) {
          acc.push(`Step ${stepNumber} - ${field}: ${fieldError}`);
        }
        return acc;
      }, []);
    });

    if (allErrorMessages.length > 0) {
      allErrorMessages.forEach((message) => {
        toast.error(`${message}`, {
          duration: 10000,
          position: "bottom-right",
        });
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-1 px-2 sm:px-3 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl w-full space-y-8 bg-white p-[1.70rem]  rounded-xl shadow-lg"
      >
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Add Hospital
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please fill the details of your hospital
          </p>
        </div>

        <div className="flex justify-start items-center mb-8 flex-wrap">
          {steps.map((s, index) => (
            <React.Fragment key={s}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    index + 1 <= step
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-600"
                  } font-bold text-lg transition-colors duration-300`}
                >
                  {index + 1}
                </div>
                <div className="mt-2 text-xs font-medium text-gray-500">
                  {s}
                </div>
              </div>
              {index < steps.length - 1 && (
                <motion.div
                  className="flex-1 h-px bg-gray-300 mx-4 relative"
                  initial={{
                    background:
                      "repeating-linear-gradient(to right, #CBD5E0 0%, #CBD5E0 50%, transparent 50%, transparent 100%)",
                    backgroundSize: "20px 1px",
                  }}
                  animate={{
                    background:
                      index + 1 < step
                        ? "linear-gradient(to right, #3B82F6, #3B82F6)"
                        : "repeating-linear-gradient(to right, #CBD5E0 0%, #CBD5E0 50%, transparent 50%, transparent 100%)",
                    backgroundSize: "20px 1px",
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2 w-3 h-3 rotate-45 border-t-2 border-r-2"
                    initial={{ borderColor: "#CBD5E0" }}
                    animate={{
                      borderColor: index + 1 < step ? "#3B82F6" : "#CBD5E0",
                    }}
                    transition={{ duration: 0.5 }}
                  />
                </motion.div>
              )}
            </React.Fragment>
          ))}
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={hospitalValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, setFieldValue, isSubmitting }) => (
            <Form className="mt-8 space-y-6">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 gap-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Hospital Name
                        </label>
                        <Field
                          id="name"
                          name="name"
                          type="text"
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="address.street"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Street
                        </label>
                        <Field
                          id="address.street"
                          name="address.street"
                          type="text"
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                        <ErrorMessage
                          name="address.street"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="address.city"
                          className="block text-sm font-medium text-gray-700"
                        >
                          City
                        </label>
                        <Field
                          id="address.city"
                          name="address.city"
                          type="text"
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                        <ErrorMessage
                          name="address.city"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="address.landmark"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Landmark
                        </label>
                        <Field
                          id="address.landmark"
                          name="address.landmark"
                          type="text"
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                        <ErrorMessage
                          name="address.landmark"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="address.zipCode"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Zip Code
                        </label>
                        <Field
                          id="address.zipCode"
                          name="address.zipCode"
                          type="text"
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                        <ErrorMessage
                          name="address.zipCode"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Phone
                        </label>
                        <Field
                          id="phone"
                          name="phone"
                          type="text"
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                        <ErrorMessage
                          name="phone"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      {/* <div>
                        <label
                          htmlFor="country"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Country
                        </label>
                        <Field
                          id="country"
                          name="country"
                          type="text"
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                        <ErrorMessage
                          name="country"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div> */}

                      {/* <div>
                        <label
                          htmlFor="ownership"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Ownership
                        </label>
                        <Field
                          as="select"
                          id="ownership"
                          name="ownership"
                          className="mt-1 block w-full pl-3 pr-10 !py-2.5 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                        >
                          <option value="">Select Ownership</option>
                          <option value="private">Private</option>
                          <option value="government">Government</option>
                        </Field>
                        <ErrorMessage
                          name="ownership"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div> */}
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    <div>
                      <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Description
                      </label>
                      <Field
                        as="textarea"
                        id="description"
                        name="description"
                        rows={4}
                        className="mt-1 block w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 touch-manipulation"
                      />
                      <ErrorMessage
                        name="description"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="beds"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Beds
                        </label>
                        <Field
                          id="beds"
                          name="beds"
                          type="number"
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                        <ErrorMessage
                          name="beds"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="ownership"
                          className="block p-3 text-sm font-medium text-gray-700"
                        >
                          Ownership
                        </label>
                        <Field
                          as="select"
                          id="ownership"
                          name="ownership"
                          className="mt-1  block w-full pl-3 pr-10  !py-2.5 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                        >
                          <option value="">Select Ownership</option>
                          <option value="Private">Private</option>
                          <option value="Government">Government</option>
                        </Field>
                        <ErrorMessage
                          name="ownership"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                    </div>

                    <FieldArray name="specialities">
                      {({ push, remove }) => (
                        <div>
                          {values.specialities.map((speciality, index) => (
                            <div
                              key={index}
                              className="mb-8 p-4 border rounded-lg"
                            >
                              <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold">
                                  {speciality["name"] || `Speciality ${index + 1}`}
                                </h3>
                                <div className="flex space-x-2">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const newSpecialities = [
                                        ...values.specialities,
                                      ];
                                      newSpecialities[index].isMinimized =
                                        !newSpecialities[index].isMinimized;
                                      setFieldValue(
                                        "specialities",
                                        newSpecialities
                                      );
                                    }}
                                    className="text-gray-500 hover:text-gray-700"
                                  >
                                    {speciality.isMinimized ? (
                                      <ChevronUp/>
                                    ) : (
                                      <ChevronDown/>
                                    )}
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="text-red-500 hover:text-red-700"
                                  >
                                    <Trash2 color="red" />
                                  </button>
                                </div>
                              </div>
                              {!speciality.isMinimized && (
                                <div className="space-y-4">
                                  <div>
                                    <label
                                      htmlFor={`specialities[${index}].name`}
                                      className="block text-sm font-medium text-gray-700"
                                    >
                                      Speciality Name
                                    </label>
                                    <Field
                                      id={`specialities[${index}].name`}
                                      name={`specialities[${index}].name`}
                                      type="text"
                                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    />
                                    <ErrorMessage
                                      name={`specialities[${index}].name`}
                                      component="div"
                                      className="text-red-500 text-sm mt-1"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                      Speciality Image
                                    </label>
                                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                      <div className="space-y-1 text-center">
                                        <svg
                                          className="mx-auto h-12 w-12 text-gray-400"
                                          stroke="currentColor"
                                          fill="none"
                                          viewBox="0 0 48 48"
                                          aria-hidden="true"
                                        >
                                          <path
                                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </svg>
                                        <div className="flex text-sm text-gray-600">
                                          <label
                                            htmlFor={`specialities[${index}].image`}
                                            className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                                          >
                                            <span>Upload a file</span>
                                            <input
                                              id={`specialities[${index}].image`}
                                              name={`specialities[${index}].image`}
                                              type="file"
                                              className="sr-only"
                                              onChange={(event) => {
                                                const file =
                                                  event.currentTarget
                                                    .files?.[0];
                                                if (file) {
                                                  setFieldValue(
                                                    `specialities[${index}].image`,
                                                    file
                                                  );
                                                }
                                              }}
                                            />
                                          </label>
                                          <p className="pl-1">
                                            or drag and drop
                                          </p>
                                        </div>
                                        <p className="text-xs text-gray-500">
                                          PNG, JPG, GIF up to 10MB
                                        </p>
                                      </div>
                                    </div>
                                    <ErrorMessage
                                      name={`specialities[${index}].image`}
                                      component="div"
                                      className="text-red-500 text-sm mt-1"
                                    />
                                  </div>
                                  {values.specialities[index].image && (
                                    <p className="mt-2 text-sm text-gray-500">
                                      <span className="font-semibold">
                                        Uploaded file:
                                      </span>{" "}
                                      {values.specialities[index].image.name}
                                    </p>
                                  )}
                                </div>
                              )}
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() =>
                              push({
                                name: "",
                                image: null,
                                isMinimized: false,
                              })
                            }
                            className="mt-4 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 mr-2"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Add Speciality
                          </button>
                        </div>
                      )}
                    </FieldArray>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Upload Hospital Images
                      </label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                            >
                              <span>Upload a file</span>
                              <input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                className="sr-only"
                                accept="image/*"
                                multiple
                                onChange={(event) => {
                                  const files = event.currentTarget.files;
                                  if (files) {
                                    // console.log(files);
                                    setFieldValue("images", [
                                      ...values.images,
                                      ...Array.from(files),
                                    ]);
                                  }
                                }}
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </div>
                      </div>
                      <ErrorMessage
                        name="images"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                    {values.images.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">
                          Uploaded Images:
                        </h4>
                        <ul className="list-disc pl-5 text-sm text-gray-600">
                          {values.images.map((file: File, index: number) => (
                            <li key={index}>{file.name}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    <div>
                      <label className="block text-xl font-medium text-gray-900 mb-4">
                        Departments
                      </label>
                      <div className="grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-4 md:gap-3 sm:gap-2">
                        {["Cardiology", "Neurology", "Orthopedics"].map(
                          (department) => (
                            <div key={department} className="flex items-center">
                              <Field
                                type="checkbox"
                                id={department}
                                name="departments"
                                value={department}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              />
                              <label
                                htmlFor="departments"
                                className="ml-2 block text-base text-gray-900"
                              >
                                {department}
                              </label>
                            </div>
                          )
                        )}
                      </div>
                      <ErrorMessage
                        name="departments"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div className="!mt-10">
                      <label className="block text-xl font-medium text-gray-900 mb-4">
                        Alternative Medicine
                      </label>
                      <div className="grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-4 md:gap-3 sm:gap-2">
                        {["Ayurveda", "Homeopathy"].map((altMed) => (
                          <div key={altMed} className="flex items-center">
                            <Field
                              type="checkbox"
                              id={altMed}
                              name="altMeds"
                              value={altMed}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label
                              htmlFor="altMeds"
                              className="ml-2 block text-base text-gray-900"
                            >
                              {altMed}
                            </label>
                          </div>
                        ))}
                      </div>
                      <ErrorMessage
                        name="altMeds"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div className="!mt-10">
                      <label className="block text-xl font-medium text-gray-900 mb-4">
                        Health Concerns
                      </label>
                      <div className="grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-4 md:gap-3 sm:gap-2">
                        {["Emergency Services", "Patient Satisfaction"].map(
                          (concern) => (
                            <div key={concern} className="flex items-center">
                              <Field
                                type="checkbox"
                                id={concern}
                                name="concerns"
                                value={concern}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              />
                              <label
                                htmlFor="concerns"
                                className="ml-2 block text-base text-gray-900"
                              >
                                {concern}
                              </label>
                            </div>
                          )
                        )}
                      </div>
                      <ErrorMessage
                        name="concerns"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div className="!mt-10">
                      <label className="block text-xl font-medium text-gray-900 mb-4">
                        Services
                      </label>
                      <div className="grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-4 md:gap-3 sm:gap-2">
                        {[
                          "24/7 Emergency",
                          "Pharmacy",
                          "Diagnostic Imaging",
                        ].map((services) => (
                          <div key={services} className="flex items-center">
                            <Field
                              type="checkbox"
                              id={services}
                              name="services"
                              value={services}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label
                              htmlFor={services}
                              className="ml-2 block text-base text-gray-900"
                            >
                              {services}
                            </label>
                          </div>
                        ))}
                      </div>
                      <ErrorMessage
                        name="healthConcern"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex justify-between pt-5">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep((prev) => prev - 1)}
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center"
                  >
                    <ChevronLeft className="w-5 h-5 mr-1" />
                    Previous
                  </button>
                )}
                {step < 4 ? (
                  <button
                    type="button"
                    onClick={() => {
                      if (!hasStepErrors(errors, touched, step)) {
                        setStep((prev) => prev + 1);
                      } else {
                        showErrorsToast(errors, step);
                      }
                    }}
                    className="ml-auto bg-blue-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 items-center"
                  >
                    Next
                    <ChevronRight className="w-5 h-5 ml-1" />
                  </button>
                ) : (
                  <Button
                    type="submit"
                    onClick={() => {
                      if (Object.keys(errors).length > 0) {
                        showAllErrors(errors);
                      }
                    }}
                    disabled={isSubmitting}
                    className="ml-auto bg-green-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 items-center"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Listing
                        <Check className="w-5 h-5 ml-1" />
                      </>
                    )}
                  </Button>
                )}
              </div>

              {step === 4 && Object.keys(errors).length > 0 && (
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 text-yellow-400 mr-2" />
                    <p className="text-sm text-yellow-700">
                      There are errors in your form. Please review all steps
                      before submitting.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => showAllErrors(errors)}
                    className="mt-2 text-sm text-blue-600 hover:text-blue-500 focus:outline-none focus:underline"
                  >
                    View all errors
                  </button>
                </div>
              )}
            </Form>
          )}
        </Formik>
      </motion.div>
      <Toaster />
    </div>
  );
}
