import React from 'react';
import i18n from '../../i18n';
import { withTranslation } from 'react-i18next';
import { HStack } from '@chakra-ui/react';

const LanguageSelector = ({ t }) => {
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  }

  return (
    <HStack>
      <button onClick={() => changeLanguage('es')}>🇪🇸</button>
      <button onClick={() => changeLanguage('en')}>🇬🇧</button>
    </HStack>
  )
}

export default withTranslation()(LanguageSelector);