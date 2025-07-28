import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const SuccessPage = () => {
  const { t } = useTranslation();

  useEffect(() => {
    // Optional: Reset textarea or form if needed globally
    const textareas = document.querySelectorAll("textarea");
    textareas.forEach((el) => (el.value = ""));
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md text-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="bg-green-100 text-green-700 rounded-full p-3">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            {t('formsubmit.successMessage')}
          </h2>
          <a
            href="/"
            className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            {t('formsubmit.successbackButton')}
          </a>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
