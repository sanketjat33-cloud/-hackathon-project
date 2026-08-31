import { useLanguage } from './useLanguage';
import { pageTranslations } from '../data/pageTranslations';

export function usePageText(page) {
  const { languageId } = useLanguage();
  const values = pageTranslations[languageId]?.[page] || {};
  const english = pageTranslations.en[page] || {};
  return (key, fallback = '') => values[key] || english[key] || fallback;
}

export default usePageText;
