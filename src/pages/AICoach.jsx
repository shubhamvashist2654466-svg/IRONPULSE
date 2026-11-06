import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Bot,
  Send,
  Sparkles,
  Dumbbell,
  Apple,
  TrendingUp,
  Flame,
  User,
  Zap,
  Info,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const SUGGESTED_PROMPTS = [
  'Create a muscle-building workout',
  'Help me lose body fat',
  'Suggest a vegetarian high-protein diet',
  'How can I improve my strength?',
  'What should I eat after a workout?'
];

const INITIAL_MESSAGES = [
  {
    id: 'msg_1',
    sender: 'bot',
    timestamp: 'Just now',
    text: "Greetings, Athlete. I am PULSE-AI, your biomechanics and sports nutrition advisor. How can I optimize your training, macros, or recovery today?",
    cards: null
  }
];

export default function AICoach() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState('hypertrophy');

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend) => {
    const query = textToSend || inputMessage;
    if (!query.trim()) return;

    const userMsg = {
      id: 'usr_' + Date.now(),
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: query,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    // Simulated intelligent response engine based on query keywords
    setTimeout(() => {
      const lower = query.toLowerCase();
      let botResponse = {
        id: 'bot_' + Date.now(),
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: '',
        cards: null
      };

      if (lower.includes('muscle') || lower.includes('hypertrophy') || lower.includes('build')) {
        botResponse.text =
          "To maximize muscular hypertrophy, we recommend focusing on mechanical tension within an RPE 7-9 range across 10-18 weekly sets per muscle group. Here is your suggested Push Day A foundation:";
        botResponse.cards = [
          { title: 'Barbell Bench Press', detail: '4 Sets × 6-8 Reps | 120s Rest | Primary Chest' },
          { title: 'Incline Dumbbell Press', detail: '3 Sets × 8-10 Reps | 90s Rest | Upper Chest' },
          { title: 'Overhead Barbell Press', detail: '3 Sets × 8-10 Reps | 90s Rest | Deltoids' },
          { title: 'Cable Lateral Raise', detail: '4 Sets × 12-15 Reps | 60s Rest | Side Delts' }
        ];
      } else if (lower.includes('fat') || lower.includes('lose') || lower.includes('cut')) {
        botResponse.text =
          "For fat loss, a moderate caloric deficit of 300-500 kcal below your TDEE ensures fat mobilization without metabolic crash or muscle loss. Keep protein elevated at 2.0-2.2g per kg of bodyweight, prioritize 8,000-10,000 steps daily (NEAT), and maintain heavy resistance training to signal nitrogen retention.";
        botResponse.cards = [
          { title: 'Daily Calorie Target', detail: 'TDEE minus 400 kcal (e.g. 2,100 kcal)' },
          { title: 'Protein Threshold', detail: '160g - 180g / day (Preserves lean mass)' },
          { title: 'Cardio Protocol', detail: '3x weekly Zone 2 cardio (30 mins at 120-135 bpm)' }
        ];
      } else if (lower.includes('veg') || lower.includes('vegetarian') || lower.includes('plant')) {
        botResponse.text =
          "Vegetarian athletes can build elite physiques by combining complementary plant proteins. Consume 30-35g total protein per meal to trigger the 3.0g leucine threshold. Key staples include Paneer, Soya Chunks (52% protein density), Moong Dal, Greek Yogurt, and Chickpeas.";
        botResponse.cards = [
          { title: 'Breakfast', detail: 'Rolled Oats + 1 scoop Whey/Soy Isolate + 15g Almonds' },
          { title: 'Lunch', detail: '50g dry Soya Chunks curry + 1 cup Dal + 150g Brown Rice' },
          { title: 'Dinner', detail: '120g Grilled Paneer + 2 Multigrain Rotis + Veg Salad' }
        ];
      } else if (lower.includes('strength') || lower.includes('bench') || lower.includes('squat')) {
        botResponse.text =
          "Pure strength development is neural. Train the central nervous system with lower repetitions (3 to 6 reps), longer rest periods (3 to 5 minutes) to replenish phosphocreatine stores, and focus on technical bar path efficiency. Never train to absolute muscular failure on compound barbell movements.";
        botResponse.cards = [
          { title: 'Intensity Zone', detail: '80% - 90% of 1-Rep Max (RPE 8)' },
          { title: 'Rest Protocol', detail: '180 - 240 seconds between heavy working sets' },
          { title: 'Compound Core', detail: 'Squat, Bench Press, Deadlift, Overhead Press' }
        ];
      } else if (lower.includes('post') || lower.includes('eat') || lower.includes('nutrition')) {
        botResponse.text =
          "Post-workout recovery centers on two goals: initiating muscle protein synthesis (MPS) with fast-digesting protein and replenishing glycogen stores with easily absorbable carbohydrates. Consume 25-40g whey protein or egg whites paired with a banana, rice cakes, or sweet potato within 90 minutes.";
      } else {
        botResponse.text =
          `Understood, athlete. Based on your goal (${selectedGoal.toUpperCase()}) and current profile, consistency in resistance training and hit-rate on daily protein targets will determine 80% of your progress. Would you like a personalized 7-day workout split or a tailored daily calorie calculation?`;
      }

      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <div className="min-h-screen bg-dark-950 py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto flex flex-col h-[calc(100vh-5rem)]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-dark-700/80 gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-neon/15 border border-neon/40 flex items-center justify-center text-neon shadow-neon-sm">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black font-display text-white">
                PULSE-AI COACH
              </h1>
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-500/10 text-green-400 border border-green-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                ONLINE
              </span>
            </div>
            <p className="text-xs text-zinc-400">
              Evidence-based workout and nutrition intelligence simulation.
            </p>
          </div>
        </div>

        {/* Goal Selector Pill */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-400 font-semibold uppercase">Focus:</span>
          <select
            value={selectedGoal}
            onChange={(e) => setSelectedGoal(e.target.value)}
            className="bg-dark-900 border border-dark-700 rounded-xl px-3 py-1.5 text-xs text-neon font-bold focus:outline-none focus:border-neon cursor-pointer"
          >
            <option value="hypertrophy">Muscle Hypertrophy</option>
            <option value="fat_loss">Fat Loss Shred</option>
            <option value="strength">Pure Strength</option>
            <option value="conditioning">Athletic Conditioning</option>
          </select>
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="flex-1 overflow-y-auto py-6 space-y-5 px-2">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Avatar */}
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
                  isUser
                    ? 'bg-dark-800 border-dark-600 text-white'
                    : 'bg-neon/15 border-neon/40 text-neon'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Zap className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-xl rounded-2xl p-4 text-sm leading-relaxed ${
                  isUser
                    ? 'bg-neon text-black font-semibold shadow-neon-sm rounded-tr-none'
                    : 'bg-dark-900 border border-dark-700 text-zinc-200 rounded-tl-none shadow-xl'
                }`}
              >
                <p className="whitespace-pre-line">{msg.text}</p>

                {/* Structured Cards inside bot message */}
                {msg.cards && (
                  <div className="mt-4 pt-3 border-t border-dark-700/80 space-y-2">
                    <p className="text-[11px] font-mono font-bold text-neon uppercase tracking-wider">
                      Recommended Protocol:
                    </p>
                    {msg.cards.map((c, i) => (
                      <div
                        key={i}
                        className="p-2.5 rounded-xl bg-dark-800 border border-dark-700 flex flex-col text-xs"
                      >
                        <span className="font-bold text-white">{c.title}</span>
                        <span className="text-zinc-400 text-[11px] mt-0.5">{c.detail}</span>
                      </div>
                    ))}
                  </div>
                )}

                <span
                  className={`block text-[10px] mt-2 font-mono ${
                    isUser ? 'text-black/60 text-right' : 'text-zinc-500'
                  }`}
                >
                  {msg.timestamp}
                </span>
              </div>
            </motion.div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-neon/15 border border-neon/40 flex items-center justify-center text-neon">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <div className="bg-dark-900 border border-dark-700 px-4 py-3 rounded-2xl flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-neon animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-neon animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-neon animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions */}
      <div className="shrink-0 pt-2 pb-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {SUGGESTED_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className="text-xs px-3 py-1.5 rounded-xl bg-dark-900 border border-dark-700 hover:border-neon text-zinc-300 hover:text-white whitespace-nowrap transition-all"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input Box */}
      <div className="shrink-0 pb-2">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="relative flex items-center"
        >
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask PULSE-AI about your workout splits, nutrition macros, exercise form, or recovery..."
            className="w-full bg-dark-900 border border-dark-700 rounded-2xl pl-5 pr-14 py-4 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-neon shadow-2xl transition-colors"
          />
          <button
            type="submit"
            disabled={!inputMessage.trim() || isTyping}
            className="absolute right-2.5 p-2.5 rounded-xl bg-neon text-black font-bold hover:bg-neon-hover disabled:opacity-40 disabled:pointer-events-none transition-all shadow-neon-sm"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        <p className="text-[10px] text-zinc-500 text-center mt-2">
          PULSE-AI is an evidence-based simulated fitness assistant. Always consult a healthcare professional before intense training.
        </p>
      </div>
    </div>
  );
}

