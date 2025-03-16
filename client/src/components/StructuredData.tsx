
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface FinancialToolData {
  name: string;
  description: string;
  providerName: string;
  providerUrl: string;
  category: string;
}

export function FinancialToolStructuredData({
  name,
  description,
  providerName,
  providerUrl,
  category
}: FinancialToolData) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    'name': name,
    'description': description,
    'provider': {
      '@type': 'Organization',
      'name': providerName,
      'url': providerUrl
    },
    'category': category
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
}

interface BreadcrumbItem {
  name: string;
  item: string;
}

export function BreadcrumbStructuredData({
  items
}: {
  items: BreadcrumbItem[]
}) {
  const itemListElement = items.map((item, index) => ({
    '@type': 'ListItem',
    'position': index + 1,
    'name': item.name,
    'item': `https://colombostockexchange.info${item.item}`
  }));

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': itemListElement
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
}
import { Helmet } from "react-helmet-async";

interface BreadcrumbItem {
  name: string;
  item: string;
}

interface BreadcrumbStructuredDataProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbStructuredData({ items }: BreadcrumbStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${window.location.origin}${item.item}`
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
}
