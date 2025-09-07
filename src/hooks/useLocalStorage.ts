import { useState, useEffect } from 'react';

// Este hook funciona como o useState, mas salva os dados no localStorage.
function useLocalStorage<T>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {

  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      // Se houver algo salvo, usa isso. Senão, usa o valor inicial.
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Erro ao ler do localStorage (key: "${key}"):`, error);
      return initialValue;
    }
  });

  // Este useEffect é executado sempre que o valor do estado (storedValue) muda.
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Erro ao salvar no localStorage (key: "${key}"):`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;
