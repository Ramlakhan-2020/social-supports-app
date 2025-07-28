import { useTranslation } from 'react-i18next';

const FormProgress = ({ currentStep }) => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  const steps = [1, 2, 3];

  return (
    <div
      dir={isArabic ? 'rtl' : 'ltr'}
      className={`flex items-center justify-center gap-4 mb-10`}
    >
      {steps.map((step, index) => (
        <div key={step} className="flex items-center gap-2">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 shadow-md
              ${
                currentStep > step
                  ? 'bg-green-500 text-white'
                  : currentStep === step
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-300 text-gray-600'
              }`}
          >
            {currentStep > step ? '✓' : step}
          </div>

          {index < steps.length - 1 && (
            <div
              className={`h-1 rounded-full transition-all duration-300 ${
                currentStep > step ? 'bg-blue-600' : 'bg-gray-300'
              }`}
              style={{ width: '3rem' }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default FormProgress;
