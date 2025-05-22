'use client';

import React, { useState } from 'react';
import { 
  Layout, 
  Menu, 
  Button, 
  Typography, 
  Table, 
  Space, 
  Tag, 
  Input,
  Select,
  Row,
  Col,
  Dropdown,
  Avatar,
  Divider,
  Popover,
  Card,
  Statistic,
  Progress
} from 'antd';
import { 
  SearchOutlined,
  PlusOutlined,
  ToolOutlined,
  RobotOutlined,
  SettingOutlined,
  UserOutlined,
  GlobalOutlined,
  DatabaseOutlined,
  DownOutlined,
  CustomerServiceOutlined,
  LogoutOutlined,
  SwapOutlined,
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  FileTextOutlined,
  DashboardOutlined,
  HddOutlined
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import type { MenuInfo } from 'rc-menu/lib/interface';
import LanguageSelector from '../components/LanguageSelector';
import UserProfilePopover from '../components/UserProfilePopover';

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

export default function DSystem() {
  const [currentSystem, setCurrentSystem] = useState('Data Management');
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const router = useRouter();

  // 系统切换菜单项
  const systemItems = [
    {
      key: 'cs',
      label: 'CS',
      icon: <CustomerServiceOutlined />,
      description: 'Customer Service System'
    },
    {
      key: 'd',
      label: 'D',
      icon: <DatabaseOutlined />,
      description: 'Doraemon System'
    },
    {
      key: 'a',
      label: 'A',
      icon: <AppstoreOutlined />,
      description: 'Assignment Management'
    },
    {
      key: 'w',
      label: 'W',
      icon: <GlobalOutlined />,
      description: 'Workspace Collaboration'
    }
  ];

  // 功能菜单项
  const functionMenuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: 'storage',
      icon: <HddOutlined />,
      label: 'Storage',
    },
    {
      key: 'reports',
      icon: <BarChartOutlined />,
      label: 'Reports',
    }
  ];

  // 系统切换下拉菜单项
  const systemSwitchItems = [
    {
      key: 'analytics',
      label: 'Analytics',
      icon: <BarChartOutlined />,
    },
    {
      key: 'storage',
      label: 'Storage',
      icon: <CloudOutlined />,
    },
    {
      key: 'reports',
      label: 'Reports',
      icon: <FileTextOutlined />,
    },
  ];

  const handleSystemSelect = (system: string) => {
    if (system === 'cs') {
      router.push('/cs-system');
    } else if (system === 'd') {
      // 当前已在D系统，不需要导航
    } else if (system === 'a') {
      // 导航到A系统页面
      router.push('/a-system');
    } else if (system === 'w') {
      // 导航到W系统页面
      router.push('/w-system');
    }
  };

  const handleMenuClick = (e: any) => {
    setActiveMenu(e.key);
  };

  const handleSystemSwitch = (e: any) => {
    if (e.key === 'analytics') {
      setCurrentSystem('Analytics');
    } else if (e.key === 'storage') {
      setCurrentSystem('Storage');
    } else {
      setCurrentSystem('Reports');
    }
  };

  // 系统切换弹出内容
  const systemSwitchContent = (
    <div style={{ width: 250 }}>
      {systemItems.map(item => (
        <div 
          key={item.key}
          onClick={() => handleSystemSelect(item.key)}
          style={{ 
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            borderRadius: 6,
            marginBottom: 8,
            background: item.key === 'd' ? '#f0f7ff' : 'transparent',
            border: item.key === 'd' ? '1px solid #d6e4ff' : '1px solid transparent',
          }}
        >
          <div style={{ 
            width: 40, 
            height: 40, 
            borderRadius: '50%', 
            background: item.key === 'd' ? '#e6f4ff' : '#f5f5f5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 12,
            color: item.key === 'd' ? '#1677ff' : '#666'
          }}>
            {item.icon}
          </div>
          <div>
            <div style={{ fontWeight: 500, fontSize: 16 }}>{item.label}</div>
            <div style={{ fontSize: 12, color: '#666' }}>{item.description}</div>
          </div>
        </div>
      ))}
    </div>
  );

  // 渲染页面内容
  const renderContent = () => {
    if (activeMenu === 'dashboard') {
      return (
        <>
          <Title level={4} style={{ marginBottom: 24 }}>Data Dashboard</Title>
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Total Data"
                  value={8846}
                  valueStyle={{ color: '#3f8600' }}
                  suffix="GB"
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Active Users"
                  value={1128}
                  valueStyle={{ color: '#0050b3' }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Server Load"
                  value={42}
                  valueStyle={{ color: '#faad14' }}
                  suffix="%"
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Success Rate"
                  value={99.8}
                  valueStyle={{ color: '#3f8600' }}
                  suffix="%"
                />
              </Card>
            </Col>
          </Row>
          
          <Divider />
          
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Card title="Recent Data Activities">
                <Table 
                  columns={[
                    {
                      title: 'ID',
                      dataIndex: 'id',
                      key: 'id',
                    },
                    {
                      title: 'Action',
                      dataIndex: 'action',
                      key: 'action',
                    },
                    {
                      title: 'Data Type',
                      dataIndex: 'type',
                      key: 'type',
                    },
                    {
                      title: 'Size',
                      dataIndex: 'size',
                      key: 'size',
                    },
                    {
                      title: 'Status',
                      dataIndex: 'status',
                      key: 'status',
                      render: (status: string) => {
                        let color = 'green';
                        if (status === 'Processing') {
                          color = 'blue';
                        } else if (status === 'Failed') {
                          color = 'red';
                        }
                        return <Tag color={color}>{status}</Tag>;
                      },
                    },
                    {
                      title: 'Time',
                      dataIndex: 'time',
                      key: 'time',
                    },
                  ]} 
                  dataSource={[
                    {
                      key: '1',
                      id: 'D-2023-001',
                      action: 'Upload',
                      type: 'CSV',
                      size: '2.4MB',
                      status: 'Completed',
                      time: '2023-05-12 09:30:45',
                    },
                    {
                      key: '2',
                      id: 'D-2023-002',
                      action: 'Download',
                      type: 'JSON',
                      size: '1.8MB',
                      status: 'Completed',
                      time: '2023-05-12 10:15:22',
                    },
                    {
                      key: '3',
                      id: 'D-2023-003',
                      action: 'Process',
                      type: 'XML',
                      size: '4.2MB',
                      status: 'Processing',
                      time: '2023-05-12 11:05:18',
                    },
                    {
                      key: '4',
                      id: 'D-2023-004',
                      action: 'Delete',
                      type: 'PDF',
                      size: '8.5MB',
                      status: 'Completed',
                      time: '2023-05-12 11:42:30',
                    },
                    {
                      key: '5',
                      id: 'D-2023-005',
                      action: 'Upload',
                      type: 'Excel',
                      size: '3.7MB',
                      status: 'Failed',
                      time: '2023-05-12 12:10:05',
                    },
                  ]} 
                  pagination={{ pageSize: 5 }}
                />
              </Card>
            </Col>
          </Row>
        </>
      );
    } else if (activeMenu === 'storage') {
      return (
        <>
          <Title level={4} style={{ marginBottom: 24 }}>Data Storage</Title>
          <Paragraph>
            Manage your data storage, upload files, and organize your data repositories.
          </Paragraph>
          
          <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
            <Col span={8}>
              <Input 
                placeholder="Search storage" 
                prefix={<SearchOutlined />} 
              />
            </Col>
            <Col span={4}>
              <Select defaultValue="all" style={{ width: '100%' }}>
                <Option value="all">All Types</Option>
                <Option value="csv">CSV</Option>
                <Option value="json">JSON</Option>
                <Option value="xml">XML</Option>
                <Option value="excel">Excel</Option>
              </Select>
            </Col>
            <Col span={4}>
              <Select defaultValue="all" style={{ width: '100%' }}>
                <Option value="all">All Status</Option>
                <Option value="active">Active</Option>
                <Option value="archived">Archived</Option>
                <Option value="deleted">Deleted</Option>
              </Select>
            </Col>
            <Col span={8} style={{ textAlign: 'right' }}>
              <Button type="primary" icon={<PlusOutlined />}>
                Upload Data
              </Button>
            </Col>
          </Row>
          
          <Card>
            <Table 
              columns={[
                {
                  title: 'File Name',
                  dataIndex: 'name',
                  key: 'name',
                  render: (text: string) => <a>{text}</a>,
                },
                {
                  title: 'Type',
                  dataIndex: 'type',
                  key: 'type',
                },
                {
                  title: 'Size',
                  dataIndex: 'size',
                  key: 'size',
                },
                {
                  title: 'Last Modified',
                  dataIndex: 'modified',
                  key: 'modified',
                },
                {
                  title: 'Status',
                  dataIndex: 'status',
                  key: 'status',
                  render: (status: string) => {
                    let color = 'green';
                    if (status === 'Archived') {
                      color = 'orange';
                    } else if (status === 'Deleted') {
                      color = 'red';
                    }
                    return <Tag color={color}>{status}</Tag>;
                  },
                },
                {
                  title: 'Action',
                  key: 'action',
                  render: (_: any, record: any) => (
                    <Space size="middle">
                      <a>Download</a>
                      <a>View</a>
                      <a>Delete</a>
                    </Space>
                  ),
                },
              ]} 
              dataSource={[
                {
                  key: '1',
                  name: 'customer_data_2023.csv',
                  type: 'CSV',
                  size: '4.2MB',
                  modified: '2023-05-10 09:30:45',
                  status: 'Active',
                },
                {
                  key: '2',
                  name: 'sales_report_q2.xlsx',
                  type: 'Excel',
                  size: '2.8MB',
                  modified: '2023-05-09 14:22:33',
                  status: 'Active',
                },
                {
                  key: '3',
                  name: 'api_config.json',
                  type: 'JSON',
                  size: '1.5KB',
                  modified: '2023-05-08 11:15:20',
                  status: 'Active',
                },
                {
                  key: '4',
                  name: 'old_records_2022.xml',
                  type: 'XML',
                  size: '8.7MB',
                  modified: '2023-04-15 16:45:12',
                  status: 'Archived',
                },
                {
                  key: '5',
                  name: 'temp_data.csv',
                  type: 'CSV',
                  size: '1.2MB',
                  modified: '2023-05-01 10:05:33',
                  status: 'Deleted',
                },
              ]} 
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </>
      );
    } else {
      return (
        <>
          <Title level={4} style={{ marginBottom: 24 }}>Data Reports</Title>
          <Paragraph>
            View and generate reports based on your data.
          </Paragraph>
          
          <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
            <Col span={8}>
              <Input 
                placeholder="Search reports" 
                prefix={<SearchOutlined />} 
              />
            </Col>
            <Col span={4}>
              <Select defaultValue="all" style={{ width: '100%' }}>
                <Option value="all">All Categories</Option>
                <Option value="sales">Sales</Option>
                <Option value="performance">Performance</Option>
                <Option value="analytics">Analytics</Option>
              </Select>
            </Col>
            <Col span={4}>
              <Select defaultValue="all" style={{ width: '100%' }}>
                <Option value="all">All Time</Option>
                <Option value="daily">Daily</Option>
                <Option value="weekly">Weekly</Option>
                <Option value="monthly">Monthly</Option>
                <Option value="yearly">Yearly</Option>
              </Select>
            </Col>
            <Col span={8} style={{ textAlign: 'right' }}>
              <Button type="primary" icon={<PlusOutlined />}>
                Generate Report
              </Button>
            </Col>
          </Row>
          
          <Card>
            <Table 
              columns={[
                {
                  title: 'Report Name',
                  dataIndex: 'name',
                  key: 'name',
                  render: (text: string) => <a>{text}</a>,
                },
                {
                  title: 'Category',
                  dataIndex: 'category',
                  key: 'category',
                },
                {
                  title: 'Period',
                  dataIndex: 'period',
                  key: 'period',
                },
                {
                  title: 'Generated',
                  dataIndex: 'generated',
                  key: 'generated',
                },
                {
                  title: 'Size',
                  dataIndex: 'size',
                  key: 'size',
                },
                {
                  title: 'Action',
                  key: 'action',
                  render: (_: any, record: any) => (
                    <Space size="middle">
                      <a>Download</a>
                      <a>View</a>
                      <a>Share</a>
                    </Space>
                  ),
                },
              ]} 
              dataSource={[
                {
                  key: '1',
                  name: 'Sales Performance Q2 2023',
                  category: 'Sales',
                  period: 'Quarterly',
                  generated: '2023-05-12 09:30:45',
                  size: '4.2MB',
                },
                {
                  key: '2',
                  name: 'User Activity May 2023',
                  category: 'Analytics',
                  period: 'Monthly',
                  generated: '2023-05-10 14:22:33',
                  size: '2.8MB',
                },
                {
                  key: '3',
                  name: 'System Performance Report',
                  category: 'Performance',
                  period: 'Weekly',
                  generated: '2023-05-08 11:15:20',
                  size: '1.5MB',
                },
                {
                  key: '4',
                  name: 'Revenue Analysis 2023',
                  category: 'Sales',
                  period: 'Yearly',
                  generated: '2023-05-05 16:45:12',
                  size: '8.7MB',
                },
                {
                  key: '5',
                  name: 'Customer Engagement Report',
                  category: 'Analytics',
                  period: 'Monthly',
                  generated: '2023-05-01 10:05:33',
                  size: '3.2MB',
                },
              ]} 
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </>
      );
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Sider width={200} style={{ background: '#f5f5f5' }}>
        <div style={{ 
          height: 64, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'flex-start',
          padding: '0 16px',
          borderBottom: '1px solid #f0f0f0',
          background: '#f8f9fa'
        }}>
          <Typography.Text strong style={{ fontSize: 18, color: '#52c41a' }}>
            G123 D
          </Typography.Text>
          <Popover 
            content={systemSwitchContent} 
            trigger="click"
            placement="bottomRight"
            overlayStyle={{ width: 280 }}
          >
            <Button 
              type="text" 
              icon={<SwapOutlined />} 
              style={{ marginLeft: 8, color: '#52c41a' }}
            />
          </Popover>
        </div>
        
        <div style={{ padding: '16px 8px', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px)' }}>
          <Dropdown 
            menu={{ 
              items: systemSwitchItems, 
              onClick: handleSystemSwitch,
              selectable: true,
              defaultSelectedKeys: ['analytics']
            }} 
            trigger={['click']}
          >
            <Button 
              style={{ 
                width: '100%', 
                textAlign: 'left', 
                height: 40, 
                display: 'flex', 
                alignItems: 'center',
                justifyContent: 'space-between',
                borderRadius: 8,
                border: '1px solid #e2e8f0',
                background: '#fff'
              }}
            >
              <Space>
                <DatabaseOutlined />
                {currentSystem}
              </Space>
              <DownOutlined style={{ fontSize: 12 }} />
            </Button>
          </Dropdown>
          
          <div style={{ margin: '16px 0', borderBottom: '1px solid #e8e8e8' }}></div>
          
          <Menu
            mode="inline"
            selectedKeys={[activeMenu]}
            onClick={handleMenuClick}
            style={{ 
              borderRight: 0,
              background: '#f5f5f5'
            }}
            items={functionMenuItems}
          />
          
          <div style={{ marginTop: 'auto', padding: '16px 8px', borderTop: '1px solid #e8e8e8' }}>
            <UserProfilePopover 
              userName="Data Analyst" 
              userEmail="analyst@g123.com" 
            />
            <div style={{ marginTop: 12 }}>
              <LanguageSelector />
            </div>
          </div>
        </div>
      </Layout.Sider>
      
      <Content style={{ padding: 24, background: '#fff', margin: 0 }}>
        {renderContent()}
      </Content>
    </Layout>
  );
} 