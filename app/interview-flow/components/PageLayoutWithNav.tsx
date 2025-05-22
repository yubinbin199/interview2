'use client';

import React, { ReactNode } from 'react';
import { Layout } from 'antd';
import AppNavigation from './AppNavigation';

const { Content } = Layout;

interface PageLayoutWithNavProps {
  children: ReactNode;
}

const PageLayoutWithNav: React.FC<PageLayoutWithNavProps> = ({ children }) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AppNavigation />
      <Layout style={{ marginLeft: 200 }}>
        <Content style={{ padding: '24px', margin: '24px' }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default PageLayoutWithNav; 