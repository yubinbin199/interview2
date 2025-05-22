'use client';

import React, { useState } from 'react';
import { Card, Typography, Select, Space, Divider } from 'antd';
import type { Region } from '../../types/interview';
import styles from './InterviewStyles.module.css';

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;

// Email templates for different regions
const REJECTION_TEMPLATES: Record<Region, { subject: string; body: string }> = {
  Shanghai: {
    subject: '面试结果通知',
    body: `尊敬的候选人：

感谢您参加我们的面试。经过慎重考虑，我们认为目前您的技能和经验与该职位的要求不太匹配。

祝您求职顺利！

此致`,
  },
  Taipei: {
    subject: '面試結果通知',
    body: `親愛的候選人：

感謝您參加我們的面試。經過審慎考慮，我們認為目前您的技能和經驗與該職位的要求不太匹配。

祝您求職順利！

此致`,
  },
  Japan: {
    subject: '面接結果のお知らせ',
    body: `応募者様：

面接にご参加いただき、ありがとうございました。慎重に検討させていただきましたが、残念ながら今回は採用を見送らせていただくことになりました。

今後のご活躍をお祈りしております。

敬具`,
  },
};

const RejectionMailPreview: React.FC = () => {
  const [region, setRegion] = useState<Region>('Shanghai');
  const template = REJECTION_TEMPLATES[region];

  const handleRegionChange = (value: Region) => {
    setRegion(value);
  };

  return (
    <Card className={styles.rejectionCard}>
      <Title level={4}>Interview Rejection Email Preview</Title>
      <Space direction="vertical" style={{ width: '100%', marginBottom: 20 }}>
        <Text>Select region to view the corresponding rejection email template:</Text>
        <Select 
          value={region} 
          onChange={handleRegionChange}
          className={styles.regionSelector}
        >
          <Option value="Shanghai">Shanghai (简体中文)</Option>
          <Option value="Taipei">Taipei (繁体中文)</Option>
          <Option value="Japan">Japan (日本語)</Option>
        </Select>
      </Space>

      <Card 
        type="inner"
        className={styles.interviewCardInner}
        title={
          <Space className={styles.rejectionSubject}>
            <Text strong>Subject:</Text>
            <Text>{template.subject}</Text>
          </Space>
        }
      >
        <div className={styles.rejectionBody}>
          {template.body.split('\n').map((line, index) => (
            <Paragraph key={index} style={{ whiteSpace: 'pre-line' }}>
              {line}
            </Paragraph>
          ))}
        </div>
      </Card>
    </Card>
  );
};

export default RejectionMailPreview; 