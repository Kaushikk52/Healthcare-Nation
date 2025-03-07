"use client";

import axios from "axios";
import {
  type FormikHelpers,
  type FormikErrors,
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
  Trash2,
  Plus,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import DatePicker from "react-datepicker";
import { MedicalFacilitySchema } from "@/Validations/MedicalFacility";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";

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
  const [phones, setPhones] = useState<string[]>([""]);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handlePhoneChange = (index: number, value: string) => {
    const updatedPhones = [...phones];
    updatedPhones[index] = value;
    setPhones(updatedPhones);
  };

  const addPhone = () => {
    setPhones([...phones, ""]);
  };

  const removePhone = (index: number) => {
    const updatedPhones = phones.filter((_, i) => i !== index);
    setPhones(updatedPhones);
  };
 

  // Update the initialValues to match the schema
  const initialValues = {
    name: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
    bed: 0,
    website: "",
    openDay: "",
    closeDay: "",
    hours: "",
    description: "",
    phone: [""],
    images: [] as File[],
    videos: [""],
    ownership: "PRIVATE",
    facilityType: "HOSPITAL",
    brands: [""],
    specialities: [""],
    services: [""],
    psu: [""],
    accreditations: [""],
    concerns: [""],
    insurance: [""],
    tpa: [""],
    altMed: [""],
    avgRating: 0,
  };

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

  async function uploadSingleImage(
    image: File,
    type: string
  ): Promise<string | null> {
    try {
      toast.loading("Uploading Specialities Images ...", {
        position: "bottom-right",
        duration: 2000,
      });

      const formData = new FormData();
      formData.append("file", image);
      formData.append("type", type);

      const res = await axios.post(
        `${baseURL}/v1/api/images/upload/single`,
        formData
      );
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

  const [startDay, setStartDay] = useState("mon");
  const [endDay, setEndDay] = useState("sat");
  const [hoursPerDay, setHoursPerDay] = useState(8);
  const [displayText, setDisplayText] = useState("");

  const daysOfWeek = [
    { label: "Monday", value: "mon", index: 0 },
    { label: "Tuesday", value: "tue", index: 1 },
    { label: "Wednesday", value: "wed", index: 2 },
    { label: "Thursday", value: "thu", index: 3 },
    { label: "Friday", value: "fri", index: 4 },
    { label: "Saturday", value: "sat", index: 5 },
    { label: "Sunday", value: "sun", index: 6 },
  ];

  useEffect(() => {
    if (startDay && endDay) {
      const start = daysOfWeek.find((day) => day.value === startDay);
      const end = daysOfWeek.find((day) => day.value === endDay);

      if (start && end) {
        // Calculate days
        let days = 0;
        if (end.index >= start.index) {
          days = end.index - start.index + 1;
        } else {
          days = 7 - start.index + end.index + 1;
        }

        // Calculate total hours based on hours per day
        const totalHours = hoursPerDay;

        // Format the display text
        const formattedStart =
          start.value.charAt(0).toUpperCase() + start.value.slice(1);
        const formattedEnd =
          end.value.charAt(0).toUpperCase() + end.value.slice(1);

        setDisplayText(`${formattedStart} - ${formattedEnd} ${totalHours}hrs`);
      }
    }
  }, [startDay, endDay, hoursPerDay]);

  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value);
    if (!isNaN(value) && value > 0 && value <= 24) {
      setHoursPerDay(value);
    }
  };

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
      if (imageUrls.length > 0) {
        values.images = imageUrls || [""];
      }

      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${baseURL}/v1/api/facility/save`,
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

  const steps = ["General", "Details", "Images", "Tags"];

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
          validationSchema={MedicalFacilitySchema}
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
                          htmlFor="website"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Website
                        </label>
                        <Field
                          id="website"
                          name="website"
                          type="url"
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder="https://example.com"
                        />
                        <ErrorMessage
                          name="website"
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
                          htmlFor="address.state"
                          className="block text-sm font-medium text-gray-700"
                        >
                          State
                        </label>
                        <Field
                          id="address.state"
                          name="address.state"
                          type="text"
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                        <ErrorMessage
                          name="address.state"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="mt-2">
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
                          htmlFor="address.country"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Country
                        </label>
                        <Field
                          id="address.country"
                          name="address.country"
                          type="text"
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                        <ErrorMessage
                          name="address.country"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <h2 className="text-base font-bold tracking-tight col-span-2">
                        Weekly Working Days
                      </h2>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 col-span-2">
                        <div>
                          <label
                            htmlFor="start-day"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            From
                          </label>
                          <Field
                            as="select"
                            id="start-day"
                            name="start-day"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          >
                            {daysOfWeek.map((day) => (
                              <option key={day.value} value={day.value}>
                                {day.label}
                              </option>
                            ))}
                          </Field>
                          <ErrorMessage
                            name="start-day"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="end-day"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            To
                          </label>
                          <Field
                            as="select"
                            id="end-day"
                            name="end-day"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          >
                            {daysOfWeek.map((day) => (
                              <option key={day.value} value={day.value}>
                                {day.label}
                              </option>
                            ))}
                          </Field>
                          <ErrorMessage
                            name="end-day"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="hours-per-day"
                          className="block text-sm font-medium text-gray-700 mt-4"
                        >
                          Hours per day
                        </label>
                        <Input
                          id="hours-per-day"
                          type="number"
                          min="1"
                          max="24"
                          value={hoursPerDay}
                          onChange={handleHoursChange}
                          className="w-full"
                        />
                      </div>

                      <div>
                        <div className="flex items-center justify-between">
                          <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Phone Numbers
                          </label>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={addPhone}
                            className="h-8 w-8 p-0"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="space-y-2 mt-1">
                          {phones.map((phone, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-3"
                            >
                              <Input
                                id={`phone[${index}]`}
                                name={`phone[${index}]`}
                                type="tel"
                                value={phone}
                                onChange={(e) => {
                                  handlePhoneChange(index, e.target.value);
                                  setFieldValue(
                                    `phone[${index}]`,
                                    e.target.value
                                  );
                                }}
                                placeholder="Enter phone number (10 digits)"
                                className="flex-1"
                              />
                              {phones.length > 1 && (
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removePhone(index)}
                                  className="h-10 w-10"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                        <ErrorMessage
                          name="phone"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
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
                          htmlFor="bed"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Bed Count
                        </label>
                        <Field
                          id="bed"
                          name="bed"
                          type="number"
                          min="1"
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                        <ErrorMessage
                          name="bed"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>

                      <div>
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
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Select Ownership</option>
                          <option value="PRIVATE">Private</option>
                          <option value="PUBLIC">Public</option>
                          <option value="GOVERNMENT">Government</option>
                        </Field>
                        <ErrorMessage
                          name="ownership"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="specialities"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Specialities
                        </label>
                        <FieldArray name="specialities">
                          {({ push, remove, form }) => (
                            <div className="space-y-2">
                              
                              {form.values.specialities.map(
                                (_: any, index: number) => (
                                  <div
                                    key={index}
                                    className="flex items-center gap-2"
                                  >
                                    <Field
                                      name={`specialities[${index}]`}
                                      type="text"
                                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                      placeholder="Enter speciality"
                                    />
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      onClick={() => remove(index)}
                                      className="h-10 w-10"
                                      disabled={
                                        form.values.specialities.length === 1
                                      }
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                )
                              )}
                            </div>
                          )}
                        </FieldArray>
                        <ErrorMessage
                          name="specialities"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>

                      <div>
                      <label
                        htmlFor="services"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Services
                      </label>
                      <FieldArray name="services">
                        {({ push, remove, form }) => (
                          <div className="space-y-2">
                            {form.values.services.map(
                              (_: any, index: number) => (
                                <div
                                  key={index}
                                  className="flex items-center gap-2"
                                >
                                  <Field
                                    name={`services[${index}]`}
                                    type="text"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter service"
                                  />
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={() => remove(index)}
                                    className="h-10 w-10"
                                    disabled={form.values.services.length === 1}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              )
                            )}
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => push("")}
                              className="mt-2"
                            >
                              <Plus className="h-4 w-4 mr-2" />
                            </Button>
                          </div>
                        )}
                      </FieldArray>
                      <ErrorMessage
                        name="services"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                    </div>

                    
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

                    <div>
                      <label
                        htmlFor="videos"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Videos (URLs)
                      </label>
                      <FieldArray name="videos">
                        {({ push, remove, form }) => (
                          <div className="space-y-2">
                            {form.values.videos.map((_: any, index: number) => (
                              <div
                                key={index}
                                className="flex items-center gap-2"
                              >
                                <Field
                                  name={`videos[${index}]`}
                                  type="url"
                                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                  placeholder="https://example.com/video"
                                />
                                <Button
                                  type="button"
                                  variant="ghost"
                                  onClick={() => remove(index)}
                                  className="h-10 w-10"
                                  disabled={form.values.videos.length === 1}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => push("")}
                              className="mt-2"
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Add Video URL
                            </Button>
                          </div>
                        )}
                      </FieldArray>
                      <ErrorMessage
                        name="videos"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
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
                        Brands
                      </label>
                      <FieldArray name="brands">
                        {({ push, remove, form }) => (
                          <div className="space-y-2">
                            {form.values.brands.map((_: any, index: number) => (
                              <div
                                key={index}
                                className="flex items-center gap-2"
                              >
                                <Field
                                  name={`brands[${index}]`}
                                  type="text"
                                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                  placeholder="Enter brand name"
                                />
                                <Button
                                  type="button"
                                  variant="ghost"
                                  onClick={() => remove(index)}
                                  className="h-10 w-10"
                                  disabled={form.values.brands.length === 1}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => push("")}
                              className="mt-2"
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Add Brand
                            </Button>
                          </div>
                        )}
                      </FieldArray>
                    </div>

                    <div className="!mt-6">
                      <label className="block text-xl font-medium text-gray-900 mb-4">
                        PSU (Public Sector Undertaking)
                      </label>
                      <FieldArray name="psu">
                        {({ push, remove, form }) => (
                          <div className="space-y-2">
                            {form.values.psu.map((_: any, index: number) => (
                              <div
                                key={index}
                                className="flex items-center gap-2"
                              >
                                <Field
                                  name={`psu[${index}]`}
                                  type="text"
                                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                  placeholder="Enter PSU name"
                                />
                                <Button
                                  type="button"
                                  variant="ghost"
                                  onClick={() => remove(index)}
                                  className="h-10 w-10"
                                  disabled={form.values.psu.length === 1}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => push("")}
                              className="mt-2"
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Add PSU
                            </Button>
                          </div>
                        )}
                      </FieldArray>
                    </div>

                    <div className="!mt-6">
                      <label className="block text-xl font-medium text-gray-900 mb-4">
                        Accreditations
                      </label>
                      <FieldArray name="accreditations">
                        {({ push, remove, form }) => (
                          <div className="space-y-2">
                            {form.values.accreditations.map(
                              (_: any, index: number) => (
                                <div
                                  key={index}
                                  className="flex items-center gap-2"
                                >
                                  <Field
                                    name={`accreditations[${index}]`}
                                    type="text"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter accreditation"
                                  />
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={() => remove(index)}
                                    className="h-10 w-10"
                                    disabled={
                                      form.values.accreditations.length === 1
                                    }
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              )
                            )}
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => push("")}
                              className="mt-2"
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Add Accreditation
                            </Button>
                          </div>
                        )}
                      </FieldArray>
                    </div>

                    <div className="!mt-6">
                      <label className="block text-xl font-medium text-gray-900 mb-4">
                        Health Concerns
                      </label>
                      <FieldArray name="concerns">
                        {({ push, remove, form }) => (
                          <div className="space-y-2">
                            {form.values.concerns.map(
                              (_: any, index: number) => (
                                <div
                                  key={index}
                                  className="flex items-center gap-2"
                                >
                                  <Field
                                    name={`concerns[${index}]`}
                                    type="text"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter health concern"
                                  />
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={() => remove(index)}
                                    className="h-10 w-10"
                                    disabled={form.values.concerns.length === 1}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              )
                            )}
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => push("")}
                              className="mt-2"
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Add Health Concern
                            </Button>
                          </div>
                        )}
                      </FieldArray>
                      <ErrorMessage
                        name="concerns"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div className="!mt-6">
                      <label className="block text-xl font-medium text-gray-900 mb-4">
                        Insurance Accepted
                      </label>
                      <FieldArray name="insurance">
                        {({ push, remove, form }) => (
                          <div className="space-y-2">
                            {form.values.insurance.map(
                              (_: any, index: number) => (
                                <div
                                  key={index}
                                  className="flex items-center gap-2"
                                >
                                  <Field
                                    name={`insurance[${index}]`}
                                    type="text"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter insurance provider"
                                  />
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={() => remove(index)}
                                    className="h-10 w-10"
                                    disabled={
                                      form.values.insurance.length === 1
                                    }
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              )
                            )}
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => push("")}
                              className="mt-2"
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Add Insurance
                            </Button>
                          </div>
                        )}
                      </FieldArray>
                      <ErrorMessage
                        name="insurance"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div className="!mt-6">
                      <label className="block text-xl font-medium text-gray-900 mb-4">
                        TPA (Third Party Administrators)
                      </label>
                      <FieldArray name="tpa">
                        {({ push, remove, form }) => (
                          <div className="space-y-2">
                            {form.values.tpa.map((_: any, index: number) => (
                              <div
                                key={index}
                                className="flex items-center gap-2"
                              >
                                <Field
                                  name={`tpa[${index}]`}
                                  type="text"
                                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                  placeholder="Enter TPA name"
                                />
                                <Button
                                  type="button"
                                  variant="ghost"
                                  onClick={() => remove(index)}
                                  className="h-10 w-10"
                                  disabled={form.values.tpa.length === 1}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => push("")}
                              className="mt-2"
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Add TPA
                            </Button>
                          </div>
                        )}
                      </FieldArray>
                      <ErrorMessage
                        name="tpa"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div className="!mt-6">
                      <label className="block text-xl font-medium text-gray-900 mb-4">
                        Alternative Medicine
                      </label>
                      <FieldArray name="altMed">
                        {({ push, remove, form }) => (
                          <div className="space-y-2">
                            {form.values.altMed.map((_: any, index: number) => (
                              <div
                                key={index}
                                className="flex items-center gap-2"
                              >
                                <Field
                                  name={`altMed[${index}]`}
                                  type="text"
                                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                  placeholder="Enter alternative medicine type"
                                />
                                <Button
                                  type="button"
                                  variant="ghost"
                                  onClick={() => remove(index)}
                                  className="h-10 w-10"
                                  disabled={form.values.altMed.length === 1}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => push("")}
                              className="mt-2"
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Add Alternative Medicine
                            </Button>
                          </div>
                        )}
                      </FieldArray>
                      <ErrorMessage
                        name="altMed"
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
