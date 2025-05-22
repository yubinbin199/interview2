'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { Layout, Typography, Card, Row, Col, Tabs } from 'antd';
import InterviewInvitation from './components/InterviewInvitation';
import Interviewer from './components/Interviewer';
import InterviewerDashboard from './components/InterviewerDashboard';
// import SystemIntegration from './components/SystemIntegration';
import { useSearchParams } from 'next/navigation';

const { Content } = Layout;
const { Title } = Typography;

// 创建一个包装组件来处理useSearchParams的使用
function InterviewSystemContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('invitation');

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const tabItems = [
    {
      key: 'invitation',
      label: 'Interview Invitation',
      children: <InterviewInvitation />
    },
    {
      key: 'interviewer',
      label: 'Interviewer',
      children: <Interviewer />
    },
    {
      key: 'interviewer-dashboard',
      label: 'Interviewer Dashboard',
      children: <InterviewerDashboard />
    },
    {
      key: 'integration',
      label: 'System Integration',
      children: (
        <Card variant="borderless">
          <Typography.Title level={4}>System Integration</Typography.Title>
          <Typography.Paragraph>
            This feature is coming soon...
          </Typography.Paragraph>
        </Card>
      )
    }
  ];

  return (
    <Layout className="min-h-screen">
      <Content className="p-6">
        <Title level={2}>Interview System</Title>
        <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} />
      </Content>
    </Layout>
  );
}

// 主页面组件使用Suspense包装
export default function InterviewSystem() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <InterviewSystemContent />
    </Suspense>
  );
} 