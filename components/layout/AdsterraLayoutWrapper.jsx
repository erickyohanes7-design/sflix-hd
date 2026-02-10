// components/layout/AdsterraLayoutWrapper.jsx
"use client";

import { useEffect, useRef } from 'react';
import { getAIOptimizer } from '../../utils/adsterra';

export default function AdsterraLayoutWrapper({ children, countryCode }) {
  const initialized = useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && !initialized.current) {
        const optimizer = getAIOptimizer();
        if (optimizer) {
            optimizer.setGeo(countryCode);
        }

        const nativeContainer = document.getElementById('container-cdc27ff5e15225e2da400af202e94c4a');

        const visibleAds = [
            { id: 'native', src: '//fundingfashioned.com/cdc27ff5e15225e2da400af202e94c4a/invoke.js' },
            { id: 'social', src: '//fundingfashioned.com/99/0e/e8/990ee8bed3865cbe210a82d7af975e3f.js' }
        ];

        visibleAds.forEach(s => {
            if(document.querySelector(`script[src="${s.src}"]`)) return;
            const el = document.createElement('script');
            el.src = s.src;
            el.async = true;
            
            // PERBAIKAN: Masukkan script native ke kontainer footer jika ada
            if (s.id === 'native' && nativeContainer) {
                nativeContainer.appendChild(el);
            } else {
                document.body.appendChild(el);
            }
        });

        setTimeout(() => {
            if(document.querySelector(`script[src*="7f2098acf96ab5201a892484f1378a8a"]`)) return;
            const popunder = document.createElement('script');
            popunder.src = '//fundingfashioned.com/7f/20/98/7f2098acf96ab5201a892484f1378a8a.js'; 
            document.head.appendChild(popunder);
        }, 3500);

        initialized.current = true;
    }
  }, [countryCode]);

  return <>{children}</>;
}