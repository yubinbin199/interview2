'use client';

import React from 'react';
import { Button, Dropdown, Space } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import { useLanguage } from '../context/LanguageContext';
import type { MenuProps } from 'antd';

export default function LanguageSelector() {
  const { language, changeLanguage } = useLanguage();

  const languageOptions = [
    {
      key: 'en',
      label: 'English',
    },
    {
      key: 'zh',
      label: '中文',
    },
    {
      key: 'ja',
      label: '日本語',
    },
  ];

  const handleLanguageChange: MenuProps['onClick'] = ({ key }) => {
    changeLanguage(key as 'en' | 'zh' | 'ja');
  };

  const getLanguageText = () => {
    switch (language) {
      case 'zh':
        return '中文';
      case 'ja':
        return '日本語';
      case 'en':
      default:
        return 'English';
    }
  };

  const items: MenuProps['items'] = languageOptions;

  return (
    <Dropdown 
      menu={{ 
        items, 
        onClick: handleLanguageChange,
        selectable: true,
        selectedKeys: [language]
      }}
      trigger={['click']}
      placement="topRight"
    >
      <Button 
        icon={<GlobalOutlined />} 
        style={{ width: '100%' }}
        type="text"
      >
        <Space>
          {getLanguageText()}
        </Space>
      </Button>
    </Dropdown>
  );
} 