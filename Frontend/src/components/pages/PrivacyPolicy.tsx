import React from 'react'

function PrivacyPolicy() {
  return (

    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">

        <div className="w-full flex justify-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
            <div className="w-2/3 h-1 bg-blue-500 mx-auto"></div>
          </div>
        </div>

        {/* Introduction Section */}
        <div className="mb-12">
          <p className="text-gray-700 leading-relaxed">
            Welcome to HealthcareNation! Your privacy is important to us. This Privacy Policy explains how we collect,
            use, store, and protect your personal information when you use our website and services.
          </p>
        </div>

        {/* Section 1: Information We Collect */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
          <p className="text-gray-700 mb-4">We collect the following types of information:</p>

          <h3 className="text-xl font-semibold text-gray-900 mb-2">1.1 Personal Information</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
            <li>Name, email address and location (if provided)</li>
            <li>Information you provide when submitting reviews</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mb-2">1.2 Non-Personal Information</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>IP address, browser type, and device information</li>
            <li>Cookies and tracking technologies to improve user experience</li>
            <li>Usage data, such as pages visited and interactions with our website</li>
          </ul>
        </section>

        {/* Section 2: How We Use Your Information */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
          <p className="text-gray-700 mb-2">We use the collected information for:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Connecting users with healthcare services</li>
            <li>Improving our website and user experience</li>
            <li>Sending important updates and service-related communications</li>
            <li>Responding to user inquiries and support requests</li>
            <li>Ensuring website security and fraud prevention</li>
          </ul>
        </section>

        {/* Section 3: How We Share Your Information */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Share Your Information</h2>
          <p className="text-gray-700 mb-2">
            We do not sell or rent your personal information. However, we may share information with:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Healthcare Providers</li>
            <li>Third-Party Service Providers: For website hosting, analytics, and security purposes</li>
            <li>Legal Authorities: If required by law to comply with regulations or protect rights</li>
          </ul>
        </section>

        {/* Section 4: Cookies & Tracking Technologies */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Cookies & Tracking Technologies</h2>
          <p className="text-gray-700">
            We use cookies to enhance user experience, analyze site traffic, and personalize content. You can manage or
            disable cookies in your browser settings.
          </p>
        </section>

        {/* Section 5: Data Security */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Security</h2>
          <p className="text-gray-700">
            We implement security measures to protect your data from unauthorized access or disclosure. However, no
            online platform is 100% secure, so we encourage users to take precautions when sharing personal information.
          </p>
        </section>

        {/* Section 6: Your Rights & Choices */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Rights & Choices</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Access & Update: You can review or update your personal information at any time.</li>
            <li>Opt-Out: You can unsubscribe from marketing emails.</li>
            <li>Data Deletion: You may request the deletion of your account and personal data.</li>
          </ul>
        </section>

        {/* Section 7: Third-Party Links */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Third-Party Links</h2>
          <p className="text-gray-700">
            Our website may contain links to third-party websites. We are not responsible for their privacy practices,
            so we encourage users to review their policies.
          </p>
        </section>

        {/* Section 8: Updates to This Policy */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Updates to This Policy</h2>
          <p className="text-gray-700">
            We may update this Privacy Policy from time to time. Any changes will be posted on this page with the
            updated date.
          </p>
        </section>

        {/* Section 9: Contact Us */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Contact Us</h2>
          <p className="text-gray-700 mb-4">
            For any questions or concerns about this Privacy Policy, please contact us at:
          </p>
          <p className="text-blue-600 font-medium">Email: info.healthcarenation@gmail.com</p>
        </section>

        {/* Closing Statement */}
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
          <p className="text-gray-800">
            By using HealthcareNation, you agree to this Privacy Policy. If you do not agree, please discontinue using
            our services.
          </p>
        </div>
      </div>
    </div>

  )
}

export default PrivacyPolicy;