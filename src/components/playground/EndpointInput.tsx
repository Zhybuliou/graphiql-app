import React, { useEffect, useState } from 'react';

type EndpointInputProps = {
  endpoint: string;
  setEndpoint: (newEndpoint: string) => void;
};

const DEBOUNCE_TIMEOUT = 1000;

export function EndpointInput({ endpoint, setEndpoint }: EndpointInputProps) {
  const [inputText, setInputText] = useState<string>(endpoint);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setEndpoint(inputText);
    }, DEBOUNCE_TIMEOUT);
    return () => clearTimeout(timeoutId);
  }, [inputText, setEndpoint]);

  return (
    <input
      value={inputText}
      onChange={(event) => setInputText(event.target.value)}
      className="w-full py-3 px-5 outline-none rounded-[10px]"
      type="text"
    />
  );
}
