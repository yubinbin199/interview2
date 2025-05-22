'use client';

import React, { useState } from 'react';
import { Layout, Menu, Typography, Avatar, Button, Dropdown, theme } from 'antd';
import {
  CalendarOutlined,
  TeamOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
  BellOutlined
} from '@ant-design/icons';
import Link from 'next/link';

const { Header, Content } = Layout;
const { Title } = Typography;

export default function InterviewSystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token } = theme.useToken();

  const userMenuItems = [
    {
      key: '1',
      label: 'Profile',
      icon: <UserOutlined />,
    },
    {
      key: '2',
      label: 'Settings',
      icon: <SettingOutlined />,
    },
    {
      key: '3',
      label: 'Logout',
      icon: <LogoutOutlined />,
      danger: true,
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ 
        padding: '0 16px', 
        background: token.colorBgContainer,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <Title level={4} style={{ margin: 0 }}>Interview System</Title>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Button type="text" icon={<BellOutlined />} />
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <Button type="text">
              <Avatar size="small" icon={<UserOutlined />} />
              <span style={{ marginLeft: '8px', display: 'inline-block' }}>Admin</span>
            </Button>
          </Dropdown>
        </div>
      </Header>
      <Content style={{ 
        padding: '24px',
        background: token.colorBgElevated,
        minHeight: 'calc(100vh - 64px)'
      }}>
        <div style={{
          background: token.colorBgContainer,
          borderRadius: '8px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          {children}
        </div>
      </Content>
    </Layout>
  );
} 