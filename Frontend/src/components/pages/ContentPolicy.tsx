function ContentPolicy() {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-900 mb-8">Content Policy</h1>

        {/* Section 1: Introduction */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">1. Introduction</h2>
          <p className="text-gray-700 leading-relaxed">
            At <span className="font-semibold">HealthcareNation</span>, we are committed to providing accurate, reliable, and up-to-date healthcare information and listings of medical services in various cities in India.  
            This Content Policy outlines the guidelines we follow to maintain the quality and integrity of the information on our platform.
          </p>
        </section>

        {/* Section 2: Content Accuracy & Reliability */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">2. Content Accuracy & Reliability</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>
              All healthcare-related content is based on credible sources, including medical professionals, healthcare institutions, and government guidelines.
            </li>
            <li>
              We strive to keep our information updated, but healthcare practices and guidelines may change over time. Users are encouraged to verify details with healthcare providers.
            </li>
            <li>
              Any medical advice or treatment recommendations provided on HealthcareNation are for informational purposes only and should not be considered a substitute for professional medical consultation.
            </li>
          </ul>
        </section>

        {/* Section 3: User-Generated Content */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">3. User-Generated Content</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>
              Users can contribute reviews, ratings, and comments regarding healthcare services listed on our website.
            </li>
            <li>
              All user-generated content must be respectful, factual, and free from misleading, offensive, or defamatory language.
            </li>
            <li>
              We reserve the right to moderate, edit, or remove content that violates our policies.
            </li>
          </ul>
        </section>

        {/* Section 4: Prohibited Content */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">4. Prohibited Content</h2>
          <p className="text-gray-700 mb-2">
            We do not allow content that:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Promotes false or misleading healthcare claims.</li>
            <li>Encourages self-diagnosis or self-medication without professional guidance.</li>
            <li>Contains hate speech, discrimination, harassment, or offensive language.</li>
            <li>Promotes illegal or unapproved healthcare services.</li>
            <li>Involves spam, advertisements, or unauthorized promotions.</li>
          </ul>
        </section>

        {/* Section 5: Third-Party Links & Advertisements */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">5. Third-Party Links & Advertisements</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>
              HealthcareNation may feature third-party healthcare providers, advertisements, and affiliate links.
            </li>
            <li>
              We do not endorse or guarantee the accuracy of third-party content and encourage users to verify information before making healthcare decisions.
            </li>
          </ul>
        </section>

        {/* Section 6: Reporting & Content Removal */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">6. Reporting & Content Removal</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>
              If you find inaccurate, misleading, or inappropriate content on our website, please contact us.
            </li>
            <li>
              We will review reported content and take necessary action, including removal, if it violates our policies.
            </li>
          </ul>
        </section>

        {/* Section 7: Policy Updates */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">7. Policy Updates</h2>
          <p className="text-gray-700">
            This Content Policy may be updated periodically to reflect changes in healthcare regulations and industry best practices.  
            Continued use of HealthcareNation implies acceptance of any policy updates.
          </p>
        </section>

        {/* Section 8: Contact Us */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">8. Contact Us</h2>
          <p className="text-gray-700 mb-4">
            For any questions regarding our Content Policy, feel free to contact us at:
          </p>
          <p className="text-blue-600 font-medium">Email: info.healthcarenation@gmail.com</p>
        </section>

        {/* Closing Statement */}
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
          <p className="text-gray-800">
            By using HealthcareNation, you agree to this Content Policy. If you do not agree, please discontinue using our services.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ContentPolicy;
