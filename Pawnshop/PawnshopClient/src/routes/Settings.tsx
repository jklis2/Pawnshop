import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Settings() {
  const { t, i18n } = useTranslation('settings');
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value);
  };

  const saveLanguage = () => {
    i18n.changeLanguage(language);
    localStorage.setItem('language', language);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">{t('welcome')}</h1>
      <p>{t('description')}</p>

      <div className="mt-4">
        <label htmlFor="language" className="block text-sm font-medium text-gray-700">
          {t('selectLanguage')}
        </label>
        <select
          id="language"
          name="language"
          value={language}
          onChange={handleLanguageChange}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="en">English</option>
          <option value="pl">Polish</option>
        </select>
      </div>

      <button
        type="button"
        className="mt-4 bg-blue-500 rounded-md p-4 w-32"
        onClick={saveLanguage}
      >
        {t('saveButton')}
      </button>
    </div>
  );
}
