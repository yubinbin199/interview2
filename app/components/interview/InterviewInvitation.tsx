'use client';

import React, { useState, useEffect } from 'react';
import {
  Form,
  Checkbox,
  Button,
  Card,
  Typography,
  Space,
  Alert,
  message,
  Row,
  Col,
  Tag,
} from 'antd';
import {
  VideoCameraOutlined,
  BankOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
  MailOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
// import businessDays from 'dayjs-business-days';
import { InterviewInvitation, InterviewType, TimeSlot, Interviewer } from '../../types/interview';
import styles from './InterviewStyles.module.css';

// Configure dayjs with business days plugin
// dayjs.extend(businessDays);

const { Title, Text, Paragraph } = Typography;

interface Props {
  invitation: InterviewInvitation;
  onSubmit: (values: {
    type: InterviewType;
    timeSlot: TimeSlot;
  }) => Promise<void>;
  onResend: () => Promise<void>;
}

const InterviewInvitationForm: React.FC<Props> = ({
  invitation,
  onSubmit,
  onResend,
}) => {
  const [form] = Form.useForm();
  const [selectedType, setSelectedType] = useState<InterviewType>(InterviewType.IN_PERSON);
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(false);

  // Generate 5 time slots for the next 5 working days
  useEffect(() => {
    generateTimeSlots();
  }, []);

  const generateTimeSlots = () => {
    const today = dayjs();
    const slots: TimeSlot[] = [];
    
    // Generate 5 time slots, one for each of the next 5 working days
    for (let i = 0; i < 5; i++) {
      // Use normal dayjs add days instead of business days
      const date = today.add(i + 1, 'day');
      const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      slots.push({
        id: `slot-${i}`,
        date: date.format('YYYY-MM-DD'),
        time: '10:00 - 11:00',
        weekday: weekdays[date.day()],
        available: true
      });
    }
    
    setAvailableSlots(slots);
  };

  const handleSubmit = async () => {
    if (!selectedType) {
      message.error('Please select an interview type');
      return;
    }

    try {
      setLoading(true);
      await onSubmit({
        type: selectedType,
        // Use the first time slot as the selected one since user doesn't select
        timeSlot: availableSlots[0],
      });
      message.success('Interview invitation sent successfully');
    } catch (error) {
      message.error('Failed to send interview invitation');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      setLoading(true);
      await onResend();
      message.success('Interview invitation resent successfully');
    } catch (error) {
      message.error('Failed to resend invitation');
    } finally {
      setLoading(false);
    }
  };

  const handleTypeChange = (type: InterviewType) => {
    setSelectedType(type);
  };

  const handleRemoveTimeSlot = (slotToRemove: TimeSlot) => {
    setAvailableSlots(availableSlots.filter(slot => 
      !(slot.date === slotToRemove.date && slot.time === slotToRemove.time)
    ));
  };

  if (invitation.status === 'cancelled') {
    return (
      <Card className={styles.interviewCard}>
        <Alert
          message="Interview Invitation Cancelled"
          description="This interview invitation has been cancelled. Would you like to send a new invitation?"
          type="warning"
          action={
            <Button type="primary" onClick={handleResend} loading={loading}>
              Send New Invitation
            </Button>
          }
        />
      </Card>
    );
  }

  const renderEmailPreview = () => {
    const candidateName = invitation.candidateName || 'Candidate';
    
    return (
      <Card 
        title={
          <Space>
            <MailOutlined />
            <Text strong>Email Content</Text>
          </Space>
        }
        className={styles.emailPreview}
      >
        <div className={styles.emailContent}>
          <Paragraph>
            {candidateName}，你好！<br/>
            我是唯有一初心科技的HR, 诚邀你参加面试，以下是一些面试细节，请仔细阅读查收。
          </Paragraph>
          
          <Paragraph strong>【温馨提示】</Paragraph>
          <Paragraph>
            •请提前5-10分钟上线，并保持网络通畅，会议为视频会议，请提前确保摄像头正常工作<br/>
            •面试过程中，面试官可能通过手机或者电脑查看你的简历，记录你回答的要点
          </Paragraph>
          
          <Paragraph strong>【关于我们】</Paragraph>
          <Paragraph>
            我们（Tuwaii上海途未科技）是一家专注于利用人工智能（Al）革新游戏产业的初创公司。<br/>
            我们积极与海外的合作伙伴共同开发H5游戏平台，并与知名动漫品牌合作，致力于推广和发扬各种二次元文化IP。<br/>
            我们的游戏平台已成功推出30款以上精选二次元动画的游戏作品。我们的游戏玩家遍布全球，每月有超过200万玩家访问我们的游戏平台，总计高达数亿次的广告曝光。<br/>
            你也可以通过以下途径了解更多关于我们的信息。<br/>
            Company page: https://ctw.inc/?lang=ja<br/>
            Talent interview: https://www.linkedin.com/newsletters/path-to-ctw-6967313915894530048/<br/>
            Game platform: https://g123.jp/?lang=en
          </Paragraph>
          
          <Paragraph>
            有兴趣可以尝试一下下面两款游戏。<br/>
            https://h5.g123.jp/game/arifure?lang=en<br/>
            https://h5.g123.jp/game/negima?lang=en
          </Paragraph>
          
          <Paragraph>
            期待你的加入！
          </Paragraph>
        </div>
      </Card>
    );
  };

  return (
    <Card className={styles.interviewCard}>
      <Title level={4}>Interview Invitation</Title>
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          type: selectedType,
        }}
      >
        <Form.Item
          name="type"
          label="Interview Type"
          rules={[{ required: true, message: 'Please select interview type' }]}
          className={styles.interviewType}
        >
          <div className={styles.interviewTypeCheckboxes}>
            <div className={`${styles.typeCheckbox} ${selectedType === InterviewType.IN_PERSON ? styles.typeCheckboxSelected : ''}`}>
              <Checkbox 
                checked={selectedType === InterviewType.IN_PERSON} 
                onChange={() => handleTypeChange(InterviewType.IN_PERSON)}
              >
                <Space>
                  <BankOutlined />
                  On-site Interview
                </Space>
              </Checkbox>
            </div>
            
            <div className={`${styles.typeCheckbox} ${selectedType === InterviewType.VIDEO ? styles.typeCheckboxSelected : ''}`}>
              <Checkbox 
                checked={selectedType === InterviewType.VIDEO} 
                onChange={() => handleTypeChange(InterviewType.VIDEO)}
              >
                <Space>
                  <VideoCameraOutlined />
                  Video Interview
                </Space>
              </Checkbox>
            </div>
          </div>
        </Form.Item>

        <Form.Item
          label={
            <Space>
              <CalendarOutlined />
              Select Time Slot
            </Space>
          }
          required
          className={styles.timeSlotContainer}
        >
          <Row gutter={[16, 16]}>
            {availableSlots.map((slot, index) => (
              <Col xs={24} sm={12} md={8} lg={6} xl={4} key={index}>
                <div className={styles.timeSlotCard}>
                  <div className={styles.timeSlotDate}>{dayjs(slot.date).format('MMM DD (ddd)')}</div>
                  <div className={styles.timeSlotTime}>
                    <ClockCircleOutlined /> {slot.time}
                  </div>
                  <Button 
                    type="text" 
                    danger 
                    icon={<DeleteOutlined />} 
                    size="small"
                    className={styles.deleteButton}
                    onClick={() => handleRemoveTimeSlot(slot)}
                  />
                </div>
              </Col>
            ))}
          </Row>
        </Form.Item>

        {renderEmailPreview()}

        <Form.Item className={styles.submitButtonContainer}>
          <Button 
            type="primary" 
            onClick={handleSubmit}
            loading={loading}
            className={styles.confirmButton}
            disabled={!selectedType || availableSlots.length === 0}
          >
            Send Invitation
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default InterviewInvitationForm; 