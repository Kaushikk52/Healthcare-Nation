import { useEffect, useState } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link, useParams } from "react-router-dom"
import { ScrollArea } from "@/components/ui/scroll-area"

import { FaPhone, FaLocationDot } from "react-icons/fa6"
import { FaGlobeAmericas } from "react-icons/fa"
import { Navigation, Pagination, Autoplay, A11y } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import publicSectorCorporates from "@/data/publicSector"
import chooseYourHealthInsurance from "@/data/healthInsurance"
import chooseYourTPA from "@/data/tpa"
import popularBrands from "@/data/brands"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/scrollbar"
import "swiper/swiper-bundle.css"

// Achievement Images
import Throphy from "/Images/hospital-details/dynamic-content-images/description-images/throphy.jpg"
import { CircleCheckBig } from "lucide-react"

export default function Description(props){
  const [isExpanded, setIsExpanded] = useState(false)
  const [phones, setPhones] = useState([])
  const { type } = useParams()

  const [showAllDiagnostics, setShowAllDiagnostics] = useState(false)
  const [showAllAltMed, setShowAllAltMed] = useState(false)
  const [showAllSpecialities, setShowAllSpecialities] = useState(false)

  useEffect(() => {
    setPhones(props.phones)
    // console.log(phones, props.phones);
  }, [props])

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  const corporates = [
    ...publicSectorCorporates.map((psu) => ({
      title: psu.title,
      image: "/Images/" + psu.image,
      borderColor: psu.borderColor,
    })),
  ]

  const brands = [
    ...popularBrands.map((brand) => ({
      title: brand.title,
      image: "/Images/" + brand.image,
      height: brand.height,
      width: brand.width,
      objectProperty: brand.objectProperty,
    })),
  ]

  const insurances = [
    ...chooseYourHealthInsurance.map((ins) => ({
      title: ins.title,
      image: "/Images/" + ins.image,
      bgColor: ins.bgColor,
    })),
  ]

  const tpas = [
    ...chooseYourTPA.map((tpa) => ({
      title: tpa.title,
      image: "/Images/" + tpa.image,
      bgColor: tpa.bgColor,
    })),
  ]

  const achievements = [
    {
      image: Throphy,
      heading: `Western India's first bilateral hand transplant`,
    },
    {
      image: Throphy,
      heading: `Western India's first dual lobe liver transplant`,
    },
  ]

  return (
    <>
      <div className="!grid !grid-cols-1 lg:!grid-cols-12 !gap-6 w-full">
        {/* Left Side */}
        <div className="lg:!col-span-8  xl:!col-span-8 w-full">
          {/* About Us Section */}
          <ScrollArea className="h-[620px] w-full">
            <div className="max-w-full px-4 lg:px-0">
              <div className="flex flex-col justify-center space-y-5 py-5 my-5 border border-gray-200 p-4 rounded-md">
                <h1 className="text-2xl font-semibold">About Us</h1>
                <div className="relative">
                  <div className={`${isExpanded ? "  " : "line-clamp-6"}`}>
                    <p className="text-base text-gray-700">{props.details.description}</p>
                  </div>

                  {!isExpanded && <div className="absolute bottom-0 left-0 right-0 h-16" />}
                </div>

                <div className="mt-2 flex justify-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex items-center gap-1 text-sm font-medium text-primary"
                  >
                    {isExpanded ? "Read less" : "Read more"}
                    <ChevronDown
                      className="h-4 w-4"
                      style={{
                        transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.3s ease",
                      }}
                    />
                  </Button>
                </div>
              </div>
            </div>

            {/* Achievements */}
            {props.details?.achievements && props.details?.achievements.some((item) => item.trim() !== "") && (
              <div className="mb-5 border border-gray-200 !p-4 rounded-md mx-4 lg:mx-0">
                <h1 className="!text-2xl !font-semibold">Achievements</h1>
                <div className="!py-4 sm:!py-2 ">
                  {props.details.achievements?.map((item, index) => (
                    <div
                      key={index}
                      className="!flex !flex-col !justify-center !items-center !text-center !mb-6 !space-y-0 sm:!text-left sm:!space-y-0 sm:!flex-row sm:!justify-start sm:!items-center sm:!space-x-5 sm:!mb-4"
                    >
                      <img
                        src={Throphy || "/placeholder.svg"}
                        alt={item}
                        className="!rounded-full !h-15 !w-15 sm:!h-10 sm:!w-10"
                      />
                      <h1 className="!text-base !font-medium">{item}</h1>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Facts */}
            {props.details?.facts && props.details?.facts.some((item) => item.trim() !== "") && (
              <div className="border border-gray-200 !p-4 rounded-md mx-4 lg:mx-0">
                <h1 className="!text-2xl !font-semibold">Facts</h1>
                <div className="!py-4 sm:!py-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4">
                    {props.details.facts?.map((fact, index) => {
                      return (
                        <span key={index} className="!flex !items-center !text-base !font-medium">
                          <CircleCheckBig className="!h-8 !w-8 !mr-3 sm:!mr-5 !flex-shrink-0" />
                          {fact}
                        </span>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Diagnostics Section */}
            {props.details?.diagnostics && (
              <div className="!py-4 border border-gray-200 !p-4 rounded-md mt-5 mx-4 lg:mx-0">
                <h1 className="!text-2xl !font-semibold">Diagnostic & Laboratory Services</h1>
                <div className="!flex !flex-wrap !gap-3 !py-5">
                  {props.details.diagnostics?.map((diag, index) => (
                    <Link key={index} to={`/listing?type=${type.replace("-details", "")}&diagnostics=${diag}`}>
                      <button className="!bg-gray-200 !px-4 !py-2 !rounded-full !text-sm !text-gray-700 hover:!bg-gray-200 !transition">
                        {diag}
                      </button>
                    </Link>
                  ))}

                  {!showAllDiagnostics && (
                    <button
                      className="!bg-cyan-600 !px-4 !py-2 !rounded-full !text-white !text-sm !font-medium hover:!bg-cyan-700 !transition"
                      onClick={() => setShowAllDiagnostics(true)}
                    >
                      More
                    </button>
                  )}
                  {showAllDiagnostics && (
                    <button
                      className="!bg-cyan-600 !px-4 !py-2 !rounded-full !text-white !text-sm !font-medium hover:!bg-cyan-700 !transition"
                      onClick={() => setShowAllDiagnostics(false)}
                    >
                      Show Less
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Alt Med Section */}
            {props.details?.altMed && props.details?.altMed.some((item) => item.trim() !== "") && (
              <div className="!py-4 border border-gray-200 !p-4 rounded-md mt-5 mx-4 lg:mx-0">
                <h1 className="!text-2xl !font-semibold">Alternative & Complementary Medicine Services</h1>
                <div className="!flex !flex-wrap !gap-3 !py-5">
                  {props.details.altMed?.map((med, index) => (
                    <Link key={index} to={`/listing?type=${type.replace("-details", "")}&altMed=${med}`}>
                      <button className="!bg-gray-200 !px-4 !py-2 !rounded-full !text-sm !text-gray-700 hover:!bg-gray-200 !transition">
                        {med}
                      </button>
                    </Link>
                  ))}

                  {!showAllAltMed && (
                    <button
                      className="!bg-cyan-600 !px-4 !py-2 !rounded-full !text-white !text-sm !font-medium hover:!bg-cyan-700 !transition"
                      onClick={() => setShowAllAltMed(true)}
                    >
                      More
                    </button>
                  )}
                  {showAllAltMed && (
                    <button
                      className="!bg-cyan-600 !px-4 !py-2 !rounded-full !text-white !text-sm !font-medium hover:!bg-cyan-700 !transition"
                      onClick={() => setShowAllAltMed(false)}
                    >
                      Show Less
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Corporates Section */}
            {props.details?.psu && (
              <div className="!py-4 border border-gray-200 !p-4 rounded-md my-5 mx-4 lg:mx-0">
                <h1 className="!text-2xl !font-semibold">Public Sector health schemes</h1>

                <Swiper
                  modules={[Navigation, Pagination, Autoplay, A11y]}
                  slidesPerView={6}
                  loop={true}
                  navigation
                  autoplay={{ delay: 10000 }}
                  breakpoints={{
                    0: {
                      slidesPerView: 2,
                    },
                    520: {
                      slidesPerView: 2,
                    },
                    768: {
                      slidesPerView: 2,
                    },
                    1024: {
                      slidesPerView: 5,
                    },
                  }}
                  className="!mt-0"
                >
                  {props.details.psu?.map((item, index) => {
                    const corp = corporates.find((corp) => corp.title === item) // Find instead of filter
                    const corpImg = corp?.image // Get the image

                    return (
                      <SwiperSlide key={index} className="!mt-4">
                        <div className="group">
                          <Link to={`/listing?type=${type.replace("-details", "")}&psu=${corp.title}`}>
                            <div className="!flex !flex-col !justify-center !items-center !text-center h-full">
                              <img
                                src={corpImg || "/placeholder.svg"}
                                alt={item}
                                className="border-2 border-gray-300 rounded-full h-full aspect-square w-full max-w-[80px] sm:max-w-[100px] md:max-w-[120px] lg:max-w-20 xl:max-w-20"
                              />
                              <h1 className="!py-2 !text-gray-700 !font-medium !text-sm sm:!text-base">{item}</h1>
                            </div>
                          </Link>
                        </div>
                      </SwiperSlide>
                    )
                  })}
                </Swiper>
              </div>
            )}

            {/* Brands Section */}
            {props.details?.brands && (
              <div className="!py-4 border border-gray-200 !p-4 rounded-md my-5 mx-4 lg:mx-0">
                <h1 className="!text-2xl !font-semibold">Brands</h1>

                <Swiper
                  modules={[Navigation, Pagination, Autoplay, A11y]}
                  slidesPerView={6}
                  loop={true}
                  navigation
                  autoplay={{ delay: 10000 }}
                  breakpoints={{
                    0: {
                      slidesPerView: 2,
                    },
                    520: {
                      slidesPerView: 2,
                    },
                    768: {
                      slidesPerView: 2,
                    },
                    1024: {
                      slidesPerView: 5,
                    },
                  }}
                  className="!mt-0"
                >
                  {props.details.brands?.map((item, index) => {
                    const brand = brands.find((b) => b.title === item) // Find instead of filter
                    const brandImg = brand?.image // Get the image
                    const bProperty = brand.objectProperty

                    return (
                      <SwiperSlide key={index} className="!mt-4">
                        <div className="group">
                          <Link to={`/listing?type=${type.replace("-details", "")}&brands=${item}`}>
                            <div className="!flex !flex-col mx-1 !justify-center !items-center !text-center h-full">
                              <img
                                src={brandImg || "/placeholder.svg"}
                                alt={item}
                                className={`rounded-full aspect-square border-2 border-gray-300 ${bProperty} shadw-md shadow-[rgba(45,45,51,0.08)] w-full max-w-[80px] sm:max-w-[100px] md:max-w-[120px] lg:max-w-xl xl:max-w-2xl`}
                              />
                              {/* <h1 className="!py-2 !text-gray-700 !font-medium !text-sm sm:!text-base">
                                {item}
                              </h1> */}
                            </div>
                          </Link>
                        </div>
                      </SwiperSlide>
                    )
                  })}
                </Swiper>
              </div>
            )}

            {/* Specialities Section */}
            {props.details?.specialities && (
              <div className="!py-4 border border-gray-200 !p-4 rounded-md mt-5 mx-4 lg:mx-0">
                <h1 className="!text-2xl !font-semibold">Specialities</h1>
                <div className="!flex !flex-wrap !gap-3 !py-5">
                  {props.details.specialities?.map((speciality, index) => (
                    <Link key={index} to={`/listing?type=${type.replace("-details", "")}&specialities=${speciality}`}>
                      <button className="!bg-gray-200 !px-4 !py-2 !rounded-full !text-sm !text-gray-700 hover:!bg-gray-200 !transition">
                        {speciality}
                      </button>
                    </Link>
                  ))}

                  {!showAllSpecialities && (
                    <button
                      className="!bg-cyan-600 !px-4 !py-2 !rounded-full !text-white !text-sm !font-medium hover:!bg-cyan-700 !transition"
                      onClick={() => setShowAllSpecialities(true)}
                    >
                      More
                    </button>
                  )}
                  {showAllSpecialities && (
                    <button
                      className="!bg-cyan-600 !px-4 !py-2 !rounded-full !text-white !text-sm !font-medium hover:!bg-cyan-700 !transition"
                      onClick={() => setShowAllSpecialities(false)}
                    >
                      Show Less
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Insurance Section */}
            {props.details?.insurance && (
              <div className="!py-4 border border-gray-200 !p-4 rounded-md my-5 mx-4 lg:mx-0">
                <h1 className="!text-2xl !font-semibold">Insurance</h1>

                <Swiper
                  modules={[Navigation, Pagination, Autoplay, A11y]}
                  slidesPerView={6}
                  loop={true}
                  navigation
                  autoplay={{ delay: 10000 }}
                  breakpoints={{
                    0: {
                      slidesPerView: 2,
                    },
                    520: {
                      slidesPerView: 2,
                    },
                    768: {
                      slidesPerView: 2,
                    },
                    1024: {
                      slidesPerView: 5,
                    },
                  }}
                  className="!mt-0"
                >
                  {props.details.insurance?.map((item, index) => {
                    const ins = insurances.find((i) => i.title === item) // Find instead of filter
                    const insImg = ins?.image // Get the image
                    const bgColor = ins?.bgColor

                    return (
                      <SwiperSlide key={index} className="!mt-4">
                        <div className="group">
                          <Link to={`/listing?type=${type.replace("-details", "")}&insurance=${item}`}>
                            <div className="!flex flex-col mx-1 !justify-center !items-center !text-center h-full">
                              <img
                                src={insImg || "/placeholder.svg"}
                                alt={item}
                                className={`rounded-[10px] ${bgColor} aspect-[4.2/3] shadow-md shadow-[rgba(45,45,51,0.08)] w-full max-w-[80px] sm:max-w-[100px] md:max-w-[120px] lg:max-w-xl xl:max-w-2xl`}
                              />
                              <h1 className="!py-2 !text-gray-700 !font-medium !text-sm sm:!text-base">{item}</h1>
                            </div>
                          </Link>
                        </div>
                      </SwiperSlide>
                    )
                  })}
                </Swiper>
              </div>
            )}

            {/* TPA Section */}
            {props.details?.tpa && (
              <div className="!py-4 border border-gray-200 !p-4 rounded-md my-5 mx-4 lg:mx-0">
                <h1 className="!text-2xl !font-semibold">TPA</h1>

                <Swiper
                  modules={[Navigation, Pagination, Autoplay, A11y]}
                  slidesPerView={6}
                  loop={true}
                  navigation
                  autoplay={{ delay: 10000 }}
                  breakpoints={{
                    0: {
                      slidesPerView: 2,
                    },
                    520: {
                      slidesPerView: 2,
                    },
                    768: {
                      slidesPerView: 2,
                    },
                    1024: {
                      slidesPerView: 5,
                    },
                  }}
                  className="!mt-0"
                >
                  {props.details.tpa?.map((item, index) => {
                    const t = tpas.find((i) => i.title === item) // Find instead of filter
                    const tImg = t?.image // Get the image
                    const bgColor = t?.bgColor

                    return (
                      <SwiperSlide key={index} className="!mt-4">
                        <div className="group">
                          <Link to={`/listing?type=${type.replace("-details", "")}&tpa=${item}`}>
                            <div className="!flex !flex-col mx-1 !justify-center !items-center !text-center h-full">
                              <img
                                src={tImg || "/placeholder.svg"}
                                alt={item}
                                className={`rounded-[10px] ${bgColor} aspect-[4.2/3] shadow-md shadow-[rgba(45,45,51,0.08)] w-full max-w-[80px] sm:max-w-[100px] md:max-w-[120px] lg:max-w-xl xl:max-w-2xl`}
                              />
                              <h1 className="!py-2 !text-gray-700 !font-medium !text-sm sm:!text-base">{item}</h1>
                            </div>
                          </Link>
                        </div>
                      </SwiperSlide>
                    )
                  })}
                </Swiper>
              </div>
            )}
          </ScrollArea>
        </div>

        {/* Right Side */}
        <div className="lg:!col-span-4 xl:!col-span-4 !py-5 px-4 lg:px-0">
          <div className="!flex !flex-col !justify-center !space-y-6">
            {/* Contact And Address Details */}
            <div className="!flex !flex-col !space-y-4 !p-4 !rounded-sm border">
              {/* Phone  */}
              {props.phones?.map((number) => (
                <div key={number} className="!grid !grid-cols-12 !items-start">
                  <FaPhone className="!col-span-2 sm:!col-span-1 lg:!col-span-2 !h-6 !w-6 !mt-1" />
                  <span className="!col-span-10 sm:!col-span-11 lg:!col-span-10 !text-xl lg:!text-xl">{number}</span>
                </div>
              ))}

              {/* Location  */}
              <div className="!grid !grid-cols-12 !items-start">
                <FaLocationDot className="!col-span-2 sm:!col-span-1 lg:!col-span-2 !h-6 !w-6 !mt-0.5 !text-red-600" />
                <span className="!col-span-10 sm:!col-span-11 lg:!col-span-10 text-balance">
                  {props.details.address?.street}, {props.details.address?.landmark} {props.details.address?.city},{" "}
                  {props.details.address?.state} - {props.details.address?.zipCode}
                </span>
              </div>

              {/* Website  */}
              <div className="!grid !grid-cols-12 !items-center">
                <FaGlobeAmericas className="!col-span-2 sm:!col-span-1 lg:!col-span-2 !h-6 !w-6 !mt-0.5 !text-blue-500" />
                <span className="!col-span-10 sm:!col-span-11 lg:!col-span-10 !text-md break-words">
                  {props.details.website}
                </span>
              </div>
            </div>

            {/* Map Location  */}
            <div>
              <h1 className="!text-2xl !font-semibold">Map</h1>
              <iframe
                className="!my-3 !w-full !rounded-sm !h-[250px] sm:!h-[400px] md:!h-[500px] lg:!h-[300px] xl:!h-[280px]"
                src={`https://www.google.com/maps?q=${props.details.address?.street},
                ${props.details.address?.landmark}${props.details.address?.city},
                ${props.details.address?.state} - ${props.details.address?.zipCode}&output=embed`}
                width=""
                height=""
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}