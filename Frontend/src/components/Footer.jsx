import { Link } from "react-router-dom";
import { Facebook, Instagram, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

function Footer() {
  const path = import.meta.env.VITE_APP_IMG_URL;

  // const footerSections = [
  //   {
  //     title: "Quick Links",
  //     links: [
  //       { name: "Home", href: "/" },
  //       { name: "About Us", href: "/about" },
  //       { name: "Our Services", href: "/services" },
  //       { name: "Speciality Centres", href: "/speciality-centres" },
  //       { name: "Therapies", href: "/therapies" },
  //       { name: "Corporates", href: "/corporates" },
  //       { name: "FAQs", href: "/faqs" },
  //       { name: "Contact", href: "/contact" },
  //     ],
  //   },
  //   {
  //     title: "Healthcare Services",
  //     links: [
  //       { name: "Hospitals", href: "/hospitals" },
  //       { name: "Dialysis Center", href: "/dialysis" },
  //       { name: "Blood Bank", href: "/blood-bank" },
  //       { name: "Clinics", href: "/clinics" },
  //       { name: "Home Care", href: "/home-care" },
  //       { name: "Transport", href: "/transport" },
  //       { name: "Diagnostics", href: "/diagnostics" },
  //       { name: "Get Financial Help", href: "/financial-help" },
  //     ],
  //   },
  //   {
  //     title: "Sort By Specialist",
  //     links: [
  //       { name: "Organ Transplant Centres", href: "/organ-transplant" },
  //       { name: "Eye Care Centres", href: "/eye-care" },
  //       { name: "Pediatric Centres", href: "/pediatric" },
  //       { name: "Heart Care Centres", href: "/heart-care" },
  //       { name: "Skincare Centres", href: "/skincare" },
  //       { name: "Test Tube Baby Centres", href: "/test-tube-baby" },
  //       { name: "Kidney care Centres", href: "/kidney-care" },
  //       { name: "Cancer Care Centres", href: "/cancer-care" },
  //     ],
  //   },
  //   {
  //     title: "Health Concern",
  //     links: [
  //       { name: "Depression Anxiety", href: "/depression-anxiety" },
  //       { name: "Pregnant", href: "/pregnant" },
  //       { name: "Joint Pains", href: "/joint-pains" },
  //       { name: "Ear Problems", href: "/ear-problems" },
  //       { name: "Digestion Issues", href: "/digestion-issues" },
  //     ],
  //   },
  //   {
  //     title: "Diagnostic Centres",
  //     links: [
  //       { name: "Xray", href: "/xray" },
  //       { name: "MRI", href: "/mri" },
  //       { name: "Sonography", href: "/sonography" },
  //       { name: "Pathology", href: "/pathology" },
  //       { name: "CT Scan", href: "/ct-scan" },
  //       { name: "2D Echo", href: "/2d-echo" },
  //     ],
  //   },
  // ]

  // const socialLinks = [
  //   { name: "Facebook", href: "https://facebook.com", icon: FaFacebookF },
  //   { name: "YouTube", href: "https://youtube.com", icon: FaYoutube },
  //   { name: "Twitter", href: "https://twitter.com", icon: FaTwitter },
  // ]

  const cities = [
    "Bangalore",
    "Chandigarh",
    "Delhi NCR",
    "Goa",
    "Hyderabad",
    "Mumbai",
    "Pune",
  ];

  const footerLinks = [
    { name: "About Us", href: "/about" },
    { name: "FAQs", href: "/faqs" },
    { name: "Contact Us", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy" },
  ];

  return (
    <footer className="bg-[#0580c4] text-white">
      {/* <div className="container mx-auto px-4 py-12">
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
      </div> */}

      <div className="container mx-auto px-4 text-center py-5">

        <div className="mb-4">
            <img
              src={path + "HCN-white-logo.png" || "/placeholder.svg"}
              alt="Healthcare Nation Logo"
              className="mx-auto h-16 w-auto"
            />
          </div>

        <div className="space-y-4 mb-6">
          <div className="flex flex-col items-center gap-2">
            <Link
              href="mailto:contact@sunsetcinemaclub.in"
              className="hover:text-white/80 transition-colors"
            >
              For Customer Queries: contact@sunsetcinemaclub.in
            </Link>
            <Link
              href="tel:022-48930438"
              className="hover:text-white/80 transition-colors"
            >
              022-48930438
            </Link>
          </div>

          <div>
            <p className="mb-2">Catch Our Screenings in</p>
            <p className="flex flex-wrap justify-center gap-2">
              {cities.map((city, index) => (
                <span key={city}>
                  {city}
                  {index < cities.length - 1 && " |"}
                </span>
              ))}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <nav className="mb-6 justify-start">
            <ul className="flex flex-wrap justify-start gap-x-2 gap-y-0">
              {footerLinks.map((link, index) => (
                <li key={link.name}>
                  {index > 0 && <span className="mr-4">|</span>}
                  <Link
                    href={link.href}
                    className="hover:text-white/80 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <p className="text-sm justify-center">
            Copyright © {new Date().getFullYear()}, Healthcare Nation. All
            rights reserved.
          </p>

          <div className="flex justify-end gap-4 mb-4">
            <Link
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook className="h-5 w-5 hover:text-white/80 transition-colors" />
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="h-5 w-5 hover:text-white/80 transition-colors" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
