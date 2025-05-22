'use client';

import React, { useState } from 'react';
import { Layout, Menu, Button } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import {
  HomeOutlined,
  UserOutlined,
  ScheduleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import Link from 'next/link';

const { Sider } = Layout;

const AppNavigation = () => {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: <Link href="/">Dashboard</Link>,
    },
    {
      key: 'interview',
      icon: <ScheduleOutlined />,
      label: 'Interview',
      children: [
        {
          key: '/interview-flow',
          label: <Link href="/interview-flow">Interview Flow</Link>,
        },
        {
          key: '/interview',
          label: <Link href="/interview">Candidate View</Link>,
        },
      ],
    },
    {
      key: 'cs-system',
      icon: <UserOutlined />,
      label: <Link href="/cs-system">CS System</Link>,
    },
    {
      key: 'd-system',
      icon: <UserOutlined />,
      label: <Link href="/d-system">D System</Link>,
    },
  ];

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={toggleCollapsed}
      trigger={null}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'center', padding: '16px' }}>
        <Button 
          type="text" 
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} 
          onClick={toggleCollapsed} 
          style={{ color: 'white' }}
        />
      </div>
      <div style={{ height: '32px', margin: '16px', background: 'rgba(255, 255, 255, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ color: 'white', fontWeight: 'bold' }}>
          {collapsed ? 'CTW' : 'Tuwaii Tech'}
        </span>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['/']}
        selectedKeys={[pathname]}
        items={menuItems}
      />
    </Sider>
  );
};

export default AppNavigation; 