'use client';

import React, { useState } from 'react';
import { Card, Table, Tag, Button, Space, Typography, Row, Col, Badge, Avatar, Tabs, Form, Input, Rate, Select } from 'antd';
import { UserOutlined, ClockCircleOutlined, CheckCircleOutlined, VideoCameraOutlined, EnvironmentOutlined, FileTextOutlined } from '@ant-design/icons';
import type { TableColumnsType } from 'antd';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;

interface Candidate {
  key: string;
  id: string;
  name: string;
  position: string;
  time: string;
  date: string;
  status: string;
  type: string;
  school: string;
}

export default function InterviewerDashboard() {
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for candidates
  const candidates: Candidate[] = [
    {
      key: '1',
      id: '006',
      name: '李浩',
      position: 'PDM',
      time: '12:00-13:00',
      date: '今天',
      status: 'upcoming',
      type: '业务面',
      school: '硕士-安徽工业大学'
    },
    {
      key: '2',
      id: '007',
      name: '王二小',
      position: 'PDM',
      time: '16:00-18:00',
      date: '今天',
      status: 'upcoming',
      type: '业务面',
      school: '硕士-安徽工业大学'
    },
    {
      key: '3',
      id: '007',
      name: '王小二',
      position: 'PDM',
      time: '16:00-18:00',
      date: '4/29',
      status: 'upcoming',
      type: '终面',
      school: '硕士-安徽工业大学'
    },
  ];

  const columns: TableColumnsType<Candidate> = [
    {
      title: 'Time',
      dataIndex: 'date',
      key: 'time',
      render: (date, record) => (
        <Space direction="vertical" size={0}>
          <Text>{date}</Text>
          <Text type="secondary">{record.time}</Text>
        </Space>
      ),
    },
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: 'Candidate',
      key: 'candidate',
      render: (_, record) => (
        <Space>
          <Avatar icon={<UserOutlined />} />
          <Text>{record.name}</Text>
        </Space>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type) => <Tag color="orange">{type}</Tag>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button 
            type="primary" 
            size="small"
            onClick={() => setSelectedCandidate(record)}
          >
            View
          </Button>
        </Space>
      ),
    },
  ];

  const renderCandidateDetail = () => {
    if (!selectedCandidate) {
      return (
        <Card>
          <Empty
            image={<UserOutlined style={{ fontSize: 64 }} />}
            description="Select a candidate to view details"
          />
        </Card>
      );
    }

    const tabItems = [
      {
        key: 'overview',
        label: 'Overview',
        children: (
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Card type="inner" title="Candidate Information">
                <Row gutter={[16, 16]}>
                  <Col span={4}>
                    <Avatar size={80} icon={<UserOutlined />} />
                  </Col>
                  <Col span={20}>
                    <Title level={4}>{selectedCandidate.name}</Title>
                    <Space direction="vertical" size={2}>
                      <Text><strong>Position:</strong> {selectedCandidate.position}</Text>
                      <Text><strong>Education:</strong> {selectedCandidate.school}</Text>
                      <Text><strong>Interview Type:</strong> <Tag color="orange">{selectedCandidate.type}</Tag></Text>
                      <Text>
                        <strong>Schedule:</strong> {selectedCandidate.date} {selectedCandidate.time} 
                        <Tag color="blue" style={{ marginLeft: 8 }}>
                          <ClockCircleOutlined /> {selectedCandidate.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                        </Tag>
                      </Text>
                    </Space>
                  </Col>
                </Row>
              </Card>
            </Col>

            <Col span={24}>
              <Card 
                type="inner" 
                title="Interview Details" 
                extra={
                  selectedCandidate.status === 'upcoming' && (
                    <Button type="primary">
                      Start Interview
                    </Button>
                  )
                }
              >
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Paragraph>
                    <Text strong>Interview Format:</Text> {selectedCandidate.type === '业务面' ? 'Technical Interview' : 'Final Interview'}
                  </Paragraph>
                  
                  <Paragraph>
                    <Space>
                      <EnvironmentOutlined />
                      <Text>In-person Interview at Tuwaii Office</Text>
                    </Space>
                  </Paragraph>
                  
                  <Paragraph>
                    <Text strong>Required Documents:</Text>
                    <ul>
                      <li>Candidate Resume</li>
                      <li>Portfolio (if applicable)</li>
                      <li>Interview Question Set</li>
                    </ul>
                  </Paragraph>
                  
                  <Paragraph>
                    <Text strong>Reminders:</Text>
                    <ul>
                      <li>Review the candidate's resume before the interview</li>
                      <li>Complete the assessment form after the interview</li>
                      <li>Submit feedback within 24 hours</li>
                    </ul>
                  </Paragraph>
                </Space>
              </Card>
            </Col>
          </Row>
        )
      },
      {
        key: 'resume',
        label: 'Resume',
        children: (
          <Card type="inner" title="Candidate Resume">
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Card
                  type="inner"
                  title="Work Experience"
                >
                  <Title level={5}>PDM Intern</Title>
                  <Text type="secondary">Tencent, Shanghai • 2022/06 - 2022/12</Text>
                  <Paragraph style={{ marginTop: 8 }}>
                    AI总结所有的经历内容，100字以内；AI总结所有的经历内容，100字以内；AI总结所有的经历内容，100字以内；AI总结所有的经历内容，100字以内；
                  </Paragraph>
                </Card>
              </Col>
              
              <Col span={24}>
                <Card
                  type="inner"
                  title="Education"
                >
                  <Title level={5}>{selectedCandidate.school}</Title>
                  <Text type="secondary">2019 - 2023 • 硕士</Text>
                  <Paragraph style={{ marginTop: 8 }}>
                    主修产品设计与开发，GPA 3.8/4.0
                  </Paragraph>
                </Card>
              </Col>
              
              <Col span={24}>
                <Card
                  type="inner"
                  title="Skills"
                >
                  <Space wrap>
                    <Tag>产品设计</Tag>
                    <Tag>用户研究</Tag>
                    <Tag>原型设计</Tag>
                    <Tag>需求分析</Tag>
                    <Tag>数据分析</Tag>
                  </Space>
                </Card>
              </Col>
            </Row>
          </Card>
        )
      },
      {
        key: 'assessment',
        label: 'Assessment',
        children: (
          <Card type="inner" title="Candidate Assessment">
            <Form layout="vertical">
              <Form.Item
                label="Technical Skills"
                name="technicalSkills"
              >
                <Rate count={5} />
              </Form.Item>
              
              <Form.Item
                label="Communication Skills"
                name="communicationSkills"
              >
                <Rate count={5} />
              </Form.Item>
              
              <Form.Item
                label="Problem Solving"
                name="problemSolving"
              >
                <Rate count={5} />
              </Form.Item>
              
              <Form.Item
                label="Cultural Fit"
                name="culturalFit"
              >
                <Rate count={5} />
              </Form.Item>
              
              <Form.Item
                label="Overall Recommendation"
                name="recommendation"
              >
                <Select placeholder="Select your recommendation">
                  <Option value="strong_hire">Strong Hire</Option>
                  <Option value="hire">Hire</Option>
                  <Option value="neutral">Neutral</Option>
                  <Option value="no_hire">Do Not Hire</Option>
                  <Option value="strong_no_hire">Strong Do Not Hire</Option>
                </Select>
              </Form.Item>
              
              <Form.Item
                label="Feedback"
                name="feedback"
              >
                <TextArea rows={4} placeholder="Provide detailed feedback about the candidate" />
              </Form.Item>
              
              <Form.Item>
                <Button type="primary" icon={<CheckCircleOutlined />}>
                  Submit Assessment
                </Button>
              </Form.Item>
            </Form>
          </Card>
        )
      }
    ];

    return (
      <Card>
        <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} />
      </Card>
    );
  };

  const Empty = ({ image, description }: { image: React.ReactNode, description: string }) => (
    <div style={{ textAlign: 'center', padding: '40px 0' }}>
      {image}
      <Paragraph style={{ marginTop: 16 }}>{description}</Paragraph>
    </div>
  );

  return (
    <div>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card title="Upcoming Interviews" variant="borderless">
            <Table 
              columns={columns} 
              dataSource={candidates} 
              pagination={false}
              rowClassName={(record) => record.key === selectedCandidate?.key ? 'ant-table-row-selected' : ''}
            />
          </Card>
        </Col>
        
        <Col span={24}>
          {renderCandidateDetail()}
        </Col>
      </Row>
    </div>
  );
} 