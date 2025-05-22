'use client';

import React from 'react';
import {
  Card,
  List,
  Typography,
  Tag,
  Space,
  Avatar,
  Row,
  Col,
  Tabs,
  Button,
  Tooltip,
  Image,
} from 'antd';
import {
  ClockCircleOutlined,
  CheckCircleOutlined,
  UserOutlined,
  FileImageOutlined,
  CalendarOutlined,
  PauseCircleOutlined,
} from '@ant-design/icons';
import styles from './TaskManagement.module.css';

const { Title, Text, Paragraph } = Typography;

// Mock data for tasks
const MOCK_TASKS = [
  {
    id: '1',
    title: 'SNS投稿 関錦カチャ導線ケア',
    status: 'in_progress',
    assignee: {
      name: 'ansatsu',
      avatar: 'https://xsgames.co/randomusers/avatar.php?g=pixel&key=1',
    },
    duration: '5h 45min',
    deadline: '04-28',
    description: 'プロモ マスター ja 森',
    references: [
      {
        url: 'https://ctwbox.g123.jp/?link_id=f40bdbabeb1542a7b1d0f56445bafea4',
        image: 'https://picsum.photos/200/300?random=1',
      },
    ],
    output: {
      type: 'Creative',
      status: 'Clean',
    },
    project: 'Marketing Campaign',
    tags: ['SNS', 'Creative', 'Promotion'],
  },
  {
    id: '2',
    title: 'アズサちゃん★着せ替えCP メインバナー',
    status: 'pending',
    assignee: {
      name: 'creative',
      avatar: 'https://xsgames.co/randomusers/avatar.php?g=pixel&key=2',
    },
    duration: '2h 30min',
    deadline: '05-15',
    description: 'Banner design for Azusa character costume change campaign',
    references: [
      {
        url: '#',
        image: 'https://picsum.photos/200/300?random=2',
      },
    ],
    output: {
      type: 'Banner',
      status: 'Waiting',
    },
    project: 'Character Campaign',
    tags: ['Design', 'Banner', 'Campaign'],
  },
  {
    id: '3',
    title: 'Weekly Performance Report',
    status: 'completed',
    assignee: {
      name: 'analyst',
      avatar: 'https://xsgames.co/randomusers/avatar.php?g=pixel&key=3',
    },
    duration: '4h',
    deadline: '04-25',
    description: 'Compile and analyze weekly performance metrics',
    references: [
      {
        url: '#',
        image: 'https://picsum.photos/200/300?random=3',
      },
    ],
    output: {
      type: 'Report',
      status: 'Approved',
    },
    project: 'Analytics',
    tags: ['Report', 'Analytics', 'Weekly'],
  },
  {
    id: '4',
    title: 'Character Illustration Review',
    status: 'pending',
    assignee: {
      name: 'designer',
      avatar: 'https://xsgames.co/randomusers/avatar.php?g=pixel&key=4',
    },
    duration: '3h',
    deadline: '05-10',
    description: 'Review and provide feedback on new character illustrations',
    references: [
      {
        url: '#',
        image: 'https://picsum.photos/200/300?random=4',
      },
    ],
    output: {
      type: 'Review',
      status: 'Pending Review',
    },
    project: 'Character Design',
    tags: ['Design', 'Review', 'Character'],
  },
];

const TaskManagement: React.FC = () => {
  const renderTaskCard = (task: typeof MOCK_TASKS[0]) => (
    <Card
      className={styles.taskCard}
      variant="outlined"
      style={{ marginBottom: 16 }}
    >
      <div className={styles.taskHeader}>
        <Space direction="vertical" size="small" style={{ width: '100%' }}>
          <Space align="center">
            <Title level={4} style={{ margin: 0 }}>{task.title}</Title>
            {task.status === 'in_progress' && (
              <Tag color="processing">In Progress</Tag>
            )}
            {task.status === 'completed' && (
              <Tag color="success">Completed</Tag>
            )}
            {task.status === 'pending' && (
              <Tag color="warning">Pending</Tag>
            )}
          </Space>
          <Paragraph type="secondary">{task.description}</Paragraph>
          <div className={styles.taskTags}>
            {task.tags.map(tag => (
              <Tag key={tag} color="blue">{tag}</Tag>
            ))}
          </div>
        </Space>
        <Space direction="vertical" align="end">
          <div className={styles.assigneeInfo}>
            <Avatar size="small" icon={<UserOutlined />} src={task.assignee.avatar} />
            <Text>{task.assignee.name}</Text>
          </div>
          <div className={styles.deadlineInfo}>
            <Space>
              <ClockCircleOutlined />
              <Text>{task.duration}</Text>
              <CalendarOutlined />
              <Text>{task.deadline}</Text>
            </Space>
          </div>
        </Space>
      </div>
      
      <div className={styles.taskContent}>
        <Space>
          {task.output && (
            <Tag color={
              task.status === 'completed' ? 'success' : 
              task.status === 'pending' ? 'warning' : 'processing'
            }>
              {task.output.status}
            </Tag>
          )}
          <Tooltip title="View References">
            <Button type="text" icon={<FileImageOutlined />}>
              References
            </Button>
          </Tooltip>
        </Space>
      </div>

      {task.references && task.references.length > 0 && (
        <div className={styles.taskFooter}>
          <Space size={[8, 8]} wrap>
            {task.references.map((ref, index) => (
              <div key={index} className={styles.referenceImage}>
                <Image
                  src={ref.image}
                  width={100}
                  height={100}
                  style={{ objectFit: 'cover' }}
                  preview={{
                    mask: <FileImageOutlined />,
                  }}
                />
              </div>
            ))}
          </Space>
        </div>
      )}
    </Card>
  );

  // Define tabs items
  const items = [
    {
      key: '1',
      label: (
        <span>
          <ClockCircleOutlined />
          In Progress ({MOCK_TASKS.filter(t => t.status === 'in_progress').length})
        </span>
      ),
      children: (
        <div className={styles.tabContent}>
          <List
            dataSource={MOCK_TASKS.filter(task => task.status === 'in_progress')}
            renderItem={renderTaskCard}
          />
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <span>
          <PauseCircleOutlined />
          Pending ({MOCK_TASKS.filter(t => t.status === 'pending').length})
        </span>
      ),
      children: (
        <div className={styles.tabContent}>
          <List
            dataSource={MOCK_TASKS.filter(task => task.status === 'pending')}
            renderItem={renderTaskCard}
          />
        </div>
      ),
    },
    {
      key: '3',
      label: (
        <span>
          <CheckCircleOutlined />
          Completed ({MOCK_TASKS.filter(t => t.status === 'completed').length})
        </span>
      ),
      children: (
        <div className={styles.tabContent}>
          <List
            dataSource={MOCK_TASKS.filter(task => task.status === 'completed')}
            renderItem={renderTaskCard}
          />
        </div>
      ),
    },
  ];

  return (
    <div className={styles.taskManagement}>
      <Tabs items={items} defaultActiveKey="1" />
    </div>
  );
};

export default TaskManagement; 