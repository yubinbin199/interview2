'use client';

import { useState } from 'react';
import { Layout, Typography, Card, Row, Col, Button, Space } from 'antd';
import {
  CustomerServiceOutlined,
  DatabaseOutlined,
  AppstoreOutlined,
  GlobalOutlined,
  RightOutlined
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';

const { Content } = Layout;
const { Title, Text } = Typography;

export default function Home() {
  const router = useRouter();

  // 应用列表数据
  const applications = [
    {
      key: 'cs',
      title: 'Customer Service System',
      icon: <CustomerServiceOutlined style={{ fontSize: 36, color: '#1677ff' }} />,
      description: '客户服务系统，包含AI代理管理、专家咨询和评估功能',
      path: '/cs-system'
    },
    {
      key: 'd',
      title: 'Doraemon System',
      icon: <DatabaseOutlined style={{ fontSize: 36, color: '#52c41a' }} />,
      description: '哆啦A梦系统，包含数据仪表盘、存储和报告功能',
      path: '/d-system'
    },
    {
      key: 'a',
      title: 'Assignment Management',
      icon: <AppstoreOutlined style={{ fontSize: 36, color: '#fa8c16' }} />,
      description: '任务管理系统，用于分配和跟踪任务',
      path: '/a-system'
    },
    {
      key: 'w',
      title: 'Workspace Collaboration',
      icon: <GlobalOutlined style={{ fontSize: 36, color: '#722ed1' }} />,
      description: '文档协同工具，支持团队协作和文档管理',
      path: '/w-system'
    }
  ];

  const handleAppClick = (path: string) => {
    router.push(path);
  };

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f7fa' }}>
      <Content style={{ padding: '40px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Title level={2} style={{ marginBottom: 40, textAlign: 'center' }}>G123 Enterprise System</Title>
          
          <Row gutter={[24, 24]}>
            {applications.map(app => (
              <Col xs={24} sm={12} md={12} lg={12} xl={6} key={app.key}>
                <Card 
                  hoverable
                  style={{ height: '100%', borderRadius: 8, overflow: 'hidden' }}
                  bodyStyle={{ padding: 24 }}
                  onClick={() => handleAppClick(app.path)}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'center', 
                      marginBottom: 16,
                      padding: '24px 0',
                      background: '#f0f5ff',
                      borderRadius: 8
                    }}>
                      {app.icon}
                    </div>
                    <Title level={4} style={{ marginBottom: 8 }}>{app.title}</Title>
                    <Text type="secondary" style={{ marginBottom: 16, flex: 1 }}>{app.description}</Text>
                    <Button 
                      type="primary" 
                      style={{ 
                        width: '100%', 
                        background: app.key === 'cs' ? '#1677ff' : 
                                   app.key === 'd' ? '#52c41a' : 
                                   app.key === 'a' ? '#fa8c16' : '#722ed1'
                      }}
                    >
                      <Space>
                        进入系统
                        <RightOutlined />
                      </Space>
                    </Button>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Content>
    </Layout>
  );
}
