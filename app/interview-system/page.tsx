'use client';

import React, { useEffect, useState } from 'react';
import { Layout, Typography, Card, Row, Col, Tabs } from 'antd';
import InterviewInvitation from './components/InterviewInvitation';
import Interviewer from './components/Interviewer';
import InterviewerDashboard from './components/InterviewerDashboard';
// import SystemIntegration from './components/SystemIntegration';
import { useSearchParams } from 'next/navigation';

const { Content } = Layout;
const { Title } = Typography;
const { TabPane } = Tabs;

export default function InterviewSystem() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('invitation');

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  return (
    <Layout className="min-h-screen">
      <Content className="p-6">
        <Title level={2}>Interview System</Title>
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <Tabs.TabPane tab="Interview Invitation" key="invitation">
            <InterviewInvitation />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Interviewer" key="interviewer">
            <Interviewer />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Interviewer Dashboard" key="interviewer-dashboard">
            <InterviewerDashboard />
          </Tabs.TabPane>
          <Tabs.TabPane tab="System Integration" key="integration">
            {/* <SystemIntegration /> */}
            <Card>
              <Typography.Title level={4}>System Integration</Typography.Title>
              <Typography.Paragraph>
                This feature is coming soon...
              </Typography.Paragraph>
            </Card>
          </Tabs.TabPane>
        </Tabs>
      </Content>
    </Layout>
  );
} 