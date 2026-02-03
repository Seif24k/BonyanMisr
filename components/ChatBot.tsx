'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import CubeLoader from './ui/cube-loader';

interface Message {
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

export function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showInitialPulse, setShowInitialPulse] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    // Detect if we're on Arabic route
    const isArabic = pathname.startsWith('/ar');

    // Translations
    const t = {
        title: isArabic ? 'مساعد بنيان مصر' : 'BonyanMisr Assistant',
        placeholder: isArabic ? 'اكتب رسالتك هنا...' : 'Type your message...',
        send: isArabic ? 'إرسال' : 'Send',
        welcomeMessage: isArabic
            ? 'مرحباً! كيف يمكنني مساعدتك بشأن خدمات البناء والتصميم الداخلي؟'
            : 'Hello! How can I help you with our construction and interior design services?',
        errorMessage: isArabic
            ? 'عذراً، حدث خطأ. يرجى المحاولة مرة أخرى.'
            : 'Sorry, an error occurred. Please try again.',
    };

    // Auto-scroll to bottom when new messages arrive
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Show welcome message when first opened
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setMessages([{
                role: 'assistant',
                content: t.welcomeMessage,
                timestamp: new Date(),
            }]);
        }
    }, [isOpen]);

    // Hide initial pulse after 5 seconds
    useEffect(() => {
        const timer = setTimeout(() => setShowInitialPulse(false), 5000);
        return () => clearTimeout(timer);
    }, []);

    const handleSendMessage = async () => {
        if (!inputValue.trim() || isLoading) return;

        const userMessage: Message = {
            role: 'user',
            content: inputValue.trim(),
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        try {
            // Prepare conversation history (exclude welcome message if it's the only one)
            const conversationHistory = messages
                .filter(m => m.content !== t.welcomeMessage)
                .map(m => ({ role: m.role, content: m.content }));

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userMessage.content,
                    conversationHistory,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to get response');
            }

            const assistantMessage: Message = {
                role: 'assistant',
                content: data.message,
                timestamp: new Date(),
            };

            setMessages(prev => [...prev, assistantMessage]);
        } catch (error) {
            console.error('Chat error:', error);
            const errorMsg: Message = {
                role: 'assistant',
                content: t.errorMessage,
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <>
            {/* Floating Chat Button with CubeLoader */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-50 w-20 h-20 bg-transparent text-white flex items-center justify-center group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={isOpen ? 'Close chat' : 'Open chat'}
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="w-16 h-16 rounded-full bg-gradient-to-br from-[#003366]/90 to-[#001a33]/90 backdrop-blur-sm flex items-center justify-center shadow-2xl hover:shadow-[#d4af37]/50"
                        >
                            <X className="w-8 h-8 text-[#d4af37]" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="open"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <CubeLoader />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.8 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className={`fixed bottom-24 right-6 z-50 w-[400px] h-[600px] max-w-[calc(100vw-3rem)] max-h-[calc(100vh-8rem)] bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700 flex flex-col overflow-hidden ${isArabic ? 'font-arabic' : ''
                            }`}
                        dir={isArabic ? 'rtl' : 'ltr'}
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-[#003366] to-[#001a33] px-6 py-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center relative overflow-hidden">
                                    <Image
                                        src="/bonyanmisr-logo.png"
                                        alt="BonyanMisr Logo"
                                        fill
                                        className="object-cover scale-110"
                                    />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white">{t.title}</h3>
                                    <p className="text-xs text-gray-300">
                                        {isArabic ? 'متصل الآن' : 'Online now'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Messages Container */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
                            {messages.map((message, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[80%] rounded-2xl px-4 py-3 ${message.role === 'user'
                                                ? 'bg-gradient-to-br from-[#d4af37] to-[#b8941f] text-white'
                                                : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700'
                                            }`}
                                    >
                                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                                        <p className={`text-xs mt-1 ${message.role === 'user' ? 'text-white/70' : 'text-gray-500 dark:text-gray-400'
                                            }`}>
                                            {message.timestamp.toLocaleTimeString(isArabic ? 'ar-EG' : 'en-US', {
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}

                            {/* Typing Indicator */}
                            {isLoading && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex justify-start"
                                >
                                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-3 flex items-center gap-2">
                                        <div className="flex gap-1">
                                            <motion.div
                                                className="w-2 h-2 bg-[#003366] rounded-full"
                                                animate={{ y: [0, -6, 0] }}
                                                transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                                            />
                                            <motion.div
                                                className="w-2 h-2 bg-[#003366] rounded-full"
                                                animate={{ y: [0, -6, 0] }}
                                                transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                                            />
                                            <motion.div
                                                className="w-2 h-2 bg-[#003366] rounded-full"
                                                animate={{ y: [0, -6, 0] }}
                                                transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder={t.placeholder}
                                    disabled={isLoading}
                                    className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#d4af37] disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                                <button
                                    onClick={handleSendMessage}
                                    disabled={!inputValue.trim() || isLoading}
                                    className="px-4 py-3 bg-gradient-to-r from-[#d4af37] to-[#b8941f] text-white rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center min-w-[48px]"
                                    aria-label={t.send}
                                >
                                    {isLoading ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <Send className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
