'use client';

import { useState, useEffect, useRef } from 'react';
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
  Drawer,
  Radio,
  Form,
  Tooltip,
  Modal,
  message,
  App,
  DatePicker
} from 'antd';
import { 
  SearchOutlined,
  PlusOutlined,
  ToolOutlined,
  RobotOutlined,
  SettingOutlined,
  UserOutlined,
  TeamOutlined,
  GlobalOutlined,
  DatabaseOutlined,
  DownOutlined,
  CustomerServiceOutlined,
  LogoutOutlined,
  QuestionCircleOutlined,
  CheckCircleOutlined,
  AppstoreOutlined,
  SwapOutlined,
  MessageOutlined,
  TranslationOutlined,
  CloseOutlined,
  SaveOutlined
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);
const { RangePicker } = DatePicker;

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

// 模拟数据
const agents = [
  {
    key: '1',
    name: 'Agent Alpha',
    status: 'Active',
    type: 'Customer Service',
    lastActive: '2023-05-12 09:30:45',
    performance: 'High',
  },
  {
    key: '2',
    name: 'Agent Beta',
    status: 'Inactive',
    type: 'Sales',
    lastActive: '2023-05-10 14:22:33',
    performance: 'Medium',
  },
  {
    key: '3',
    name: 'Agent Gamma',
    status: 'Active',
    type: 'Technical Support',
    lastActive: '2023-05-12 11:15:20',
    performance: 'High',
  },
  {
    key: '4',
    name: 'Agent Delta',
    status: 'Maintenance',
    type: 'Customer Service',
    lastActive: '2023-05-11 16:45:12',
    performance: 'Low',
  },
  {
    key: '5',
    name: 'Agent Epsilon',
    status: 'Active',
    type: 'Sales',
    lastActive: '2023-05-12 10:05:33',
    performance: 'Medium',
  },
];

// 模拟当前登录用户
const currentUser = { name: 'Tom', userid: 'tom123' };

// 模拟会话数据
const conversationData: Array<{
  id: string;
  query: string;
  rating: string;
  evaluatedTime: string;
  improvementType?: string | null;
  evaluator: string | null;
  conversation: Array<{ role: string; content: string; time: string }>;
  sessionTime?: string;
  isVip: boolean;
}> = [
  {
    id: 'C-2023-001',
    query: 'How do I reset my password?',
    rating: 'Pending',
    evaluatedTime: '-',
    evaluator: null,
    conversation: [
      { role: 'user', content: 'How do I reset my password?', time: '2023-05-12 09:30:12' },
      { role: 'ai', content: 'To reset your password, please follow these steps:\n1. Go to the login page\n2. Click on "Forgot Password"\n3. Enter your email address\n4. Follow the instructions sent to your email\n\nIs there anything else you need help with?', time: '2023-05-12 09:30:22' },
      { role: 'user', content: 'Thank you, that worked!', time: '2023-05-12 09:31:45' },
      { role: 'ai', content: "You're welcome! I'm glad I could help. If you have any other questions, feel free to ask.", time: '2023-05-12 09:31:55' }
    ],
    isVip: true,
  },
  {
    id: 'C-2023-002',
    query: 'What are the payment methods available?',
    rating: 'Excellent',
    evaluatedTime: '2023-05-12 14:22:33',
    improvementType: null,
    evaluator: null,
    conversation: [
      { role: 'user', content: 'What are the payment methods available?', time: '2023-05-12 14:20:10' },
      { role: 'ai', content: 'We accept the following payment methods:\n- Credit/Debit cards (Visa, Mastercard, American Express)\n- PayPal\n- Apple Pay\n- Google Pay\n- Bank transfer (for selected countries)\n\nWould you like more information about any specific payment method?', time: '2023-05-12 14:20:25' }
    ],
    isVip: false,
  },
  {
    id: 'C-2023-003',
    query: 'Why is my game crashing on startup?',
    rating: 'Needs Improvement',
    improvementType: 'Knowledge Update',
    evaluatedTime: '2023-05-12 11:15:20',
    evaluator: null,
    conversation: [
      { role: 'user', content: 'Why is my game crashing on startup?', time: '2023-05-12 11:10:15' },
      { role: 'ai', content: "I'm sorry to hear that your game is crashing. This could be due to several reasons:\n\n1. Your system doesn't meet the minimum requirements\n2. Outdated graphics drivers\n3. Corrupted game files\n\nCould you please provide your system specifications and the name of the game?", time: '2023-05-12 11:10:35' },
      { role: 'user', content: "I'm playing Stellar Odyssey on a gaming PC with RTX 3080, 32GB RAM, i9 processor. It was working fine yesterday.", time: '2023-05-12 11:11:22' },
      { role: 'ai', content: "Thank you for providing that information. Since your system exceeds the requirements and it was working fine yesterday, let's try these steps:\n\n1. Verify game files through the launcher\n2. Update your graphics drivers\n3. Restart your computer\n\nIf these steps don't work, please let me know.", time: '2023-05-12 11:11:45' }
    ],
    isVip: true,
  },
  {
    id: 'C-2023-004',
    query: 'Can I get a refund for my purchase?',
    rating: 'Poor',
    evaluatedTime: '2023-05-11 16:45:12',
    improvementType: null,
    evaluator: null,
    conversation: [
      { role: 'user', content: 'Can I get a refund for my purchase?', time: '2023-05-11 16:40:22' },
      { role: 'ai', content: "I'd be happy to help with your refund inquiry. Could you please provide more details about your purchase, such as:\n\n1. What product did you purchase?\n2. When did you make the purchase?\n3. Why are you seeking a refund?\n\nThis information will help me better assist you with your refund request.", time: '2023-05-11 16:40:45' },
      { role: 'user', content: "I bought the premium package yesterday, but I found that it doesn't have the features that were advertised.", time: '2023-05-11 16:41:30' },
      { role: 'ai', content: "I understand your concern. According to our refund policy, you are eligible for a refund within 14 days of purchase if the product doesn't meet the advertised specifications. I can process this refund for you right away. Please allow 3-5 business days for the amount to be credited back to your original payment method.", time: '2023-05-11 16:42:15' }
    ],
    isVip: false,
  },
  {
    id: 'C-2023-005',
    query: 'How do I upgrade my account to premium?',
    rating: 'Pending',
    evaluatedTime: '-',
    evaluator: null,
    conversation: [
      { role: 'user', content: 'How do I upgrade my account to premium?', time: '2023-05-12 10:05:10' },
      { role: 'ai', content: 'To upgrade your account to premium, please follow these steps:\n\n1. Log in to your account\n2. Go to "Account Settings"\n3. Select the "Subscription" tab\n4. Click on "Upgrade to Premium"\n5. Choose your preferred payment method and billing cycle\n6. Complete the payment process\n\nAfter completing these steps, your account will be instantly upgraded to premium status. Would you like me to explain any of these steps in more detail?', time: '2023-05-12 10:05:33' }
    ],
    isVip: true,
  }
];

// 预处理：为每条数据增加sessionTime字段（全部设为2025年5月10日）
conversationData.forEach(item => {
  item.sessionTime = '2025-05-10 09:00:00';
});

// 模拟翻译数据
const translations = {
  'en': {
    '如何重置我的密码？': 'How do I reset my password?',
    '要重置密码，请按照以下步骤操作：\n1. 前往登录页面\n2. 点击"忘记密码"\n3. 输入您的电子邮件地址\n4. 按照发送到您邮箱的指示操作\n\n还有什么需要帮助的吗？': 'To reset your password, please follow these steps:\n1. Go to the login page\n2. Click on "Forgot Password"\n3. Enter your email address\n4. Follow the instructions sent to your email\n\nIs there anything else you need help with?',
    '谢谢，解决了！': 'Thank you, that worked!',
    '不客气！很高兴能帮到您。如果您有任何其他问题，随时可以咨询。': 'You\'re welcome! I\'m glad I could help. If you have any other questions, feel free to ask.'
  },
  'zh-CN': {
    'How do I reset my password?': '如何重置我的密码？',
    'To reset your password, please follow these steps:\n1. Go to the login page\n2. Click on "Forgot Password"\n3. Enter your email address\n4. Follow the instructions sent to your email\n\nIs there anything else you need help with?': '要重置密码，请按照以下步骤操作：\n1. 前往登录页面\n2. 点击"忘记密码"\n3. 输入您的电子邮件地址\n4. 按照发送到您邮箱的指示操作\n\n还有什么需要帮助的吗？',
    'Thank you, that worked!': '谢谢，解决了！',
    'You\'re welcome! I\'m glad I could help. If you have any other questions, feel free to ask.': '不客气！很高兴能帮到您。如果您有任何其他问题，随时可以咨询。'
  },
  'ja': {
    'How do I reset my password?': 'パスワードをリセットするにはどうすればよいですか？',
    'To reset your password, please follow these steps:\n1. Go to the login page\n2. Click on "Forgot Password"\n3. Enter your email address\n4. Follow the instructions sent to your email\n\nIs there anything else you need help with?': 'パスワードをリセットするには、次の手順に従ってください：\n1. ログインページに移動します\n2. 「パスワードを忘れた」をクリックします\n3. メールアドレスを入力します\n4. メールに送信された指示に従います\n\n他に何かお手伝いできることはありますか？',
    'Thank you, that worked!': 'ありがとうございます、解決しました！',
    'You\'re welcome! I\'m glad I could help. If you have any other questions, feel free to ask.': 'どういたしまして！お役に立てて嬉しいです。他に質問があれば、お気軽にどうぞ。'
  },
  'fr': {
    'How do I reset my password?': 'Comment puis-je réinitialiser mon mot de passe ?',
    'To reset your password, please follow these steps:\n1. Go to the login page\n2. Click on "Forgot Password"\n3. Enter your email address\n4. Follow the instructions sent to your email\n\nIs there anything else you need help with?': 'Pour réinitialiser votre mot de passe, veuillez suivre ces étapes :\n1. Accédez à la page de connexion\n2. Cliquez sur "Mot de passe oublié"\n3. Saisissez votre adresse e-mail\n4. Suivez les instructions envoyées à votre e-mail\n\nY a-t-il autre chose dont vous avez besoin d\'aide ?',
    'Thank you, that worked!': 'Merci, ça a fonctionné !',
    'You\'re welcome! I\'m glad I could help. If you have any other questions, feel free to ask.': 'Je vous en prie ! Je suis heureux d\'avoir pu vous aider. Si vous avez d\'autres questions, n\'hésitez pas à les poser.'
  },
  'es': {
    'How do I reset my password?': '¿Cómo puedo restablecer mi contraseña?',
    'To reset your password, please follow these steps:\n1. Go to the login page\n2. Click on "Forgot Password"\n3. Enter your email address\n4. Follow the instructions sent to your email\n\nIs there anything else you need help with?': 'Para restablecer su contraseña, siga estos pasos:\n1. Vaya a la página de inicio de sesión\n2. Haga clic en "Olvidé mi contraseña"\n3. Ingrese su dirección de correo electrónico\n4. Siga las instrucciones enviadas a su correo electrónico\n\n¿Hay algo más en lo que pueda ayudarle?',
    'Thank you, that worked!': '¡Gracias, funcionó!',
    'You\'re welcome! I\'m glad I could help. If you have any other questions, feel free to ask.': '¡De nada! Me alegro de haber podido ayudar. Si tiene alguna otra pregunta, no dude en preguntar.'
  }
};

// 支持的语言选项
const languageOptions = [
  { value: 'original', label: 'Original' },
  { value: 'en', label: 'English' },
  { value: 'zh-CN', label: '中文' },
  { value: 'ja', label: '日本語' },
  { value: 'fr', label: 'Français' },
  { value: 'es', label: 'Español' }
];

export default function CSSystem() {
  const [selectedSystem, setSelectedSystem] = useState('cs-system');
  const [currentSystem, setCurrentSystem] = useState('AI Agents');
  const [activeMenu, setActiveMenu] = useState('evaluations');
  const [selectedConversation, setSelectedConversation] = useState<any>(null);
  const [selectedRowKey, setSelectedRowKey] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState('original');
  const [conversationList, setConversationList] = useState(conversationData);
  const [formChanged, setFormChanged] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [pendingConversation, setPendingConversation] = useState<any>(null);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  const initialValuesRef = useRef<{ rating: string; improvementType: string | null | undefined } | null>(null);
  const [selectedRating, setSelectedRating] = useState<string>('Pending');
  const [ratingFilter, setRatingFilter] = useState<string>('all');
  const [evaluatorFilter, setEvaluatorFilter] = useState<string>('all');
  const [dateRangeFilter, setDateRangeFilter] = useState<[any, any]>([
    dayjs().subtract(1, 'month').startOf('day'),
    dayjs().endOf('day')
  ]);
  const [vipFilter, setVipFilter] = useState<string>('vip');

  // 表格列定义
  const columns = [
    {
      title: 'Agent Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = 'green';
        if (status === 'Inactive') {
          color = 'volcano';
        } else if (status === 'Maintenance') {
          color = 'orange';
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Last Active',
      dataIndex: 'lastActive',
      key: 'lastActive',
    },
    {
      title: 'Performance',
      dataIndex: 'performance',
      key: 'performance',
      render: (performance: string) => {
        let color = 'green';
        if (performance === 'Medium') {
          color = 'blue';
        } else if (performance === 'Low') {
          color = 'red';
        }
        return <Tag color={color}>{performance}</Tag>;
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="middle">
          <a>Edit</a>
          <a>View</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

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

  // 系统菜单项
  const systemMenuItems = [
    {
      key: 'g123',
      icon: <GlobalOutlined />,
      label: 'G123 CS',
    },
    {
      key: 'cs-system',
      icon: <CustomerServiceOutlined />,
      label: 'Customer Service',
    }
  ];

  // 功能菜单项
  const functionMenuItems = [
    {
      key: 'expert-consults',
      icon: <QuestionCircleOutlined />,
      label: 'Expert Consults',
    },
    {
      key: 'evaluations',
      icon: <CheckCircleOutlined />,
      label: 'Evaluations',
    }
  ];

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
    },
    {
      key: 'tools',
      label: 'Tools',
      icon: <ToolOutlined />,
    },
  ];

  // 评估人选项
  const evaluatorOptions = Array.from(new Set(conversationList.map(item => item.evaluator).filter(Boolean)));
  // Pending计数
  const pendingCount = conversationList.filter(item => item.rating === 'Pending').length;
  // 筛选后的数据
  const filteredList = conversationList.filter(item => {
    // VIP筛选
    if (vipFilter === 'vip' && !item.isVip) return false;
    if (vipFilter === 'non-vip' && item.isVip) return false;
    // 评分筛选
    if (ratingFilter !== 'all' && item.rating.toLowerCase() !== ratingFilter) return false;
    // 评估人筛选
    if (evaluatorFilter !== 'all' && item.evaluator !== evaluatorFilter) return false;
    // 会话时间筛选
    if (item.sessionTime && dateRangeFilter && dateRangeFilter[0] && dateRangeFilter[1]) {
      const t = dayjs(item.sessionTime);
      if (!t.isBetween(dateRangeFilter[0], dateRangeFilter[1], null, '[]')) return false;
    }
    return true;
  });

  const handleSystemChange = (e: any) => {
    setSelectedSystem(e.key);
  };

  const handleSystemSwitch = (e: any) => {
    if (e.key === 'manual') {
      setCurrentSystem('Manual');
    } else if (e.key === 'ai-agents') {
      setCurrentSystem('AI Agents');
    } else {
      setCurrentSystem('Tools');
    }
  };

  const handleMenuClick = (e: any) => {
    setActiveMenu(e.key);
  };

  const handleSystemSelect = (system: string) => {
    // If the form has changes, show confirmation modal before switching
    if (formChanged && activeMenu === 'evaluations' && selectedConversation) {
      setConfirmModalVisible(true);
      setPendingConversation(null);
      return;
    }
    
    if (system === 'cs-system') {
      // Redirect to cs-system
      setCurrentSystem('AI Agents');
      setActiveMenu('evaluations');
    } else if (system === 'd-system') {
      // Redirect to d-system
      router.push('/d-system');
    } else if (system === 'expert-consults') {
      // Redirect to expert-consults page
      router.push('/cs-system/expert-consults');
    }
  };

  const showConversationDetail = (record: any) => {
    if (formChanged) {
      setPendingConversation(record);
      setConfirmModalVisible(true);
      return;
    }
    loadConversationDetail(record);
  };
  
  const loadConversationDetail = (record: any) => {
    setSelectedConversation(record);
    setSelectedRowKey(record.id);
    // 如果评分是待评价，预设表单值
    if (record.rating === 'Pending') {
      form.setFieldsValue({
        rating: 'Pending',
        improvementType: undefined
      });
      initialValuesRef.current = { rating: 'Pending', improvementType: undefined };
      setSelectedRating('Pending');
    } else {
      form.setFieldsValue({
        rating: record.rating,
        improvementType: record.improvementType
      });
      initialValuesRef.current = { rating: record.rating, improvementType: record.improvementType };
      setSelectedRating(record.rating);
    }
    setFormChanged(false);
  };
  
  const closeConversationDetail = () => {
    if (formChanged) {
      setPendingConversation(null);
      setConfirmModalVisible(true);
      return;
    }
    setSelectedConversation(null);
    setSelectedRowKey(null);
    setFormChanged(false);
  };

  const handleRatingChange = (value: string) => {
    setSelectedRating(value);
    // 如果选择了"Poor"，则显示改进类型选择
    if (value === 'Poor') {
      form.setFieldsValue({ improvementType: undefined });
    } else {
      form.setFieldsValue({ improvementType: null });
    }
    // 触发表单变更检测
    handleFormValuesChange();
  };

  const handleImprovementTypeChange = () => {
    // 标记表单已修改
    handleFormValuesChange();
  };
  
  const handleFormValuesChange = () => {
    // 只有表单值和初始值不一致时才设置为脏
    const current = form.getFieldsValue([ 'rating', 'improvementType' ]);
    const initial = initialValuesRef.current;
    if (!initial) {
      setFormChanged(false);
      return;
    }
    let changed = false;
    if (current.rating !== initial.rating) {
      changed = true;
    } else if (current.rating === 'Poor') {
      // 改进：明确判断从undefined/null到有值的变化
      const initialValue = initial.improvementType === undefined || initial.improvementType === null ? '' : initial.improvementType;
      const currentValue = current.improvementType === undefined || current.improvementType === null ? '' : current.improvementType;
      if (initialValue !== currentValue) {
        changed = true;
      }
    }
    console.log('Form values changed:', { current, initial, changed });
    setFormChanged(changed);
  };

  const handleSubmitEvaluation = () => {
    // 先检查如果是 Poor 评分，必须选择改善类型
    const rating = form.getFieldValue('rating');
    const improvementType = form.getFieldValue('improvementType');
    
    if (rating === 'Poor' && !improvementType) {
      messageApi.error('Please select improvement type for Poor rating');
      return;
    }
    
    form.validateFields().then(values => {
      if (selectedConversation) {
        // 更新会话数据
        const updatedList = [...conversationList];
        const index = updatedList.findIndex(item => item.id === selectedConversation.id);
        
        if (index !== -1) {
          updatedList[index] = {
            ...updatedList[index],
            rating: values.rating,
            improvementType: values.rating === 'Poor' ? values.improvementType : null,
            evaluatedTime: values.rating === 'Pending' ? '-' : new Date().toLocaleString(),
            evaluator: `${currentUser.name}（${currentUser.userid}）`
          };
          
          // 更新选中的会话
          setSelectedConversation(updatedList[index]);
          // 更新列表数据
          setConversationList(updatedList);
          // 重置表单修改状态
          setFormChanged(false);
          
          // 显示成功消息
          messageApi.success('Evaluation submitted successfully');
        }
      }
    });
  };
  
  const handleConfirmLeave = () => {
    if (pendingConversation) {
      loadConversationDetail(pendingConversation);
    } else {
      setSelectedConversation(null);
      setSelectedRowKey(null);
    }
    setConfirmModalVisible(false);
    setPendingConversation(null);
    setFormChanged(false);
  };
  
  const handleCancelLeave = () => {
    setConfirmModalVisible(false);
    setPendingConversation(null);
  };

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value);
  };

  // 获取翻译后的文本
  const getTranslatedText = (originalText: string, language: string) => {
    if (language === 'original') {
      return originalText;
    }
    
    // 检查是否有该语言的翻译
    const languageTranslations = translations[language as keyof typeof translations];
    if (languageTranslations && languageTranslations[originalText as keyof typeof languageTranslations]) {
      return languageTranslations[originalText as keyof typeof languageTranslations];
    }
    
    // 如果没有翻译，返回原文
    return originalText;
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
            background: item.key === 'cs' ? '#f0f7ff' : 'transparent',
            border: item.key === 'cs' ? '1px solid #d6e4ff' : '1px solid transparent',
          }}
        >
          <div style={{ 
            width: 40, 
            height: 40, 
            borderRadius: '50%', 
            background: item.key === 'cs' ? '#e6f4ff' : '#f5f5f5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 12,
            color: item.key === 'cs' ? '#1677ff' : '#666'
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
    if (activeMenu === 'expert-consults') {
      return (
        <>
          <Title level={4} style={{ marginBottom: 24 }}>Expert Consults</Title>
          <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
            <Col span={8}>
              <Input 
                placeholder="Search consults" 
                prefix={<SearchOutlined />} 
              />
            </Col>
            <Col span={4}>
              <Select defaultValue="all" style={{ width: '100%' }}>
                <Option value="all">All Status</Option>
                <Option value="pending">Pending</Option>
                <Option value="answered">Answered</Option>
                <Option value="escalated">Escalated</Option>
              </Select>
            </Col>
            <Col span={4}>
              <Select defaultValue="all" style={{ width: '100%' }}>
                <Option value="all">All Categories</Option>
                <Option value="product">Product</Option>
                <Option value="technical">Technical</Option>
                <Option value="billing">Billing</Option>
              </Select>
            </Col>
            <Col span={8} style={{ textAlign: 'right' }}>
              <Button type="primary" icon={<PlusOutlined />}>
                New Consult
              </Button>
            </Col>
          </Row>
          
          <Table 
            columns={[
              {
                title: 'Question ID',
                dataIndex: 'id',
                key: 'id',
              },
              {
                title: 'Question',
                dataIndex: 'question',
                key: 'question',
                render: (text: string) => <a>{text}</a>,
              },
              {
                title: 'Category',
                dataIndex: 'category',
                key: 'category',
              },
              {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
                render: (status: string) => {
                  let color = 'green';
                  if (status === 'Pending') {
                    color = 'gold';
                  } else if (status === 'Escalated') {
                    color = 'red';
                  }
                  return <Tag color={color}>{status}</Tag>;
                },
              },
              {
                title: 'Submitted',
                dataIndex: 'submitted',
                key: 'submitted',
              },
              {
                title: 'Action',
                key: 'action',
                render: (_: any, record: any) => (
                  <Space size="middle">
                    <a>Answer</a>
                    <a>View</a>
                    <a>Escalate</a>
                  </Space>
                ),
              },
            ]} 
            dataSource={[
              {
                key: '1',
                id: 'Q-2023-001',
                question: 'How to handle refund for virtual items?',
                category: 'Billing',
                status: 'Pending',
                submitted: '2023-05-12 09:30:45',
              },
              {
                key: '2',
                id: 'Q-2023-002',
                question: 'What is our policy on account sharing?',
                category: 'Policy',
                status: 'Answered',
                submitted: '2023-05-10 14:22:33',
              },
              {
                key: '3',
                id: 'Q-2023-003',
                question: 'How to resolve payment gateway error #5123?',
                category: 'Technical',
                status: 'Escalated',
                submitted: '2023-05-12 11:15:20',
              },
              {
                key: '4',
                id: 'Q-2023-004',
                question: 'What are the requirements for partner program?',
                category: 'Partnership',
                status: 'Pending',
                submitted: '2023-05-11 16:45:12',
              },
              {
                key: '5',
                id: 'Q-2023-005',
                question: 'How to handle abusive user reports?',
                category: 'Community',
                status: 'Answered',
                submitted: '2023-05-12 10:05:33',
              },
            ]} 
            pagination={{ pageSize: 10 }}
          />
        </>
      );
    } else {
      return (
        <>
          <Title level={4} style={{ marginBottom: 12, paddingLeft: 0, fontSize: '18px', lineHeight: '1.2' }}>Evaluations</Title>
          
          {/* 筛选区 */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 12,
            alignItems: 'center',
            marginBottom: 16
          }}>
            <div style={{ flex: '0 0 90px', minWidth: 80, maxWidth: 100 }}>
              <Select value={vipFilter} onChange={setVipFilter} style={{ width: '100%' }}>
                <Option value="all">All</Option>
                <Option value="vip">VIP</Option>
                <Option value="non-vip">Non-VIP</Option>
              </Select>
            </div>
            <div style={{ flex: '0 0 120px', minWidth: 100, maxWidth: 130 }}>
              <Select value={ratingFilter} onChange={setRatingFilter} style={{ width: '100%' }}>
                <Option value="all">All Ratings</Option>
                <Option value="pending">Pending ({pendingCount})</Option>
                <Option value="good">Good</Option>
                <Option value="usable">Usable</Option>
                <Option value="poor">Poor</Option>
              </Select>
            </div>
            <div style={{ flex: '0 0 160px', minWidth: 120, maxWidth: 180 }}>
              <Select value={evaluatorFilter} onChange={setEvaluatorFilter} style={{ width: '100%' }}>
                <Option value="all">All Evaluators</Option>
                {evaluatorOptions.map(ev => (
                  <Option key={ev} value={ev}>{ev}</Option>
                ))}
              </Select>
            </div>
            <div style={{ flex: '0 0 260px', minWidth: 180, maxWidth: 320 }}>
              <RangePicker
                value={dateRangeFilter}
                onChange={v => setDateRangeFilter(v as [any, any])}
                style={{ width: 260 }}
                allowClear={false}
                format="YYYY-MM-DD"
              />
            </div>
          </div>
          
          {/* 主内容区 - 表格+详情 */}
          <div style={{ 
            display: 'flex', 
            width: '100%', 
            overflow: 'hidden',
            position: 'relative'
          }}>
            {/* 左侧表格区 */}
            <div style={{ 
              flex: '1', 
              minWidth: '0', 
              overflow: 'auto', 
              marginRight: selectedConversation ? '32px' : '0'
            }}>
              <Table 
                rowClassName={(record) => record.id === selectedRowKey ? 'ant-table-row-selected' : ''}
                onRow={(record) => ({
                  onClick: () => showConversationDetail(record),
                  style: { cursor: 'pointer' }
                })}
                columns={[
                  {
                    title: 'Session Time',
                    dataIndex: 'sessionTime',
                    key: 'sessionTime',
                    width: 150,
                  },
                  {
                    title: 'VIP',
                    dataIndex: 'isVip',
                    key: 'isVip',
                    width: 80,
                    render: (isVip: boolean) => isVip ? <Tag color="gold">VIP</Tag> : <Tag>Non-VIP</Tag>
                  },
                  {
                    title: 'Session ID',
                    dataIndex: 'id',
                    key: 'id',
                    width: 120,
                  },
                  {
                    title: 'Query',
                    dataIndex: 'query',
                    key: 'query',
                    ellipsis: true,
                  },
                  {
                    title: 'Rating',
                    dataIndex: 'rating',
                    key: 'rating',
                    width: 100,
                    render: (rating: string) => {
                      if (rating === 'Pending') {
                        return <Tag color="default">Pending</Tag>;
                      } else if (rating === 'Good') {
                        return <Tag color="green">Good</Tag>;
                      } else if (rating === 'Usable') {
                        return <Tag color="blue">Usable</Tag>;
                      } else if (rating === 'Poor') {
                        return <Tag color="orange">Poor</Tag>;
                      }
                      return <Tag>{rating}</Tag>;
                    },
                  },
                  {
                    title: 'Improvement Type',
                    dataIndex: 'improvementType',
                    key: 'improvementType',
                    width: 180,
                    render: (type: string, record: any) => {
                      if (record.rating === 'Poor' && type) {
                        return <Tag color="volcano">{type}</Tag>;
                      }
                      return '-';
                    },
                  },
                  {
                    title: 'Evaluated Time',
                    dataIndex: 'evaluatedTime',
                    key: 'evaluatedTime',
                    width: 180,
                  },
                  {
                    title: 'Evaluator',
                    dataIndex: 'evaluator',
                    key: 'evaluator',
                    width: 180,
                    render: (evaluator: string) => evaluator || '-',
                  },
                  {
                    title: 'Action',
                    key: 'action',
                    width: 100,
                    render: (_: any, record: any) => (
                      <Button 
                        type="link" 
                        onClick={(e) => {
                          e.stopPropagation();
                          showConversationDetail(record);
                        }}
                      >
                        View
                      </Button>
                    ),
                  },
                ]}
                dataSource={filteredList}
                pagination={{ pageSize: 10 }}
                scroll={{ x: 'max-content' }}
              />
            </div>
            
            {/* 右侧详情区 */}
            {selectedConversation && (
              <div style={{ 
                width: '400px', 
                flex: '0 0 auto', 
                borderLeft: '1px solid #f0f0f0',
                padding: '0 0 0 32px',
                background: '#fff',
                overflow: 'auto'
              }}>
                <div style={{ position: 'sticky', top: 0 }}>
                  <div style={{ marginBottom: 24 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                      <Title level={5} style={{ margin: 0 }}>Session ID: {selectedConversation.id}</Title>
                      <Button 
                        type="text" 
                        icon={<CloseOutlined />} 
                        onClick={closeConversationDetail}
                        aria-label="Close detail view"
                      />
                    </div>
                    <Paragraph>
                      <Text strong>Query: </Text>
                      {selectedConversation.query}
                    </Paragraph>
                    <Paragraph>
                      <Text strong>Evaluator: </Text>
                      {selectedConversation.evaluator || '-'}
                    </Paragraph>
                  </div>
                  
                  <Form
                    form={form}
                    layout="vertical"
                    initialValues={{
                      rating: selectedConversation.rating,
                      improvementType: selectedConversation.improvementType
                    }}
                    onValuesChange={handleFormValuesChange}
                  >
                    <Form.Item 
                      name="rating" 
                      label={<span style={{ color: '#ff4d4f', fontSize: '14px' }}>Rating</span>} 
                      rules={[{ required: true, message: 'Please select a rating' }]}
                    >
                      <Radio.Group 
                        onChange={(e) => handleRatingChange(e.target.value)}
                        buttonStyle="solid"
                        optionType="button"
                      >
                        <Radio.Button value="Pending">Pending</Radio.Button>
                        <Radio.Button value="Good">Good</Radio.Button>
                        <Radio.Button value="Usable">Usable</Radio.Button>
                        <Radio.Button value="Poor">Poor</Radio.Button>
                      </Radio.Group>
                    </Form.Item>
                    
                    {selectedRating === 'Poor' && (
                      <Form.Item 
                        name="improvementType" 
                        label="Improvement Type" 
                        rules={[{ required: true, message: 'Please select improvement type' }]}
                      >
                        <Select 
                          placeholder="Select improvement type"
                          onChange={handleImprovementTypeChange}
                          style={{ width: '100%' }}
                        >
                          <Option value="Knowledge Update">Knowledge Update</Option>
                          <Option value="Inappropriate Tone">Inappropriate Tone</Option>
                          <Option value="Fabricated Answer">Fabricated Answer</Option>
                          <Option value="Other">Other</Option>
                        </Select>
                      </Form.Item>
                    )}
                    
                    <Form.Item>
                      <Button 
                        type="primary" 
                        icon={<SaveOutlined />} 
                        onClick={handleSubmitEvaluation}
                        disabled={selectedRating === 'Poor' && !form.getFieldValue('improvementType')}
                      >
                        Submit Evaluation
                      </Button>
                    </Form.Item>
                  </Form>
                  
                  <style jsx global>{`
                    .ant-radio-button-wrapper:nth-child(1) {
                      background-color: #f0f0f0;
                      color: #666;
                      border-color: #d9d9d9;
                    }
                    .ant-radio-button-wrapper:nth-child(1).ant-radio-button-wrapper-checked {
                      background-color: #f0f0f0;
                      color: #000;
                      border-color: #d9d9d9;
                      box-shadow: none !important;
                    }
                    .ant-radio-button-wrapper:nth-child(2) {
                      color: #52c41a;
                    }
                    .ant-radio-button-wrapper:nth-child(2).ant-radio-button-wrapper-checked {
                      background-color: #f6ffed;
                      color: #52c41a;
                      border-color: #b7eb8f;
                      box-shadow: none !important;
                    }
                    .ant-radio-button-wrapper:nth-child(3) {
                      color: #1677ff;
                    }
                    .ant-radio-button-wrapper:nth-child(3).ant-radio-button-wrapper-checked {
                      background-color: #e6f7ff;
                      color: #1677ff;
                      border-color: #91caff;
                      box-shadow: none !important;
                    }
                    .ant-radio-button-wrapper:nth-child(4) {
                      color: #fa8c16;
                    }
                    .ant-radio-button-wrapper:nth-child(4).ant-radio-button-wrapper-checked {
                      background-color: #fff7e6;
                      color: #fa8c16;
                      border-color: #ffd591;
                      box-shadow: none !important;
                    }
                    .ant-table-row-selected > td {
                      background-color: #e6f7ff !important;
                    }
                  `}</style>
                  
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    margin: '24px 0 16px',
                    borderBottom: '1px solid #f0f0f0',
                    paddingBottom: '8px'
                  }}>
                    <Text strong style={{ fontSize: '16px', marginRight: '12px' }}>Conversation</Text>
                    <Tooltip title="Translate conversation">
                      <Select 
                        value={selectedLanguage}
                        onChange={handleLanguageChange}
                        style={{ width: 120 }}
                        size="small"
                        popupMatchSelectWidth={false}
                        suffixIcon={<TranslationOutlined />}
                      >
                        {languageOptions.map(option => (
                          <Option key={`lang-${option.value}`} value={option.value}>{option.label}</Option>
                        ))}
                      </Select>
                    </Tooltip>
                  </div>
                  
                  <div style={{ maxHeight: 'calc(100vh - 380px)', overflowY: 'auto' }}>
                    {selectedConversation.conversation.map((msg: any, index: number) => (
                      <div 
                        key={`msg-${selectedConversation.id}-${index}`} 
                        style={{ 
                          marginBottom: 16, 
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start'
                        }}
                      >
                        <div style={{ 
                          background: msg.role === 'user' ? '#e6f7ff' : '#f6f6f6',
                          padding: '12px 16px',
                          borderRadius: 8,
                          maxWidth: '90%',
                          position: 'relative'
                        }}>
                          <div style={{ 
                            fontWeight: 'bold', 
                            marginBottom: 4,
                            color: msg.role === 'user' ? '#1677ff' : '#333'
                          }}>
                            {msg.role === 'user' ? 'User' : 'AI Assistant'}
                          </div>
                          <div style={{ whiteSpace: 'pre-wrap' }}>
                            {getTranslatedText(msg.content, selectedLanguage)}
                          </div>
                          <div style={{ 
                            fontSize: 12, 
                            color: '#999', 
                            marginTop: 8,
                            textAlign: 'right'
                          }}>
                            {msg.time}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* 确认对话框 */}
          <Modal
            title="Unsaved Changes"
            open={confirmModalVisible}
            onOk={handleConfirmLeave}
            onCancel={handleCancelLeave}
            okText="Leave without saving"
            cancelText="Stay on this page"
          >
            <p>You have unsaved evaluation changes. Do you want to leave without saving?</p>
          </Modal>
        </>
      );
    }
  };

  return (
    <App>
      <Layout style={{ minHeight: '100vh' }}>
        {contextHolder}
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
              defaultSelectedKeys={['evaluations']}
              selectedKeys={[activeMenu]}
              style={{ height: '100%', borderRight: 0 }}
              onClick={handleMenuClick}
              items={[
                { key: 'evaluations', icon: <CheckCircleOutlined />, label: 'Evaluations' },
                { key: 'expert-consults', icon: <MessageOutlined />, label: 'Expert Consults', onClick: () => handleSystemSelect('expert-consults') },
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
        </Layout.Sider>
        
        <Content style={{ padding: 24, background: '#fff', margin: 0 }}>
          {renderContent()}
        </Content>
      </Layout>
    </App>
  );
} 