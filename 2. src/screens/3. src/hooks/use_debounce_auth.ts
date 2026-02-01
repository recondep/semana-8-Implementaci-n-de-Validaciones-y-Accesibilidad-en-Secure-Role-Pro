// Implementación del Literal C: Validación asíncrona con Debounce
import { useState, useEffect } from 'react';

export const useDebounceEmail = (email: string) => {
  const [isValidating, setIsValidating] = useState(false);

  useEffect(() => {
    if (email.length < 5) return;
    
    setIsValidating(true);
    const handler = setTimeout(async () => {
      // Simulación de consulta a API de Secure Role Pro
      console.log("Verificando disponibilidad de:", email);
      setIsValidating(false);
    }, 500); // 500ms de debounce

    return () => clearTimeout(handler);
  }, [email]);

  return { isValidating };
};
