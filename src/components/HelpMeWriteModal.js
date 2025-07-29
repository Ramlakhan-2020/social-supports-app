import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const HelpMeWriteModal = ({ isOpen, onClose, onGenerate, onAccept }) => {
  const { t } = useTranslation();
  const [suggestion, setSuggestion] = useState('');
  const [editedText, setEditedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerate = async () => {
    
    setIsLoading(true);
    setError(null);
    try {
      const text = await onGenerate();
      if (!text || typeof text !== 'string') {
        throw new Error(t('aiModal.emptyResponse') || 'Empty response from server.');
      }
      setSuggestion(text);
      setEditedText(text);
    } catch (err) {
      const message =
      err?.message ||
      (typeof err === 'string' ? err : t('aiModal.unknownError') || 'Something went wrong');
       setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccept = () => {
    onAccept(editedText);
    setEditedText('');
    setSuggestion('');
    onClose();
  };
  const handleCancel = () => {
    setSuggestion('');
    setError(null);
    setIsLoading(false);
    onClose();
  };
  

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="p-6">
          <h3 className="text-lg font-medium mb-4">{t('aiModal.title')}</h3>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}

          {!suggestion && !isLoading && (
            <button
              onClick={handleGenerate}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {t('aiModal.generate')}
            </button>
          )}

          {isLoading && (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          )}

          {suggestion && (
            <textarea
              rows={8}
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md mb-4"
            />
          )}
        </div>

        <div className="bg-gray-50 px-6 py-3 flex justify-end space-x-3">
          <button
            onClick={handleCancel}
            className="px-4 py-2 text-gray-700 hover:text-gray-900"
          >
            {t('aiModal.cancel')}
          </button>
          {suggestion && (
            <button
              onClick={handleAccept}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {t('aiModal.useText')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HelpMeWriteModal;