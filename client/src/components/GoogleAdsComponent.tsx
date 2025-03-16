import { useEffect, useRef } from "react";

interface GoogleAdsProps {
  client?: string;
  slot?: string;
  format?: string;
  responsive?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function GoogleAdsComponent({
  client = "ca-pub-xxxxxxxxxxxxxxxx", // Replace with actual client ID when available
  slot = "xxxxxxxxxx", // Replace with actual slot ID when available
  format = "auto",
  responsive = true,
  className = "",
  style = {},
}: GoogleAdsProps) {
  const adsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip loading ads during development to avoid console errors
    if (process.env.NODE_ENV === "development") {
      if (adsRef.current) {
        adsRef.current.innerHTML = '<div class="bg-gray-100 border border-gray-200 p-2 text-center text-xs text-gray-500 rounded">Google Ads Placeholder</div>';
      }
      return;
    }

    // Load Google Ads script only once
    const hasGoogleAdsScript = document.querySelector('script[src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]');
    
    if (!hasGoogleAdsScript) {
      const script = document.createElement('script');
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`;
      script.async = true;
      script.crossOrigin = "anonymous";
      document.head.appendChild(script);
    }

    // Create ad
    const adElement = document.createElement('ins');
    adElement.className = 'adsbygoogle';
    adElement.style.display = 'block';
    adElement.dataset.adClient = client;
    adElement.dataset.adSlot = slot;
    adElement.dataset.adFormat = format;
    
    if (responsive) {
      adElement.dataset.fullWidthResponsive = "true";
    }

    // Clear the container and append the ad
    if (adsRef.current) {
      adsRef.current.innerHTML = '';
      adsRef.current.appendChild(adElement);

      try {
        // Push the ad to Google
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.error('Error loading Google ad:', error);
      }
    }

    // Cleanup function
    return () => {
      if (adsRef.current) {
        adsRef.current.innerHTML = '';
      }
    };
  }, [client, slot, format, responsive]);

  return (
    <div 
      ref={adsRef} 
      className={`google-ads overflow-hidden ${className}`}
      style={style}
    />
  );
}