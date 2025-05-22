'use client';

import React, { useState } from 'react';
import { Card, Tabs, Form, Input, Select, Button, Typography, Space, Table, Tag, Row, Col, Alert } from 'antd';
import { MailOutlined, GlobalOutlined, UserOutlined } from '@ant-design/icons';
import type { TableColumnsType } from 'antd';

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

interface Candidate {
  key: string;
  name: string;
  position: string;
  interviewDate: string;
  status: string;
  region: string;
}

export default function InterviewResults() {
  const [emailRegion, setEmailRegion] = useState<string>('shanghai');
  
  // Mock data for candidates
  const candidates: Candidate[] = [
    {
      key: '1',
      name: 'John Doe',
      position: 'Frontend Developer',
      interviewDate: '2023-11-15',
      status: 'pending',
      region: 'shanghai'
    },
    {
      key: '2',
      name: 'Jane Smith',
      position: 'UI/UX Designer',
      interviewDate: '2023-11-16',
      status: 'rejected',
      region: 'taipei'
    },
    {
      key: '3',
      name: 'Kenji Takahashi',
      position: 'Game Developer',
      interviewDate: '2023-11-17',
      status: 'pending',
      region: 'japan'
    },
  ];

  const columns: TableColumnsType<Candidate> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: 'Interview Date',
      dataIndex: 'interviewDate',
      key: 'interviewDate',
    },
    {
      title: 'Region',
      dataIndex: 'region',
      key: 'region',
      render: (region) => {
        let color = 'blue';
        let label = 'Shanghai';
        
        if (region === 'taipei') {
          color = 'green';
          label = 'Taipei';
        } else if (region === 'japan') {
          color = 'purple';
          label = 'Japan';
        }
        
        return <Tag color={color} icon={<GlobalOutlined />}>{label}</Tag>;
      }
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = status === 'pending' ? 'gold' : 'volcano';
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a>Send Feedback</a>
          <a>View Details</a>
        </Space>
      ),
    },
  ];

  const renderEmailTemplate = () => {
    let template = '';
    
    switch(emailRegion) {
      case 'shanghai':
        template = `
Dear [Candidate Name],

Thank you for your interest in our company and taking the time to interview with us for the [Position] role.

After careful consideration, we have decided to move forward with other candidates whose experience and qualifications more closely align with our current needs.

We appreciate your understanding and wish you success in your job search.

Best regards,
HR Team
Tuwaii Technology
        `;
        break;
      case 'taipei':
        template = `
Dear [Candidate Name],

Thank you for your interest in our company and participating in our interview process for the [Position] position.

After careful review, we have decided to pursue other candidates whose qualifications more closely match our current requirements.

We sincerely appreciate your time and interest in our company, and we wish you all the best in your career pursuits.

Best regards,
HR Team
Tuwaii Technology
        `;
        break;
      case 'japan':
        template = `
Dear [Candidate Name],

Thank you for your interest in our company and for taking the time to interview with us for the [Position] position.

After careful consideration, we have decided to proceed with other candidates whose experience and skills better match our current requirements.

We appreciate your understanding and wish you continued success in your professional endeavors.

Best regards,
HR Team
Tuwaii Technology
        `;
        break;
    }
    
    return template;
  };

  return (
    <div>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card title="Candidate List" variant="borderless">
            <Table columns={columns} dataSource={candidates} />
          </Card>
        </Col>
        
        <Col span={24}>
          <Card title="Feedback Email" variant="borderless" extra={<MailOutlined />}>
            <Form layout="vertical">
              <Form.Item label="Select Region Template" name="region">
                <Select 
                  defaultValue="shanghai"
                  onChange={(value) => setEmailRegion(value)}
                  style={{ width: 200 }}
                >
                  <Option value="shanghai">Shanghai (Simplified Chinese)</Option>
                  <Option value="taipei">Taipei (Traditional Chinese)</Option>
                  <Option value="japan">Japan (Japanese)</Option>
                </Select>
              </Form.Item>
              
              <Alert
                message="Email Preview"
                description="This template will be used for sending feedback to candidates from the selected region."
                type="info"
                showIcon
                style={{ marginBottom: 16 }}
              />
              
              <Form.Item>
                <TextArea
                  rows={10}
                  value={renderEmailTemplate()}
                  readOnly
                  style={{ fontFamily: 'monospace' }}
                />
              </Form.Item>
              
              <Form.Item>
                <Button type="primary" icon={<MailOutlined />}>
                  Send Feedback Email
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
} 