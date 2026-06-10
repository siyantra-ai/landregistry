import React, { useEffect } from 'react';

/**
 * SEO Component to dynamically update page titles, meta description, Open Graph tags,
 * and inject structured JSON-LD schemas.
 */
export default function SEO({ title, description, ogType = 'website', canonicalUrl, schemaJson }) {
  useEffect(() => {
    // 1. Update document title
    const fullTitle = `${title} | Land Registry Transfers UK`;
    document.title = fullTitle;

    // 2. Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // 3. Update OpenGraph tags
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', fullTitle);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute('content', description);

    let ogTypeMeta = document.querySelector('meta[property="og:type"]');
    if (!ogTypeMeta) {
      ogTypeMeta = document.createElement('meta');
      ogTypeMeta.setAttribute('property', 'og:type');
      document.head.appendChild(ogTypeMeta);
    }
    ogTypeMeta.setAttribute('content', ogType);

    // 4. Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    const currentHref = canonicalUrl || window.location.href;
    canonical.setAttribute('href', currentHref);

    // 5. Inject schema.org JSON-LD scripts
    const schemaScriptId = 'seo-jsonld-schema';
    let existingScript = document.getElementById(schemaScriptId);
    if (existingScript) {
      existingScript.remove();
    }

    if (schemaJson) {
      const script = document.createElement('script');
      script.id = schemaScriptId;
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schemaJson);
      document.head.appendChild(script);
    }

    // Cleanup script on unmount
    return () => {
      const script = document.getElementById(schemaScriptId);
      if (script) {
        script.remove();
      }
    };
  }, [title, description, ogType, canonicalUrl, schemaJson]);

  return null;
}
