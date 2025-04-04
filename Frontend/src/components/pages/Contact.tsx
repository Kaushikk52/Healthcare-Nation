import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, MapPin, Phone, Mail, CheckCircle } from "lucide-react";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { useLocation } from "react-router-dom";

export default function ContactPage() {
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const query = useQuery();
  const subject = query.get("subject") || "";

  const initialValues = {
    name: "",
    phone: "",
    email: "",
    //subject: subject,
    content: "",
    terms: false,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone is required"),
    //subject: Yup.string(),
    content: Yup.string().required("Message is required"),
    terms: Yup.boolean().oneOf([true], "You must accept the terms"),
  });

  const baseURL = import.meta.env.VITE_APP_BACKEND_BASE_URL;
  const [currentUser, setCurrentUser] = useState<any>();

  const ENQUIRY_OPTIONS = [
    { value: "HOME_LOAN", label: "Home Loan" },
    { value: "PACKING_MOVING", label: "Packing & Moving" },
    { value: "INTERIOR_DESIGN", label: "Interior Design" },
    { value: "LEGAL_ASSIST", label: "Legal Assistance" },
    { value: "ACQUISTION", label: "Land Acquisition" },
    { value: "REDEVELOPMENT", label: "Redevelopment" },
    { value: "JV", label: "Joint Venture" },
    { value: "FUNDING", label: "Builder Funding" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const cardVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const getCurrentUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setCurrentUser(undefined);
        return;
      }
      const response = await axios.get(
        `${baseURL}/v1/api/users/getCurrentUser`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 201 || response.status === 200) {
        setCurrentUser(response.data);
      }
    } catch (err: any) {
      console.log("An error occurred : ", err);
      if (err.response && err.response.status === 401) {
        localStorage.removeItem("token");
      }
      toast.error(`An error occurred : ${err}`, {
        position: "bottom-right",
        duration: 3000,
      });
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  const handleSubmit = async (
    values: any,
    { setSubmitting, resetForm }: FormikHelpers<any>
  ) => {
    try {
      const body = {
        userId: currentUser?.userId,
        //subject: values.subject || "CASUAL_ENQUIRY",
        enquiry: {
          content: values.content,
          email: values.email,
          name: values.name,
          phone: values.phone,
          term: values.term,
        },
      };

      const response = await axios.post(
        `${baseURL}/v1/api/enquiry/email`,
        body
      );

      if (response.status === 200 || response.status === 201) {
        toast.success(`Email sent Successfully`, {
          position: "bottom-right",
          duration: 3000,
        });
        resetForm();
      } else {
        throw new Error("Failed to send email");
      }
    } catch (err) {
      console.error(err);
      toast.error(`Couldn't send Email, Try again`, {
        position: "bottom-right",
        duration: 3000,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="w-full flex justify-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Out Friendly Team</h1>
            <div className="w-2/3 h-1 bg-blue-500 mx-auto"></div>
          </div>
        </div>
        {/* <motion.h1
          className="text-4xl sm:text-5xl font-extrabold text-center mb-4 text-gray-900"
          variants={itemVariants}
        >
          Contact our friendly team
        </motion.h1> */}
        <motion.p
          className="text-center text-lg sm:text-lg text-gray-600 mb-16"
          variants={itemVariants}
        >
          At HealthcareNation, we are committed to helping you find the best
          healthcare services across India. If you have any questions, need assistance, or
          want to partner with us, feel free to reach out at
        </motion.p>

        {/* <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-8 mb-20"
          variants={containerVariants}
        >
          {[
            {
              icon: MessageCircle,
              title: "Mail us",
              description: "Speak to our friendly team.",
              linkText: "iestatecorp@gmail.com",
              link: "mailto:iestatecorp@gmail.com",
            },
            {
              icon: MapPin,
              title: "Visit us",
              description: "Visit our office HQ.",
              linkText: "View on Google Maps",
              link: "https://maps.app.goo.gl/rAuSTvW36SmdVS9r9",
            },
            {
              icon: Phone,
              title: "Call us",
              description: "Mon-Fri from 11am to 7pm.",
              linkText: "+91 7700 9943 13",
              link: "tel:+917700994313",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-xl shadow-sm transition-all duration-300 flex flex-col justify-between h-full"
              variants={cardVariants}
              whileHover="hover"
            >
              <div>
                <item.icon className="w-8 h-8 text-blue-600 mb-6" />
                <h3 className="font-bold text-xl mb-3 text-gray-900">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-6">{item.description}</p>
              </div>
              <a
                href={item.link}
                className="text-blue-600 hover:underline font-medium"
              >
                {item.linkText}
              </a>
            </motion.div>
          ))}
        </motion.div> */}

        <motion.div
          className="bg-white shadow-xl rounded-2xl overflow-hidden"
          variants={containerVariants}
        >
          <div className="p-8 md:p-12">
            <motion.h2
              className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900"
              variants={itemVariants}
            >
              Get in touch with us
            </motion.h2>
            <motion.p
              className="text-lg sm:text-lg text-gray-600 mb-12"
              variants={itemVariants}
            >
              Fill out the form below or schedule a meeting with us at your
              convenience.
            </motion.p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="border border-gray-300 rounded-lg shadow-md p-6">
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting }) => (
                    <Form className="space-y-4">
                      <h2 className="font-bold text-xl mb-4">
                        Contact over email
                      </h2>
                      <div>
                        <Field
                          name="name"
                          type="text"
                          placeholder="Name"
                          className="w-full p-2 border rounded"
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                      <div>
                        <Field
                          name="phone"
                          type="tel"
                          placeholder="Phone"
                          className="w-full p-2 border rounded"
                        />
                        <ErrorMessage
                          name="phone"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                      <div>
                        <Field
                          name="email"
                          type="email"
                          placeholder="Email"
                          className="w-full p-2 border rounded"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                      {/* <div>
                        <Field
                          as="select"
                          id="subject"
                          name="subject"
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                        >
                          <option value="">Select Subject</option>
                          {ENQUIRY_OPTIONS.map((option) => (
                            <option key={option.label} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="subject"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div> */}

                      <div>
                        <Field
                          name="content"
                          as="textarea"
                          rows="7"
                          placeholder="Hello, I am interested in your property. Please provide more details."
                          className="w-full p-2 border rounded"
                        />
                        <ErrorMessage
                          name="content"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Field
                          type="checkbox"
                          name="terms"
                          id="terms"
                          className="rounded text-orange-500"
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm text-gray-600"
                        >
                          By submitting this form I agree to Terms of Use
                        </label>
                      </div>
                      <ErrorMessage
                        name="terms"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gray-300 p-2 rounded hover:bg-gray-600 hover:text-white transition duration-300"
                      >
                        Send Message
                      </motion.button>
                    </Form>
                  )}
                </Formik>
              </div>
              <motion.div className="space-y-10" variants={containerVariants}>
                <motion.div variants={itemVariants}>
                  <h3 className="text-2xl font-semibold mb-6 text-gray-900">
                    With our services you can
                  </h3>
                  <ul className="space-y-4">
                    {[
                      "Improve usability of your product",
                      "Engage users at a higher level and outperform your competition",
                      "Reduce the onboarding time and improve sales",
                      "Balance user needs with your business goal",
                    ].map((item, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start"
                        variants={itemVariants}
                      >
                        <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
                        <span className="text-gray-700">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <h3 className="text-2xl font-semibold mb-6 text-gray-900">
                    You can also Contact Us via
                  </h3>
                  <ul className="space-y-4">
                    {[
                      { icon: <Mail className="w-6 h-6 mr-3" />, text: 'info.healthcarenation@gmail.com' },
                      { icon: <Phone className="w-6 h-6 mr-3" />, text: '+91 1234567890' },
                    ].map((item, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start"
                        variants={itemVariants}
                      >
                        <span>{item.icon}</span>
                        <span className="text-gray-700">{item.text}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 text">
                    Address
                  </h3>
                  <ul className="text-gray-600 space-y-1 whitespace-pre-line">
                    <li>A-2, Solitaire Height,</li>
                    <li>Next to Dwarka Hotel, Shimpoli,</li>
                    <li>Borivali-W, Mumbai-92</li>
                  </ul>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* <motion.div className="bg-gray-100 px-8 py-6" variants={itemVariants}>
            <h3 className="font-semibold mb-4 text-lg text-gray-900">
              You can also Contact Us via
            </h3>
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-8">
              <a
                href=""
                className="flex items-center text-gray-700 hover:text-blue-600 transition duration-300"
              >
                <Mail className="w-6 h-6 mr-3" />
                info.healthcarenation@gmail.com
              </a>
              <a
                href="tel:+917700994313"
                className="flex items-center text-gray-700 hover:text-blue-600 transition duration-300"
              >
                <Phone className="w-6 h-6 mr-3" />
                +91 1234567890
              </a>
            </div>
          </motion.div> */}

        </motion.div>
      </motion.div>
    </div>
  );
}
