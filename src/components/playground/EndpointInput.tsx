import React, { useEffect, useState } from 'react';

type EndpointInputProps = {
  endpoint: string;
  setEndpoint: (newEndpoint: string) => void;
};

function EndpointInput({ endpoint, setEndpoint }: EndpointInputProps) {
  const [inputText, setInputText] = useState<string>(endpoint);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setEndpoint(inputText);
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [inputText, setEndpoint]);

  return (
    <input
      value={inputText}
      onChange={(event) => setInputText(event.target.value)}
      className="w-full"
      type="text"
    />
  );
}

export default EndpointInput;
