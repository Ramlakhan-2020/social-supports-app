// src/hooks/useOpenAI.js
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormContext } from '../contexts/FormContext';

export const useOpenAI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { formData } = useFormContext();
  const [error, setError] = useState(null);
  const { t } = useTranslation();

  const generateText = async (prompt) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // 2. Configure the API request
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}` // Use the actual key variable
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'user',
              content: formData[prompt]
            }
          ],
          temperature: 0.7,
          max_tokens: 200
        })
      });

      // 3. Handle response errors
      if (!response.ok) {
        const errorData = await response.json();
        console.error('OpenAI API Error:', errorData);
        throw new Error(errorData.error?.message || t('aiErrors.apiError'));
      }

      // 4. Return the generated text
      const data = await response.json();
      return data.choices[0].message.content;
    } catch (err) {
      setError(err.message.includes('401') ? 'Invalid API key' : err.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { generateText, isLoading, error };
};