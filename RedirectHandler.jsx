import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getShortURL, saveShortURL } from '../utils/urlService';
import { logEvent } from '../utils/logger';

function RedirectHandler() {
  const { shortcode } = useParams();

  useEffect(() => {
    const urlObj = getShortURL(shortcode);
    if (!urlObj) {
      alert("Invalid shortcode");
      return;
    }

    if (Date.now() > urlObj.expiresAt) {
      alert("URL has expired");
      return;
    }

    urlObj.clicks.push({
      time: new Date().toISOString(),
      source: document.referrer,
      location: "India", // mock
    });

    saveShortURL(urlObj);
    logEvent("click", "Redirected to long URL", { shortcode });

    window.location.href = urlObj.originalUrl;
  }, [shortcode]);

  return <p>Redirecting...</p>;
}

export default RedirectHandler;
