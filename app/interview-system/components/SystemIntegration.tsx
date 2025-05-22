'use client';

import React from 'react';
import { Card, Form, Input, Select, Button, Switch, Space, Divider, Typography, Alert, Row, Col } from 'antd';
import { GoogleOutlined, CalendarOutlined, MailOutlined, ApiOutlined, LockOutlined, SafetyOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;

export default function SystemIntegration() {
  return (
    <div>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Alert
            message="System Integration Configuration"
            description="Configure third-party service integrations for the interview system."
            type="info"
            showIcon
            style={{ marginBottom: 16 }}
          />
        </Col>
        
        <Col span={12}>
          <Card 
            title="Google Calendar API" 
            bordered={false}
            extra={<CalendarOutlined />}
          >
            <Form layout="vertical">
              <Form.Item 
                label="API Key" 
                name="googleApiKey"
                rules={[{ required: true, message: 'Please input Google Calendar API key!' }]}
              >
                <Input.Password placeholder="Enter API key" />
              </Form.Item>
              
              <Form.Item 
                label="Calendar ID" 
                name="calendarId"
              >
                <Input placeholder="Enter primary calendar ID" />
              </Form.Item>
              
              <Form.Item 
                label="Synchronization" 
                name="calendarSync"
              >
                <Select defaultValue="realtime">
                  <Option value="realtime">Real-time</Option>
                  <Option value="hourly">Hourly</Option>
                  <Option value="daily">Daily</Option>
                </Select>
              </Form.Item>
              
              <Form.Item>
                <Button type="primary" icon={<GoogleOutlined />}>
                  Connect Google Calendar
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        
        <Col span={12}>
          <Card 
            title="DingTalk Notification API" 
            bordered={false}
            extra={<ApiOutlined />}
          >
            <Form layout="vertical">
              <Form.Item 
                label="App Key" 
                name="dingTalkAppKey"
                rules={[{ required: true, message: 'Please input DingTalk App key!' }]}
              >
                <Input.Password placeholder="Enter App key" />
              </Form.Item>
              
              <Form.Item 
                label="App Secret" 
                name="dingTalkAppSecret"
                rules={[{ required: true, message: 'Please input DingTalk App secret!' }]}
              >
                <Input.Password placeholder="Enter App secret" />
              </Form.Item>
              
              <Form.Item 
                label="Enable Notifications" 
                name="dingTalkEnabled"
                valuePropName="checked"
              >
                <Switch defaultChecked />
              </Form.Item>
              
              <Form.Item>
                <Button type="primary" icon={<ApiOutlined />}>
                  Connect DingTalk
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        
        <Col span={12}>
          <Card 
            title="Email Service Configuration" 
            bordered={false}
            extra={<MailOutlined />}
          >
            <Form layout="vertical">
              <Form.Item 
                label="SMTP Server" 
                name="smtpServer"
                rules={[{ required: true, message: 'Please input SMTP server!' }]}
              >
                <Input placeholder="e.g., smtp.gmail.com" />
              </Form.Item>
              
              <Form.Item 
                label="SMTP Port" 
                name="smtpPort"
              >
                <Input placeholder="e.g., 587" />
              </Form.Item>
              
              <Form.Item 
                label="Email Account" 
                name="emailAccount"
              >
                <Input placeholder="Enter email address" />
              </Form.Item>
              
              <Form.Item 
                label="Email Password" 
                name="emailPassword"
              >
                <Input.Password placeholder="Enter password" />
              </Form.Item>
              
              <Form.Item>
                <Button type="primary" icon={<MailOutlined />}>
                  Verify Email Settings
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        
        <Col span={12}>
          <Card 
            title="Security Settings" 
            bordered={false}
            extra={<SafetyOutlined />}
          >
            <Form layout="vertical">
              <Form.Item 
                label="Invitation Link Expiry" 
                name="linkExpiry"
              >
                <Select defaultValue="7days">
                  <Option value="24hours">24 Hours</Option>
                  <Option value="3days">3 Days</Option>
                  <Option value="7days">7 Days</Option>
                  <Option value="14days">14 Days</Option>
                </Select>
              </Form.Item>
              
              <Form.Item 
                label="Data Encryption" 
                name="dataEncryption"
                valuePropName="checked"
              >
                <Switch defaultChecked />
              </Form.Item>
              
              <Form.Item 
                label="Access Control" 
                name="accessControl"
              >
                <Select defaultValue="restricted">
                  <Option value="open">Open Access</Option>
                  <Option value="restricted">Restricted Access</Option>
                  <Option value="strict">Strict Access Control</Option>
                </Select>
              </Form.Item>
              
              <Form.Item 
                label="Audit Logging" 
                name="auditLogging"
                valuePropName="checked"
              >
                <Switch defaultChecked />
              </Form.Item>
            </Form>
          </Card>
        </Col>
        
        <Col span={24}>
          <Card bordered={false}>
            <Space>
              <Button type="primary" icon={<LockOutlined />} size="large">
                Save Settings
              </Button>
              <Button size="large">
                Test Integrations
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
} 