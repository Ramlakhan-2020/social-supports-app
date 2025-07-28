import { useState, useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useFormContext } from '../contexts/FormContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import FormProgress from '../components/FormProgress';
import HelpMeWriteModal from '../components/HelpMeWriteModal';
import { useOpenAI } from '../hooks/useOpenAI';

const SituationInformation = () => {
  const { t } = useTranslation();
  const { formData, updateFormData } = useFormContext();
  const navigate = useNavigate();
  const { generateText } = useOpenAI();

  const [modalOpen, setModalOpen] = useState(false);
  const [currentField, setCurrentField] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue
  } = useForm({
    defaultValues: {
      financialSituation: formData.financialSituation || '',
      employmentCircumstances: formData.employmentCircumstances || '',
      reasonForApplying: formData.reasonForApplying || ''
    }
  });

  // Watch all form values and sync to context
  const watchedValues = useWatch({ control });

  useEffect(() => {
    // Reset textarea fields on load
    setValue('financialSituation', '');
    setValue('employmentCircumstances', '');
    setValue('reasonForApplying', '');
  
    // Optionally reset in context too
    updateFormData({
      financialSituation: '',
      employmentCircumstances: '',
      reasonForApplying: ''
    });
  }, []);
  
  useEffect(() => {
    updateFormData(watchedValues);
  }, [watchedValues]);

  const handleHelpMeWrite = (fieldName, prompt) => {
    setCurrentField(fieldName);
    setModalOpen(true);
  };

  const handleAcceptSuggestion = (text) => {
    setValue(currentField, text);
    updateFormData({ [currentField]: text });
  };

  const onSubmit =  (data) => {
    setIsSubmitting(true);
    updateFormData(data);
    try {
      
      navigate('/success');
    } catch (error) {
      console.error('Submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-6">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-8">
        <FormProgress currentStep={3} />
        <h2 className="text-2xl font-bold mb-6">{t('step3.title')}</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Financial Situation */}
          <div>
            <label className="block text-sm font-medium mb-1">
              {t('step3.financialSituation')}
            </label>
            <textarea
              rows={4}
              className={`w-full p-3 border rounded-md ${
                errors.financialSituation ? 'border-red-500' : 'border-gray-300'
              }`}
              {...register('financialSituation', { required: t('validation.required') })}
            />
            {errors.financialSituation && (
              <p className="mt-1 text-sm text-red-600">{errors.financialSituation.message}</p>
            )}
            <button
              type="button"
              onClick={() =>
                handleHelpMeWrite(
                  'financialSituation',
                  t('step3.prompts.financialSituation', {
                    income: formData.monthlyIncome || 'none',
                    employment: formData.employmentStatus || 'unemployed'
                  })
                )
              }
              className="mt-2 inline-flex items-center gap-2 px-4 py-2 text-white bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg shadow hover:from-blue-600 hover:to-indigo-600 active:scale-95 transition-all duration-200"
            >
              {t('step3.helpMeWrite')}
            </button>
          </div>

          {/* Employment Circumstances */}
          <div>
            <label className="block text-sm font-medium mb-1">
              {t('step3.employmentCircumstances')}
            </label>
            <textarea
              rows={4}
              className={`w-full p-3 border rounded-md ${
                errors.employmentCircumstances ? 'border-red-500' : 'border-gray-300'
              }`}
              {...register('employmentCircumstances', { required: t('validation.required') })}
            />
            {errors.employmentCircumstances && (
              <p className="mt-1 text-sm text-red-600">{errors.employmentCircumstances.message}</p>
            )}
            <button
              type="button"
              onClick={() =>
                handleHelpMeWrite(
                  'employmentCircumstances',
                  t('step3.prompts.employmentCircumstances', {
                    employment: formData.employmentStatus || 'unemployed'
                  })
                )
              }
              className="mt-2 inline-flex items-center gap-2 px-4 py-2 text-white bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg shadow hover:from-blue-600 hover:to-indigo-600 active:scale-95 transition-all duration-200"
            >
              {t('step3.helpMeWrite')}
            </button>
          </div>

          {/* Reason For Applying */}
          <div>
            <label className="block text-sm font-medium mb-1">
              {t('step3.reasonForApplying')}
            </label>
            <textarea
              rows={4}
              className={`w-full p-3 border rounded-md ${
                errors.reasonForApplying ? 'border-red-500' : 'border-gray-300'
              }`}
              {...register('reasonForApplying', { required: t('validation.required') })}
            />
            {errors.reasonForApplying && (
              <p className="mt-1 text-sm text-red-600">{errors.reasonForApplying.message}</p>
            )}
            <button
              type="button"
              onClick={() =>
                handleHelpMeWrite(
                  'reasonForApplying',
                  t('step3.prompts.reasonForApplying', {
                    income: formData.monthlyIncome || 'none',
                    dependents: formData.dependents || 0,
                    housing: formData.housingStatus || 'none'
                  })
                )
              }
              className="mt-2 inline-flex items-center gap-2 px-4 py-2 text-white bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg shadow hover:from-blue-600 hover:to-indigo-600 active:scale-95 transition-all duration-200"
            >
              {t('step3.helpMeWrite')}
            </button>
          </div>

          {/* Buttons */}
          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={() => navigate('/family')}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
            >
              {t('navigation.back')}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? t('navigation.submitting') : t('navigation.submit')}
            </button>
          </div>
        </form>

        <HelpMeWriteModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onGenerate={() => generateText(currentField)}
          onAccept={handleAcceptSuggestion}
        />
      </div>
    </div>
  );
};

export default SituationInformation;
