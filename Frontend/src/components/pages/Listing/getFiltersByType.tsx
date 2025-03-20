import servicesByAccrediations from "@/data/accrediations";
import servicesBySpecialities from "@/data/servicesBySpecialities";
import publicSectorCorporates from "@/data/publicSector";
import popularBrands from "@/data/brands";
import diagnosticCentres from "@/data/diagnostic";
import chooseYourHealthInsurance from "@/data/healthInsurance";
import chooseYourTPA from "@/data/tpa";
import alternativeMedicine from "@/data/alternativeMedicine";
import servicesByHealthConcern from "@/data/healthConcern";


export const getFiltersByType = (type: string | null) => {
  // Base filters that appear for all facility types
  const baseFilters = [
    {
      title: "Saved",
      filterType: "saved",
      options: [{ id: "Saved", text: "Saved" }],
    },
    {
      title: "Sort By",
      filterType: "sortBy",
      options: [
        { id: "relevance", text: "Relevance" },
        { id: "rating", text: "Ratings: High to Low" },
        { id: "reviews", text: "Reviews: High to Low" },
      ],
    },
    {
      title: "Ownership",
      filterType: "ownership",
      options: [
        { id: "PRIVATE", text: "Private" },
        { id: "GOVERNMENT", text: "Government" },
      ],
    },
    {
      title: "Brands",
      filterType: "brands",
      options: popularBrands.map((brand) => ({
        id: brand.title,
        text: brand.title,
      })),
    },
  ];

  const hospitalFilters = [
    {
        title: "Specialities",
        filterType: "specialities",
        options: servicesBySpecialities.map((spec) => ({
          id: spec.title,
          text: spec.title,
        })),
      },
      {
        title: "Diagnostics",
        filterType: "diagnostics",
        options: diagnosticCentres.map((diag) => ({
          id: diag.title,
          text: diag.title,
        })),
      },
      {
          title: "Corporates",
          filterType: "psu",
          options: publicSectorCorporates.map((psu) => ({
            id: psu.title,
            text: psu.title,
          })),
      },
      {
          title: "Accreditation",
          filterType: "accrediation",
          options: [
            {
              id: "Organizations Accredited by National Accreditation Board for Hospitals & Healthcare Providers",
              text: "NABH",
              count: 34,
            },
            {
              id: "Organizations accredited by National Accreditation Board for Laboratories",
              text: "NABL",
              count: 20,
            },
            {
              id: "Organizations Accredited by Joint Commission International",
              text: "JCI",
              count: 16,
            },
          ],
      },
      {
          title:"Health Concern",
          filterType:"healthConcern",
          options: servicesByHealthConcern.map((hc) => ({
              id: hc.title,
              text: hc.title,
              })),
      },
      {
          title:"Insurance",
          filterType:"insurance",
          options: chooseYourHealthInsurance.map((hc) => ({
              id: hc.title,
              text: hc.title,
              })),
      },
      {
          title:"TPA",
          filterType:"tpa",
          options: chooseYourTPA.map((tpa) => ({
              id: tpa.title,
              text: tpa.title,
              })),
      }
  ];

  // Type-specific filters
  switch (type) {
    case "hospitals":
      return [
        ...baseFilters,
        ...hospitalFilters


      ];
    case "clinics":
      return [...baseFilters,
        ...hospitalFilters,
        {
            title: "Alternative Medicine",
            filterType: "altMed",
            options: alternativeMedicine.map((altMed) => ({
              id: altMed.title,
              text: altMed.title,
            })),
          },

      ];
    case "banks":
      return [...baseFilters,
        {
            title: "Accreditation",
            filterType: "accrediation",
            options: [
              {
                id: "Organizations Accredited by National Accreditation Board for Hospitals & Healthcare Providers",
                text: "NABH",
                count: 34,
              },
              {
                id: "Organizations accredited by National Accreditation Board for Laboratories",
                text: "NABL",
                count: 20,
              },
              {
                id: "Organizations Accredited by Joint Commission International",
                text: "JCI",
                count: 16,
              },
            ],
        },
      ];
    case "homecare": return [...baseFilters,];
    case "transport": return [...baseFilters,];
    case "diagnostics": return [...baseFilters,
        {
            title: "Diagnostics",
            filterType: "diagnostics",
            options: diagnosticCentres.map((diag) => ({
              id: diag.title,
              text: diag.title,
            })),
        },
        {
            title: "Corporates",
            filterType: "psu",
            options: publicSectorCorporates.map((psu) => ({
              id: psu.title,
              text: psu.title,
            })),
        },
        {
            title: "Accreditation",
            filterType: "accrediation",
            options: [
              {
                id: "Organizations Accredited by National Accreditation Board for Hospitals & Healthcare Providers",
                text: "NABH",
                count: 34,
              },
              {
                id: "Organizations accredited by National Accreditation Board for Laboratories",
                text: "NABL",
                count: 20,
              },
              {
                id: "Organizations Accredited by Joint Commission International",
                text: "JCI",
                count: 16,
              },
            ],
        },
        {
            title:"Insurance",
            filterType:"insurance",
            options: chooseYourHealthInsurance.map((hc) => ({
                id: hc.title,
                text: hc.title,
                })),
        },
        {
            title:"TPA",
            filterType:"tpa",
            options: chooseYourTPA.map((tpa) => ({
                id: tpa.title,
                text: tpa.title,
                })),
        }
    ];
    case "op": return [...baseFilters,];
    }

  return baseFilters;
};
