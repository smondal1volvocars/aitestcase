import React, { useEffect, useState } from 'react';
import { API_KEY } from '../../config';

const MessageComponent = () => {
  const [response, setResponse] = useState('');

  useEffect(() => {
    const fetchChatGPTResponse = async () => {
      try {
        const gptResponse = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+ API_KEY,
          },
          body: JSON.stringify({ prompt: 'Generate a test case for React Testing Library' }),
        });

        const gptData = await gptResponse.json();
        setResponse(gptData.choices[0]?.text || 'No response from ChatGPT');
      } catch (error) {
        console.error('Error fetching from ChatGPT:', error);
        setResponse('Error fetching from ChatGPT');
      }
    };

    fetchChatGPTResponse();
  }, []);

  return <div>{response}</div>;
};

export default MessageComponent;
