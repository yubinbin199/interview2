'use client';

import React, { useState, useEffect } from 'react';
import { Card, Form, Radio, Checkbox, Button, Typography, Space, Tag, Row, Col, Divider, Alert } from 'antd';
import { CalendarOutlined, VideoCameraOutlined, UserOutlined, CheckCircleOutlined, ClockCircleOutlined, EnvironmentOutlined, MailOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';

const { Title, Paragraph, Text } = Typography;

interface TimeSlot {
  id: string;
  time: string;
  date: string;
  weekday: string;
  available: boolean;
}

export default function Interviewer() {
  const router = useRouter();
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  
  // Generate 5 weekday time slots initially
  useEffect(() => {
    if (timeSlots.length === 0) {
      const newSlots: TimeSlot[] = [];
      const today = dayjs();
      const startHour = 9; // Starting at 9 AM
      
      // Generate 5 weekdays starting from tomorrow
      let currentDate = today.add(1, 'day');
      let slotCount = 0;
      
      while (slotCount < 5) {
        const day = currentDate.day();
        // Skip weekends (0 = Sunday, 6 = Saturday)
        if (day !== 0 && day !== 6) {
          const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
          newSlots.push({
            id: `slot-${slotCount}`,
            time: `${startHour + slotCount % 5}:00 - ${startHour + slotCount % 5 + 1}:00`,
            date: currentDate.format('YYYY-MM-DD'),
            weekday: weekdays[day],
            available: true
          });
          slotCount++;
        }
        currentDate = currentDate.add(1, 'day');
      }
      
      setTimeSlots(newSlots);
    }
  }, [timeSlots.length]);

  const handleSlotSelection = (slotId: string) => {
    setSelectedSlot(selectedSlot === slotId ? null : slotId);
  };

  const handleSubmit = () => {
    // Navigate to the Interviewer Dashboard tab
    router.push('/interview-system?tab=interviewer-dashboard');
  };

  return (
    <div>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card 
            title="Interview Invitation Letter" 
            variant="borderless"
            extra={<MailOutlined />}
          >
            <div style={{ background: '#f5f5f5', padding: 16, borderRadius: 8 }}>
              <Paragraph>
                <Text strong>Hello [Candidate Name],</Text>
              </Paragraph>
              <Paragraph>
                I'm the HR from Tuwaii Technology. We'd like to invite you for an interview. Please find the details below.
              </Paragraph>
              <Paragraph>
                You have been invited to an interview with Tuwaii Technology. Please select your interview preferences below.
              </Paragraph>
              
              <div style={{ marginBottom: 16 }}>
                <Card 
                  size="small" 
                  style={{ 
                    backgroundColor: '#f0f7ff',
                    borderColor: '#1677ff',
                    borderRadius: '8px',
                    marginBottom: 12
                  }}
                >
                  <Space>
                    <EnvironmentOutlined />
                    <span>In-person Interview at Tuwaii Office</span>
                  </Space>
                </Card>
                
                <Alert 
                  message="Office Address"
                  description="123 Innovation Drive, Building 7, Floor 15, Shanghai, China"
                  type="info"
                  icon={<EnvironmentOutlined />}
                  style={{ marginBottom: 16 }}
                />
                
                <Text strong>Available Time Slots</Text>
                <div style={{ marginTop: 8, marginBottom: 16 }}>
                  <Row gutter={[16, 16]}>
                    {timeSlots.map((slot) => (
                      <Col key={slot.id} span={24} md={12}>
                        <Card 
                          size="small"
                          hoverable
                          style={{ 
                            borderColor: selectedSlot === slot.id ? '#1677ff' : '#d9d9d9', 
                            borderRadius: '8px',
                            backgroundColor: selectedSlot === slot.id ? '#e6f7ff' : 'white'
                          }}
                          onClick={() => handleSlotSelection(slot.id)}
                        >
                          <Space align="center">
                            <Checkbox checked={selectedSlot === slot.id} onChange={() => handleSlotSelection(slot.id)} />
                            <div>
                              <div><Text strong>{slot.date} ({slot.weekday})</Text></div>
                              <div><ClockCircleOutlined style={{ marginRight: 8 }} />{slot.time}</div>
                            </div>
                          </Space>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </div>
              </div>
              
              <Paragraph>
                <Text strong>Friendly Reminder:</Text><br/>
                • Please join 5-10 minutes early and ensure your network connection is stable<br/>
                • This is a video interview, please make sure your camera is working properly<br/>
              </Paragraph>
              <Paragraph>
                <Text strong>About Us:</Text><br/>
                We (Tuwaii Shanghai Technology) are a startup focused on revolutionizing the gaming industry through Artificial Intelligence (AI).
                We collaborate with overseas partners to develop H5 game platforms and work with well-known anime brands to promote and develop various ACG culture IPs.
              </Paragraph>
              <Paragraph>
                Looking forward to your participation!
              </Paragraph>
            </div>
          </Card>
        </Col>
        
        <Col span={24}>
          <Card variant="borderless">
            <Alert 
              message="Confirmation"
              description="Once you confirm your selection, we will send you a confirmation email with all the details."
              type="warning"
              showIcon
              style={{ marginBottom: 16 }}
            />
            
            <Button 
              type="primary" 
              size="large" 
              onClick={handleSubmit} 
              disabled={!selectedSlot}
              block
            >
              Confirm Interview Preferences
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
} 