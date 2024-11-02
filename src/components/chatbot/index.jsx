import React from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';

const steps = [
  {
    id: '1',
    message: 'Hello! Welcome to Nybbletechnosoft. What’s your name?',
    trigger: 'name',
  },
  {
    id: 'name',
    user: true,
    trigger: '3',
  },
  {
    id: '3',
    message: 'Hi {previousValue}! How can I assist you today?',
    trigger: 'options',
  },
  {
    id: 'options',
    options: [
      { value: 'services', label: 'Tell me about your services', trigger: 'services' },
      { value: 'pricing', label: 'What are your pricing options?', trigger: 'pricing' },
    ],
  },
  {
    id: 'services',
    message: 'We offer a variety of services to help you with your needs. Can I tell you more?',
    end: true,
  },
  {
    id: 'pricing',
    message: 'We have flexible pricing plans to suit different needs. Let us know your budget, and we’ll suggest the best plan!',
    end: true,
  },
];

// Define custom styles for the chatbot
const theme = {
  background: '#f5f8fb',
  headerBgColor: '#18232B',
  headerFontColor: '#fff',
  headerFontSize: '20px',
  botBubbleColor: '#18232B',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
  position : 'fixed'
};

const MyChatBot = () => (
<div className='chatbot'>
  <ThemeProvider theme={theme}>
    <ChatBot
      steps={steps}
      placeholder="Type..."
      headerTitle="Nybbletechnosoft"
      botAvatar="https://img.icons8.com/clouds/100/000000/user.png"
      userAvatar="https://img.icons8.com/clouds/100/000000/user.png"
    />
  </ThemeProvider>
  </div>
);

export default MyChatBot;
