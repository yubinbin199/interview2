'use client';

import React, { useState } from 'react';
import { Typography, Steps, Card, Button, message } from 'antd';
import InterviewInvitationForm from '../components/interview/InterviewInvitation';
import CandidateResponse from '../components/interview/CandidateResponse';
import PageLayoutWithNav from '../components/PageLayoutWithNav';
import dayjs from 'dayjs';
import { InterviewType, TimeSlot, InterviewInvitation } from '../types/interview';

const { Title, Text } = Typography;

export default function InterviewFlowPage() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [invitationSent, setInvitationSent] = useState<boolean>(false);
  const [timeSlotSelected, setTimeSlotSelected] = useState<TimeSlot | null>(null);
  const [interviewType, setInterviewType] = useState<InterviewType>('video');
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);

  // Mock data
  const mockInvitation: InterviewInvitation = {
    id: '1',
    candidate: {
      id: '101',
      name: 'John Smith',
      email: 'john.smith@example.com',
      region: 'Shanghai',
      position: 'Frontend Developer'
    },
    interviewers: [],
    type: 'video',
    status: 'pending',
    createdAt: new Date().toISOString(),
    expiresAt: dayjs().add(7, 'day').toISOString()
  };

  // Generate time slots for the next 5 business days
  const generateTimeSlots = (): TimeSlot[] => {
    const today = dayjs();
    const slots: TimeSlot[] = [];
    
    for (let i = 0; i < 5; i++) {
      const date = today.add(i + 1, 'day');
      slots.push({
        date: date.format('YYYY-MM-DD'),
        start: '10:00',
        end: '11:00',
      });
      
      // Add afternoon slot
      slots.push({
        date: date.format('YYYY-MM-DD'),
        start: '14:00',
        end: '15:00',
      });
    }
    
    return slots;
  };

  const handleSendInvitation = async (values: { type: InterviewType; timeSlot: TimeSlot }) => {
    // Save the selected interview type and available time slots
    setInterviewType(values.type);
    setAvailableSlots(generateTimeSlots());

    // Simulate API call delay
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setInvitationSent(true);
        message.success('Invitation sent to the candidate');
        setCurrentStep(1);
        resolve();
      }, 1500);
    });
  };

  const handleCandidateConfirm = async (selectedSlot: TimeSlot) => {
    // Simulate API call delay
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setTimeSlotSelected(selectedSlot);
        message.success('Candidate confirmed the interview time');
        setCurrentStep(2);
        resolve();
      }, 1500);
    });
  };

  const handleReset = () => {
    setCurrentStep(0);
    setInvitationSent(false);
    setTimeSlotSelected(null);
  };

  return (
    <PageLayoutWithNav>
      <Title level={2}>Interview Process Flow</Title>
      
      <Steps
        current={currentStep}
        items={[
          {
            title: 'Send Invitation',
          },
          {
            title: 'Candidate Selection',
          },
          {
            title: 'Interview Confirmed',
          },
        ]}
        style={{ marginBottom: '24px' }}
      />

      <Card style={{ marginBottom: '24px' }}>
        {currentStep === 0 && (
          <>
            <Title level={4}>HR View - Send Interview Invitation</Title>
            <InterviewInvitationForm
              invitation={mockInvitation}
              onSubmit={handleSendInvitation}
              onResend={() => Promise.resolve()}
            />
          </>
        )}

        {currentStep === 1 && (
          <>
            <Title level={4}>Candidate View - Select Interview Time</Title>
            <Text type="secondary" style={{ display: 'block', marginBottom: '16px' }}>
              This simulates what the candidate would see after receiving the email invitation.
            </Text>
            <CandidateResponse
              companyName="Tuwaii Technologies"
              position="Frontend Developer"
              interviewType={interviewType}
              timeSlots={availableSlots}
              onConfirm={handleCandidateConfirm}
            />
          </>
        )}

        {currentStep === 2 && (
          <>
            <Title level={4}>Interview Confirmed</Title>
            <Card>
              <Text>The interview has been confirmed for:</Text>
              {timeSlotSelected && (
                <div style={{ marginTop: '16px', background: '#f6ffed', padding: '16px', borderRadius: '8px', border: '1px solid #b7eb8f' }}>
                  <Text strong>Date: </Text>
                  <Text>{dayjs(timeSlotSelected.date).format('MMMM DD, YYYY (dddd)')}</Text>
                  <br />
                  <Text strong>Time: </Text>
                  <Text>{timeSlotSelected.start} - {timeSlotSelected.end}</Text>
                  <br />
                  <Text strong>Type: </Text>
                  <Text>{interviewType === 'video' ? 'Video Interview' : 'On-site Interview'}</Text>
                </div>
              )}
              <Button 
                type="primary" 
                onClick={handleReset} 
                style={{ marginTop: '16px' }}
              >
                Start New Interview Process
              </Button>
            </Card>
          </>
        )}
      </Card>
    </PageLayoutWithNav>
  );
} 