'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ConfigProvider } from 'antd';
import enUS from 'antd/locale/en_US';
import zhCN from 'antd/locale/zh_CN';
import jaJP from 'antd/locale/ja_JP';

type LanguageType = 'en' | 'zh' | 'ja';

type LanguageContextType = {
  language: LanguageType;
  changeLanguage: (lang: LanguageType) => void;
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  changeLanguage: () => {},
});

export const useLanguage = () => useContext(LanguageContext);

type LanguageProviderProps = {
  children: ReactNode;
};

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<LanguageType>('en');

  useEffect(() => {
    // 从本地存储加载用户首选语言（如果有）
    const savedLanguage = localStorage.getItem('preferredLanguage') as LanguageType;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = (lang: LanguageType) => {
    setLanguage(lang);
    localStorage.setItem('preferredLanguage', lang);
  };

  // 根据所选语言获取对应的区域设置
  const getAntdLocale = () => {
    switch (language) {
      case 'zh':
        return zhCN;
      case 'ja':
        return jaJP;
      case 'en':
      default:
        return enUS;
    }
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      <ConfigProvider locale={getAntdLocale()}>
        {children}
      </ConfigProvider>
    </LanguageContext.Provider>
  );
}; 