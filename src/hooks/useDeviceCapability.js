import { useState, useEffect } from 'react';

export const useDeviceCapability = () => {
  const [capabilities, setCapabilities] = useState({
    isMobile: false,
    isLowPower: false,
    canHandle3D: true
  });

  useEffect(() => {
    const checkCapabilities = () => {
      const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
      
      const isLowPower = navigator.hardwareConcurrency < 4 || 
                        (navigator.deviceMemory && navigator.deviceMemory < 4);
      
      const canHandle3D = !isLowPower && 
                         !isMobile && 
                         !!window.WebGLRenderingContext &&
                         !!document.createElement('canvas').getContext('webgl');

      setCapabilities({
        isMobile,
        isLowPower,
        canHandle3D
      });
    };

    checkCapabilities();
    window.addEventListener('resize', checkCapabilities);
    return () => window.removeEventListener('resize', checkCapabilities);
  }, []);

  return capabilities;
};