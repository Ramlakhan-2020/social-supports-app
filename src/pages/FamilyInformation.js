import { useForm } from 'react-hook-form';
import { useFormContext } from '../contexts/FormContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import FormProgress from '../components/FormProgress';

const FamilyInformation = () => {
  const { t } = useTranslation();
  const { updateFormData } = useFormContext();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    updateFormData(data);
    navigate('/situation');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-4xl">
        <FormProgress currentStep={2} />
        <h2 className="text-2xl font-bold mb-6 text-gray-800">{t('step2.title')}</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Row 1 */}
          <div className="flex flex-wrap gap-4">
            {/* Marital Status */}
            <div className="flex-1 min-w-[280px]">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('step2.maritalStatus')}
              </label>
              <select
                className={`w-full p-3 border rounded-md ${errors.maritalStatus ? 'border-red-500' : 'border-gray-300'}`}
                {...register('maritalStatus', { required: t('validation.required') })}
              >
                <option value="">{t('step2.selectMaritalStatus')}</option>
                <option value="single">{t('step2.maritalOptions.single')}</option>
                <option value="married">{t('step2.maritalOptions.married')}</option>
                <option value="divorced">{t('step2.maritalOptions.divorced')}</option>
                <option value="widowed">{t('step2.maritalOptions.widowed')}</option>
              </select>
              {errors.maritalStatus && (
                <p className="mt-1 text-sm text-red-600">{errors.maritalStatus.message}</p>
              )}
            </div>

            {/* Dependents */}
            <div className="flex-1 min-w-[280px]">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('step2.dependents')}
              </label>
              <input
                type="number"
                min="0"
                className={`w-full p-3 border rounded-md ${errors.dependents ? 'border-red-500' : 'border-gray-300'}`}
                {...register('dependents', {
                  required: t('validation.required'),
                  min: { value: 0, message: t('validation.minZero') }
                })}
              />
              {errors.dependents && (
                <p className="mt-1 text-sm text-red-600">{errors.dependents.message}</p>
              )}
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex flex-wrap gap-4">
            {/* Employment Status */}
            <div className="flex-1 min-w-[280px]">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('step2.employmentStatus')}
              </label>
              <select
                className={`w-full p-3 border rounded-md ${errors.employmentStatus ? 'border-red-500' : 'border-gray-300'}`}
                {...register('employmentStatus', { required: t('validation.required') })}
              >
                <option value="">{t('step2.selectEmploymentStatus')}</option>
                <option value="employed">{t('step2.employmentOptions.employed')}</option>
                <option value="unemployed">{t('step2.employmentOptions.unemployed')}</option>
                <option value="student">{t('step2.employmentOptions.student')}</option>
                <option value="retired">{t('step2.employmentOptions.retired')}</option>
              </select>
              {errors.employmentStatus && (
                <p className="mt-1 text-sm text-red-600">{errors.employmentStatus.message}</p>
              )}
            </div>

            {/* Monthly Income */}
            <div className="flex-1 min-w-[280px]">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('step2.monthlyIncome')}
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  className={`w-full pl-8 p-3 border rounded-md ${errors.monthlyIncome ? 'border-red-500' : 'border-gray-300'}`}
                  {...register('monthlyIncome', {
                    required: t('validation.required'),
                    min: { value: 0, message: t('validation.minZero') }
                  })}
                />
              </div>
              {errors.monthlyIncome && (
                <p className="mt-1 text-sm text-red-600">{errors.monthlyIncome.message}</p>
              )}
            </div>
          </div>

          {/* Housing Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('step2.housingStatus')}
            </label>
            <select
              className={`w-full p-3 border rounded-md ${errors.housingStatus ? 'border-red-500' : 'border-gray-300'}`}
              {...register('housingStatus', { required: t('validation.required') })}
            >
              <option value="">{t('step2.selectHousingStatus')}</option>
              <option value="own">{t('step2.housingOptions.own')}</option>
              <option value="rent">{t('step2.housingOptions.rent')}</option>
              <option value="homeless">{t('step2.housingOptions.homeless')}</option>
              <option value="other">{t('step2.housingOptions.other')}</option>
            </select>
            {errors.housingStatus && (
              <p className="mt-1 text-sm text-red-600">{errors.housingStatus.message}</p>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
            >
              {t('navigation.back')}
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {t('navigation.next')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FamilyInformation;
