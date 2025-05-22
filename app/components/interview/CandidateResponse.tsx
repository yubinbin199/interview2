'use client';

import React, { useState } from 'react';
import {
  Card,
  Typography,
  Button,
  Space,
  Row,
  Col,
  Steps,
  message,
  Radio,
  Tag,
  Alert,
} from 'antd';
import {
  CalendarOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  VideoCameraOutlined,
  BankOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import styles from './InterviewStyles.module.css';
import { InterviewType, TimeSlot } from '../../types/interview';

const { Title, Text, Paragraph } = Typography;

interface CandidateResponseProps {
  companyName: string;
  position: string;
  interviewType: InterviewType;
  timeSlots: TimeSlot[];
  onConfirm: (selectedSlot: TimeSlot) => Promise<void>;
}

const CandidateResponse: React.FC<CandidateResponseProps> = ({
  companyName,
  position,
  interviewType,
  timeSlots,
  onConfirm,
}) => {
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleTimeSlotSelect = (slot: TimeSlot) => {
    setSelectedSlot(slot);
  };

  const handleConfirm = async () => {
    if (!selectedSlot) {
      message.error('Please select a time slot');
      return;
    }

    try {
      setLoading(true);
      await onConfirm(selectedSlot);
      setCurrentStep(1);
      message.success('Interview time confirmed successfully');
    } catch (error) {
      message.error('Failed to confirm interview time');
    } finally {
      setLoading(false);
    }
  };

  const renderEmailContent = () => (
    <Card
      className={styles.emailPreview}
      title={
        <Space>
          <CalendarOutlined />
          <Text strong>Interview Invitation</Text>
        </Space>
      }
    >
      <div className={styles.emailContent}>
        <Paragraph>
          <Text strong>Dear Candidate,</Text>
        </Paragraph>
        
        <Paragraph>
          Thank you for your interest in joining {companyName}. We would like to invite you to an interview for the {position} position.
        </Paragraph>
        
        <Paragraph>
          <Text strong>Interview Type: </Text>
          {interviewType === 'video' ? (
            <Tag icon={<VideoCameraOutlined />} color="blue">Video Interview</Tag>
          ) : (
            <Tag icon={<BankOutlined />} color="green">On-site Interview</Tag>
          )}
        </Paragraph>
        
        <Paragraph>
          <Text strong>Please select one of the available time slots below that works best for you:</Text>
        </Paragraph>
      </div>
    </Card>
  );

  const renderTimeSlotSelection = () => (
    <Card className={styles.interviewCardInner}>
      <Radio.Group 
        className={styles.timeSlotRadioGroup}
        value={selectedSlot ? `${selectedSlot.date}-${selectedSlot.start}` : ''}
      >
        <Row gutter={[16, 16]}>
          {timeSlots.map((slot, index) => (
            <Col xs={24} sm={12} md={8} lg={6} key={index}>
              <div 
                className={`${styles.timeSlotCard} ${selectedSlot && selectedSlot.date === slot.date && selectedSlot.start === slot.start ? styles.timeSlotCardSelected : ''}`}
                onClick={() => handleTimeSlotSelect(slot)}
              >
                <Radio value={`${slot.date}-${slot.start}`} className={styles.slotRadio} />
                <div className={styles.timeSlotDate}>
                  {dayjs(slot.date).format('MMM DD (ddd)')}
                </div>
                <div className={styles.timeSlotTime}>
                  <ClockCircleOutlined /> {slot.start} - {slot.end}
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Radio.Group>
    </Card>
  );

  const renderConfirmation = () => (
    <Card className={styles.interviewCardInner}>
      <Alert
        message="Interview Time Confirmed"
        description={
          <Space direction="vertical">
            <Text>Thank you for confirming your interview time. We look forward to meeting you!</Text>
            {selectedSlot && (
              <div>
                <Text strong>Your interview is scheduled for:</Text>
                <div className={styles.confirmedTimeSlot}>
                  <div className={styles.timeSlotDate}>
                    {dayjs(selectedSlot.date).format('MMMM DD, YYYY (dddd)')}
                  </div>
                  <div className={styles.timeSlotTime}>
                    <ClockCircleOutlined /> {selectedSlot.start} - {selectedSlot.end}
                  </div>
                </div>
              </div>
            )}
          </Space>
        }
        type="success"
        showIcon
        icon={<CheckCircleOutlined />}
      />
    </Card>
  );

  return (
    <Card className={styles.interviewCard}>
      <Title level={4}>Interview Scheduling</Title>
      
      <Steps
        current={currentStep}
        items={[
          {
            title: 'Select Time',
            icon: <CalendarOutlined />,
          },
          {
            title: 'Confirmed',
            icon: <CheckCircleOutlined />,
          },
        ]}
        className={styles.stepsContainer}
      />
      
      {currentStep === 0 ? (
        <>
          {renderEmailContent()}
          {renderTimeSlotSelection()}
          <div className={styles.submitButtonContainer}>
            <Button
              type="primary"
              onClick={handleConfirm}
              loading={loading}
              disabled={!selectedSlot}
              className={styles.confirmButton}
            >
              Confirm Interview Time
            </Button>
          </div>
        </>
      ) : (
        renderConfirmation()
      )}
    </Card>
  );
};

export default CandidateResponse; 