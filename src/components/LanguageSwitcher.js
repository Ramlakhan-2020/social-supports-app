import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lng;
  };

  return (
    <div className="flex gap-4 items-center mb-6">
      <button
        onClick={() => changeLanguage('en')}
        className={`px-5 py-2 rounded-full text-sm font-medium shadow-sm transition-all duration-300 
          ${
            i18n.language === 'en'
              ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
      >
        English
      </button>
      <button
        onClick={() => changeLanguage('ar')}
        className={`px-5 py-2 rounded-full text-sm font-medium shadow-sm transition-all duration-300 
          ${
            i18n.language === 'ar'
              ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
      >
        العربية
      </button>
    </div>
  );
};

export default LanguageSwitcher;
