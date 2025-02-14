import { Link } from "react-router-dom"
import { FaFacebookF, FaYoutube, FaTwitter } from "react-icons/fa"

function Footer() {
  const path = import.meta.env.VITE_APP_IMG_URL

  const footerSections = [
    {
      title: "Quick Links",
      links: [
        { name: "Home", href: "/" },
        { name: "About Us", href: "/about" },
        { name: "Our Services", href: "/services" },
        { name: "Speciality Centres", href: "/speciality-centres" },
        { name: "Therapies", href: "/therapies" },
        { name: "Corporates", href: "/corporates" },
        { name: "FAQs", href: "/faqs" },
        { name: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Healthcare Services",
      links: [
        { name: "Hospitals", href: "/hospitals" },
        { name: "Dialysis Center", href: "/dialysis" },
        { name: "Blood Bank", href: "/blood-bank" },
        { name: "Clinics", href: "/clinics" },
        { name: "Home Care", href: "/home-care" },
        { name: "Transport", href: "/transport" },
        { name: "Diagnostics", href: "/diagnostics" },
        { name: "Get Financial Help", href: "/financial-help" },
      ],
    },
    {
      title: "Sort By Specialist",
      links: [
        { name: "Organ Transplant Centres", href: "/organ-transplant" },
        { name: "Eye Care Centres", href: "/eye-care" },
        { name: "Pediatric Centres", href: "/pediatric" },
        { name: "Heart Care Centres", href: "/heart-care" },
        { name: "Skincare Centres", href: "/skincare" },
        { name: "Test Tube Baby Centres", href: "/test-tube-baby" },
        { name: "Kidney care Centres", href: "/kidney-care" },
        { name: "Cancer Care Centres", href: "/cancer-care" },
      ],
    },
    {
      title: "Health Concern",
      links: [
        { name: "Depression Anxiety", href: "/depression-anxiety" },
        { name: "Pregnant", href: "/pregnant" },
        { name: "Joint Pains", href: "/joint-pains" },
        { name: "Ear Problems", href: "/ear-problems" },
        { name: "Digestion Issues", href: "/digestion-issues" },
      ],
    },
    {
      title: "Diagnostic Centres",
      links: [
        { name: "Xray", href: "/xray" },
        { name: "MRI", href: "/mri" },
        { name: "Sonography", href: "/sonography" },
        { name: "Pathology", href: "/pathology" },
        { name: "CT Scan", href: "/ct-scan" },
        { name: "2D Echo", href: "/2d-echo" },
      ],
    },
  ]

  const socialLinks = [
    { name: "Facebook", href: "https://facebook.com", icon: FaFacebookF },
    { name: "YouTube", href: "https://youtube.com", icon: FaYoutube },
    { name: "Twitter", href: "https://twitter.com", icon: FaTwitter },
  ]

  return (
    <footer className="bg-[#0580c4] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {footerSections.map((section, index) => (
            <div key={index} className="mb-8">
              <h3 className="font-bold text-lg mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link to={link.href} className="hover:text-gray-300 transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="mb-8">
            <h3 className="font-bold text-lg mb-4">Social</h3>
            <ul className="space-y-2">
              {socialLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center hover:text-gray-300 transition-colors"
                  >
                    <link.icon className="mr-2" /> {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="mb-4">
            <img
              src={path + "HCN-white-logo.png" || "/placeholder.svg"}
              alt="Healthcare Nation Logo"
              className="mx-auto h-16 w-auto"
            />
          </div>
          <p className="text-sm">Copyright © {new Date().getFullYear()}, Healthcare Nation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

