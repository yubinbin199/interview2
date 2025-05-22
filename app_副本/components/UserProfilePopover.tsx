'use client';

import React, { useState } from 'react';
import { Avatar, Typography, Dropdown, Space } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';

const { Text } = Typography;

interface UserProfilePopoverProps {
  userName: string;
  userEmail: string;
}

export default function UserProfilePopover({ userName, userEmail }: UserProfilePopoverProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleSignOut = () => {
    console.log('用户登出');
    // 实际应用中，这里应该调用登出API
  };

  const items: MenuProps['items'] = [
    {
      key: 'signout',
      label: 'Sign Out',
      icon: <LogoutOutlined />,
      danger: true,
    },
  ];

  return (
    <Dropdown 
      menu={{ 
        items,
        onClick: () => handleSignOut(),
      }}
      trigger={['click']}
      placement="topRight"
    >
      <div 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          cursor: 'pointer',
          padding: '8px 4px',
          borderRadius: '4px',
          background: isHovered ? '#f5f5f5' : 'transparent'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Avatar icon={<UserOutlined />} />
        <div style={{ marginLeft: 8 }}>
          <Text strong style={{ display: 'block', lineHeight: '1.2' }}>{userName}</Text>
          <Text type="secondary" style={{ fontSize: 12 }}>{userEmail}</Text>
        </div>
      </div>
    </Dropdown>
  );
} 