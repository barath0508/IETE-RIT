import React, { useEffect } from 'react';
import { SITE_CONFIG } from '../data/siteConfig';

interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  imageUrl?: string;
}

export const SEO: React.FC<SEOProps> = ({
  title = "RIT IETE | IETE Student Forum (ISF) - Rajalakshmi Institute of Technology, Chennai",
  description = "Official RIT IETE Student Forum (ISF) portal at Rajalakshmi Institute of Technology, Chennai. Explore national technical workshops, Energize 2026 hackathons, Silicon Maze competitions, IoT & VLSI design, and research publication initiatives.",
  canonicalUrl = "https://iete-rit.vercel.app/",
  imageUrl = "https://iete-rit.vercel.app/iete-logo.png"
}) => {
  useEffect(() => {
    // Dynamic document title
    document.title = title;

    // Structured JSON-LD Data Schemas
    const schemas = [
      // 1. Organization Schema
      {
        "@context": "https://schema.org",
        "@type": "EducationalOrganization",
        "@id": "https://iete-rit.vercel.app/#organization",
        "name": "RIT IETE Student Forum (ISF) - Rajalakshmi Institute of Technology",
        "alternateName": [
          "RIT IETE",
          "IETE RIT",
          "IETE ISF RIT",
          "ISF RIT",
          "RIT Chennai IETE",
          "IETE Rajalakshmi Institute of Technology",
          "RIT ECE IETE"
        ],
        "url": "https://iete-rit.vercel.app/",
        "logo": "https://iete-rit.vercel.app/iete-logo.png",
        "image": imageUrl,
        "description": description,
        "foundingDate": SITE_CONFIG.foundedYear,
        "parentOrganization": {
          "@type": "Organization",
          "name": "Institution of Electronics and Telecommunication Engineers (IETE) Chennai Center",
          "url": "https://iete.org"
        },
        "location": {
          "@type": "Place",
          "name": "Rajalakshmi Institute of Technology",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Kuthambakkam Post, Bengaluru Highway",
            "addressLocality": "Chennai",
            "addressRegion": "Tamil Nadu",
            "postalCode": "600124",
            "addressCountry": "IN"
          }
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": SITE_CONFIG.contact.facultyPhone,
          "email": SITE_CONFIG.contact.facultyEmail,
          "contactType": "Faculty Coordinator",
          "availableLanguage": ["English", "Tamil"]
        },
        "sameAs": [
          SITE_CONFIG.contact.socials.linkedin,
          SITE_CONFIG.contact.socials.instagram,
          SITE_CONFIG.contact.socials.facebook,
          SITE_CONFIG.contact.socials.youtube,
          SITE_CONFIG.contact.socials.github
        ]
      },

      // 2. WebSite & SearchAction Schema
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "https://iete-rit.vercel.app/#website",
        "url": "https://iete-rit.vercel.app/",
        "name": "IETE Student Forum - RIT Chapter",
        "description": description,
        "publisher": {
          "@id": "https://iete-rit.vercel.app/#organization"
        },
        "inLanguage": "en-US"
      },

      // 3. Breadcrumb Schema
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://iete-rit.vercel.app/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "About ISF",
            "item": "https://iete-rit.vercel.app/#about"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Upcoming Events",
            "item": "https://iete-rit.vercel.app/#events"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "Activities",
            "item": "https://iete-rit.vercel.app/#activities"
          },
          {
            "@type": "ListItem",
            "position": 5,
            "name": "Core Members",
            "item": "https://iete-rit.vercel.app/#members"
          },
          {
            "@type": "ListItem",
            "position": 6,
            "name": "Contact",
            "item": "https://iete-rit.vercel.app/#contact"
          }
        ]
      },

      // 4. FAQ Schema for Rich Google Snippets
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": SITE_CONFIG.faqs.map((faq) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      },

      // 5. Event Schema for Rich Event Snippets
      ...SITE_CONFIG.upcomingEvents.map((ev) => ({
        "@context": "https://schema.org",
        "@type": "Event",
        "name": ev.title,
        "description": ev.description,
        "startDate": "2026-08-13T09:00:00+05:30",
        "endDate": "2026-08-13T16:00:00+05:30",
        "eventStatus": "https://schema.org/EventScheduled",
        "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
        "location": {
          "@type": "Place",
          "name": `Room ${ev.venue}, ECE Block`,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Rajalakshmi Institute of Technology, Kuthambakkam Post",
            "addressLocality": "Chennai",
            "addressRegion": "Tamil Nadu",
            "postalCode": "600124",
            "addressCountry": "IN"
          }
        },
        "image": [ev.image],
        "organizer": {
          "@type": "Organization",
          "name": "IETE Student Forum RIT",
          "url": "https://iete-rit.vercel.app/"
        },
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock",
          "url": ev.registrationLink || "https://iete-rit.vercel.app/#events",
          "validFrom": "2026-08-01T00:00:00+05:30"
        }
      }))
    ];

    // Inject script tag for JSON-LD
    const scriptId = 'json-ld-structured-data';
    let scriptElement = document.getElementById(scriptId) as HTMLScriptElement;
    if (!scriptElement) {
      scriptElement = document.createElement('script');
      scriptElement.id = scriptId;
      scriptElement.type = 'application/ld+json';
      document.head.appendChild(scriptElement);
    }
    scriptElement.textContent = JSON.stringify(schemas);

    return () => {
      // Cleanup script element on unmount if needed
    };
  }, [title, description, canonicalUrl, imageUrl]);

  return null; // Side-effect component
};
