export default function AboutUs() {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Us</h1>
          <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
        </div>
  
        {/* Introduction */}
        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-gray-700 leading-relaxed">
            Welcome to HealthcareNation, your trusted platform for discovering and accessing healthcare services across
            India. Our mission is to make quality healthcare easily accessible by connecting individuals with a vast
            network of hospitals, clinics, doctors, diagnostic centers, pharmacies, and wellness services—all in one
            place.
          </p>
        </div>
  
        {/* Who We Are Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Who We Are</h2>
          <p className="text-gray-700 leading-relaxed">
            HealthcareNation is a comprehensive healthcare directory designed to help patients and caregivers find the
            right medical services quickly and conveniently. Whether you need a specialist, emergency care, home
            healthcare, or alternative medicine options, we provide verified listings to ensure you make informed
            decisions about your health.
          </p>
        </div>
  
        {/* Our Vision Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
          <p className="text-gray-700 leading-relaxed">
            We envision a healthcare ecosystem where every individual can access the best medical services with ease. By
            leveraging technology, we aim to bridge the gap between healthcare providers and those seeking medical
            assistance.
          </p>
        </div>
  
        {/* Why Choose Us Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li className="leading-relaxed">
              <span className="font-semibold">Extensive Listings</span> – From top-tier hospitals to neighborhood clinics,
              we cover a wide range of healthcare providers.
            </li>
            <li className="leading-relaxed">
              <span className="font-semibold">Verified Information</span> – We ensure accuracy and reliability by listing
              only trusted healthcare services.
            </li>
            <li className="leading-relaxed">
              <span className="font-semibold">User-Friendly Search</span> – Our intuitive platform allows you to filter
              services based on location, specialization, and patient reviews.
            </li>
            <li className="leading-relaxed">
              <span className="font-semibold">Empowering Patients</span> – We provide valuable health-related resources to
              help you make well-informed decisions.
            </li>
          </ul>
        </div>
  
        {/* Closing Section */}
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 mb-12">
          <p className="text-gray-800 font-medium mb-4">
            At HealthcareNation, we are committed to simplifying healthcare access in India, ensuring that quality medical
            services are just a click away.
          </p>
          <h3 className="text-xl font-bold text-blue-700 mb-2">Join Us in Building a Healthier Nation!</h3>
          <p className="text-gray-700">
            Explore healthcare providers and stay informed with the latest in healthcare—because your well-being is our
            priority.
          </p>
        </div>
  
        {/* Call to Action */}
        {/* <div className="text-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
            Find Healthcare Services
          </button>
        </div> */}
      </div>
    )
  }
  
  