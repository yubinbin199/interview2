'use client';

import React, { useState, useRef } from 'react';
import { Layout, Typography, Card, Form, Radio, Button, Space, Table, Avatar, Alert, Divider, Modal, DatePicker, Select, Empty, Input, Checkbox, Row, Col, Tag, Tabs, Rate } from 'antd';
import { SendOutlined, UserOutlined, VideoCameraOutlined, ClockCircleOutlined, PlusOutlined, DeleteOutlined, EditOutlined, MailOutlined, ExclamationCircleOutlined, EnvironmentOutlined, CheckCircleOutlined } from '@ant-design/icons';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TextArea } = Input;
const { TabPane } = Tabs;

// Define candidate interface
interface Candidate {
  id: number;
  name: string;
  email: string;
  position: string;
}

// Define time slot interface
interface TimeSlot {
  id: string;
  date: string;
  weekday: string;
  time: string;
  selected?: boolean;
}

// Define email template interface
interface EmailTemplate {
  greeting: string;
  introduction: string;
  reminders: string[];
  aboutUs: string;
  closing: string;
}

// Define interview interface
interface Interview {
  id: string;
  candidateName: string;
  position: string;
  date: string;
  time: string;
  type: 'business' | 'technical';
}

export default function InterviewSystem() {
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [interviewType, setInterviewType] = useState<string>('inperson');
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
    {
      id: 'slot-1',
      date: '2025-05-23',
      weekday: 'Friday',
      time: '9:00 - 10:00',
    },
    {
      id: 'slot-2',
      date: '2025-05-26',
      weekday: 'Monday',
      time: '10:00 - 11:00',
    },
    {
      id: 'slot-3',
      date: '2025-05-27',
      weekday: 'Tuesday',
      time: '11:00 - 12:00',
    },
    {
      id: 'slot-4',
      date: '2025-05-28',
      weekday: 'Wednesday',
      time: '12:00 - 13:00',
      selected: true,
    },
    {
      id: 'slot-5',
      date: '2025-05-29',
      weekday: 'Thursday',
      time: '13:00 - 14:00',
    }
  ]);
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('9:00 - 10:00');
  const [isEmailEditMode, setIsEmailEditMode] = useState(false);
  const [showInvitationLetter, setShowInvitationLetter] = useState(false);
  const [showUpcomingInterviews, setShowUpcomingInterviews] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(null);
  const [activeDetailTab, setActiveDetailTab] = useState('overview');
  const setupCardRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  
  // Sample upcoming interviews
  const upcomingInterviews: Interview[] = [
    {
      id: '006',
      candidateName: '李浩',
      position: 'PDM',
      date: '今天',
      time: '12:00-13:00',
      type: 'business'
    },
    {
      id: '007',
      candidateName: '王二小',
      position: 'PDM',
      date: '今天',
      time: '16:00-18:00',
      type: 'business'
    },
    {
      id: '007',
      candidateName: '王小二',
      position: 'PDM',
      date: '4/29',
      time: '16:00-18:00',
      type: 'technical'
    }
  ];
  
  const [emailTemplate, setEmailTemplate] = useState<EmailTemplate>({
    greeting: 'Hello Liu Yang,',
    introduction: "I'm the HR from Tuwaii Technology. We'd like to invite you for an interview. Please find the details below.",
    reminders: [
      'Please join 5-10 minutes early and ensure your network connection is stable',
      'This is a video interview, please make sure your camera is working properly'
    ],
    aboutUs: 'We (Tuwaii Shanghai Technology) are a startup focused on revolutionizing the gaming industry through Artificial Intelligence (AI). We collaborate with overseas partners to develop H5 game platforms and work with well-known anime brands to promote and develop various ACG culture IPs.',
    closing: 'Looking forward to your participation!'
  });
  
  // Sample candidate data
  const candidates: Candidate[] = [
    {
      id: 1,
      name: 'Zhang Wei',
      email: 'zhang.wei@example.com',
      position: 'Frontend Developer',
    },
    {
      id: 2,
      name: 'Li Ming',
      email: 'li.ming@example.com',
      position: 'Backend Engineer',
    },
    {
      id: 3,
      name: 'Wang Lin',
      email: 'wang.lin@example.com',
      position: 'UI/UX Designer',
    },
    {
      id: 4,
      name: 'Chen Jie',
      email: 'chen.jie@example.com',
      position: 'DevOps Engineer',
    },
    {
      id: 5,
      name: 'Liu Yang',
      email: 'liu.yang@example.com',
      position: 'Data Scientist',
    }
  ];

  // Columns for the candidate table
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Candidate',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Candidate) => (
        <Space>
          <Avatar style={{ backgroundColor: '#1677ff' }}>
            {text.charAt(0).toUpperCase()}
          </Avatar>
          <div>
            <div><Text strong>{text}</Text></div>
            <div><Text type="secondary">{record.email}</Text></div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Candidate) => (
        <Button 
          type="primary" 
          icon={<SendOutlined />}
          size="small"
          onClick={() => handleSendInvitation(record)}
        >
          Send Invitation
        </Button>
      ),
    },
  ];
  
  // Columns for upcoming interviews table
  const interviewColumns = [
    {
      title: 'Time',
      key: 'time',
      render: (_: any, record: Interview) => (
        <div>
          <div>{record.date}</div>
          <div>{record.time}</div>
        </div>
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
      render: (_: any, record: Interview) => (
        <Space>
          <Avatar style={{ backgroundColor: '#f0f0f0', color: '#666' }}>
            {record.candidateName.charAt(0)}
          </Avatar>
          <Text>{record.candidateName}</Text>
        </Space>
      ),
    },
    {
      title: 'Type',
      key: 'type',
      render: (_: any, record: Interview) => (
        <Tag color={record.type === 'business' ? 'orange' : 'blue'}>
          {record.type === 'business' ? '业务面' : '技术'}
        </Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record: Interview) => (
        <Button 
          type="primary" 
          size="small" 
          onClick={() => handleViewInterview(record)}
        >
          View
        </Button>
      ),
    },
  ];
  
  const handleSendInvitation = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    
    // Update email greeting with candidate name
    setEmailTemplate({
      ...emailTemplate,
      greeting: `Hello ${candidate.name},`
    });
    
    // Scroll to setup card after state update
    setTimeout(() => {
      setupCardRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };
  
  const handleDeleteTimeSlot = (slotId: string) => {
    setTimeSlots(timeSlots.filter(slot => slot.id !== slotId));
  };
  
  const showTimePicker = () => {
    setIsTimePickerOpen(true);
    setSelectedDate(dayjs().add(1, 'day')); // Default to tomorrow
    setSelectedTime('9:00 - 10:00'); // Default time slot
  };
  
  const handleTimePickerCancel = () => {
    setIsTimePickerOpen(false);
  };
  
  const handleTimePickerOk = () => {
    if (selectedDate) {
      const newId = `slot-${Date.now()}`;
      const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const day = selectedDate.day();
      
      // Add the new time slot
      setTimeSlots([
        ...timeSlots,
        {
          id: newId,
          date: selectedDate.format('YYYY-MM-DD'),
          weekday: weekdays[day],
          time: selectedTime
        }
      ]);
      setIsTimePickerOpen(false);
    }
  };
  
  const disabledDate = (current: Dayjs) => {
    return current < dayjs().endOf('day');
  };
  
  const toggleEmailEditMode = () => {
    setIsEmailEditMode(!isEmailEditMode);
  };
  
  const handleEmailChange = (field: keyof EmailTemplate, value: any) => {
    setEmailTemplate({
      ...emailTemplate,
      [field]: value
    });
  };
  
  const handleReminderChange = (index: number, value: string) => {
    const updatedReminders = [...emailTemplate.reminders];
    updatedReminders[index] = value;
    setEmailTemplate({
      ...emailTemplate,
      reminders: updatedReminders
    });
  };
  
  const timeOptions = [
    '9:00 - 10:00',
    '10:00 - 11:00',
    '11:00 - 12:00',
    '12:00 - 13:00',
    '13:00 - 14:00',
    '14:00 - 15:00',
    '15:00 - 16:00',
    '16:00 - 17:00',
  ];
  
  const renderEmailPreview = () => {
    if (isEmailEditMode) {
      return (
        <Form layout="vertical">
          <Form.Item label="Greeting">
            <Input 
              value={emailTemplate.greeting} 
              onChange={(e) => handleEmailChange('greeting', e.target.value)}
            />
          </Form.Item>
          
          <Form.Item label="Introduction">
            <TextArea 
              rows={2} 
              value={emailTemplate.introduction} 
              onChange={(e) => handleEmailChange('introduction', e.target.value)}
            />
          </Form.Item>
          
          <Form.Item label="Reminders">
            {emailTemplate.reminders.map((reminder, index) => (
              <Input
                key={index}
                value={reminder}
                style={{ marginBottom: 8 }}
                onChange={(e) => handleReminderChange(index, e.target.value)}
              />
            ))}
          </Form.Item>
          
          <Form.Item label="About Us">
            <TextArea 
              rows={3} 
              value={emailTemplate.aboutUs} 
              onChange={(e) => handleEmailChange('aboutUs', e.target.value)}
            />
          </Form.Item>
          
          <Form.Item label="Closing">
            <Input 
              value={emailTemplate.closing} 
              onChange={(e) => handleEmailChange('closing', e.target.value)}
            />
          </Form.Item>
        </Form>
      );
    } else {
      return (
        <div style={{ background: '#f5f5f5', padding: 16, borderRadius: 8 }}>
          <Paragraph>
            <Text strong>{emailTemplate.greeting}</Text>
          </Paragraph>
          <Paragraph>
            {emailTemplate.introduction}
          </Paragraph>
          <Paragraph>
            <Text strong>Friendly Reminder:</Text><br/>
            {emailTemplate.reminders.map((reminder, index) => (
              <React.Fragment key={index}>
                • {reminder}<br/>
              </React.Fragment>
            ))}
          </Paragraph>
          <Paragraph>
            <Text strong>About Us:</Text><br/>
            {emailTemplate.aboutUs}
          </Paragraph>
          <Paragraph>
            {emailTemplate.closing}
          </Paragraph>
        </div>
      );
    }
  };
  
  const handleSelectTimeSlot = (slotId: string) => {
    setTimeSlots(timeSlots.map(slot => ({
      ...slot,
      selected: slot.id === slotId
    })));
  };
  
  const handleSendInterviewInvitation = () => {
    setShowInvitationLetter(true);
  };
  
  const handleConfirmInterviewPreferences = () => {
    setShowUpcomingInterviews(true);
    setShowInvitationLetter(false);
  };
  
  const handleViewInterview = (interview: Interview) => {
    setSelectedInterview(interview);
    
    // Scroll to details after state update
    setTimeout(() => {
      detailsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };
  
  const handleTabChange = (key: string) => {
    setActiveDetailTab(key);
  };

  // Show Interview Invitation Letter page
  if (showInvitationLetter && selectedCandidate) {
    const candidateName = selectedCandidate.name;
    
    return (
      <Layout style={{ background: '#f5f5f5', minHeight: '100vh' }}>
        <Content style={{ padding: '16px 24px 24px' }}>
          <Card
            title={
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Interview Invitation Letter</span>
                <MailOutlined style={{ fontSize: 20 }} />
              </div>
            }
            bordered={false}
            style={{ 
              boxShadow: 'none', 
              maxWidth: '1000px', 
              margin: '0 auto'
            }}
          >
            <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '4px' }}>
              <Paragraph>
                <Text strong>Hello {candidateName},</Text>
              </Paragraph>
              
              <Paragraph>
                I'm the HR from Tuwaii Technology. We'd like to invite you for an interview. Please find the details below.
              </Paragraph>
              
              <Paragraph>
                You have been invited to an interview with Tuwaii Technology. Please select your interview preferences below.
              </Paragraph>
              
              <div style={{ 
                padding: '12px', 
                border: '1px solid #e8f4ff', 
                borderRadius: '4px', 
                background: '#f0f8ff', 
                marginBottom: '16px' 
              }}>
                <Space>
                  <UserOutlined />
                  <Text>In-person Interview at Tuwaii Office</Text>
                </Space>
              </div>
              
              <div style={{ 
                padding: '12px 16px', 
                background: '#f0f8ff', 
                borderRadius: '4px', 
                marginBottom: '16px' 
              }}>
                <div style={{ marginBottom: '8px' }}>
                  <Text strong>Office Address</Text>
                </div>
                <div>
                  123 Innovation Drive, Building 7, Floor 15, Shanghai, China
                </div>
              </div>
              
              <div style={{ marginBottom: '16px' }}>
                <Text strong>Available Time Slots</Text>
              </div>
              
              <Row gutter={[16, 16]}>
                {timeSlots.map((slot) => (
                  <Col span={12} key={slot.id}>
                    <div 
                      style={{ 
                        padding: '12px', 
                        border: '1px solid #e0e0e0', 
                        borderRadius: '4px',
                        background: slot.selected ? '#f0f8ff' : 'white',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                      onClick={() => handleSelectTimeSlot(slot.id)}
                    >
                      <Checkbox 
                        checked={slot.selected} 
                        onChange={() => handleSelectTimeSlot(slot.id)}
                      />
                      <div style={{ marginLeft: '12px' }}>
                        <div>{slot.date} ({slot.weekday})</div>
                        <Space align="center">
                          <ClockCircleOutlined style={{ fontSize: '14px' }} />
                          <Text>{slot.time}</Text>
                        </Space>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
              
              <div style={{ margin: '24px 0 16px' }}>
                <Text strong>Friendly Reminder:</Text>
              </div>
              <ul style={{ paddingLeft: '20px', marginBottom: '16px' }}>
                <li style={{ marginBottom: '8px' }}>Please join 5-10 minutes early and ensure your network connection is stable</li>
                <li>This is a video interview, please make sure your camera is working properly</li>
              </ul>
              
              <div style={{ margin: '24px 0 16px' }}>
                <Text strong>About Us:</Text>
              </div>
              <Paragraph>
                We (Tuwaii Shanghai Technology) are a startup focused on revolutionizing the gaming industry through Artificial Intelligence (AI). We collaborate with overseas partners to develop H5 game platforms and work with well-known anime brands to promote and develop various ACG culture IPs.
              </Paragraph>
              
              <Paragraph>
                Looking forward to your participation!
              </Paragraph>
            </div>
            
            <div style={{ 
              marginTop: '24px', 
              padding: '16px', 
              background: '#fffbe6', 
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'flex-start'
            }}>
              <ExclamationCircleOutlined style={{ fontSize: '18px', color: '#faad14', marginTop: '2px', marginRight: '8px' }} />
              <div>
                <div><Text strong>Confirmation</Text></div>
                <div>Once you confirm your selection, we will send you a confirmation email with all the details.</div>
              </div>
            </div>
            
            <div style={{ marginTop: '24px' }}>
              <Button 
                type="primary" 
                size="large" 
                block
                style={{ height: '48px', fontSize: '16px' }}
                onClick={handleConfirmInterviewPreferences}
              >
                Confirm Interview Preferences
              </Button>
            </div>
          </Card>
        </Content>
      </Layout>
    );
  }

  // Show Upcoming Interviews page with optional candidate details
  if (showUpcomingInterviews) {
    return (
      <Layout style={{ background: '#f5f5f5', minHeight: '100vh' }}>
        <Content style={{ padding: '16px 24px 24px' }}>
          <Title level={2} style={{ marginBottom: '24px' }}>Upcoming Interviews</Title>
          
          <Card bordered={false} style={{ boxShadow: 'none', marginBottom: '24px' }}>
            <Table 
              dataSource={upcomingInterviews} 
              columns={interviewColumns}
              pagination={false}
              rowKey="id"
            />
          </Card>
          
          {!selectedInterview ? (
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center', 
              marginTop: '80px',
              opacity: 0.7
            }}>
              <Avatar size={64} icon={<UserOutlined />} style={{ marginBottom: '16px' }} />
              <Text type="secondary">Select a candidate to view details</Text>
            </div>
          ) : (
            <div ref={detailsRef}>
              <Tabs activeKey={activeDetailTab} onChange={handleTabChange}>
                <TabPane tab="Overview" key="overview">
                  <Card title="Candidate Information" bordered={false} style={{ marginBottom: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                      <Avatar size={80} style={{ marginRight: '24px', backgroundColor: '#f0f0f0' }}>
                        {selectedInterview.candidateName.charAt(0)}
                      </Avatar>
                      <div>
                        <Title level={4}>{selectedInterview.candidateName}</Title>
                        <div style={{ marginBottom: '12px' }}>
                          <Text strong>Position: </Text>
                          <Text>PDM</Text>
                        </div>
                        <div style={{ marginBottom: '12px' }}>
                          <Text strong>Education: </Text>
                          <Text>硕士-安徽工业大学</Text>
                        </div>
                        <div style={{ marginBottom: '12px' }}>
                          <Text strong>Interview Type: </Text>
                          <Tag color="orange">业务面</Tag>
                        </div>
                        <div style={{ marginBottom: '12px' }}>
                          <Text strong>Schedule: </Text>
                          <Text>今天 12:00-13:00</Text>
                          <Tag color="blue" style={{ marginLeft: '8px' }}>
                            <CheckCircleOutlined /> Upcoming
                          </Tag>
                        </div>
                      </div>
                    </div>
                  </Card>
                  
                  <Card title="Interview Details" bordered={false}>
                    <div style={{ marginBottom: '16px' }}>
                      <Text strong style={{ fontSize: '15px' }}>Interview Format: </Text>
                      <Text>Technical Interview</Text>
                    </div>
                    
                    <div style={{ marginBottom: '16px', display: 'flex' }}>
                      <EnvironmentOutlined style={{ marginRight: '8px', marginTop: '4px' }} />
                      <Text>In-person Interview at Tuwaii Office</Text>
                    </div>
                    
                    <div style={{ marginBottom: '16px' }}>
                      <Text strong style={{ fontSize: '15px' }}>Required Documents:</Text>
                      <ul style={{ listStyleType: 'circle', paddingLeft: '20px', marginTop: '8px' }}>
                        <li style={{ marginBottom: '8px' }}>Candidate Resume</li>
                        <li style={{ marginBottom: '8px' }}>Portfolio (if applicable)</li>
                        <li>Interview Question Set</li>
                      </ul>
                    </div>
                    
                    <div>
                      <Text strong style={{ fontSize: '15px' }}>Reminders:</Text>
                      <ul style={{ listStyleType: 'circle', paddingLeft: '20px', marginTop: '8px' }}>
                        <li style={{ marginBottom: '8px' }}>Review the candidate's resume before the interview</li>
                        <li style={{ marginBottom: '8px' }}>Complete the assessment form after the interview</li>
                        <li>Submit feedback within 24 hours</li>
                      </ul>
                    </div>
                    
                    <div style={{ marginTop: '24px' }}>
                      <Button type="primary" size="large">Start Interview</Button>
                    </div>
                  </Card>
                </TabPane>
                
                <TabPane tab="Resume" key="resume">
                  <Card title="Candidate Resume" bordered={false} style={{ marginBottom: '24px' }}>
                    <div style={{ marginBottom: '32px' }}>
                      <Title level={4}>Work Experience</Title>
                      <div style={{ marginTop: '16px' }}>
                        <Title level={5}>PDM Intern</Title>
                        <div style={{ marginBottom: '8px', color: '#666' }}>
                          Tencent, Shanghai • 2022/06 - 2022/12
                        </div>
                        <Paragraph>
                          AI总结所有的经历内容，100字以内; AI总结所有的经历内容，100字以内;
                          AI总结所有的经历内容，100字以内; AI总结所有的经历内容，100字以内;
                          AI总结所有的经历内容，100字以内;
                        </Paragraph>
                      </div>
                    </div>
                    
                    <div style={{ marginBottom: '32px' }}>
                      <Title level={4}>Education</Title>
                      <div style={{ marginTop: '16px' }}>
                        <Title level={5}>硕士-安徽工业大学</Title>
                        <div style={{ marginBottom: '8px', color: '#666' }}>
                          2019 - 2023 • 硕士
                        </div>
                        <div>主修产品设计与开发，GPA 3.8/4.0</div>
                      </div>
                    </div>
                    
                    <div>
                      <Title level={4}>Skills</Title>
                      <div style={{ marginTop: '16px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        <Tag style={{ padding: '4px 8px' }}>产品设计</Tag>
                        <Tag style={{ padding: '4px 8px' }}>用户研究</Tag>
                        <Tag style={{ padding: '4px 8px' }}>原型设计</Tag>
                        <Tag style={{ padding: '4px 8px' }}>需求分析</Tag>
                        <Tag style={{ padding: '4px 8px' }}>数据分析</Tag>
                      </div>
                    </div>
                  </Card>
                </TabPane>
                
                <TabPane tab="Assessment" key="assessment">
                  <Card title="Candidate Assessment" bordered={false}>
                    <div style={{ marginBottom: '32px' }}>
                      <div style={{ marginBottom: '16px' }}>
                        <Text strong style={{ fontSize: '16px' }}>Technical Skills</Text>
                      </div>
                      <Rate count={5} defaultValue={0} />
                    </div>
                    
                    <div style={{ marginBottom: '32px' }}>
                      <div style={{ marginBottom: '16px' }}>
                        <Text strong style={{ fontSize: '16px' }}>Communication Skills</Text>
                      </div>
                      <Rate count={5} defaultValue={0} />
                    </div>
                    
                    <div style={{ marginBottom: '32px' }}>
                      <div style={{ marginBottom: '16px' }}>
                        <Text strong style={{ fontSize: '16px' }}>Problem Solving</Text>
                      </div>
                      <Rate count={5} defaultValue={0} />
                    </div>
                    
                    <div style={{ marginBottom: '32px' }}>
                      <div style={{ marginBottom: '16px' }}>
                        <Text strong style={{ fontSize: '16px' }}>Cultural Fit</Text>
                      </div>
                      <Rate count={5} defaultValue={0} />
                    </div>
                    
                    <div style={{ marginBottom: '32px' }}>
                      <div style={{ marginBottom: '16px' }}>
                        <Text strong style={{ fontSize: '16px' }}>Overall Recommendation</Text>
                      </div>
                      <Select 
                        style={{ width: '100%' }} 
                        placeholder="Select your recommendation"
                      >
                        <Option value="strongly_hire">Strongly Hire</Option>
                        <Option value="hire">Hire</Option>
                        <Option value="neutral">Neutral</Option>
                        <Option value="no_hire">No Hire</Option>
                        <Option value="strongly_no_hire">Strongly No Hire</Option>
                      </Select>
                    </div>
                    
                    <div style={{ marginBottom: '32px' }}>
                      <div style={{ marginBottom: '16px' }}>
                        <Text strong style={{ fontSize: '16px' }}>Feedback</Text>
                      </div>
                      <TextArea 
                        rows={6} 
                        placeholder="Provide detailed feedback about the candidate"
                      />
                    </div>
                    
                    <Button type="primary" icon={<CheckCircleOutlined />}>
                      Submit Assessment
                    </Button>
                  </Card>
                </TabPane>
              </Tabs>
            </div>
          )}
        </Content>
      </Layout>
    );
  }

  // Show Interview System main page with candidate table
  return (
    <Layout style={{ background: '#f5f5f5', minHeight: '100vh' }}>
      <Content style={{ padding: '16px 24px 24px' }}>
        <Title level={2} style={{ marginBottom: '24px' }}>Interview System</Title>
        
        <Card 
          title="Candidate Interview Invitations" 
          bordered={false}
          style={{ boxShadow: 'none', marginBottom: '24px' }}
          headStyle={{ borderBottom: 'none' }}
        >
          <Table 
            dataSource={candidates} 
            columns={columns} 
            rowKey="id"
            pagination={false}
          />
        </Card>
            
        {selectedCandidate && (
          <div ref={setupCardRef}>
            <Card 
              title="Interview Invitation Setup" 
              bordered={false}
              style={{ boxShadow: 'none' }}
              extra={
                <Button 
                  type="text" 
                  icon={<EditOutlined />} 
                  onClick={toggleEmailEditMode}
                >
                  {isEmailEditMode ? 'Preview Email' : 'Edit Email'}
                </Button>
              }
            >
              <Alert
                message={`Preparing interview invitation for ${selectedCandidate.name}`}
                type="info"
                showIcon
                style={{ marginBottom: '16px' }}
              />
              
              <Form layout="vertical">
                <Form.Item label="Interview Type">
                  <Radio.Group 
                    onChange={e => setInterviewType(e.target.value)}
                    value={interviewType}
                  >
                    <Space direction="vertical">
                      <Radio value="inperson">
                        <Space>
                          <UserOutlined />
                          <Text>In-person Interview</Text>
                        </Space>
                      </Radio>
                      <Radio value="video">
                        <Space>
                          <VideoCameraOutlined />
                          <Text>Video Interview</Text>
                        </Space>
                      </Radio>
                    </Space>
                  </Radio.Group>
                </Form.Item>
                
                <Divider>Available Time Slots</Divider>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gridGap: '16px', marginBottom: '20px' }}>
                  {timeSlots.map((slot) => (
                    <Card 
                      key={slot.id}
                      size="small"
                      style={{ 
                        borderColor: '#1677ff', 
                        borderRadius: '8px',
                        height: '104px'
                      }}
                    >
                      <Space align="start">
                        <ClockCircleOutlined style={{ fontSize: '24px', color: '#1677ff' }} />
                        <div>
                          <div>{slot.date} ({slot.weekday})</div>
                          <div>{slot.time}</div>
                        </div>
                      </Space>
                      <div style={{ textAlign: 'right', marginTop: '8px' }}>
                        <Button 
                          type="text" 
                          danger 
                          icon={<DeleteOutlined />}
                          onClick={() => handleDeleteTimeSlot(slot.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </Card>
                  ))}
                  
                  <Card 
                    size="small"
                    style={{ 
                      borderStyle: 'dashed', 
                      borderRadius: '8px',
                      height: '104px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onClick={showTimePicker}
                  >
                    <Space direction="vertical" align="center">
                      <PlusOutlined style={{ fontSize: '24px' }} />
                      <Text>Add Time Slot</Text>
                    </Space>
                  </Card>
                </div>
                
                {timeSlots.length === 0 && (
                  <Empty 
                    description="No time slots available. Add a time slot to continue." 
                    image={Empty.PRESENTED_IMAGE_SIMPLE} 
                  />
                )}
                
                <Divider>Email Preview</Divider>
                
                {!isEmailEditMode && (
                  <Alert 
                    message="System will send the following email template to candidates" 
                    type="info" 
                    showIcon 
                    style={{ marginBottom: '16px' }}
                  />
                )}
                
                {renderEmailPreview()}
                
                <div style={{ marginTop: '24px' }}>
                  <Button 
                    type="primary" 
                    size="large" 
                    block
                    onClick={handleSendInterviewInvitation}
                  >
                    Send Interview Invitation
                  </Button>
                </div>
              </Form>
            </Card>
          </div>
        )}
      </Content>
      
      <Modal
        title="Select Interview Time Slot"
        open={isTimePickerOpen}
        onOk={handleTimePickerOk}
        onCancel={handleTimePickerCancel}
        okText="Add Time Slot"
        cancelText="Cancel"
      >
        <Form layout="vertical">
          <Form.Item label="Select Date">
            <DatePicker 
              style={{ width: '100%' }}
              value={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              disabledDate={disabledDate}
              format="YYYY-MM-DD"
            />
          </Form.Item>
          <Form.Item label="Select Time Slot">
            <Select 
              style={{ width: '100%' }}
              value={selectedTime}
              onChange={(value) => setSelectedTime(value)}
            >
              {timeOptions.map(time => (
                <Option key={time} value={time}>{time}</Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
} 