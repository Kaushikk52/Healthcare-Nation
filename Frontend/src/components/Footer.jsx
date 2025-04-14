import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, ArrowUp, Youtube } from "lucide-react";
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
    { name: "About Us", href: "/about-us" },
    { name: "Content Policy", href: "/content-policy" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms & Conditions", href: "/terms-and-conditions" },
    { name: "Contact Us", href: "/contact-us" },
    
  ];

  return (
    <>
    <footer className="w-full bg-[#0580c4] text-white">
      <div className="!max-w-7xl !mx-auto !px-4">
        <div className="mx-auto px-4 text-center py-0">
          <div className="mb-0">
            <img
              src={path + "white-logo.webp" || "/placeholder.svg"}
              loading="eager"
              alt="Healthcare Nation Logo"
              className="mx-auto h-28 w-auto"
            />
          </div>

          <div className="space-y-2 mb-2">
            <div className="flex flex-col items-center gap-8">
              <p className="font-sans font-medium">Empowering you with better healthcare choices</p>
              <div className="flex justify-center items-center text-center max-w-3xl">
                <div className="flex flex-col w-full items-center justify-center space-y-4 text-center md:flex-row md:justify-between md:items-center md:space-y-0">
                  <ul className="flex flex-wrap justify-center gap-x-2 gap-y-0">
                    {footerLinks.map((link, index) => (
                      <li key={link.name}>
                        {index > 0 && <span className="mr-4">|</span>}
                        <Link
                          to={link.href}
                          className="hover:text-white/80 transition-colors text-sm font-sans font-medium"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
      </div>

      <div className="w-full bg-[#0580c4] mt-2">
        <div className="!max-w-7xl mx-auto !py-4 flex justify-center items-center">
          <span className="text-white-600 text-center">
            By Continuing past this page, you agree to out Terms of Service,
            Cookie Policy, Privacy Policy and Content Policies. All trademarks
            are properties of their respective owners Copyright © 2025,
            Healthcare Nation. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
    </>
  );
}

export default Footer;
