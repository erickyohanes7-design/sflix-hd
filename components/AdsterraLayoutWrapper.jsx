"use client";

import { useEffect } from 'react';

export default function AdsterraLayoutWrapper({ children }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      let scriptsLoaded = false;
      
      const loadAdScripts = () => {
        if (scriptsLoaded) return;
        
        // Memuat skrip iklan Native Banner
        const nativeBannerScript = document.createElement('script');
        nativeBannerScript.src = "//eminencehillsidenutrition.com/ea3c0571018b75bccd0d223d5ef1ff4c/invoke.js";
        nativeBannerScript.async = true;
        nativeBannerScript.setAttribute('data-cfasync', 'false');
        nativeBannerScript.id = 'adsterra-native-banner';
        document.body.appendChild(nativeBannerScript);

        // Memuat skrip iklan Popunder
        const popunderScript = document.createElement('script');
        popunderScript.type = 'text/javascript';
        popunderScript.src = "//eminencehillsidenutrition.com/7f/20/98/7f2098acf96ab5201a892484f1378a8a.js";
        popunderScript.async = true;
        popunderScript.id = 'adsterra-popunder';
        document.body.appendChild(popunderScript);

        // Memuat skrip iklan Social Bar
        const socialBarScript = document.createElement('script');
        socialBarScript.type = 'text/javascript';
        socialBarScript.src = "//eminencehillsidenutrition.com/99/0e/e8/990ee8bed3865cbe210a82d7af975e3f.js";
        socialBarScript.async = true;
        socialBarScript.id = 'adsterra-social-bar';
        document.body.appendChild(socialBarScript);

        scriptsLoaded = true;
      };

      // Delay loading untuk memastikan DOM siap
      const timer = setTimeout(loadAdScripts, 1000);

      return () => {
        clearTimeout(timer);
        
        // Hapus scripts jika ada
        const scriptsToRemove = [
          'adsterra-native-banner',
          'adsterra-popunder', 
          'adsterra-social-bar'
        ];
        
        scriptsToRemove.forEach(id => {
          const script = document.getElementById(id);
          if (script && script.parentNode) {
            script.parentNode.removeChild(script);
          }
        });
      };
    }
  }, []);

  return (
    <>
      {children}
    </>
  );
}