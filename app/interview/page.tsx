'use client';

import React, { useState } from 'react';
import { Typography, Card, Alert, Button, Space } from 'antd';
import PageLayoutWithNav from '@/app/components/PageLayoutWithNav';
import CandidateResponse from '@/app/components/interview/CandidateResponse';
import dayjs from 'dayjs';
import { TimeSlot, InterviewType } from '@/app/types/interview';

const { Title, Text, Paragraph } = Typography;

export default function InterviewPage() {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);

  // Generate time slots for the next 5 business days
  const generateTimeSlots = (): TimeSlot[] => {
    const today = dayjs();
    const slots: TimeSlot[] = [];
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    // Generate 5 morning slots (one for each of the next 5 days)
    for (let i = 0; i < 5; i++) {
      const date = today.add(i + 1, 'day');
      const day = date.day();
      
      // Morning slot
      slots.push({
        id: `morning-${i}`,
        date: date.format('YYYY-MM-DD'),
        weekday: weekdays[day],
        time: '10:00 - 11:00',
        available: true
      });
      
      // Afternoon slot
      slots.push({
        id: `afternoon-${i}`,
        date: date.format('YYYY-MM-DD'),
        weekday: weekdays[day],
        time: '14:00 - 15:00',
        available: true
      });
    }
    
    return slots;
  };

  const handleConfirmInterview = async (selectedTimeSlot: TimeSlot) => {
    // Simulate API call delay
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setSelectedSlot(selectedTimeSlot);
        setIsConfirmed(true);
        resolve();
      }, 1500);
    });
  };

  const renderEmailHeader = () => (
    <Card style={{ marginBottom: '24px' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <Text type="secondary">From: </Text>
          <Text strong>hr@tuwaii.com</Text>
        </div>
        <div>
          <Text type="secondary">To: </Text>
          <Text strong>candidate@example.com</Text>
        </div>
        <div>
          <Text type="secondary">Subject: </Text>
          <Text strong>Interview Invitation - Frontend Developer Position at Tuwaii Technologies</Text>
        </div>
        <Alert
          message="This page simulates what a candidate would see after clicking the scheduling link in the invitation email."
          type="info"
          showIcon
          style={{ marginTop: '16px' }}
        />
      </Space>
    </Card>
  );

  return (
    <PageLayoutWithNav>
      {!isConfirmed ? (
        <>
          <Title level={2}>Interview Scheduling</Title>
          {renderEmailHeader()}
          <Paragraph>
            Please select a time slot for your interview at Tuwaii Technologies.
          </Paragraph>
          <CandidateResponse
            companyName="Tuwaii Technologies"
            position="Frontend Developer"
            interviewType={InterviewType.VIDEO}
            timeSlots={generateTimeSlots()}
            onConfirm={handleConfirmInterview}
          />
        </>
      ) : (
        <>
          <Title level={2}>Interview Time Confirmed</Title>
          <Card>
            <Alert
              message="Interview Successfully Scheduled"
              description="Thank you for confirming your interview time. We look forward to speaking with you!"
              type="success"
              showIcon
              style={{ marginBottom: '24px' }}
            />
            
            {selectedSlot && (
              <Card title="Your Interview Details" style={{ marginBottom: '24px' }}>
                <Paragraph>
                  <Text strong>Company: </Text>
                  <Text>Tuwaii Technologies</Text>
                </Paragraph>
                <Paragraph>
                  <Text strong>Position: </Text>
                  <Text>Frontend Developer</Text>
                </Paragraph>
                <Paragraph>
                  <Text strong>Interview Type: </Text>
                  <Text>Video Interview</Text>
                </Paragraph>
                <Paragraph>
                  <Text strong>Date: </Text>
                  <Text>{dayjs(selectedSlot.date).format('MMMM DD, YYYY (dddd)')}</Text>
                </Paragraph>
                <Paragraph>
                  <Text strong>Time: </Text>
                  <Text>{selectedSlot.time}</Text>
                </Paragraph>
              </Card>
            )}
            
            <Paragraph>
              <Text strong>Next Steps:</Text>
            </Paragraph>
            <ul>
              <li>You will receive a calendar invitation shortly</li>
              <li>For video interviews, you will receive a meeting link 1 hour before the scheduled time</li>
              <li>If you need to reschedule, please contact hr@tuwaii.com at least 24 hours before the scheduled time</li>
            </ul>
            
            <Button type="primary" onClick={() => setIsConfirmed(false)}>
              Return to Scheduling Page
            </Button>
          </Card>
        </>
      )}
    </PageLayoutWithNav>
  );
} 