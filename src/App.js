// src/App.js
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FormProvider } from './contexts/FormContext';
import PersonalInformation from './pages/PersonalInformation';
import FamilyInformation from './pages/FamilyInformation';
import SituationInformation from './pages/SituationInformation';
import LanguageSwitcher from './components/LanguageSwitcher';
import SuccessPage from './pages/SuccessPage';

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <FormProvider>
        <BrowserRouter>
        <div className="w-full min-h-screen p-4 bg-cover bg-center bg-no-repeat bg-fixed"
           style={{
            backgroundImage: "url('image/background.jpg')",
          }}
          >
            <LanguageSwitcher />
        
            <Routes>
              <Route path="/" element={<PersonalInformation />} />
              <Route path="/family" element={<FamilyInformation />} />
              <Route path="/situation" element={<SituationInformation />} />
              <Route path="/success" element={<SuccessPage/>}></Route>
            </Routes>
       
          </div>
        </BrowserRouter>
      </FormProvider>
    </I18nextProvider>
  );
}

export default App;