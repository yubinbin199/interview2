'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Layout,
  Typography,
  List,
  Avatar,
  Input,
  Button,
  Divider,
  Badge,
  Space,
  Card,
  Tag,
  Tooltip,
  Empty,
  Menu,
  Dropdown,
  Popover,
  Checkbox,
  Upload,
  Image,
  Modal,
  message,
  Tabs,
  Alert,
  Radio,
  Steps
} from 'antd';
import {
  SearchOutlined,
  UserOutlined,
  MessageOutlined,
  SendOutlined,
  InfoCircleOutlined,
  ClockCircleOutlined,
  QuestionCircleOutlined,
  LinkOutlined,
  RobotOutlined,
  CheckCircleOutlined,
  SettingOutlined,
  CustomerServiceOutlined,
  LogoutOutlined,
  SwapOutlined,
  DownOutlined,
  AppstoreOutlined,
  GlobalOutlined,
  DatabaseOutlined,
  CopyOutlined,
  CommentOutlined,
  DollarOutlined,
  RollbackOutlined,
  ToolOutlined,
  BankOutlined,
  ReconciliationOutlined,
  PictureOutlined,
  PaperClipOutlined,
  GiftOutlined,
  ShoppingOutlined,
  UserOutlined as UserIcon,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';

const { Header, Content, Sider } = Layout;
const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

// 新增类型定义
interface KnowledgeUpdateContent {
  title: string;
  description: string;
  query: string;
  confidence: number;
  suggestedAction: string;
  status: string;
  feedback?: string; // 添加可选的反馈信息字段
}

interface ChatMessage {
  id: number;
  sender: 'user' | 'ai' | 'system';
  content: string | KnowledgeUpdateContent;
  timestamp: string;
  type: 'text' | 'image' | 'kb-update';
}

// 模拟数据 - AI咨询列表
const consultationsData = [
  {
    id: 'EC-2023-001',
    title: 'Premium features unavailable after payment',
    lastMessage: 'User cannot access their premium features after payment',
    timestamp: '2023-05-12 14:30:22',
    unread: true,
    status: 'active',
    userRank: 1000,
    game: 'gate',
    type: 'Payment',
    userName: 'Yu Binbin',
    isVip: true
  },
  {
    id: 'EC-2023-002',
    title: 'Damaged product return request',
    lastMessage: 'Customer wants to return a damaged product',
    timestamp: '2023-05-12 11:45:15',
    unread: false,
    status: 'active',
    userRank: 500,
    game: 'gate',
    type: 'Refund',
    userName: 'Lin Jiahao',
    isVip: false
  },
  {
    id: 'EC-2023-003',
    title: 'Subscription renewal failure',
    lastMessage: 'Renewal failed due to payment method expiration',
    timestamp: '2023-05-11 09:20:33',
    unread: false,
    status: 'closed',
    userRank: 2500,
    game: 'doraemon',
    type: 'Subscription',
    userName: 'Wang Wei',
    isVip: true
  },
  {
    id: 'EC-2023-004',
    title: 'App crashes on iOS startup',
    lastMessage: 'App crashes consistently on startup for iOS users',
    timestamp: '2023-05-10 16:50:11',
    unread: false,
    status: 'pending',
    userRank: 300,
    game: 'yugioh',
    type: 'Technical',
    userName: 'Zhang Min',
    isVip: false
  },
  {
    id: 'EC-2023-005',
    title: 'Double billing for single order',
    lastMessage: 'Customer was charged twice for the same order',
    timestamp: '2023-05-10 10:15:44',
    unread: true,
    status: 'active',
    userRank: 1200,
    game: 'gate',
    type: 'Billing',
    userName: 'Li Xiaoping',
    isVip: true
  },
  // 添加更多VIP用户数据
  {
    id: 'EC-2023-006',
    title: 'Weekly login bonus not received',
    lastMessage: 'VIP user did not receive scheduled login bonus',
    timestamp: '2023-05-09 08:25:30',
    unread: true,
    status: 'active',
    userRank: 3500,
    game: 'yugioh',
    type: 'Reward',
    userName: 'Chen Wei',
    isVip: true
  },
  {
    id: 'EC-2023-007',
    title: 'Exclusive skin purchase error',
    lastMessage: 'Limited edition skin purchased but not showing in inventory',
    timestamp: '2023-05-08 17:10:22',
    unread: false,
    status: 'pending',
    userRank: 1850,
    game: 'doraemon',
    type: 'Purchase',
    userName: 'Liu Yang',
    isVip: true
  },
  // 添加更多非VIP用户数据
  {
    id: 'EC-2023-008',
    title: 'Account registration issue',
    lastMessage: 'Unable to complete email verification process',
    timestamp: '2023-05-09 14:42:15',
    unread: true,
    status: 'active',
    userRank: 50,
    game: 'gate',
    type: 'Account',
    userName: 'Zhao Ling',
    isVip: false
  },
  {
    id: 'EC-2023-009',
    title: 'Game freezes during tutorial',
    lastMessage: 'New player experiencing crashes during onboarding',
    timestamp: '2023-05-08 09:35:40',
    unread: false,
    status: 'pending',
    userRank: 120,
    game: 'yugioh',
    type: 'Technical',
    userName: 'Sun Min',
    isVip: false
  },
  {
    id: 'EC-2023-010',
    title: 'Missing daily rewards',
    lastMessage: 'Player has not received daily login rewards for 3 days',
    timestamp: '2023-05-07 21:18:33',
    unread: false,
    status: 'active',
    userRank: 280,
    game: 'doraemon',
    type: 'Reward',
    userName: 'Tang Xi',
    isVip: false
  }
];

// 模拟聊天消息数据 - 为不同会话创建不同的消息记录
const chatMessagesDataMap: Record<string, ChatMessage[]> = {
  'EC-2023-001': [
    {
      id: 1,
      sender: 'ai',
      content: 'Hello! I\'m looking into your account access issue. Could you please provide your order number?',
      timestamp: '2023-05-12 14:31:05',
      type: 'text'
    },
    {
      id: 2,
      sender: 'user',
      content: 'Sure, my order number is ORD-98765-43210',
      timestamp: '2023-05-12 14:32:30',
      type: 'text'
    },
    {
      id: 3,
      sender: 'ai',
      content: 'Thank you. I can see that your payment was processed successfully, but there seems to be a delay in activating your premium features. Let me fix this for you right now.',
      timestamp: '2023-05-12 14:33:45',
      type: 'text'
    },
    {
      id: 4,
      sender: 'ai',
      content: 'I\'ve activated your premium features. Please try logging out and back in, and you should have full access now. Is there anything else I can help you with?',
      timestamp: '2023-05-12 14:35:20',
      type: 'text'
    },
    {
      id: 5,
      sender: 'system',
      content: {
        title: 'Knowledge Base Update Required',
        description: 'The user query may require adding new information to the knowledge base.',
        query: 'Premium features unavailable after payment',
        confidence: 0.87,
        suggestedAction: 'Create new Q&A pair',
        status: 'start' // 待开始状态
      },
      timestamp: '2023-05-12 14:36:00',
      type: 'kb-update'
    }
  ],
  'EC-2023-002': [
    {
      id: 1,
      sender: 'ai',
      content: 'Hello! I understand you want to return a damaged product. Could you please provide me with your order number and a description of the damage?',
      timestamp: '2023-05-12 11:30:05',
      type: 'text'
    },
    {
      id: 2,
      sender: 'user',
      content: 'My order number is ORD-12345. The product arrived with a large crack on the side.',
      timestamp: '2023-05-12 11:32:30',
      type: 'text'
    },
    {
      id: 3,
      sender: 'ai',
      content: 'I\'m sorry to hear that. Could you please upload a photo of the damage so we can process your return request?',
      timestamp: '2023-05-12 11:34:45',
      type: 'text'
    },
    {
      id: 4,
      sender: 'system',
      content: {
        title: 'Knowledge Base Update in Review',
        description: 'An update for this query has been submitted and is currently under review.',
        query: 'Damaged product return process',
        confidence: 0.92,
        suggestedAction: 'Create new Q&A pair',
        status: 'reviewing' // 审核中状态
      },
      timestamp: '2023-05-12 11:40:00',
      type: 'kb-update'
    }
  ],
  'EC-2023-003': [
    {
      id: 1,
      sender: 'ai',
      content: 'Hello! I see you\'re having an issue with your subscription renewal. How can I assist you today?',
      timestamp: '2023-05-11 09:15:05',
      type: 'text'
    },
    {
      id: 2,
      sender: 'user',
      content: 'My subscription failed to renew automatically. I got an email saying my payment method expired.',
      timestamp: '2023-05-11 09:16:30',
      type: 'text'
    },
    {
      id: 3,
      sender: 'ai',
      content: 'I understand. Let me check your account details. Could you please confirm the last 4 digits of the card you were using?',
      timestamp: '2023-05-11 09:18:45',
      type: 'text'
    },
    {
      id: 4,
      sender: 'system',
      content: {
        title: 'Knowledge Base Update Complete',
        description: 'The knowledge base has been successfully updated with this information.',
        query: 'Subscription renewal failure due to expired payment method',
        confidence: 0.95,
        suggestedAction: 'Update existing Q&A',
        status: 'completed' // 已完成状态
      },
      timestamp: '2023-05-11 09:25:00',
      type: 'kb-update'
    }
  ],
  'EC-2023-008': [
    {
      id: 1,
      sender: 'ai',
      content: 'Hello! I see you\'re having an issue with account registration. How can I help?',
      timestamp: '2023-05-09 14:30:05',
      type: 'text'
    },
    {
      id: 2,
      sender: 'user',
      content: 'I\'m not receiving the verification email to complete my account setup.',
      timestamp: '2023-05-09 14:32:30',
      type: 'text'
    },
    {
      id: 3,
      sender: 'ai',
      content: 'Let me check our system. Could you please confirm the email address you used for registration?',
      timestamp: '2023-05-09 14:34:45',
      type: 'text'
    },
    {
      id: 4,
      sender: 'system',
      content: {
        title: 'Knowledge Base Update Needs Revision',
        description: 'The proposed update needs additional information or corrections.',
        query: 'Account verification email not received',
        confidence: 0.83,
        suggestedAction: 'Create new Q&A pair',
        status: 'revision', // 待修改状态
        feedback: 'Please add troubleshooting steps for different email providers and mention the spam folder check. Also include information about the expiration time of verification links.' // 审批人反馈
      },
      timestamp: '2023-05-09 14:40:00',
      type: 'kb-update'
    }
  ]
};

// 为其他会话创建默认消息记录
for (let i = 4; i <= 10; i++) {
  const id = `EC-2023-00${i}`;
  if (!chatMessagesDataMap[id]) {
    chatMessagesDataMap[id] = [
      {
        id: 1,
        sender: 'ai',
        content: `Hello! How can I assist you with your ${consultationsData.find(c => c.id === id)?.title.toLowerCase() || 'issue'} today?`,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        type: 'text'
      }
    ];
  }
}

// 模拟关联会话数据
const relatedConversationsData = [
  {
    id: 'RC-2023-001',
    title: 'Previous Payment Issue',
    date: '2023-04-15',
    summary: 'User had a similar payment issue last month. The problem was resolved by manually activating their account.'
  },
  {
    id: 'RC-2023-002',
    title: 'Premium Features Overview',
    date: '2023-03-22',
    summary: 'User inquired about premium features before making the purchase.'
  }
];

// 模拟用户信息数据
const userInfoData = {
  game: {
    name: 'gate',
    description: 'GATE 自衛隊 彼の地にて、斯く戰えり',
    team: 'FRONTLINE UNION'
  },
  user: {
    g123Id: 'G1HTPALWS',
    serverId: '10001',
    gameUid: 'G1HTPALWS',
    roleId: '10001_h2iuqAmxt',
    im: 'line',
    rank: '1000',
    amount: '¥1,234,567,890',
    vipLevel: 'VIP1',
    system: 'Mac OS 10.15.7 | Chrome 116.0'
  }
};

// 系统切换下拉菜单项
const systemSwitchItems = [
  {
    key: 'ai-agents',
    label: 'AI Agents',
    icon: <RobotOutlined />,
  },
  {
    key: 'manual',
    label: 'Manual',
    icon: <CustomerServiceOutlined />,
  }
];

// 系统切换项
const systemItems = [
  {
    key: 'cs-system',
    label: 'CS',
    icon: <CustomerServiceOutlined />,
    description: 'Customer Service System'
  },
  {
    key: 'd-system',
    label: 'D',
    icon: <DatabaseOutlined />,
    description: 'Doraemon System'
  },
  {
    key: 'a-system',
    label: 'A',
    icon: <AppstoreOutlined />,
    description: 'Assignment Management'
  },
  {
    key: 'w-system',
    label: 'W',
    icon: <GlobalOutlined />,
    description: 'Workspace Collaboration'
  }
];

// 根据问题类型返回对应图标
const getTypeIcon = (type: string) => {
  switch(type) {
    case 'Payment':
      return <DollarOutlined />;
    case 'Refund':
      return <RollbackOutlined />;
    case 'Subscription':
      return <ReconciliationOutlined />;
    case 'Technical':
      return <ToolOutlined />;
    case 'Billing':
      return <BankOutlined />;
    case 'Reward':
      return <GiftOutlined />;
    case 'Purchase':
      return <ShoppingOutlined />;
    case 'Account':
      return <UserIcon />;
    default:
      return <QuestionCircleOutlined />;
  }
};

export default function ExpertConsults() {
  const [searchText, setSearchText] = useState('');
  const [selectedConsultation, setSelectedConsultation] = useState<any>(consultationsData[0]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(chatMessagesDataMap[consultationsData[0].id] || []);
  const [messageInput, setMessageInput] = useState('');
  const [relatedConversations, setRelatedConversations] = useState(relatedConversationsData);
  const [userInfo, setUserInfo] = useState(userInfoData);
  const [currentSystem, setCurrentSystem] = useState('AI Agents');
  const [activeMenu, setActiveMenu] = useState('expert-consults');
  const [unreadFilter, setUnreadFilter] = useState(true);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewImage, setPreviewImage] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);
  const [vipTab, setVipTab] = useState('all'); // 'all', 'vip', 'non-vip'
  
  // 知识库更新任务弹窗相关状态
  const [kbModalVisible, setKbModalVisible] = useState(false);
  const [kbModalStep, setKbModalStep] = useState(0); // 0: 生成的问答, 1: 相似问题, 2: 矛盾问题
  const [kbModalStatus, setKbModalStatus] = useState('start'); // start, reviewing, revision, completed
  
  // 模拟生成的问答对数据
  const [generatedQAPairs, setGeneratedQAPairs] = useState([
    {
      id: 'qa-001',
      question: 'Why can\'t I access premium features after payment?',
      answer: 'If you cannot access premium features after payment, this is usually caused by a synchronization delay between the payment system and the feature activation system. Please try logging out and logging back in. If the issue persists, contact customer support with your order number for manual activation.'
    },
    {
      id: 'qa-002',
      question: 'How long does it take for premium features to activate?',
      answer: 'Premium features should activate immediately after payment confirmation. However, in some cases, there might be a delay of up to 5 minutes due to system synchronization. If your features aren\'t activated after 5 minutes, try logging out and back in, or contact support.'
    }
  ]);
  
  // 模拟相似知识数据
  const [similarKnowledge, setSimilarKnowledge] = useState([
    {
      id: 'sim-001',
      question: 'Premium features not working after purchase',
      answer: 'If premium features are not working after purchase, please try refreshing the app or restarting your device. If the issue persists, check your account status in the settings menu.',
      similarity: 0.92,
      action: 'keep-separate'
    },
    {
      id: 'sim-002',
      question: 'Can\'t access paid content',
      answer: 'If you cannot access paid content, verify that your payment was processed successfully. Check your email for a payment confirmation, then try logging out and logging back in.',
      similarity: 0.78,
      action: 'keep-separate'
    }
  ]);
  
  // 模拟矛盾知识数据
  const [contradictingKnowledge, setContradictingKnowledge] = useState([
    {
      id: 'cont-001',
      question: 'Premium feature activation time',
      answer: 'All premium features are activated instantly upon successful payment.',
      contradiction: 'Conflicts with new information that mentions possible delays in activation.',
      action: 'keep'
    }
  ]);
  
  const router = useRouter();
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  // 自动滚动到最新消息
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);
  
  // 处理消息发送
  const handleSendMessage = () => {
    if (messageInput.trim() || fileList.length > 0) {
      const now = new Date().toISOString().replace('T', ' ').substring(0, 19);
      const newMessages = [...chatMessages];
      
      // 处理文本消息
      if (messageInput.trim()) {
        const textMessage: ChatMessage = {
          id: chatMessages.length + 1,
          sender: 'user',
          content: messageInput,
          timestamp: now,
          type: 'text'
        };
        newMessages.push(textMessage);
      }
      
      // 处理图片消息
      if (fileList.length > 0) {
        fileList.forEach((file, index) => {
          if (file.url || file.preview) {
            const imageMessage: ChatMessage = {
              id: chatMessages.length + 1 + index + (messageInput.trim() ? 1 : 0),
              sender: 'user',
              content: file.url || file.preview || '',
              timestamp: now,
              type: 'image'
            };
            newMessages.push(imageMessage);
          }
        });
      }
      
      // 更新当前会话的消息记录
      setChatMessages(newMessages);
      
      // 同时更新消息映射表，确保切换会话后消息不会丢失
      chatMessagesDataMap[selectedConsultation.id] = newMessages;
      
      setMessageInput('');
      setFileList([]);
    }
  };
  
  // 处理按回车键发送消息
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  // 处理选择咨询
  const handleSelectConsultation = (consultation: any) => {
    setSelectedConsultation(consultation);
    // 加载对应会话的消息记录
    setChatMessages(chatMessagesDataMap[consultation.id] || []);
  };
  
  // 过滤咨询列表
  const filteredConsultations = consultationsData.filter(c => {
    // 搜索文本过滤
    const matchesSearch = searchText ? 
      c.title.toLowerCase().includes(searchText.toLowerCase()) || 
      c.lastMessage.toLowerCase().includes(searchText.toLowerCase()) :
      true;
    
    // 未读消息过滤
    const matchesUnread = unreadFilter ? c.unread : true;
    
    // VIP状态过滤
    const matchesVip = vipTab === 'all' ? true : 
                       vipTab === 'vip' ? c.isVip : 
                       !c.isVip;
    
    return matchesSearch && matchesUnread && matchesVip;
  });
  
  // 计算计数值，考虑waiting筛选条件
  const getFilteredCount = (filter: (c: any) => boolean) => {
    return consultationsData.filter(c => {
      const matchesUnread = unreadFilter ? c.unread : true;
      return filter(c) && matchesUnread;
    }).length;
  };

  const allCount = getFilteredCount(() => true);
  const vipCount = getFilteredCount(c => c.isVip);
  const nonVipCount = getFilteredCount(c => !c.isVip);
  
  // 导航菜单点击
  const handleMenuClick = (e: any) => {
    if (e.key === 'evaluations') {
      router.push('/cs-system');
    } else {
      setActiveMenu(e.key);
    }
  };
  
  // 系统切换
  const handleSystemSwitch = (e: any) => {
    if (e.key === 'manual') {
      setCurrentSystem('Manual');
    } else if (e.key === 'ai-agents') {
      setCurrentSystem('AI Agents');
    }
  };
  
  // 系统选择处理
  const handleSystemSelect = (system: string) => {
    if (system === 'cs-system') {
      // 当前已在CS系统，不需要操作
    } else if (system === 'd-system') {
      router.push('/d-system');
    } else if (system === 'a-system') {
      router.push('/a-system');
    } else if (system === 'w-system') {
      router.push('/w-system');
    }
  };
  
  // 系统切换弹出内容
  const systemSwitchContent = (
    <div style={{ width: 250 }}>
      {systemItems.map(item => (
        <div 
          key={`system-${item.key}`}
          onClick={() => handleSystemSelect(item.key)}
          style={{ 
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            borderRadius: 6,
            marginBottom: 8,
            background: item.key === 'cs-system' ? '#f0f7ff' : 'transparent',
            border: item.key === 'cs-system' ? '1px solid #d6e4ff' : '1px solid transparent',
          }}
        >
          <div style={{ 
            width: 40, 
            height: 40, 
            borderRadius: '50%', 
            background: item.key === 'cs-system' ? '#e6f4ff' : '#f5f5f5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 12,
            color: item.key === 'cs-system' ? '#1677ff' : '#666'
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
  
  // 处理未读过滤切换
  const handleUnreadFilterChange = (e: any) => {
    setUnreadFilter(e.target.checked);
  };
  
  // 处理图片上传
  const handleUploadChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  
  // 图片上传前处理
  const beforeUpload = (file: File) => {
    const isImage = file.type.indexOf('image/') === 0;
    if (!isImage) {
      message.error('You can only upload image files!');
    }
    
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      (file as any).preview = reader.result as string;
    };
    
    return false; // 阻止自动上传
  };
  
  // 处理图片预览
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as Blob);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };
  
  // 关闭图片预览
  const handlePreviewCancel = () => setPreviewOpen(false);
  
  // 处理VIP标签切换
  const handleVipTabChange = (activeKey: string) => {
    setVipTab(activeKey);
  };
  
  // 处理知识库更新任务卡片上的按钮点击
  const handleKbUpdateAction = (status: string) => {
    setKbModalStatus(status);
    if (status === 'start' || status === 'revision') {
      setKbModalVisible(true);
      setKbModalStep(0);
    }
  };
  
  // 处理知识库更新模态框步骤变化
  const handleStepChange = (direction: 'next' | 'prev') => {
    if (direction === 'next' && kbModalStep < 2) {
      setKbModalStep(kbModalStep + 1);
    } else if (direction === 'prev' && kbModalStep > 0) {
      setKbModalStep(kbModalStep - 1);
    }
  };
  
  // 处理关闭知识库更新模态框
  const handleKbModalClose = () => {
    setKbModalVisible(false);
  };
  
  // 处理提交知识库更新
  const handleSubmitKbUpdate = () => {
    message.success('Knowledge base update submitted for review!');
    
    // 更新第一个会话的知识库卡片状态为"审核中"
    if (selectedConsultation?.id === 'EC-2023-001') {
      const updatedMessages = chatMessages.map(msg => {
        if (msg.type === 'kb-update') {
          return {
            ...msg,
            content: {
              ...(msg.content as KnowledgeUpdateContent),
              status: 'reviewing'
            }
          };
        }
        return msg;
      });
      setChatMessages(updatedMessages);
      chatMessagesDataMap[selectedConsultation.id] = updatedMessages;
    }
    
    setKbModalVisible(false);
  };
  
  // 渲染步骤标题
  const renderStepTitle = () => {
    // 如果是待修改状态，添加标记
    const revisionMark = kbModalStatus === 'revision' ? ' (Revision Required)' : '';
    
    switch(kbModalStep) {
      case 0:
        return `Step 1: Confirm Generated Q&A Pairs${revisionMark}`;
      case 1:
        return `Step 2: Review Similar Knowledge${revisionMark}`;
      case 2:
        return `Step 3: Check Contradicting Knowledge${revisionMark}`;
      default:
        return '';
    }
  };
  
  // 渲染步骤内容
  const renderStepContent = () => {
    // 如果是待修改状态，先显示反馈信息
    const feedbackSection = kbModalStatus === 'revision' ? (
      <Card
        style={{ marginBottom: '20px', borderLeft: '4px solid #faad14' }}
        title={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <InfoCircleOutlined style={{ color: '#faad14', marginRight: '8px' }} />
            <span>Reviewer Feedback</span>
          </div>
        }
      >
        <Paragraph>
          {selectedConsultation?.id === 'EC-2023-008' 
            ? (chatMessagesDataMap[selectedConsultation.id].find(
                msg => msg.type === 'kb-update'
              )?.content as KnowledgeUpdateContent)?.feedback 
            : 'Please address the issues and resubmit the knowledge base update.'}
        </Paragraph>
      </Card>
    ) : null;
    
    switch(kbModalStep) {
      case 0:
        return (
          <div>
            {feedbackSection}
            {generatedQAPairs.map(qa => (
              <Card 
                key={qa.id} 
                style={{ marginBottom: '16px' }}
                title={
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text strong>Question</Text>
                    <Space>
                      <Button size="small" icon={<EditOutlined />} />
                      <Button size="small" danger icon={<DeleteOutlined />} />
                    </Space>
                  </div>
                }
              >
                <Paragraph>{qa.question}</Paragraph>
                <Divider orientation="left">Answer</Divider>
                <Paragraph>{qa.answer}</Paragraph>
              </Card>
            ))}
            <Button 
              type="dashed" 
              icon={<PlusOutlined />} 
              style={{ width: '100%' }}
            >
              Add New Q&A Pair
            </Button>
          </div>
        );
      case 1:
        return (
          <div>
            {feedbackSection}
            {similarKnowledge.map(item => (
              <Card 
                key={item.id} 
                style={{ marginBottom: '16px' }}
                title={
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text strong>Similarity: {(item.similarity * 100).toFixed(0)}%</Text>
                    <Space>
                      <Radio.Group 
                        defaultValue={item.action}
                        optionType="button"
                        buttonStyle="solid"
                        size="small"
                      >
                        <Radio.Button value="merge">Merge</Radio.Button>
                        <Radio.Button value="keep-separate">Keep Separate</Radio.Button>
                        <Radio.Button value="delete">Delete</Radio.Button>
                      </Radio.Group>
                    </Space>
                  </div>
                }
              >
                <div>
                  <Title level={5}>Existing Q&A:</Title>
                  <Card type="inner" style={{ marginBottom: '12px' }}>
                    <Text strong>Q: {item.question}</Text>
                    <Paragraph style={{ marginTop: '8px' }}>A: {item.answer}</Paragraph>
                  </Card>
                  
                  <Title level={5}>New Generated Q&A:</Title>
                  <Card type="inner">
                    <Text strong>Q: {generatedQAPairs[0].question}</Text>
                    <Paragraph style={{ marginTop: '8px' }}>A: {generatedQAPairs[0].answer}</Paragraph>
                  </Card>
                </div>
              </Card>
            ))}
          </div>
        );
      case 2:
        return (
          <div>
            {feedbackSection}
            {contradictingKnowledge.map(item => (
              <Card 
                key={item.id} 
                style={{ marginBottom: '16px' }}
                title={
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text strong type="danger">Contradiction Detected</Text>
                    <Space>
                      <Radio.Group 
                        defaultValue={item.action}
                        optionType="button"
                        buttonStyle="solid"
                        size="small"
                      >
                        <Radio.Button value="keep">Keep</Radio.Button>
                        <Radio.Button value="delete">Delete</Radio.Button>
                      </Radio.Group>
                    </Space>
                  </div>
                }
              >
                <div>
                  <Alert 
                    message="Contradiction Issue" 
                    description={item.contradiction}
                    type="error" 
                    showIcon 
                    style={{ marginBottom: '16px' }}
                  />
                  
                  <Title level={5}>Existing Q&A:</Title>
                  <Card type="inner" style={{ marginBottom: '12px' }}>
                    <Text strong>Q: {item.question}</Text>
                    <Paragraph style={{ marginTop: '8px' }}>A: {item.answer}</Paragraph>
                  </Card>
                  
                  <Title level={5}>New Generated Q&A:</Title>
                  <Card type="inner">
                    <Text strong>Q: {generatedQAPairs[1].question}</Text>
                    <Paragraph style={{ marginTop: '8px' }}>A: {generatedQAPairs[1].answer}</Paragraph>
                  </Card>
                </div>
              </Card>
            ))}
          </div>
        );
      default:
        return null;
    }
  };
  
  // 渲染模态框底部按钮
  const renderModalFooter = () => {
    return [
      <Button key="cancel" onClick={handleKbModalClose}>
        Cancel
      </Button>,
      kbModalStep > 0 && (
        <Button key="prev" onClick={() => handleStepChange('prev')}>
          Previous
        </Button>
      ),
      kbModalStep < 2 ? (
        <Button key="next" type="primary" onClick={() => handleStepChange('next')}>
          Next
        </Button>
      ) : (
        <Button key="submit" type="primary" onClick={handleSubmitKbUpdate}>
          Submit for Review
        </Button>
      )
    ].filter(Boolean);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* 左侧导航栏 */}
      <Sider width={200} style={{ background: '#f5f5f5' }}>
        <div style={{ 
          height: 64, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'flex-start',
          padding: '0 16px',
          borderBottom: '1px solid #f0f0f0',
          background: '#f8f9fa'
        }}>
          <Typography.Text strong style={{ fontSize: 18, color: '#6366f1' }}>
            G123 CS
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
              style={{ marginLeft: 8, color: '#6366f1' }}
            />
          </Popover>
        </div>
        
        <div style={{ padding: '16px 8px', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px)' }}>
          <Dropdown 
            menu={{ 
              items: systemSwitchItems, 
              onClick: handleSystemSwitch,
              selectable: true,
              defaultSelectedKeys: ['ai-agents']
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
                <RobotOutlined />
                {currentSystem}
              </Space>
              <DownOutlined style={{ fontSize: 12 }} />
            </Button>
          </Dropdown>
          
          <div style={{ margin: '16px 0', borderBottom: '1px solid #e8e8e8' }}></div>
          
          <Menu
            mode="inline"
            defaultSelectedKeys={['expert-consults']}
            selectedKeys={[activeMenu]}
            style={{ height: '100%', borderRight: 0 }}
            onClick={handleMenuClick}
            items={[
              { key: 'evaluations', icon: <CheckCircleOutlined />, label: 'Evaluations' },
              { key: 'expert-consults', icon: <MessageOutlined />, label: 'Expert Consults' },
            ]}
          />
          
          <div style={{ marginTop: 'auto', padding: '16px 8px', borderTop: '1px solid #e8e8e8' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
              <Avatar icon={<UserOutlined />} />
              <div style={{ marginLeft: 8 }}>
                <Text strong style={{ display: 'block', lineHeight: '1.2' }}>Support Agent</Text>
                <Text type="secondary" style={{ fontSize: 12 }}>support@g123.com</Text>
              </div>
            </div>
            <Button 
              icon={<LogoutOutlined />} 
              style={{ width: '100%' }}
              type="text"
              danger
            >
              Sign Out
            </Button>
          </div>
        </div>
      </Sider>
      
      {/* 主内容区 - 三分屏 */}
      <Layout>
        <Content style={{ background: '#fff' }}>
          <div style={{ display: 'flex', height: 'calc(100vh)', width: '100%' }}>
            {/* 左侧 - 咨询列表 */}
            <div style={{ width: '25%', borderRight: '1px solid #f0f0f0', height: '100%', display: 'flex', flexDirection: 'column' }}>
              <div style={{ padding: '16px' }}>
                <Title level={4} style={{ marginBottom: 12, paddingLeft: 0, fontSize: '18px', lineHeight: '1.2' }}>Expert Consultations</Title>
                <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                  <Input
                    placeholder="Search consultations"
                    prefix={<SearchOutlined />}
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                    style={{ flex: 1 }}
                  />
                  <Tooltip title="Filter consultations waiting for reply">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Checkbox 
                        checked={unreadFilter}
                        onChange={handleUnreadFilterChange}
                      >
                        <Badge status="processing" style={{ marginRight: '4px' }} />
                        Waiting
                      </Checkbox>
                    </div>
                  </Tooltip>
                </div>
                
                {/* VIP/非VIP筛选标签 - 减少上边距并优化样式 */}
                <Tabs 
                  activeKey={vipTab} 
                  onChange={handleVipTabChange}
                  style={{ marginBottom: '8px' }}
                  tabBarStyle={{ marginBottom: 0 }}
                  renderTabBar={(props, DefaultTabBar) => (
                    <DefaultTabBar 
                      {...props} 
                      style={{ marginBottom: 0 }}
                    />
                  )}
                  animated={false}
                  tabBarGutter={8}
                  size="small"
                  moreIcon={<></>}
                  centered
                  items={[
                    { 
                      key: 'all', 
                      label: (
                        <span style={{ display: 'flex', alignItems: 'center' }}>
                          All <Tag style={{ marginLeft: '4px', lineHeight: '14px' }}>{allCount}</Tag>
                        </span>
                      ),
                      children: null
                    },
                    { 
                      key: 'vip', 
                      label: (
                        <span style={{ display: 'flex', alignItems: 'center' }}>
                          VIP <Tag color="#ff4d4f" style={{ marginLeft: '4px', lineHeight: '14px' }}>{vipCount}</Tag>
                        </span>
                      ),
                      children: null
                    },
                    { 
                      key: 'non-vip', 
                      label: (
                        <span style={{ display: 'flex', alignItems: 'center' }}>
                          Non-VIP <Tag style={{ marginLeft: '4px', lineHeight: '14px' }}>{nonVipCount}</Tag>
                        </span>
                      ),
                      children: null
                    }
                  ]}
                />
              </div>
              
              <div style={{ flex: 1, overflow: 'auto' }}>
                {/* 修复空数据状态显示逻辑 */}
                {filteredConsultations.length === 0 ? (
                  <div style={{ padding: '0 16px' }}>
                    <Empty 
                      image={Empty.PRESENTED_IMAGE_SIMPLE} 
                      description={
                        unreadFilter 
                          ? "No consultations waiting for reply" 
                          : vipTab === 'vip' 
                            ? "No VIP consultations found" 
                            : vipTab === 'non-vip' 
                              ? "No Non-VIP consultations found"
                              : "No consultations found"
                      } 
                      style={{ margin: '8px 0', fontSize: '12px' }}
                    />
                  </div>
                ) : (
                  <List
                    dataSource={filteredConsultations}
                    renderItem={item => (
                      <List.Item 
                        onClick={() => handleSelectConsultation(item)}
                        style={{ 
                          cursor: 'pointer',
                          background: selectedConsultation?.id === item.id ? '#f0f0f0' : 'transparent',
                          padding: '0',
                          display: 'flex',
                          borderBottom: '1px solid #f0f0f0',
                          position: 'relative'
                        }}
                      >
                        {/* 未读消息指示器 - 固定在右上角 */}
                        {item.unread && (
                          <Badge 
                            status="processing" 
                            style={{ 
                              position: 'absolute', 
                              right: '12px', 
                              top: '12px',
                              zIndex: 1
                            }} 
                          />
                        )}
                        
                        <div style={{ 
                          width: '100%', 
                          padding: '12px 16px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '4px'
                        }}>
                          <div style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'flex-start'
                          }}>
                            <div style={{ 
                              flex: 1,
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              paddingRight: '16px'
                            }}>
                              <Tooltip title={item.type}>
                                <Tag 
                                  color={
                                    item.isVip ? "#ff4d4f" : 
                                    "#d9d9d9"
                                  }
                                  style={{ 
                                    margin: 0, 
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '24px',
                                    height: '24px',
                                    padding: 0
                                  }}
                                >
                                  {getTypeIcon(item.type)}
                                </Tag>
                              </Tooltip>
                              <Text 
                                strong 
                                ellipsis 
                                style={{ 
                                  maxWidth: '100%', 
                                  fontSize: '14px',
                                  lineHeight: 1.4
                                }}
                              >
                                {item.title}
                              </Text>
                            </div>
                          </div>
                          
                          <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'space-between',
                            marginTop: '2px'
                          }}>
                            <Text 
                              type="secondary" 
                              ellipsis 
                              style={{ 
                                maxWidth: '100%',
                                fontSize: '12px'
                              }}
                            >
                              {item.lastMessage}
                            </Text>
                          </div>
                          
                          <div style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center',
                            marginTop: '2px'
                          }}>
                            <Space size={4}>
                              <Tag style={{ margin: 0, fontSize: '11px', lineHeight: 1, padding: '2px 4px' }}>
                                {item.game}
                              </Tag>
                            </Space>
                            <Text type="secondary" style={{ fontSize: '12px', flexShrink: 0 }}>
                              {item.timestamp}
                            </Text>
                          </div>
                        </div>
                      </List.Item>
                    )}
                  />
                )}
              </div>
            </div>
            
            {/* 中间 - 聊天窗口 */}
            <div style={{ width: '45%', height: '100%', display: 'flex', flexDirection: 'column' }}>
              <div style={{ padding: '16px', borderBottom: '1px solid #f0f0f0' }}>
                <Title level={4} style={{ marginBottom: 12, paddingLeft: 0, fontSize: '18px', lineHeight: '1.2' }}>{selectedConsultation?.title}</Title>
                <Tag color={
                  selectedConsultation?.status === 'active' ? 'green' : 
                  selectedConsultation?.status === 'pending' ? 'gold' : 'default'
                }>
                  {selectedConsultation?.status?.toUpperCase()}
                </Tag>
              </div>
              
              <div 
                ref={chatContainerRef}
                style={{ 
                  flex: 1, 
                  padding: '16px', 
                  overflow: 'auto',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                {chatMessages.map(message => (
                  <div
                    key={message.id}
                    style={{
                      alignSelf: message.sender === 'user' ? 'flex-end' : 
                               message.sender === 'system' ? 'center' : 'flex-start',
                      maxWidth: message.sender === 'system' ? '90%' : '80%',
                      marginBottom: '16px',
                      width: message.sender === 'system' ? '90%' : 'auto'
                    }}
                  >
                    {message.type === 'kb-update' ? (
                      <Card
                        title={
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <InfoCircleOutlined style={{ color: '#1677ff', marginRight: '8px' }} />
                            {(message.content as KnowledgeUpdateContent).title}
                          </div>
                        }
                        style={{ 
                          width: '100%', 
                          borderLeft: '4px solid #1677ff',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                        }}
                        actions={
                          (message.content as KnowledgeUpdateContent).status === 'start' ? [
                            <Button type="primary" key="start" onClick={() => handleKbUpdateAction('start')}>
                              Start
                            </Button>
                          ] : (message.content as KnowledgeUpdateContent).status === 'reviewing' ? [
                            <Button disabled key="reviewing">
                              In Review
                            </Button>
                          ] : (message.content as KnowledgeUpdateContent).status === 'revision' ? [
                            <Button type="primary" key="revise" onClick={() => handleKbUpdateAction('revision')}>
                              Revise
                            </Button>
                          ] : [
                            <Button type="default" key="completed" icon={<CheckCircleOutlined />} disabled>
                              Completed
                            </Button>
                          ]
                        }
                      >
                        <div>
                          <Paragraph>{(message.content as KnowledgeUpdateContent).description}</Paragraph>
                          <Divider style={{ margin: '12px 0' }} />
                          <div style={{ display: 'flex', justifyContent: 'space-between', margin: '8px 0' }}>
                            <Text type="secondary">User Query:</Text>
                            <Text strong>{(message.content as KnowledgeUpdateContent).query}</Text>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', margin: '8px 0' }}>
                            <Text type="secondary">Confidence:</Text>
                            <Text>{((message.content as KnowledgeUpdateContent).confidence * 100).toFixed(0)}%</Text>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', margin: '8px 0' }}>
                            <Text type="secondary">Suggested Action:</Text>
                            <Tag color="blue">{(message.content as KnowledgeUpdateContent).suggestedAction}</Tag>
                          </div>
                          {(message.content as KnowledgeUpdateContent).status === 'revision' && (
                            <Alert
                              message="Revision Required"
                              description={(message.content as KnowledgeUpdateContent).feedback ? 
                                <div>
                                  <div style={{marginBottom: '8px'}}>Please address the feedback and resubmit the knowledge update.</div>
                                  <div style={{fontSize: '12px', color: '#777'}}>Click "Revise" to view detailed feedback</div>
                                </div> : 
                                "Please address the feedback and resubmit the knowledge update."}
                              type="warning"
                              showIcon
                              style={{ marginTop: '12px' }}
                            />
                          )}
                        </div>
                      </Card>
                    ) : (
                      <div style={{ 
                        display: 'flex', 
                        flexDirection: message.sender === 'user' ? 'row-reverse' : 'row',
                        alignItems: 'flex-start',
                        gap: '8px'
                      }}>
                        <Avatar 
                          icon={message.sender === 'user' ? <UserOutlined /> : <RobotOutlined />} 
                          style={{ 
                            background: message.sender === 'user' ? '#1677ff' : '#f56a00',
                            minWidth: '32px',
                            height: '32px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '16px'
                          }}
                          size={32}
                        />
                        <div>
                          <Card
                            style={{ 
                              background: message.sender === 'user' ? '#e6f7ff' : '#f5f5f5',
                              border: 'none'
                            }}
                            bodyStyle={{ padding: '8px 12px' }}
                          >
                            {message.type === 'text' ? (
                              <Paragraph style={{ margin: 0 }}>{message.content as string}</Paragraph>
                            ) : message.type === 'image' ? (
                              <div style={{ maxWidth: '250px' }}>
                                <Image 
                                  src={message.content as string} 
                                  alt="User sent image" 
                                  style={{ maxWidth: '100%' }}
                                />
                              </div>
                            ) : null}
                          </Card>
                          <Text type="secondary" style={{ fontSize: '12px', display: 'block', marginTop: '4px' }}>
                            {message.timestamp}
                          </Text>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div style={{ padding: '16px', borderTop: '1px solid #f0f0f0' }}>
                {fileList.length > 0 && (
                  <div style={{ marginBottom: '8px' }}>
                    <Upload
                      listType="picture-card"
                      fileList={fileList}
                      onChange={handleUploadChange}
                      onPreview={handlePreview}
                      maxCount={5}
                      beforeUpload={beforeUpload}
                    />
                  </div>
                )}
                
                <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                  <TextArea
                    value={messageInput}
                    onChange={e => setMessageInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Type your message here..."
                    autoSize={{ minRows: 2, maxRows: 4 }}
                    style={{ flex: 1, borderRadius: '8px 0 0 8px' }}
                  />
                  <div style={{ display: 'flex' }}>
                    <Upload
                      accept="image/*"
                      showUploadList={false}
                      beforeUpload={beforeUpload}
                      fileList={[]}
                      onChange={handleUploadChange}
                    >
                      <Button 
                        icon={<PictureOutlined />} 
                        style={{ 
                          height: '40px',
                          borderRadius: '0',
                          borderLeft: 'none',
                          borderRight: 'none'
                        }}
                      />
                    </Upload>
                    <Button 
                      type="primary" 
                      icon={<SendOutlined />}
                      onClick={handleSendMessage}
                      disabled={!messageInput.trim() && fileList.length === 0}
                      style={{ 
                        height: '40px',
                        borderRadius: '0 8px 8px 0'
                      }}
                    />
                  </div>
                </div>
              </div>
              
              {/* 图片预览模态框 */}
              <Modal
                open={previewOpen}
                title="Image Preview"
                footer={null}
                onCancel={handlePreviewCancel}
              >
                <img alt="Preview" style={{ width: '100%' }} src={previewImage} />
              </Modal>
            </div>
            
            {/* 右侧 - 关联信息 */}
            <div style={{ width: '30%', borderLeft: '1px solid #f0f0f0', height: '100%', overflow: 'auto' }}>
              <div style={{ padding: '16px' }}>
                <Title level={4} style={{ marginBottom: 12, paddingLeft: 0, fontSize: '18px', lineHeight: '1.2' }}>Related Information</Title>
                
                {/* 游戏信息 */}
                <div style={{ 
                  background: '#f9f9f9', 
                  borderRadius: '8px', 
                  padding: '16px',
                  marginBottom: '16px'
                }}>
                  <Title level={5} style={{ marginBottom: '16px' }}>Game info</Title>
                  <div style={{ 
                    background: 'white', 
                    borderRadius: '8px', 
                    padding: '16px'
                  }}>
                    <Title level={3} style={{ margin: '0 0 8px 0' }}>{userInfo.game.name}</Title>
                    <Text style={{ display: 'block', color: '#666' }}>{userInfo.game.description}</Text>
                    <Text style={{ display: 'block', color: '#666', marginTop: '8px' }}>{userInfo.game.team}</Text>
                  </div>
                </div>
                
                {/* 用户信息 */}
                <div style={{ 
                  background: '#f9f9f9', 
                  borderRadius: '8px', 
                  padding: '16px',
                  marginBottom: '16px',
                  position: 'relative'
                }}>
                  <Title level={5} style={{ marginBottom: '16px' }}>User info</Title>
                  <Button 
                    icon={<CopyOutlined />} 
                    style={{ 
                      position: 'absolute', 
                      right: '16px', 
                      top: '16px',
                      border: 'none',
                      background: 'transparent'
                    }}
                  />
                  <div style={{ 
                    background: 'white', 
                    borderRadius: '8px', 
                    padding: '16px'
                  }}>
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <Text style={{ color: '#666', width: '120px' }}>G123 ID</Text>
                        <Text style={{ color: '#1677ff', fontWeight: 'bold' }}>{userInfo.user.g123Id}</Text>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <Text style={{ color: '#666', width: '120px' }}>Server ID</Text>
                        <Text>{userInfo.user.serverId}</Text>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <Text style={{ color: '#666', width: '120px' }}>Game UID</Text>
                        <Text>{userInfo.user.gameUid}</Text>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <Text style={{ color: '#666', width: '120px' }}>Role ID</Text>
                        <Text>{userInfo.user.roleId}</Text>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <Text style={{ color: '#666', width: '120px' }}>IM</Text>
                        <div>
                          <Avatar 
                            size="small" 
                            icon={<CommentOutlined />} 
                            style={{ 
                              background: '#06c755'
                            }} 
                          />
                        </div>
                      </div>
                    </div>
                    
                    <Divider style={{ margin: '8px 0 16px 0' }} />
                    
                    <div>
                      <div style={{ display: 'flex', marginBottom: '8px' }}>
                        <Text style={{ fontSize: '16px', fontWeight: 'bold' }}>Rank:{userInfo.user.rank}</Text>
                        <Text style={{ marginLeft: '16px', fontSize: '16px' }}>({userInfo.user.amount})</Text>
                      </div>
                      
                      <div style={{ marginBottom: '16px' }}>
                        <Tag color="#ff4d4f" style={{ borderRadius: '16px', padding: '0 10px' }}>{userInfo.user.vipLevel}</Tag>
                      </div>
                      
                      <Text type="secondary">{userInfo.user.system}</Text>
                    </div>
                  </div>
                </div>
                
                {/* 关联会话 */}
                <Title level={5}>Related Conversations</Title>
                {relatedConversations.length > 0 ? (
                  relatedConversations.map(conv => (
                    <Card 
                      key={conv.id}
                      size="small"
                      title={conv.title}
                      extra={<Text type="secondary">{conv.date}</Text>}
                      style={{ marginBottom: '12px' }}
                    >
                      <Paragraph ellipsis={{ rows: 3 }}>{conv.summary}</Paragraph>
                      <Button type="link" icon={<LinkOutlined />} size="small">
                        View Full Conversation
                      </Button>
                    </Card>
                  ))
                ) : (
                  <Empty description="No related conversations found" />
                )}
              </div>
            </div>
          </div>
        </Content>
      </Layout>
      
      {/* 知识库更新任务模态框 - 步骤式流程 */}
      <Modal
        title={renderStepTitle()}
        open={kbModalVisible}
        onCancel={handleKbModalClose}
        width={700}
        style={{ top: 20 }}
        bodyStyle={{ maxHeight: 'calc(80vh - 150px)', overflowY: 'auto' }}
        footer={renderModalFooter()}
      >
        <Steps
          current={kbModalStep}
          style={{ marginBottom: '24px' }}
          items={[
            { title: 'Confirm Q&A', description: 'Review generated content' },
            { title: 'Similar Knowledge', description: 'Check for duplicates' },
            { title: 'Contradictions', description: 'Resolve conflicts' }
          ]}
        />
        
        {renderStepContent()}
      </Modal>
    </Layout>
  );
} 