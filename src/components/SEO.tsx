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
  description = "Official website of RIT IETE Student Forum (ISF) at Rajalakshmi Institute of Technology (RIT), Chennai. Explore national technical workshops, hackathons, competitions, robotics, IoT, VLSI design, semiconductor tech, and research paper publication initiatives.",
  canonicalUrl = "https://iete-rit.vercel.app/",
  imageUrl = "https://iete-rit.vercel.app/iete-logo.png"
}) => {
  useEffect(() => {
    // Dynamic document title
    document.title = title;

    // Helper to safely update or create meta tag
    const setMetaTag = (attrName: string, attrVal: string, content: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrVal}"]`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrVal);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Update standard & social meta tags
    setMetaTag('name', 'description', description);
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:image', imageUrl);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', imageUrl);

    // Update canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

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
          "RIT ECE IETE",
          "IETE Student Chapter RIT"
        ],
        "url": "https://iete-rit.vercel.app/",
        "logo": "https://iete-rit.vercel.app/iete-logo.png",
        "image": imageUrl,
        "description": description,
        "foundingDate": SITE_CONFIG.foundedYear,
        "parentOrganization": {
          "@type": "Organization",
          "name": "Institution of Electronics and Telecommunication Engineers (IETE) Chennai Centre",
          "url": "https://iete.org"
        },
        "location": {
          "@type": "Place",
          "name": "Rajalakshmi Institute of Technology",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Kuthambakkam Post, Poonamallee, Bengaluru Highway",
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
          SITE_CONFIG.contact.socials.whatsapp,
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
            "item": "https://iete-rit.vercel.app/#home"
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
            "name": "Vision & Mission",
            "item": "https://iete-rit.vercel.app/#vision"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "Membership Benefits",
            "item": "https://iete-rit.vercel.app/#benefits"
          },
          {
            "@type": "ListItem",
            "position": 5,
            "name": "Office Bearers",
            "item": "https://iete-rit.vercel.app/#members"
          },
          {
            "@type": "ListItem",
            "position": 6,
            "name": "Upcoming Events",
            "item": "https://iete-rit.vercel.app/#events"
          },
          {
            "@type": "ListItem",
            "position": 7,
            "name": "Activities & Timeline",
            "item": "https://iete-rit.vercel.app/#activities"
          },
          {
            "@type": "ListItem",
            "position": 8,
            "name": "Event Blog & Reports",
            "item": "https://iete-rit.vercel.app/#blog"
          },
          {
            "@type": "ListItem",
            "position": 9,
            "name": "3D Photo Globe",
            "item": "https://iete-rit.vercel.app/#photo-globe"
          },
          {
            "@type": "ListItem",
            "position": 10,
            "name": "Moments Gallery",
            "item": "https://iete-rit.vercel.app/#gallery"
          },
          {
            "@type": "ListItem",
            "position": 11,
            "name": "FAQs",
            "item": "https://iete-rit.vercel.app/#faqs"
          },
          {
            "@type": "ListItem",
            "position": 12,
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
      }
    ];

    // Inject or update script tag for JSON-LD
    const scriptId = 'json-ld-structured-data-dynamic';
    let scriptElement = document.getElementById(scriptId) as HTMLScriptElement;
    if (!scriptElement) {
      scriptElement = document.createElement('script');
      scriptElement.id = scriptId;
      scriptElement.type = 'application/ld+json';
      document.head.appendChild(scriptElement);
    }
    scriptElement.textContent = JSON.stringify(schemas);

    return () => {
      // Keep script updated cleanly
    };
  }, [title, description, canonicalUrl, imageUrl]);

  return null; // Side-effect component
};
