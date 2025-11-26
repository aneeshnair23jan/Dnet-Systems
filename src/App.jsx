import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Cpu, HardDrive, Monitor, Mouse, Trash2, Save, Printer, Phone, MapPin, Clock, Check, X, Menu, Sparkles, MessageSquare, Send, Loader2, AlertCircle, RefreshCw } from 'lucide-react';

// --- MOCK DATA FOR PC COMPONENTS WITH COMPATIBILITY TAGS ---
const COMPONENT_CATEGORIES = [
  {
    id: 'cpu',
    name: 'Processor',
    icon: <Cpu className="w-5 h-5" />,
    items: [
      { id: 'c1', name: 'Intel Core i3-12100F', price: 8500, brand: 'Intel', socket: 'LGA1700', image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=150&q=80' },
      { id: 'c2', name: 'Intel Core i5-12400F', price: 12500, brand: 'Intel', socket: 'LGA1700', image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=150&q=80' },
      { id: 'c3', name: 'Intel Core i5-13400F', price: 19800, brand: 'Intel', socket: 'LGA1700', image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=150&q=80' },
      { id: 'c4', name: 'Intel Core i7-13700K', price: 36000, brand: 'Intel', socket: 'LGA1700', image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=150&q=80' },
      { id: 'c5', name: 'AMD Ryzen 5 5600X', price: 14500, brand: 'AMD', socket: 'AM4', image: 'https://images.unsplash.com/photo-1555618568-9323d028d384?auto=format&fit=crop&w=150&q=80' },
      { id: 'c6', name: 'AMD Ryzen 7 5800X', price: 21000, brand: 'AMD', socket: 'AM4', image: 'https://images.unsplash.com/photo-1555618568-9323d028d384?auto=format&fit=crop&w=150&q=80' },
    ]
  },
  {
    id: 'mobo',
    name: 'Motherboard',
    icon: <Cpu className="w-5 h-5" />,
    items: [
      { id: 'm1', name: 'MSI H610M Bomber', price: 6200, brand: 'MSI', socket: 'LGA1700', memoryType: 'DDR4', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=150&q=80' },
      { id: 'm2', name: 'Gigabyte B660M DS3H', price: 10500, brand: 'Gigabyte', socket: 'LGA1700', memoryType: 'DDR4', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=150&q=80' },
      { id: 'm3', name: 'ASUS Prime B550M-K', price: 8900, brand: 'ASUS', socket: 'AM4', memoryType: 'DDR4', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=150&q=80' },
      { id: 'm4', name: 'ASUS ROG Strix B760-F', price: 24500, brand: 'ASUS', socket: 'LGA1700', memoryType: 'DDR5', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=150&q=80' },
    ]
  },
  {
    id: 'ram',
    name: 'RAM (Memory)',
    icon: <Cpu className="w-5 h-5" />,
    items: [
      { id: 'r1', name: '8GB DDR4 3200MHz', price: 1800, brand: 'Corsair', type: 'DDR4', image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=150&q=80' },
      { id: 'r2', name: '16GB (8GBx2) DDR4 3200MHz', price: 3500, brand: 'Corsair', type: 'DDR4', image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=150&q=80' },
      { id: 'r3', name: '16GB DDR5 5200MHz', price: 4200, brand: 'Kingston', type: 'DDR5', image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=150&q=80' },
      { id: 'r4', name: '32GB (16GBx2) DDR5 6000MHz', price: 9500, brand: 'G.Skill', type: 'DDR5', image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=150&q=80' },
    ]
  },
  {
    id: 'storage',
    name: 'Storage',
    icon: <HardDrive className="w-5 h-5" />,
    items: [
      { id: 's1', name: '256GB NVMe SSD', price: 1900, brand: 'WD', image: 'https://images.unsplash.com/photo-1597852074816-d933c7d2b988?auto=format&fit=crop&w=150&q=80' },
      { id: 's2', name: '500GB NVMe SSD', price: 2800, brand: 'Crucial', image: 'https://images.unsplash.com/photo-1597852074816-d933c7d2b988?auto=format&fit=crop&w=150&q=80' },
      { id: 's3', name: '1TB NVMe Gen4 SSD', price: 5500, brand: 'Samsung', image: 'https://images.unsplash.com/photo-1597852074816-d933c7d2b988?auto=format&fit=crop&w=150&q=80' },
      { id: 's4', name: '1TB HDD 7200RPM', price: 3200, brand: 'Seagate', image: 'https://images.unsplash.com/photo-1597852074816-d933c7d2b988?auto=format&fit=crop&w=150&q=80' },
    ]
  },
  {
    id: 'gpu',
    name: 'Graphics Card',
    icon: <Monitor className="w-5 h-5" />,
    items: [
      { id: 'g0', name: 'No Discrete GPU (iGPU)', price: 0, brand: 'None', image: 'https://images.unsplash.com/photo-1624705024411-db34c89134a3?auto=format&fit=crop&w=150&q=80' },
      { id: 'g1', name: 'NVIDIA GTX 1650 4GB', price: 12500, brand: 'Zotac', image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=150&q=80' },
      { id: 'g2', name: 'NVIDIA RTX 3050 8GB', price: 21000, brand: 'Inno3D', image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=150&q=80' },
      { id: 'g3', name: 'NVIDIA RTX 4060 8GB', price: 28500, brand: 'Gigabyte', image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=150&q=80' },
      { id: 'g4', name: 'AMD Radeon RX 6600 8GB', price: 19500, brand: 'Sapphire', image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=150&q=80' },
    ]
  },
  {
    id: 'case',
    name: 'Cabinet',
    icon: <HardDrive className="w-5 h-5" />,
    items: [
      { id: 'ca1', name: 'Basic Office Case', price: 1500, brand: 'Generic', image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=150&q=80' },
      { id: 'ca2', name: 'Ant Esports ICE-100 Air', price: 3200, brand: 'Ant Esports', image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=150&q=80' },
      { id: 'ca3', name: 'Cooler Master TD500 Mesh', price: 8500, brand: 'Cooler Master', image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=150&q=80' },
      { id: 'ca4', name: 'Lian Li O11 Dynamic', price: 13500, brand: 'Lian Li', image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=150&q=80' },
    ]
  },
  {
    id: 'psu',
    name: 'Power Supply',
    icon: <Cpu className="w-5 h-5" />,
    items: [
      { id: 'p1', name: '450W Standard PSU', price: 2200, brand: 'Corsair', image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf42c?auto=format&fit=crop&w=150&q=80' },
      { id: 'p2', name: '550W Bronze PSU', price: 3500, brand: 'Cooler Master', image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf42c?auto=format&fit=crop&w=150&q=80' },
      { id: 'p3', name: '650W Gold Modular', price: 6500, brand: 'Deepcool', image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf42c?auto=format&fit=crop&w=150&q=80' },
      { id: 'p4', name: '850W Gold Modular', price: 10500, brand: 'Corsair', image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf42c?auto=format&fit=crop&w=150&q=80' },
    ]
  },
  {
    id: 'monitor',
    name: 'Monitor',
    icon: <Monitor className="w-5 h-5" />,
    items: [
      { id: 'mo0', name: 'None', price: 0, brand: '-', image: 'https://placehold.co/150x150/f1f5f9/94a3b8?text=No+Monitor' },
      { id: 'mo1', name: '22" Full HD IPS 75Hz', price: 7500, brand: 'LG', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=150&q=80' },
      { id: 'mo2', name: '24" Full HD IPS 144Hz', price: 11500, brand: 'Acer', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=150&q=80' },
      { id: 'mo3', name: '27" 2K QHD IPS', price: 22000, brand: 'BenQ', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=150&q=80' },
    ]
  },
  {
    id: 'peri',
    name: 'Peripherals',
    icon: <Mouse className="w-5 h-5" />,
    items: [
      { id: 'pe0', name: 'None', price: 0, brand: '-', image: 'https://placehold.co/150x150/f1f5f9/94a3b8?text=No+Peri' },
      { id: 'pe1', name: 'Basic Keyboard & Mouse', price: 800, brand: 'Logitech', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=150&q=80' },
      { id: 'pe2', name: 'RGB Gaming Combo', price: 2500, brand: 'Razer', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=150&q=80' },
      { id: 'pe3', name: 'Mechanical Keyboard + Gaming Mouse', price: 6500, brand: 'HyperX', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=150&q=80' },
    ]
  }
];

// --- GEMINI API HELPER ---
const generateGeminiResponse = async (prompt) => {
  const apiKey = ""; // Provided by runtime environment
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });
    
    if (!response.ok) {
       if(response.status === 429) throw new Error("Too many requests. Please wait a moment.");
       throw new Error(`API Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't process that.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to the AI brain right now. Please try again later.";
  }
};

const Header = () => (
  <header className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
    <div className="container mx-auto px-4 py-3">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center space-x-2">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Cpu className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-wide">Dnet Software System</h1>
            <p className="text-xs text-blue-300 hidden md:block">Custom PC Builds & Solutions</p>
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-6 text-sm text-slate-300">
          <div className="flex items-center space-x-2">
            <Phone className="w-4 h-4 text-blue-400" />
            <span>+91 96564 17771</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-blue-400" />
            <span>09:30 AM - 08:00 PM (Daily)</span>
          </div>
        </div>
        <button className="md:hidden text-slate-300">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </div>
  </header>
);

const Hero = () => (
  <div className="bg-gradient-to-r from-blue-900 to-slate-900 text-white py-12">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-3xl md:text-5xl font-bold mb-4">Build Your Dream PC</h2>
      <p className="text-lg text-blue-200 max-w-2xl mx-auto mb-8">
        Use our interactive kiosk to configure your custom system. We automatically filter parts to ensure compatibility!
      </p>
      <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
        <MapPin className="w-4 h-4 mr-2 text-green-400" />
        <span className="text-sm">Kazhakuttam, Thiruvananthapuram, Kerala 695582</span>
      </div>
    </div>
  </div>
);

// --- AI CHAT COMPONENT ---
const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'system', text: "Hi! I'm the Dnet AI Assistant. Need help choosing parts or staying within budget? Just ask!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const systemPrompt = "You are a helpful PC building assistant for Dnet Software System in Kerala, India. You help customers choose computer parts, explain technical terms, and suggest builds for gaming, office, or editing. Keep answers concise, friendly, and helpful. Currencies are in INR (₹).";
    const prompt = `${systemPrompt}\n\nUser Question: ${userMsg}`;

    const reply = await generateGeminiResponse(prompt);
    
    setMessages(prev => [...prev, { role: 'system', text: reply }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start">
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-blue-100 overflow-hidden flex flex-col max-h-[500px]">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white flex justify-between items-center">
            <div className="flex items-center">
              <Sparkles className="w-5 h-5 mr-2" />
              <h3 className="font-bold">Dnet AI Assistant</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded">
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 min-h-[300px]">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-none' 
                    : 'bg-white text-slate-700 shadow-sm border border-slate-100 rounded-bl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl rounded-bl-none px-4 py-3 shadow-sm border border-slate-100">
                  <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 bg-white border-t border-slate-100">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about parts..."
                className="flex-1 bg-slate-100 border-0 rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-full shadow-lg transition-all hover:scale-105"
      >
        <MessageSquare className="w-6 h-6" />
        <span className={`ml-2 font-bold ${isOpen ? 'hidden' : 'block'}`}>Ask AI Helper</span>
      </button>
    </div>
  );
};

const Builder = () => {
  const [build, setBuild] = useState({});
  const [activeCategory, setActiveCategory] = useState(COMPONENT_CATEGORIES[0].id);
  const [showSummaryMobile, setShowSummaryMobile] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  // --- FILTERING LOGIC ---
  const getFilteredItems = (category, currentBuild) => {
    // 1. Motherboard Filter: Dependent on CPU socket
    if (category.id === 'mobo' && currentBuild.cpu) {
      return category.items.filter(item => item.socket === currentBuild.cpu.socket);
    }

    // 2. RAM Filter: Dependent on Motherboard Memory Type
    if (category.id === 'ram' && currentBuild.mobo) {
      return category.items.filter(item => item.type === currentBuild.mobo.memoryType);
    }

    // 3. CPU Filter: If user goes back to CPU, only show ones compatible with current Mobo
    if (category.id === 'cpu' && currentBuild.mobo) {
       return category.items.filter(item => item.socket === currentBuild.mobo.socket);
    }
    
    return category.items;
  };

  const handleSelect = (categoryId, item) => {
    setBuild(prev => {
      const newBuild = { ...prev, [categoryId]: item };

      // Cascade Deletion Logic for Compatibility
      if (categoryId === 'cpu') {
        // If CPU changes, check if Mobo is still compatible
        if (newBuild.mobo && newBuild.mobo.socket !== item.socket) {
          delete newBuild.mobo;
          delete newBuild.ram; // Ram depends on mobo, so clear it too
        }
      }

      if (categoryId === 'mobo') {
        // If Mobo changes, check if RAM is still compatible
        if (newBuild.ram && newBuild.ram.type !== item.memoryType) {
          delete newBuild.ram;
        }
      }

      return newBuild;
    });
    setAnalysisResult(null);
  };

  const calculateTotal = () => {
    return Object.values(build).reduce((sum, item) => sum + item.price, 0);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleAnalyzeBuild = async () => {
    if (Object.keys(build).length < 3) {
      setAnalysisResult("Please select at least a CPU, Motherboard, and RAM to analyze.");
      return;
    }

    setIsAnalyzing(true);
    setAnalysisResult(null);

    const partsList = Object.entries(build)
      .map(([catId, item]) => {
        const catName = COMPONENT_CATEGORIES.find(c => c.id === catId)?.name;
        return `${catName}: ${item.name}`;
      })
      .join('\n');

    const prompt = `
      I am building a PC with the following components:
      ${partsList}
      
      Please analyze this build briefly (max 3 sentences). 
      1. Are there any compatibility issues?
      2. Is there a major bottleneck?
      3. Is the Power Supply sufficient?
      
      Start your response with an emoji representing the overall status (e.g., ✅ or ⚠️).
    `;

    const result = await generateGeminiResponse(prompt);
    setAnalysisResult(result);
    setIsAnalyzing(false);
  };

  const currentCategory = COMPONENT_CATEGORIES.find(c => c.id === activeCategory);
  const filteredItems = getFilteredItems(currentCategory, build);
  
  const currentIndex = COMPONENT_CATEGORIES.findIndex(c => c.id === activeCategory);
  const nextCategory = COMPONENT_CATEGORIES[currentIndex + 1];
  const prevCategory = COMPONENT_CATEGORIES[currentIndex - 1];

  const handleNext = () => {
    if (nextCategory) setActiveCategory(nextCategory.id);
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to clear your current build?")) {
      setBuild({});
      setAnalysisResult(null);
      setActiveCategory(COMPONENT_CATEGORIES[0].id);
      setOrderPlaced(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (orderPlaced) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-2xl text-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-green-500">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Quote Generated!</h2>
          <p className="text-slate-600 mb-6">
            Thank you for building with Dnet Software System. Please visit our counter or show this screen to our staff to proceed with your order.
          </p>
          <div className="bg-slate-50 rounded-lg p-6 mb-8 text-left">
            <h3 className="font-semibold text-slate-700 mb-4 border-b pb-2">Order Summary</h3>
            <div className="space-y-2">
              {Object.entries(build).map(([catId, item]) => {
                const catName = COMPONENT_CATEGORIES.find(c => c.id === catId)?.name;
                return (
                  <div key={catId} className="flex justify-between text-sm">
                    <span className="text-slate-500">{catName}</span>
                    <span className="font-medium text-slate-800">{item.name}</span>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 pt-4 border-t flex justify-between items-center">
              <span className="font-bold text-lg">Total Estimate</span>
              <span className="font-bold text-xl text-blue-600">{formatCurrency(calculateTotal())}</span>
            </div>
          </div>
          <button 
            onClick={() => setOrderPlaced(false)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors"
          >
            Start New Build
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-6 items-start min-h-[600px]">
      
      {/* 1. COMPONENT SIDEBAR (Left) */}
      <div className="lg:w-64 w-full shrink-0 lg:sticky lg:top-24">
         <div className="mb-4 hidden lg:block px-2">
           <h3 className="font-bold text-slate-800 text-lg">Components</h3>
           <p className="text-xs text-slate-500">Select a category</p>
         </div>
         
        {/* Category Navigation - Vertical on Desktop, Horizontal Scroll on Mobile */}
        <div className="flex lg:flex-col overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 gap-2 no-scrollbar">
          {COMPONENT_CATEGORIES.map((cat) => {
            const isSelected = build[cat.id] !== undefined;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 w-full justify-start
                  ${isActive 
                    ? 'bg-blue-600 text-white shadow-md transform lg:translate-x-1' 
                    : isSelected 
                      ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
              >
                <div className={`${isActive ? 'text-white' : isSelected ? 'text-blue-600' : 'text-slate-400'}`}>
                   {isSelected && !isActive ? <Check className="w-5 h-5" /> : cat.icon}
                </div>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. PRODUCT SELECTION GRID (Center) */}
      <div className="flex-1 w-full min-w-0">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-2xl font-bold text-slate-800">{currentCategory.name}</h3>
              <p className="text-slate-500 text-sm">
                {filteredItems.length === 0 
                  ? "No compatible parts available for your selection." 
                  : "Select one option from below"}
              </p>
            </div>
            <div className="text-xs font-semibold text-slate-400 bg-slate-100 px-2 py-1 rounded">
              Step {currentIndex + 1} of {COMPONENT_CATEGORIES.length}
            </div>
          </div>

          {filteredItems.length === 0 ? (
             <div className="flex flex-col items-center justify-center py-12 text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-300">
               <AlertCircle className="w-12 h-12 mb-3" />
               <p>No compatible items found.</p>
               <p className="text-sm mt-2">Try changing your Processor or Motherboard.</p>
             </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredItems.map((item) => {
                const isActive = build[activeCategory]?.id === item.id;
                return (
                  <div 
                    key={item.id}
                    onClick={() => handleSelect(activeCategory, item)}
                    className={`relative cursor-pointer p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-md
                      ${isActive 
                        ? 'border-blue-500 bg-blue-50/50' 
                        : 'border-slate-100 hover:border-blue-200 bg-white'}`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{item.brand}</span>
                        <h4 className="font-semibold text-slate-800 text-lg mt-1">{item.name}</h4>
                        {/* Show compatibility tags for relevant categories */}
                        <div className="flex gap-1 mt-1">
                          {item.socket && <span className="text-[10px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded">{item.socket}</span>}
                          {item.memoryType && <span className="text-[10px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded">{item.memoryType}</span>}
                          {item.type && <span className="text-[10px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded">{item.type}</span>}
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className={`font-bold text-lg ${isActive ? 'text-blue-600' : 'text-slate-700'}`}>
                          ₹{item.price.toLocaleString('en-IN')}
                        </span>
                        {isActive && <div className="mt-2 bg-blue-600 text-white p-1 rounded-full"><Check className="w-4 h-4" /></div>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-slate-100">
            <button 
              onClick={() => prevCategory && setActiveCategory(prevCategory.id)}
              disabled={!prevCategory}
              className={`px-6 py-2 rounded-lg font-medium transition-colors
                ${prevCategory ? 'text-slate-600 hover:bg-slate-100' : 'text-slate-300 cursor-not-allowed'}`}
            >
              Previous
            </button>
            
            <button 
              onClick={handleNext}
              disabled={!nextCategory}
              className={`flex items-center space-x-2 px-6 py-2 rounded-lg font-medium transition-colors
                ${nextCategory 
                  ? 'bg-slate-800 text-white hover:bg-slate-900' 
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
            >
              <span>Next Category</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. CART SUMMARY (Right) */}
      <div className={`
        fixed inset-0 z-40 bg-white transform transition-transform duration-300 lg:relative lg:translate-x-0 lg:w-96 shrink-0 lg:bg-transparent lg:z-0
        ${showSummaryMobile ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-full flex flex-col lg:h-auto lg:sticky lg:top-24">
          
          {/* Mobile Header for Cart */}
          <div className="lg:hidden flex justify-between items-center p-4 border-b bg-white">
            <h3 className="font-bold text-lg">Your Build</h3>
            <button onClick={() => setShowSummaryMobile(false)} className="p-2 bg-slate-100 rounded-full">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto lg:overflow-visible p-4 lg:p-0">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                <h3 className="font-bold text-slate-800 flex items-center">
                  <ShoppingCart className="w-5 h-5 mr-2" /> Current Configuration
                </h3>
                <button onClick={handleReset} className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50" title="Clear Build">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 space-y-3 min-h-[200px]">
                {Object.keys(build).length === 0 ? (
                  <div className="text-center text-slate-400 py-12">
                    <Cpu className="w-12 h-12 mx-auto mb-3 opacity-20" />
                    <p>No components selected yet.</p>
                    <p className="text-sm">Start by choosing a processor!</p>
                  </div>
                ) : (
                  COMPONENT_CATEGORIES.map(cat => {
                    const item = build[cat.id];
                    if (!item) return null;
                    return (
                      <div key={cat.id} className="flex justify-between items-center group text-sm">
                        <div className="flex items-center flex-1 pr-2 min-w-0">
                          <div className="w-10 h-10 rounded-md bg-slate-100 overflow-hidden shrink-0 mr-3 border border-slate-200">
                             <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs text-slate-400">{cat.name}</p>
                            <p className="font-medium text-slate-700 truncate">{item.name}</p>
                          </div>
                        </div>
                        <div className="text-right whitespace-nowrap">
                          <p className="font-semibold text-slate-900">₹{item.price.toLocaleString()}</p>
                        </div>
                        <button 
                          onClick={() => {
                            const newBuild = {...build};
                            delete newBuild[cat.id];
                            setBuild(newBuild);
                            setAnalysisResult(null);
                          }}
                          className="ml-2 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })
                )}
              </div>

              {/* AI Analysis Section */}
              <div className="px-4 pb-4">
                <button 
                  onClick={handleAnalyzeBuild}
                  disabled={isAnalyzing || Object.keys(build).length < 2}
                  className="w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 py-2 rounded-lg flex items-center justify-center space-x-2 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAnalyzing ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Sparkles className="w-4 h-4" />
                  )}
                  <span>{isAnalyzing ? 'Analyzing...' : 'Analyze Build with AI'}</span>
                </button>

                {analysisResult && (
                  <div className="mt-3 p-3 bg-indigo-50 border border-indigo-100 rounded-lg text-sm text-indigo-900 animate-fadeIn">
                    <p className="leading-relaxed">{analysisResult}</p>
                  </div>
                )}
              </div>

              <div className="p-4 bg-slate-900 text-white mt-auto">
                <div className="flex justify-between items-end mb-4">
                  <span className="text-slate-300">Estimated Total</span>
                  <span className="text-3xl font-bold">{formatCurrency(calculateTotal())}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={handlePrint}
                    className="flex items-center justify-center py-2 px-4 rounded bg-slate-700 hover:bg-slate-600 transition-colors text-sm font-medium"
                  >
                    <Printer className="w-4 h-4 mr-2" /> Print
                  </button>
                  <button 
                    onClick={() => setOrderPlaced(true)}
                    disabled={Object.keys(build).length === 0}
                    className={`flex items-center justify-center py-2 px-4 rounded text-sm font-bold transition-colors
                      ${Object.keys(build).length === 0 ? 'bg-slate-600 text-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 text-white'}`}
                  >
                    <Save className="w-4 h-4 mr-2" /> Finish
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button 
        onClick={() => setShowSummaryMobile(true)}
        className="lg:hidden fixed bottom-6 right-6 z-30 bg-blue-600 text-white p-4 rounded-full shadow-xl shadow-blue-900/30 flex items-center"
      >
        <ShoppingCart className="w-6 h-6" />
        <span className="ml-2 font-bold">{formatCurrency(calculateTotal())}</span>
      </button>

      <AIAssistant />
    </div>
  );
};

const Footer = () => (
  <footer className="bg-slate-900 text-slate-400 py-12 mt-auto">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-white text-lg font-bold mb-4">Dnet Software System</h3>
          <p className="text-sm mb-4">
            Your trusted partner for custom PC builds, repairs, and software solutions in Trivandrum.
          </p>
          <div className="flex space-x-4">
            <div className="w-8 h-8 bg-slate-800 rounded flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">f</div>
            <div className="w-8 h-8 bg-slate-800 rounded flex items-center justify-center hover:bg-blue-400 transition-colors cursor-pointer">t</div>
            <div className="w-8 h-8 bg-slate-800 rounded flex items-center justify-center hover:bg-pink-600 transition-colors cursor-pointer">i</div>
          </div>
        </div>
        <div>
          <h3 className="text-white text-lg font-bold mb-4">Contact Us</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start">
              <MapPin className="w-5 h-5 mr-2 text-blue-500 shrink-0" />
              <span>Kazhakuttam, Thiruvananthapuram, Kerala 695582, India</span>
            </li>
            <li className="flex items-center">
              <Phone className="w-5 h-5 mr-2 text-blue-500 shrink-0" />
              <a href="tel:+919656417771" className="hover:text-white transition-colors">+91 96564 17771</a>
            </li>
            <li className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-blue-500 shrink-0" />
              <span>09:30 AM - 08:00 PM (Mon-Sun)</span>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-white text-lg font-bold mb-4">Store Location</h3>
          <div className="w-full h-32 bg-slate-800 rounded-lg flex items-center justify-center border border-slate-700">
            <span className="text-xs">Interactive Map Area</span>
          </div>
          <button className="mt-4 text-blue-400 text-sm hover:text-blue-300 flex items-center">
            Get Directions <MapPin className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
      <div className="border-t border-slate-800 mt-12 pt-8 text-center text-xs">
        &copy; {new Date().getFullYear()} Dnet Software System. All rights reserved.
      </div>
    </div>
  </footer>
);

const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
      <Header />
      <Hero />
      <main className="flex-grow">
        <Builder />
      </main>
      <Footer />
    </div>
  );
};

export default App;