import { useForm } from 'react-hook-form';
import { useFormContext } from '../contexts/FormContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import FormProgress from '../components/FormProgress';

const PersonalInformation = () => {
  const { t } = useTranslation();
  const { updateFormData } = useFormContext();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    updateFormData(data);
    navigate('/family');
  };

  return (
    <div className="top-[20px] min-h-screen flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-xl p-8">
        <FormProgress currentStep={1} />
        <h2 className="text-2xl font-bold mb-1 mt-0">{t('step1.title')}</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[300px]">
              <label className="block text-sm font-medium mb-1">
                {t('step1.name')}
              </label>
              <input
                type="text"
                className={`w-full p-3 border rounded-md ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                {...register('name', { required: t('validation.required') })}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div className="flex-1 min-w-[300px]">
              <label className="block text-sm font-medium mb-1">
                {t('step1.nationalId')}
              </label>
              <input
                type="text"
                className={`w-full p-3 border rounded-md ${errors.nationalId ? 'border-red-500' : 'border-gray-300'}`}
                {...register('nationalId', { required: t('validation.required') })}
              />
              {errors.nationalId && (
                <p className="mt-1 text-sm text-red-600">{errors.nationalId.message}</p>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[300px]">
              <label className="block text-sm font-medium mb-1">
                {t('step1.dob')}
              </label>
              <input
                type="date"
                className={`w-full p-3 border rounded-md ${errors.dob ? 'border-red-500' : 'border-gray-300'}`}
                {...register('dob', { required: t('validation.required') })}
              />
              {errors.dob && (
                <p className="mt-1 text-sm text-red-600">{errors.dob.message}</p>
              )}
            </div>

            <div className="flex-1 min-w-[300px]">
              <label className="block text-sm font-medium mb-1">
                {t('step1.gender')}
              </label>
              <select
                className={`w-full p-3 border rounded-md ${errors.gender ? 'border-red-500' : 'border-gray-300'}`}
                {...register('gender', { required: t('validation.required') })}
              >
                <option value="">{t('step1.selectGender')}</option>
                <option value="male">{t('step1.genderOptions.male')}</option>
                <option value="female">{t('step1.genderOptions.female')}</option>
                <option value="other">{t('step1.genderOptions.other')}</option>
              </select>
              {errors.gender && (
                <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              {t('step1.address')}
            </label>
            <input
              type="text"
              className={`w-full p-3 border rounded-md ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
              {...register('address', { required: t('validation.required') })}
            />
            {errors.address && (
              <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
            )}
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium mb-1">
                {t('step1.city')}
              </label>
              <input
                type="text"
                className={`w-full p-3 border rounded-md ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                {...register('city', { required: t('validation.required') })}
              />
              {errors.city && (
                <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
              )}
            </div>

            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium mb-1">
                {t('step1.state')}
              </label>
              <input
                type="text"
                className={`w-full p-3 border rounded-md ${errors.state ? 'border-red-500' : 'border-gray-300'}`}
                {...register('state', { required: t('validation.required') })}
              />
              {errors.state && (
                <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>
              )}
            </div>

            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium mb-1">
                {t('step1.country')}
              </label>
              <select
                className={`w-full p-3 border rounded-md ${errors.country ? 'border-red-500' : 'border-gray-300'}`}
                {...register('country', { required: t('validation.required') })}
              >
                <option value="">{t('step1.selectCountry')}</option>
                <option value="US">{t('step1.countryOptions.us')}</option>
                <option value="CA">{t('step1.countryOptions.ca')}</option>
                <option value="UK">{t('step1.countryOptions.uk')}</option>
              </select>
              {errors.country && (
                <p className="mt-1 text-sm text-red-600">{errors.country.message}</p>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[300px]">
              <label className="block text-sm font-medium mb-1">
                {t('step1.phone')}
              </label>
              <input
                type="tel"
                className={`w-full p-3 border rounded-md ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                {...register('phone', {
                  required: t('validation.required'),
                  pattern: {
                    value: /^[0-9]{10,15}$/,
                    message: t('validation.phoneInvalid')
                  }
                })}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
              )}
            </div>

            <div className="flex-1 min-w-[300px]">
              <label className="block text-sm font-medium mb-1">
                {t('step1.email')}
              </label>
              <input
                type="email"
                className={`w-full p-3 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                {...register('email', {
                  required: t('validation.required'),
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: t('validation.emailInvalid')
                  }
                })}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="sm:px-6 sm:py-2 sm:w-auto md:px-6 md:py-2 md:w-auto w-full py-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {t('navigation.next')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PersonalInformation;
