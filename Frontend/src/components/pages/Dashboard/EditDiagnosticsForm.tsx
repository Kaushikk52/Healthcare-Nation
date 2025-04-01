import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import MultipleSelector from "@/components/ui/MultipleSelector"
import popularBrands from "@/data/brands"
import servicesByAccrediations from "@/data/accrediations"
import {DiagnosticsSchema} from '@/Validations/Diagnostics';
import axios from "axios"
import { ErrorMessage, Field, Form, Formik, type FormikErrors, type FormikHelpers } from "formik"
import { AnimatePresence, motion } from "framer-motion"
import { AlertCircle, Check, ChevronLeft, ChevronRight, Loader2, Plus, X } from "lucide-react"
import React from "react"
import { useEffect, useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import { useNavigate, useParams } from "react-router-dom"
import type { MedicalFacility } from "@/models/MedicalFacility"
import chooseYourHealthInsurance from "@/data/healthInsurance";
import chooseYourTPA from "@/data/tpa";
import diagnosticCentres from "@/data/diagnostic";
import publicSector from "@/data/publicSector";

const TagInput = ({
  values,
  fieldName,
  placeholder,
  label,
  onAddTag,
  onRemoveTag,
  errors,
  touched,
}: {
  values: string[]
  fieldName: string
  placeholder: string
  label: string
  onAddTag: (tag: string) => void
  onRemoveTag: (index: number) => void
  errors: any
  touched: any
}) => {
  const [inputValue, setInputValue] = useState("")

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault()
      onAddTag(inputValue.trim())
      setInputValue("")
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm block font-medium">{label}</label>
      </div>

      <div className="flex items-center space-x-2">
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleInputKeyDown}
          placeholder={placeholder}
          className="flex-1"
        />
        <Button
          type="button"
          onClick={() => {
            if (inputValue.trim()) {
              onAddTag(inputValue.trim())
              setInputValue("")
            }
          }}
          size="sm"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex flex-wrap gap-2 mt-2">
        {values.map(
          (tag, index) =>
            tag.trim() && (
              <Badge key={index} variant="secondary" className="text-sm px-2 py-1">
                {tag}
                <X className="h-3 w-3 cursor-pointer ml-1" onClick={() => onRemoveTag(index)} />
              </Badge>
            ),
        )}
      </div>

      {errors && touched && <div className="text-red-500 text-xs mt-1">{errors}</div>}
    </div>
  )
}

const brandsOptions = [...popularBrands.map((brand) => ({ label: brand.title, value: brand.title }))]

const accreditationsOptions = [
  ...servicesByAccrediations.map((accreditation) => ({
    label: accreditation.title,
    value: accreditation.title,
  })),
];

const diagnosticsOptions = [
  ...diagnosticCentres.map((diagnostic) => ({
    label: diagnostic.title,
    value: diagnostic.title,
  })),
];

export default function EditDiagnosticsForm() {
  const hospitalImgs = import.meta.env.VITE_APP_CLOUDINARY_HOSPITALS
  const baseURL = import.meta.env.VITE_APP_BACKEND_BASE_URL
  const [initialValues, setInitialValues] = useState({
    name: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      landmark: "",
    },
    website: "",
    openDay: "",
    closeDay: "",
    hours: "",
    description: "",
    phoneNumbers: [""],
    images: [] as string[],
    newImages: [] as File[],
    videos: [""],
    ownership: "PRIVATE",
    brands: [""],
    accreditations: [""],
    psu: [""],
    diagnostics: [""],
    insurance: [""],
    tpa: [""],
    medicalFacilities: [""],
  })
  const [phones, setPhones] = useState<string[]>([""])
  const [facilities, setFacilities] = useState<MedicalFacility[]>([])
  const [step, setStep] = useState(1)
  const [startDay, setStartDay] = useState("mon")
  const [endDay, setEndDay] = useState("sat")
  const [hoursPerDay, setHoursPerDay] = useState(8)
  const navigate = useNavigate()
  const { id } = useParams()
  const [diagnostics, setDiagnostics] = useState(null)
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([])

  const daysOfWeek = [
    { label: "Select day", value: "", index: 0, disable: true },
    { label: "Monday", value: "mon", index: 1, disable: false },
    { label: "Tuesday", value: "tue", index: 2, disable: false },
    { label: "Wednesday", value: "wed", index: 3, disable: false },
    { label: "Thursday", value: "thu", index: 4, disable: false },
    { label: "Friday", value: "fri", index: 5, disable: false },
    { label: "Saturday", value: "sat", index: 6, disable: false },
    { label: "Sunday", value: "sun", index: 7, disable: false },
  ]

  const stateOptions = [
    { label: "Select Location", value: "", index: 0, disable: true },
    { label: "Mumbai", value: "Mumbai", index: 1, disable: false },
    { label: "Bangalore", value: "Bangalore", index: 2, disable: false },
    { label: "Chennai", value: "Chennai", index: 3, disable: false },
    { label: "Delhi", value: "Delhi", index: 4, disable: false },
  ]

  const facilitiesOptions = [
    ...facilities.map((facility) => ({
      value: facility.id.toString(),
      label: facility.name,
    })),
  ]

  const psuOptions = [
    ...publicSector.map((psu) => ({ label: psu.title, value: psu.title })),
  ];
  
  const accrediationsOptions = [
    ...servicesByAccrediations.map((accreditation) => ({
      label: accreditation.title,
      value: accreditation.title,
    })),
  ];
  
  const insuranceOptions = [
    ...chooseYourHealthInsurance.map((insurance) => ({
      label: insurance.title,
      value: insurance.title,
    })),
  ];
  
  const tpaOptions = [
    ...chooseYourTPA.map((tpa) => ({ label: tpa.title, value: tpa.title })),
  ];

  const steps = ["General", "Details", "Images", "Tags"]

  async function uploadImages(images: File[], type: string): Promise<string[]> {
    if (!images?.length) {
      showToast("Please select images first", "error")
      return []
    }

    toast.loading("Uploading Images ...", {
      position: "bottom-right",
      duration: 2000,
    })

    const formData = new FormData()
    images.forEach((image) => formData.append("files", image))
    formData.append("type", type) // Pass the type (e.g., "PROJECT", "PROPERTY")

    try {
      const res = await axios.post(`${baseURL}/v1/api/images/upload/multiple/${type}`, formData)
      return res.data ?? []
    } catch (err) {
      console.error("Batch upload failed:", err)
      return []
    }
  }

  function showToast(message: string, type: "success" | "error") {
    toast[type](message, { position: "bottom-right", duration: 3000 })
  }

  const getStepFields = (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        return ["name", "phone", "address.street", "address.city", "address.landmark", "address.zipCode"]
      case 2:
        return ["description", "ownership", "specialities.name", "specialities.image"]
      case 3:
        return ["images"]
      case 4:
        return ["departments", "altMeds", "concern", "services"]
      default:
        return []
    }
  }

  const showErrorsToast = (errors: FormikErrors<typeof initialValues>, stepNumber: number) => {
    const stepFields = getStepFields(stepNumber)
    const errorMessages = stepFields.reduce((acc: string[], field) => {
      const fieldParts = field.split(".")
      let fieldError: any = errors
      for (const part of fieldParts) {
        fieldError = fieldError && fieldError[part]
      }
      if (fieldError) {
        acc.push(`${field}: ${fieldError}`)
      }
      return acc
    }, [])

    if (errorMessages.length > 0) {
      toast.error(
        <div>
          <strong>Errors on step {stepNumber}:</strong>
          <ul className="list-disc mt-2 pl-4">
            {errorMessages.map((message, index) => (
              <li key={index}>{message}</li>
            ))}
          </ul>
        </div>,
        { duration: 5000, position: "bottom-right" },
      )
    }
  }

  const hasStepErrors = (errors: FormikErrors<typeof initialValues>, touched: any, stepNumber: number) => {
    const stepFields = getStepFields(stepNumber)
    return stepFields.some((field) => {
      const fieldParts = field.split(".")
      let fieldError: any = errors
      let fieldTouched: any = touched
      for (const part of fieldParts) {
        fieldError = fieldError && fieldError[part]
        fieldTouched = fieldTouched && fieldTouched[part]
      }
      return fieldError && fieldTouched
    })
  }

  const showAllErrors = (errors: FormikErrors<typeof initialValues>) => {
    console.log("Errors : ", errors)
    const allErrorMessages = steps.flatMap((_, index) => {
      const stepNumber = index + 1
      const stepFields = getStepFields(stepNumber)
      return stepFields.reduce((acc: string[], field) => {
        const fieldParts = field.split(".")
        let fieldError: any = errors
        for (const part of fieldParts) {
          fieldError = fieldError && fieldError[part]
        }
        if (fieldError) {
          acc.push(`Step ${stepNumber} - ${field}: ${fieldError}`)
        }
        return acc
      }, [])
    })

    if (allErrorMessages.length > 0) {
      allErrorMessages.forEach((message) => {
        toast.error(`${message}`, {
          duration: 10000,
          position: "bottom-right",
        })
      })
    }
  }

  const getCurrentUserFacilities = async (): Promise<void> => {
    try {
      const response = await axios.get(`${baseURL}/v1/api/facility/current-user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      console.log("Current User facilites : ", response.data)
      setFacilities(response.data.facilities)
    } catch (err: any) {
      console.log(err.message)
    }
  }

  async function handleSubmit(
    values: typeof initialValues,
    { setSubmitting, resetForm }: FormikHelpers<typeof initialValues>,
  ) {
    if (step !== 4) {
      setSubmitting(false)
      return
    }

    try {
      setSubmitting(true)

      // Upload new images if there are any
      let uploadedImageUrls: string[] = []
      if (values.newImages && values.newImages.length > 0) {
        toast.loading("Uploading new images...", {
          position: "bottom-right",
          duration: 2000,
        })
        uploadedImageUrls = await uploadImages(values.newImages, "Hospitals")
      }

      // Combine existing images (that weren't deleted) with newly uploaded ones
      const finalImageUrls = [...values.images, ...uploadedImageUrls]

      // Format medical facilities
      const formattedMedicalFacilities = values.medicalFacilities?.map((facility) => ({
        id: facility,
      }))

      const updatedValues = {
        ...values,
        images: finalImageUrls,
        medicalFacilities: formattedMedicalFacilities,
        id: id, // Ensure the ID is included for update
      }

      // Remove the newImages property as it's not needed on the server
      delete updatedValues.newImages

      const token = localStorage.getItem("token")
      // Use PUT for updates instead of POST for new records
      const response = await axios.post(`${baseURL}/v1/api/diagnostics/edit`, {diagnostics: updatedValues, imagesToDelete : imagesToDelete}, {
        headers: { Authorization: `Bearer ${token}`, timeout: 20000 },
      })

      if (response.status === 200) {
        showToast("Diagnostics information updated successfully!", "success")
        // Reset the imagesToDelete array
        setImagesToDelete([])
        // Refresh the data
        getDiagnosticsDetails()
      }
    } catch (err: any) {
      if (err.response?.status === 401) {
        showToast("Access denied! Authentication is required", "error")
      } else {
        showToast(`An error occurred: ${err.message}`, "error")
      }
    } finally {
      setSubmitting(false)
    }
  }

  useEffect(() => {
    getCurrentUserFacilities()
  }, [])

  const getDiagnosticsDetails = async () => {
    try {
      const response = await axios.get(`${baseURL}/v1/api/diagnostics/id/${id}`)
      const data = response.data.diagnostics;

      // Make sure images is an array of strings
      const formattedData = {
        ...data, 
        images: Array.isArray(data.images) ? data.images : [],
        newImages: [], // Initialize empty newImages array
      }

      setDiagnostics(data)
      setInitialValues(formattedData)
      console.log("Diagnostics data loaded:", formattedData)
    } catch (error) {
      console.error("Error fetching diagnostics details:", error)
      toast.error("Failed to load diagnostics data", {
        position: "bottom-right",
        duration: 3000,
      })
    }
  }

  useEffect(() => {
    getDiagnosticsDetails()
  }, [id])

  useEffect(() => {
    if (startDay && endDay) {
      const start = daysOfWeek.find((day) => day.value === startDay)
      const end = daysOfWeek.find((day) => day.value === endDay)

      if (start && end) {
        // Calculate days
        let days = 0
        if (end.index >= start.index) {
          days = end.index - start.index + 1
        } else {
          days = 7 - start.index + end.index + 1
        }

        // Calculate total hours based on hours per day
        const totalHours = hoursPerDay

        // Format the display text
        const formattedStart = start.value.charAt(0).toUpperCase() + start.value.slice(1)
        const formattedEnd = end.value.charAt(0).toUpperCase() + end.value.slice(1)
      }
    }
  }, [startDay, endDay, hoursPerDay])

  return (
    <div className="flex bg-gray-100 justify-center items-center lg:px-8 min-h-screen px-2 py-1 sm:px-3">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-[1.70rem] rounded-xl shadow-lg w-full max-w-4xl space-y-8"
      >
        <div>
          <h2 className="text-3xl text-center text-gray-900 font-extrabold mt-6">Edit Diagnostics</h2>
          <p className="text-center text-gray-600 text-sm mt-2">Please fill the details of your Diagnostics</p>
        </div>

        <div className="flex flex-wrap justify-start items-center mb-8">
          {steps.map((s, index) => (
            <React.Fragment key={s}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    index + 1 <= step ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"
                  } font-bold text-lg transition-colors duration-300`}
                >
                  {index + 1}
                </div>
                <div className="text-gray-500 text-xs font-medium mt-2">{s}</div>
              </div>
              {index < steps.length - 1 && (
                <motion.div
                  className="flex-1 bg-gray-300 h-px mx-4 relative"
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
                    className="border-r-2 border-t-2 h-3 w-3 -translate-y-1/2 absolute right-0 rotate-45 top-1/2 transform translate-x-1/2"
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
          validationSchema={DiagnosticsSchema}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {({ values, errors, touched, setFieldValue, isSubmitting, handleChange }) => (
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
                        <label htmlFor="name" className="text-gray-700 text-sm block font-medium">
                          Name
                        </label>
                        <Field
                          id="name"
                          name="name"
                          type="text"
                          className="border border-gray-300 rounded-md shadow-sm w-full block focus:border-blue-500 focus:outline-none focus:ring-blue-500 mt-1 px-3 py-2"
                        />
                        <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                      </div>

                      <div>
                        <label htmlFor="website" className="text-gray-700 text-sm block font-medium">
                          Website
                        </label>
                        <Field
                          id="website"
                          name="website"
                          type="url"
                          className="border border-gray-300 rounded-md shadow-sm w-full block focus:border-blue-500 focus:outline-none focus:ring-blue-500 mt-1 px-3 py-2"
                          placeholder="https://example.com"
                        />
                        <ErrorMessage name="website" component="div" className="text-red-500 text-sm mt-1" />
                      </div>

                      <div>
                        <label htmlFor="address.street" className="text-gray-700 text-sm block font-medium">
                          Street
                        </label>
                        <Field
                          id="address.street"
                          name="address.street"
                          type="text"
                          className="border border-gray-300 rounded-md shadow-sm w-full block focus:border-blue-500 focus:outline-none focus:ring-blue-500 mt-1 px-3 py-2"
                        />
                        <ErrorMessage name="address.street" component="div" className="text-red-500 text-sm mt-1" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="address.city" className="text-gray-700 text-sm block font-medium">
                          City
                        </label>
                        <Field
                          id="address.city"
                          name="address.city"
                          type="text"
                          className="border border-gray-300 rounded-md shadow-sm w-full block focus:border-blue-500 focus:outline-none focus:ring-blue-500 mt-1 px-3 py-2"
                        />
                        <ErrorMessage name="address.city" component="div" className="text-red-500 text-sm mt-1" />
                      </div>

                      <div>
                        <label htmlFor="address.state" className="block text-sm font-medium text-gray-700 mb-1">
                          State
                        </label>
                        <Field
                          as="select"
                          id="address.state"
                          name="address.state"
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                          {stateOptions.map((state) => (
                            <option disabled={state.disable} key={state.value} value={state.value}>
                              {state.label}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage name="address.state" component="div" className="text-red-500 text-sm mt-1" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="mt-2">
                        <label htmlFor="address.zipCode" className="text-gray-700 text-sm block font-medium">
                          Zip Code
                        </label>
                        <Field
                          id="address.zipCode"
                          name="address.zipCode"
                          type="text"
                          className="border border-gray-300 rounded-md shadow-sm w-full block focus:border-blue-500 focus:outline-none focus:ring-blue-500 mt-1 px-3 py-2"
                        />
                        <ErrorMessage name="address.zipCode" component="div" className="text-red-500 text-sm mt-1" />
                      </div>

                      <div>
                        <label htmlFor="address.landmark" className="text-gray-700 text-sm block font-medium">
                          Landmark
                        </label>
                        <Field
                          id="address.landmark"
                          name="address.landmark"
                          type="text"
                          className="border border-gray-300 rounded-md shadow-sm w-full block focus:border-blue-500 focus:outline-none focus:ring-blue-500 mt-1 px-3 py-2"
                        />
                        <ErrorMessage name="address.landmark" component="div" className="text-red-500 text-sm mt-1" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <h2 className="col-span-2 text-base font-bold tracking-tight">Weekly Working Days</h2>

                      <div className="col-span-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label htmlFor="openDay" className="text-gray-700 text-sm block font-medium mb-1">
                            From
                          </label>
                          <Field
                            as="select"
                            id="openDay"
                            name="openDay"
                            className="border border-gray-300 rounded-md shadow-sm w-full block focus:border-blue-500 focus:outline-none focus:ring-blue-500 mt-1 px-3 py-2"
                          >
                            {daysOfWeek.map((day) => (
                              <option key={day.value} value={day.value} disabled={day.disable}>
                                {day.label}
                              </option>
                            ))}
                          </Field>
                          <ErrorMessage name="openDay" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div>
                          <label htmlFor="closeDay" className="text-gray-700 text-sm block font-medium mb-1">
                            To
                          </label>
                          <Field
                            as="select"
                            id="closeDay"
                            name="closeDay"
                            className="border border-gray-300 rounded-md shadow-sm w-full block focus:border-blue-500 focus:outline-none focus:ring-blue-500 mt-1 px-3 py-2"
                          >
                            {daysOfWeek.map((day) => (
                              <option key={day.value} value={day.value} disabled={day.disable}>
                                {day.label}
                              </option>
                            ))}
                          </Field>
                          <ErrorMessage name="closeDay" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="hours" className="text-gray-700 text-sm block font-medium mt-4">
                          Hours per day
                        </label>
                        <Field
                          id="hours"
                          name="hours"
                          type="number"
                          min="1"
                          max="24"
                          value={values.hours} // Formik state
                          onChange={handleChange} // Formik's handleChange
                          className="border border-gray-300 rounded w-full focus:border-blue-500 focus:ring-blue-500 outline-none px-3 py-2"
                        />
                        <ErrorMessage name="hours" component="div" className="text-red-500 text-sm mt-1" />
                      </div>

                      <div>
                        {/* Tag-based Phone input */}
                        <TagInput
                          values={values.phoneNumbers}
                          fieldName="phoneNumbers"
                          placeholder="Enter phone number"
                          label="Phone Numbers"
                          onAddTag={(tag) => {
                            // Validate phone number (only allow 10-digit numbers)
                            const phoneRegex = /^\d{10}$/
                            if (phoneRegex.test(tag)) {
                              const newPhones = [...values.phoneNumbers]
                              const emptyIndex = newPhones.findIndex((p) => !p.trim())

                              if (emptyIndex >= 0) {
                                newPhones[emptyIndex] = tag
                              } else {
                                newPhones.push(tag)
                              }
                              setFieldValue("phoneNumbers", newPhones)
                            } else {
                              toast.error("Please enter a valid 10-digit phone number", {
                                duration: 3000,
                              })
                            }
                          }}
                          onRemoveTag={(index) => {
                            const newPhones = [...values.phoneNumbers]
                            newPhones.splice(index, 1)

                            // Ensure there's always at least one empty slot
                            if (newPhones.length === 0 || !newPhones.includes("")) {
                              newPhones.push("")
                            }
                            setFieldValue("phoneNumbers", newPhones)
                          }}
                          errors={errors.phoneNumbers}
                          touched={touched.phoneNumbers}
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
                      <label htmlFor="description" className="text-gray-700 text-sm block font-medium mb-1">
                        Description
                      </label>
                      <Field
                        as="textarea"
                        id="description"
                        name="description"
                        rows={4}
                        className="border border-gray-300 rounded-md shadow-sm text-sm w-full block focus:border-blue-500 focus:outline-none focus:ring-blue-500 mt-1 px-3 py-2 sm:text-base touch-manipulation"
                      />
                      <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="ownership" className="text-gray-700 text-sm block font-medium">
                          Ownership
                        </label>
                        <Field
                          as="select"
                          id="ownership"
                          name="ownership"
                          className="border border-gray-300 rounded-md shadow-sm w-full block focus:border-blue-500 focus:outline-none focus:ring-blue-500 mt-1 px-3 py-2"
                        >
                          <option value="">Select Ownership</option>
                          <option value="PRIVATE">Private</option>
                          <option value="GOVERNMENT">Government</option>
                        </Field>
                        <ErrorMessage name="ownership" component="div" className="text-red-500 text-sm mt-1" />
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
                      <label className="block text-sm font-medium text-gray-700">Upload Hospital Images</label>
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
                                  const files = event.currentTarget.files
                                  if (files) {
                                    setFieldValue("newImages", [...(values.newImages || []), ...Array.from(files)])
                                  }
                                }}
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        </div>
                      </div>
                      <ErrorMessage name="images" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    {/* Display both existing and new images */}
                    {(values.images.length > 0 || (values.newImages && values.newImages.length > 0)) && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Uploaded Images:</h4>
                        <ul className="list-disc pl-5 text-sm text-gray-600">
                          {/* Existing images (URLs) */}
                          {values.images.map((imageUrl, index) => (
                            <li key={`existing-${index}`} className="flex items-center justify-between py-1">
                              <div className="flex items-center">
                                <img
                                  src={hospitalImgs + imageUrl || "/placeholder.svg"}
                                  alt={`Diagnostics image ${index + 1}`}
                                  className="w-12 h-12 object-cover rounded mr-2"
                                />
                                <span className="truncate max-w-xs">{imageUrl.split("/").pop()}</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  // Add to images to delete
                                  setImagesToDelete([...imagesToDelete, imageUrl])
                                  // Remove from current images
                                  setFieldValue(
                                    "images",
                                    values.images.filter((_, i) => i !== index),
                                  )
                                }}
                                className="ml-2 text-red-500 hover:text-red-700 text-sm p-1"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </li>
                          ))}

                          {/* New images (File objects) */}
                          {values.newImages &&
                            values.newImages.map((file, index) => (
                              <li key={`new-${index}`} className="flex items-center justify-between py-1">
                                <div className="flex items-center">
                                  <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center mr-2">
                                    <svg
                                      className="w-6 h-6 text-gray-400"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                      />
                                    </svg>
                                  </div>
                                  <span className="truncate max-w-xs">{file.name}</span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setFieldValue(
                                      "newImages",
                                      values.newImages.filter((_, i) => i !== index),
                                    )
                                  }}
                                  className="ml-2 text-red-500 hover:text-red-700 text-sm p-1"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </li>
                            ))}
                        </ul>
                      </div>
                    )}

                    <div>
                      {/* Tag-based Videos input */}
                      <TagInput
                        values={values.videos}
                        fieldName="videos"
                        placeholder="https://example.com/video"
                        label="Videos (URLs)"
                        onAddTag={(tag) => {
                          // Extract YouTube video ID
                          const youtubeRegex = /(?:youtube\.com\/.*[?&]v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/
                          const match = tag.match(youtubeRegex)
                          const videoID = match ? match[1] : null

                          if (videoID) {
                            const newVideos = [...values.videos]
                            const emptyIndex = newVideos.findIndex((v) => !v.trim())
                            if (emptyIndex >= 0) {
                              newVideos[emptyIndex] = videoID
                            } else {
                              newVideos.push(videoID)
                            }
                            setFieldValue("videos", newVideos)
                          } else {
                            toast.error("Please enter a valid YouTube URL", {
                              duration: 3000,
                            })
                          }
                        }}
                        onRemoveTag={(index) => {
                          const newVideos = [...values.videos]
                          newVideos.splice(index, 1)
                          if (newVideos.length === 0 || !newVideos.includes("")) {
                            newVideos.push("")
                          }
                          setFieldValue("videos", newVideos)
                        }}
                        errors={errors.videos}
                        touched={touched.videos}
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
                      <label className="text-gray-900 text-xl block font-medium mb-4">
                        Brands
                      </label>
                      <MultipleSelector
                        value={values.brands
                          .filter((b) => b.trim())
                          .map((b) => ({ label: b, value: b }))}
                        onChange={(newValue) => {
                          setFieldValue(
                            "brands",
                            newValue.map((item) => item.value)
                          );
                        }}
                        options={brandsOptions}
                        placeholder="Select brands"
                        className="w-full"
                      />
                      <ErrorMessage
                        name="brands"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div className="!mt-6">
                      <label className="text-gray-900 text-xl block font-medium mb-4">
                        PSU (Public Sector Undertaking)
                      </label>
                      <MultipleSelector
                        value={values.psu
                          .filter((p) => p.trim())
                          .map((p) => ({ label: p, value: p }))}
                        onChange={(newValue) => {
                          setFieldValue(
                            "psu",
                            newValue.map((item) => item.value)
                          );
                        }}
                        options={psuOptions}
                        placeholder="Select PSUs"
                        className="w-full"
                      />
                      <ErrorMessage
                        name="psu"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div className="!mt-6">
                      <label className="text-gray-900 text-xl block font-medium mb-4">
                        Accrediations
                      </label>
                      <MultipleSelector
                        value={values.accreditations
                          .filter((a) => a.trim())
                          .map((a) => ({ label: a, value: a }))}
                        onChange={(newValue) => {
                          setFieldValue(
                            "accreditations",
                            newValue.map((item) => item.value)
                          );
                        }}
                        options={accrediationsOptions}
                        placeholder="Select accreditations"
                        className="w-full"
                      />
                      <ErrorMessage
                        name="accreditations"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div className="!mt-6">
                      <label className="text-gray-900 text-xl block font-medium mb-4">
                        Diagnostics
                      </label>
                      <MultipleSelector
                        value={values.diagnostics
                          .filter((c) => c.trim())
                          .map((c) => ({ label: c, value: c }))}
                        onChange={(newValue) => {
                          setFieldValue(
                            "diagnostics",
                            newValue.map((item) => item.value)
                          );
                        }}
                        options={diagnosticsOptions}
                        placeholder="Select diagnostics"
                        className="w-full"
                      />
                      <ErrorMessage
                        name="diagnostics"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div className="!mt-6">
                      <label className="text-gray-900 text-xl block font-medium mb-4">
                        Insurance Accepted
                      </label>
                      <MultipleSelector
                        value={values.insurance
                          .filter((i) => i.trim())
                          .map((i) => ({ label: i, value: i }))}
                        onChange={(newValue) => {
                          setFieldValue(
                            "insurance",
                            newValue.map((item) => item.value)
                          );
                        }}
                        options={insuranceOptions}
                        placeholder="Select insurance providers"
                        className="w-full"
                      />
                      <ErrorMessage
                        name="insurance"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div className="!mt-6">
                      <label className="text-gray-900 text-xl block font-medium mb-4">
                        TPA (Third Party Administrators)
                      </label>
                      <MultipleSelector
                        value={values.tpa
                          .filter((t) => t.trim())
                          .map((t) => ({ label: t, value: t }))}
                        onChange={(newValue) => {
                          setFieldValue(
                            "tpa",
                            newValue.map((item) => item.value)
                          );
                        }}
                        options={tpaOptions}
                        placeholder="Select TPAs"
                        className="w-full"
                      />
                      <ErrorMessage
                        name="tpa"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div>
                      <label className="text-gray-900 text-xl block font-medium mb-4">
                        Medical Facilities
                      </label>
                      <MultipleSelector
                        value={values.medicalFacilities?.map((b) => ({
                          label: b,
                          value: b,
                        }))}
                        onChange={(newValue) => {
                          setFieldValue(
                            "medicalFacilities",
                            newValue.map((item) => item.value)
                          );
                        }}
                        options={facilitiesOptions}
                        placeholder="Select Medical Facility"
                        className="w-full"
                      />
                      <ErrorMessage
                        name="medicalFacilities"
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
                    className="flex bg-white border border-gray-300 rounded-md shadow-sm text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium hover:bg-gray-50 items-center px-4 py-2"
                  >
                    <ChevronLeft className="h-5 w-5 mr-1" />
                    Previous
                  </button>
                )}
                {step < 4 ? (
                  <button
                    type="button"
                    onClick={() => {
                      if (!hasStepErrors(errors, touched, step)) {
                        setStep((prev) => prev + 1)
                      } else {
                        showErrorsToast(errors, step)
                      }
                    }}
                    className="bg-blue-600 border border-transparent justify-center rounded-md shadow-sm text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium hover:bg-blue-700 inline-flex items-center ml-auto px-4 py-2"
                  >
                    Next
                    <ChevronRight className="h-5 w-5 ml-1" />
                  </button>
                ) : (
                  <Button
                    type="submit"
                    onClick={() => {
                      if (Object.keys(errors).length > 0) {
                        showAllErrors(errors)
                      }
                    }}
                    disabled={isSubmitting}
                    className="bg-green-600 border border-transparent justify-center rounded-md shadow-sm text-sm text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 font-medium hover:bg-green-700 inline-flex items-center ml-auto px-4 py-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Listing
                        <Check className="h-5 w-5 ml-1" />
                      </>
                    )}
                  </Button>
                )}
              </div>

              {step === 4 && Object.keys(errors).length > 0 && (
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md mt-4">
                  <div className="flex items-center">
                    <AlertCircle className="h-5 text-yellow-400 w-5 mr-2" />
                    <p className="text-sm text-yellow-700">
                      There are errors in your form. Please review all steps before submitting.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => showAllErrors(errors)}
                    className="text-blue-600 text-sm focus:outline-none focus:underline hover:text-blue-500 mt-2"
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
  )
}