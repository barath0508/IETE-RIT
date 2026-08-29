import React, { useEffect } from 'react';
import { SITE_CONFIG } from '../data/siteConfig';

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  imageUrl?: string;
  imageAlt?: string;
  type?: 'website' | 'article';
  articleData?: {
    publishedTime?: string;
    modifiedTime?: string;
    authorName?: string;
    section?: string;
    tags?: string[];
    headline?: string;
    fullReport?: string[];
  };
  breadcrumbs?: Array<{ name: string; item: string }>;
}

export const SEO: React.FC<SEOProps> = ({
  title = "RIT IETE | IETE Student Forum (ISF) - Rajalakshmi Institute of Technology, Chennai",
  description = "Official website of RIT IETE Student Forum (ISF) at Rajalakshmi Institute of Technology (RIT), Chennai. Explore national technical workshops, Energize 2026 hackathons, Silicon Maze competitions, robotics, IoT, VLSI design, semiconductor tech, and research paper publication initiatives.",
  keywords = "RIT IETE, IETE RIT, IETE ISF RIT, RIT Chennai IETE, IETE Student Forum, Institution of Electronics and Telecommunication Engineers, Rajalakshmi Institute of Technology, RIT Chennai, Department of ECE RIT, Department of VLSI Design, Silicon Maze 2026, Research Articulation Workshop, Energize 2026 Hackathon, Vision of Skill 2026, Digital Twin of Everything, Robotics, IoT Workshops, Embedded Systems, VLSI Design, FPGA Programming",
  canonicalUrl = "https://iete-rit.vercel.app/",
  imageUrl = "https://iete-rit.vercel.app/iete-logo.png",
  imageAlt = "RIT IETE Student Forum Official Chapter Emblem",
  type = "website",
  articleData,
  breadcrumbs
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

    // Update standard & SEO meta tags
    setMetaTag('name', 'title', title);
    setMetaTag('name', 'description', description);
    setMetaTag('name', 'keywords', keywords);

    // Open Graph / Social Tags
    setMetaTag('property', 'og:type', type);
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:image', imageUrl);
    setMetaTag('property', 'og:image:secure_url', imageUrl);
    setMetaTag('property', 'og:image:alt', imageAlt);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:site_name', 'RIT IETE Student Forum (ISF) - Rajalakshmi Institute of Technology');
    setMetaTag('property', 'og:locale', 'en_US');

    // Article-specific Open Graph tags
    if (type === 'article' && articleData) {
      if (articleData.publishedTime) {
        setMetaTag('property', 'article:published_time', articleData.publishedTime);
      }
      if (articleData.modifiedTime) {
        setMetaTag('property', 'article:modified_time', articleData.modifiedTime);
      }
      if (articleData.section) {
        setMetaTag('property', 'article:section', articleData.section);
      }
      if (articleData.authorName) {
        setMetaTag('property', 'article:author', articleData.authorName);
      }
      if (articleData.tags && articleData.tags.length > 0) {
        setMetaTag('property', 'article:tag', articleData.tags.join(', '));
      }
    }

    // Twitter Card Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:site', '@iete_isf_rit');
    setMetaTag('name', 'twitter:creator', '@iete_isf_rit');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', imageUrl);
    setMetaTag('name', 'twitter:image:alt', imageAlt);

    // Update Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // Build Structured JSON-LD Data Schemas
    const schemas: any[] = [
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
        "image": "https://iete-rit.vercel.app/iete-logo.png",
        "description": "Official student forum of The Institution of Electronics and Telecommunication Engineers (IETE) at Rajalakshmi Institute of Technology, Chennai.",
        "foundingDate": SITE_CONFIG.foundedYear,
        "parentOrganization": {
          "@type": "Organization",
          "name": "Institution of Electronics and Telecommunication Engineers (IETE) Chennai Centre",
          "url": "https://iete-rit.vercel.app"
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
          "contactType": "Student Affairs & Faculty Coordination",
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

      // 2. WebSite Schema
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "https://iete-rit.vercel.app/#website",
        "url": "https://iete-rit.vercel.app/",
        "name": "IETE Student Forum - RIT Official Portal",
        "description": description,
        "publisher": {
          "@id": "https://iete-rit.vercel.app/#organization"
        },
        "inLanguage": "en-US",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://iete-rit.vercel.app/?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      }
    ];

    // 3. Breadcrumb Schema
    const breadcrumbItems = breadcrumbs || [
      { name: "Home", item: "https://iete-rit.vercel.app/#home" },
      { name: "About ISF", item: "https://iete-rit.vercel.app/#about" },
      { name: "Vision & Mission", item: "https://iete-rit.vercel.app/#vision" },
      { name: "Membership Benefits", item: "https://iete-rit.vercel.app/#benefits" },
      { name: "Office Bearers", item: "https://iete-rit.vercel.app/#members" },
      { name: "Upcoming Events", item: "https://iete-rit.vercel.app/#events" },
      { name: "Activities & Timeline", item: "https://iete-rit.vercel.app/#activities" },
      { name: "Event Blog & Reports", item: "https://iete-rit.vercel.app/#blog" },
      { name: "3D Photo Globe", item: "https://iete-rit.vercel.app/#photo-globe" },
      { name: "Moments Gallery", item: "https://iete-rit.vercel.app/#gallery" },
      { name: "FAQs", item: "https://iete-rit.vercel.app/#faqs" },
      { name: "Contact", item: "https://iete-rit.vercel.app/#contact" }
    ];

    schemas.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbItems.map((bc, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "name": bc.name,
        "item": bc.item
      }))
    });

    // 4. Conditional Page-Specific Schemas
    if (type === 'article' && articleData) {
      // Blog Posting / Article Schema
      schemas.push({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "@id": `${canonicalUrl}#article`,
        "headline": articleData.headline || title,
        "name": articleData.headline || title,
        "description": description,
        "articleSection": articleData.section || "Technical Events",
        "datePublished": articleData.publishedTime || "2026-08-24T09:00:00+05:30",
        "dateModified": articleData.modifiedTime || articleData.publishedTime || "2026-08-26T12:00:00+05:30",
        "author": {
          "@type": "Organization",
          "name": articleData.authorName || "IETE Student Forum (ISF) - RIT",
          "url": "https://iete-rit.vercel.app/"
        },
        "publisher": {
          "@id": "https://iete-rit.vercel.app/#organization"
        },
        "image": imageUrl,
        "url": canonicalUrl,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": canonicalUrl
        },
        "inLanguage": "en-US",
        "keywords": keywords,
        ...(articleData.fullReport && {
          "articleBody": articleData.fullReport.join(' ')
        })
      });
    } else {
      // FAQ Page Schema on website pages for Google rich FAQ snippets
      schemas.push({
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
      });
    }

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
  }, [title, description, keywords, canonicalUrl, imageUrl, imageAlt, type, articleData, breadcrumbs]);

  return null; // Side-effect component
};

