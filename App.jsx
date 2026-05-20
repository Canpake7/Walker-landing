import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Smartphone, 
  Cpu, 
  ShieldCheck, 
  ArrowRight, 
  Check, 
  Copy, 
  Lock, 
  Sparkles, 
  Code, 
  Smartphone as PhoneIcon, 
  Layers, 
  RefreshCw, 
  CheckCircle, 
  ChevronRight, 
  Flame, 
  Clock, 
  Compass, 
  ChevronDown
} from 'lucide-react';

// Custom SVG Logo component matching the uploaded shoe concept
const WalkerLogo = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="200" height="200" rx="46" fill="#121214" />
    <rect x="2" y="2" width="196" height="196" rx="44" stroke="#2A2A2F" strokeWidth="4" />
    {/* Shoe Outline */}
    <path 
      d="M56 87L75 61C77 58 81 58 83 61L89 71C91 73 95 72 96 70L102 62C104 59 108 59 110 62L118 73C119 74 121 75 123 75H127C130 75 133 77 135 80L148 102C151 107 149 113 143 115L120 120C110 122 99 119 92 112L73 94C70 91 66 90 62 90H56" 
      stroke="#FFFFFF" 
      strokeWidth="6" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    <path 
      d="M59 95L95 120" 
      stroke="#FFFFFF" 
      strokeWidth="6" 
      strokeLinecap="round" 
    />
    {/* Laces */}
    <line x1="112" y1="78" x2="119" y2="73" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
    <line x1="118" y1="84" x2="125" y2="79" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
    <line x1="124" y1="90" x2="131" y2="85" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
    {/* Grounding line */}
    <line x1="50" y1="130" x2="150" y2="130" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />
  </svg>
);

export default function App() {
  // Simulator states
  const [steps, setSteps] = useState(6500);
  const [selectedApp, setSelectedApp] = useState('instagram');
  const [appCostPerMin, setAppCostPerMin] = useState(10); // 10 credits per minute
  
  // App view selector states
  const [activeAppTab, setActiveAppTab] = useState('wallet');
  
  // Consent flow state
  const [consentStep, setConsentStep] = useState(1);
  const [partnerApp, setPartnerApp] = useState('MindfulQuest');
  const [isConsenting, setIsConsenting] = useState(false);
  const [consentSuccess, setConsentSuccess] = useState(false);

  // API Playground states
  const [apiEndpoint, setApiEndpoint] = useState('GET_BALANCE');
  const [apiResponse, setApiResponse] = useState({});
  const [isLoadingApi, setIsLoadingApi] = useState(false);
  const [copiedText, setCopiedText] = useState('');

  // Auto update API responses based on interactive steps
  useEffect(() => {
    updateApiResponse(apiEndpoint);
  }, [steps, apiEndpoint]);

  const updateApiResponse = (endpoint) => {
    setIsLoadingApi(true);
    setTimeout(() => {
      let response = {};
      switch (endpoint) {
        case 'GET_BALANCE':
          response = {
            status: "success",
            user: {
              id: "usr_9x82jf0a",
              username: "walk_enthusiast",
              joined_at: "2026-02-14T08:00:00Z"
            },
            wallet: {
              currency: "WALKER_CREDITS",
              balance: steps, // 1:1 steps to credits
              lifetime_earned: steps + 42100,
              lifetime_spent: 42100,
              last_sync: new Date().toISOString()
            }
          };
          break;
        case 'SYNC_ACTIVITY':
          response = {
            status: "success",
            sync_session_id: "sync_8849201f",
            data_source: "Apple HealthKit via Walker iOS Client",
            steps_added: 1250,
            new_balance: steps + 1250,
            timestamp: new Date().toISOString()
          };
          break;
        case 'POST_SPEND':
          response = {
            status: "success",
            transaction: {
              id: "tx_47a8d29b",
              partner_id: "partner_mindful_quest",
              credits_deducted: 150,
              purpose: "Unlock Level 4 Zen Mode",
              remaining_balance: Math.max(0, steps - 150),
              timestamp: new Date().toISOString()
            }
          };
          break;
        default:
          response = { message: "Select an endpoint" };
      }
      setApiResponse(response);
      setIsLoadingApi(false);
    }, 300);
  };

  const handleCopy = (text) => {
    document.execCommand('copy') || navigator.clipboard?.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(''), 2000);
  };

  const startConsentSimulation = () => {
    setIsConsenting(true);
    setConsentStep(1);
    setConsentSuccess(false);
  };

  const nextConsentStep = () => {
    if (consentStep < 3) {
      setConsentStep(prev => prev + 1);
    } else {
      setConsentSuccess(true);
      setIsConsenting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070708] text-gray-100 font-sans selection:bg-neutral-800 selection:text-white">
      {/* Dynamic Grid Background Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f2e05_1px,transparent_1px),linear-gradient(to_bottom,#1f1f2e05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#070708]/80 backdrop-blur-md border-b border-neutral-900 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <WalkerLogo className="w-10 h-10" />
            <div>
              <span className="text-lg font-bold tracking-widest text-white block">WALKER</span>
              <span className="text-[10px] text-neutral-500 tracking-wider font-semibold">WELLNESS INCENTIVES</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#how-it-works" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">How It Works</a>
            <a href="#ios-app" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">iOS App</a>
            <a href="#api" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">Walker API</a>
            <a href="#simulator" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">Interactive Simulator</a>
            <span className="h-4 w-[1px] bg-neutral-800" />
            <a href="#api" className="text-xs tracking-wider uppercase font-semibold text-neutral-300 hover:text-white px-3 py-1.5 rounded-md border border-neutral-800 bg-neutral-900/40 hover:bg-neutral-900 transition-all">
              Dev Docs
            </a>
          </div>

          <div className="flex items-center space-x-3">
            <a href="#simulator" className="bg-white hover:bg-neutral-200 text-black text-xs font-semibold px-4 py-2 rounded-full transition-all">
              Try Interactive Demo
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-12 pb-24 px-6 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-neutral-900/40 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-neutral-950/60 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Tag */}
          <div className="inline-flex items-center space-x-2 bg-neutral-900 border border-neutral-800 rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-xs font-medium text-neutral-300 tracking-wide">Introducing Walker: 1 Step = 1 Credit</span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 max-w-4xl mx-auto leading-[1.1]">
            Turn daily movement <br />
            into <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-300 to-neutral-500">healthier digital habits</span>
          </h1>

          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Walker is a privacy-first wellness incentive platform. Earn credits through real-world steps to unlock intentional screen access, build focus, or spend incentives within developer-built partner experiences.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a href="#ios-app" className="w-full sm:w-auto flex items-center justify-center space-x-3 bg-white hover:bg-neutral-200 text-black font-semibold px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-white/5">
              <Smartphone className="w-5 h-5" />
              <span>Get the iOS App</span>
            </a>
            <a href="#api" className="w-full sm:w-auto flex items-center justify-center space-x-3 bg-neutral-900 hover:bg-neutral-850 text-neutral-200 border border-neutral-800 font-semibold px-8 py-4 rounded-xl transition-all">
              <Cpu className="w-5 h-5" />
              <span>Integrate Walker API</span>
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-neutral-900 max-w-4xl mx-auto text-left">
            <div>
              <p className="text-2xl font-bold text-white">1 step = 1 credit</p>
              <p className="text-xs text-neutral-500 mt-1">Simple, logical baseline</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">0% Finance</p>
              <p className="text-xs text-neutral-500 mt-1">No money, pure wellness</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">Privacy First</p>
              <p className="text-xs text-neutral-500 mt-1">Secure local HealthKit sync</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">Universal API</p>
              <p className="text-xs text-neutral-500 mt-1">Connect third-party apps</p>
            </div>
          </div>
        </div>
      </header>

      {/* Interactive Step Simulator Section */}
      <section id="simulator" className="py-20 px-6 bg-[#0c0c0e] border-y border-neutral-900 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center space-x-2 bg-neutral-900 border border-neutral-850 px-3 py-1 rounded-full text-xs text-neutral-400">
                <Sparkles className="w-3.5 h-3.5 text-white" />
                <span>Interactive Playground</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                How movement powers your digital life
              </h2>
              <p className="text-neutral-400 leading-relaxed">
                Adjust the stepper to simulate real-world physical activity. Observe how steps convert directly into Walker Credits, giving you precise, self-earned agency over how much time you dedicate to your screens.
              </p>

              <div className="space-y-4 bg-neutral-900/50 p-6 rounded-2xl border border-neutral-900">
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-neutral-800 text-white flex items-center justify-center text-xs font-bold mt-0.5">1</div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Actionable Steps</h4>
                    <p className="text-xs text-neutral-500 mt-1">Walk in the physical world. Your phone records steps through Apple HealthKit.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-neutral-800 text-white flex items-center justify-center text-xs font-bold mt-0.5">2</div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Earned Credits</h4>
                    <p className="text-xs text-neutral-500 mt-1">Credits accumulate without complex conversion formulas. Clear and immediate feedback.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-neutral-800 text-white flex items-center justify-center text-xs font-bold mt-0.5">3</div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Mindful Expenditure</h4>
                    <p className="text-xs text-neutral-500 mt-1">Unlock distracting applications on iOS, or spend credits on micro-actions in partner apps.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Simulator Card */}
            <div className="lg:col-span-7 bg-[#111113] border border-neutral-800 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.01] rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-neutral-800">
                <div>
                  <span className="text-xs uppercase font-semibold text-neutral-500 tracking-wider">Live Simulator</span>
                  <h3 className="text-lg font-bold text-white mt-1">Step-to-Habit Converter</h3>
                </div>
                <div className="flex items-center space-x-2 bg-neutral-900 border border-neutral-850 px-3 py-1.5 rounded-lg mt-3 md:mt-0">
                  <span className="text-xs text-neutral-400 font-medium">Core rule:</span>
                  <span className="text-xs text-white font-bold bg-neutral-800 px-2 py-0.5 rounded">1 Step = 1 Credit</span>
                </div>
              </div>

              {/* Slider Input */}
              <div className="mb-10">
                <div className="flex justify-between items-baseline mb-3">
                  <label className="text-sm text-neutral-400 font-medium">Simulated Daily Steps</label>
                  <span className="text-3xl font-mono font-bold text-white tracking-tight">{steps.toLocaleString()} <span className="text-xs font-sans text-neutral-500 font-normal">steps</span></span>
                </div>
                
                <input 
                  type="range" 
                  min="500" 
                  max="20000" 
                  step="250"
                  value={steps} 
                  onChange={(e) => setSteps(Number(e.target.value))}
                  className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-white"
                />
                
                <div className="flex justify-between text-[11px] text-neutral-500 font-medium mt-2">
                  <span>500 steps</span>
                  <span>5,000</span>
                  <span>10,000 (Recommended)</span>
                  <span>15,000</span>
                  <span>20,000+ steps</span>
                </div>
              </div>

              {/* Outputs display grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Credits wallet balance */}
                <div className="bg-neutral-900 p-5 rounded-2xl border border-neutral-850/60 relative">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-semibold text-neutral-400 tracking-wider uppercase">Walker Wallet</span>
                    <span className="bg-neutral-800 text-white text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-md">Credits Earned</span>
                  </div>
                  <div className="flex items-baseline space-x-1.5 mb-2">
                    <span className="text-4xl font-mono font-bold text-white tracking-tight">+{steps.toLocaleString()}</span>
                    <span className="text-xs text-neutral-500 font-medium">CR</span>
                  </div>
                  <p className="text-xs text-neutral-400 leading-normal">
                    These credits represent physical investment. They cannot be bought, sold, or transferred.
                  </p>
                </div>

                {/* Consumer App Unlock Options */}
                <div className="bg-neutral-900 p-5 rounded-2xl border border-neutral-850/60 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-semibold text-neutral-400 tracking-wider uppercase">Screen Time Allowance</span>
                      <span className="bg-neutral-850 text-neutral-300 text-[10px] tracking-wide px-2 py-0.5 rounded-md">Blocker Tool</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {[
                        { id: 'instagram', label: 'Instagram', cost: 12 },
                        { id: 'tiktok', label: 'TikTok', cost: 15 },
                        { id: 'reddit', label: 'Reddit', cost: 8 }
                      ].map((app) => (
                        <button
                          key={app.id}
                          onClick={() => {
                            setSelectedApp(app.id);
                            setAppCostPerMin(app.cost);
                          }}
                          className={`px-2 py-1.5 rounded-lg text-xs font-medium border transition-all text-center ${
                            selectedApp === app.id
                              ? 'bg-white border-white text-black font-semibold shadow-sm'
                              : 'bg-neutral-850 hover:bg-neutral-800 border-neutral-800 text-neutral-400'
                          }`}
                        >
                          {app.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-baseline space-x-1.5 mb-1">
                      <span className="text-3xl font-mono font-bold text-white tracking-tight">
                        {Math.floor(steps / appCostPerMin)}
                      </span>
                      <span className="text-xs text-neutral-400 font-medium">minutes available</span>
                    </div>
                    <p className="text-xs text-neutral-500">
                      Calculated at {appCostPerMin} steps per minute of app access.
                    </p>
                  </div>
                </div>
              </div>

              {/* Developer Ecosystem conversion hook */}
              <div className="bg-neutral-900/40 p-5 rounded-2xl border border-neutral-800/80">
                <div className="flex items-center space-x-2 text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                  <Cpu className="w-3.5 h-3.5 text-white" />
                  <span>How partners use this balance via API</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    A developer's third-party app can request authorization to spend your steps. Here's what your balance translates to in partner services:
                  </p>
                  <div className="bg-[#161619] p-3.5 rounded-xl border border-neutral-850 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-neutral-500">Mindfulness App</span>
                      <span className="text-white font-mono font-semibold">-{Math.min(steps, 250)} CR (Unlock Lesson)</span>
                    </div>
                    <div className="flex justify-between text-xs border-t border-neutral-850 pt-1.5">
                      <span className="text-neutral-500">Language Learning App</span>
                      <span className="text-white font-mono font-semibold">-{Math.min(steps, 500)} CR (Skip Daily Strike)</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Two Connected Products Feature Tabs */}
      <section id="how-it-works" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest text-neutral-500 uppercase block mb-3">Dual Integration Model</span>
          <h2 className="text-4xl font-bold text-white tracking-tight">One simple core balance. Two distinct pipelines.</h2>
          <p className="text-neutral-400 mt-4 text-base">
            Walker supports you wherever you are. Use our native iOS client for self-motivated screen blocks, or connect with third-party applications via secure API protocols.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex justify-center mb-12">
          <div className="bg-neutral-900 border border-neutral-800 p-1.5 rounded-full flex space-x-1">
            <button
              onClick={() => setActiveAppTab('wallet')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full text-xs font-semibold tracking-wide transition-all ${
                activeAppTab === 'wallet'
                  ? 'bg-white text-black font-bold shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>1. Walker iOS App</span>
            </button>
            <button
              onClick={() => setActiveAppTab('api')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full text-xs font-semibold tracking-wide transition-all ${
                activeAppTab === 'api'
                  ? 'bg-white text-black font-bold shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>2. Walker API Suite</span>
            </button>
          </div>
        </div>

        {/* Interactive App Screen Feature Panels */}
        <div className="bg-[#0c0c0e] border border-neutral-850 rounded-3xl p-8 md:p-12">
          {activeAppTab === 'wallet' ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Feature Copy */}
              <div className="lg:col-span-6 space-y-6">
                <div className="bg-neutral-900 border border-neutral-800 text-white font-mono text-[11px] font-bold px-3 py-1.5 rounded-md inline-block">
                  PRODUCT ONE: NATIVE CONSUMER UTILITY
                </div>
                <h3 className="text-3xl font-bold tracking-tight text-white">Your companion for digital intentionality</h3>
                <p className="text-neutral-400 leading-relaxed">
                  The Walker iOS app runs smoothly in the background, transforming your steps into mindful digital boundaries. No complex setups, no financial accounts, and zero battery-drain active location tracking.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <div className="border border-neutral-850 p-4 rounded-xl hover:border-neutral-800 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center mb-3">
                      <Activity className="w-4 h-4 text-white" />
                    </div>
                    <h4 className="text-sm font-semibold text-white">Apple HealthKit Integration</h4>
                    <p className="text-xs text-neutral-500 mt-1">Syncs steps from Apple Watch, iPhone, or companion fitness wearables seamlessly.</p>
                  </div>

                  <div className="border border-neutral-850 p-4 rounded-xl hover:border-neutral-800 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center mb-3">
                      <Lock className="w-4 h-4 text-white" />
                    </div>
                    <h4 className="text-sm font-semibold text-white">Screen Time Controls</h4>
                    <p className="text-xs text-neutral-500 mt-1">Uses official iOS Family Controls APIs to restrict social or news apps until steps are synced.</p>
                  </div>

                  <div className="border border-neutral-850 p-4 rounded-xl hover:border-neutral-800 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center mb-3">
                      <RefreshCw className="w-4 h-4 text-white" />
                    </div>
                    <h4 className="text-sm font-semibold text-white">Instant Sync Balance</h4>
                    <p className="text-xs text-neutral-500 mt-1">See steps transform into credits in real time inside a clean digital wallet environment.</p>
                  </div>

                  <div className="border border-neutral-850 p-4 rounded-xl hover:border-neutral-800 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center mb-3">
                      <ShieldCheck className="w-4 h-4 text-white" />
                    </div>
                    <h4 className="text-sm font-semibold text-white">Zero Cloud Exposure</h4>
                    <p className="text-xs text-neutral-500 mt-1">Your detailed health metrics stay on your device. Only secure step totals sync with Walker.</p>
                  </div>
                </div>
              </div>

              {/* iOS Mobile Mockup Representation */}
              <div className="lg:col-span-6 flex justify-center">
                <div className="w-full max-w-[340px] bg-[#141416] border-[8px] border-neutral-800 rounded-[48px] overflow-hidden shadow-2xl relative aspect-[9/19]">
                  
                  {/* Speaker and Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-neutral-850 h-6 w-32 rounded-b-2xl z-20 flex justify-center items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-800 mr-2" />
                    <span className="w-10 h-1 bg-neutral-800 rounded-full" />
                  </div>

                  {/* Top Bar inside Screen */}
                  <div className="pt-8 px-5 pb-3 bg-neutral-900/40 flex justify-between items-center text-[10px] text-neutral-500 font-bold tracking-wider">
                    <span>WALKER MOBILE</span>
                    <span className="flex items-center space-x-1">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
                      <span>HEALTHY SYNC</span>
                    </span>
                  </div>

                  {/* App Screen Content */}
                  <div className="p-5 space-y-5">
                    
                    {/* Brand header inside screen */}
                    <div className="flex items-center space-x-2">
                      <div className="w-7 h-7 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                        <span className="text-[10px] font-bold text-white">W</span>
                      </div>
                      <span className="text-xs font-bold tracking-widest text-white">WALKER</span>
                    </div>

                    {/* Main Credit Display */}
                    <div className="bg-neutral-900 p-4 rounded-2xl border border-neutral-850 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-2 text-[10px] text-neutral-500 font-bold uppercase tracking-widest">
                        Credits
                      </div>
                      <span className="text-xs text-neutral-400">Available Balance</span>
                      <div className="flex items-baseline space-x-1.5 mt-1.5">
                        <span className="text-3xl font-mono font-bold text-white">
                          {steps.toLocaleString()}
                        </span>
                        <span className="text-[10px] text-neutral-500 font-bold uppercase">Steps Synced</span>
                      </div>
                      <div className="w-full bg-neutral-800 h-1.5 rounded-full mt-3 overflow-hidden">
                        <div 
                          className="bg-white h-full transition-all duration-300" 
                          style={{ width: `${Math.min(100, (steps / 10000) * 100)}%` }} 
                        />
                      </div>
                      <div className="flex justify-between items-center mt-2.5 text-[9px] text-neutral-500">
                        <span>Daily Goal: 10k steps</span>
                        <span>{Math.round((steps / 10000) * 100)}% Done</span>
                      </div>
                    </div>

                    {/* Screen Blocker Status */}
                    <div className="bg-neutral-900 p-4 rounded-2xl border border-neutral-850">
                      <h5 className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-2.5">ACTIVE SCREEN SHIELD</h5>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs bg-neutral-850 p-2 rounded-lg">
                          <span className="text-neutral-300">Social Apps</span>
                          <span className="text-[9px] bg-red-950 text-red-400 px-1.5 py-0.5 rounded border border-red-900 font-bold">LOCKED</span>
                        </div>
                        <p className="text-[10px] text-neutral-500 mt-2 leading-normal">
                          Unlock social platforms for <strong>15 minutes</strong> for <strong>150 Credits</strong>.
                        </p>
                        <button className="w-full bg-white hover:bg-neutral-200 text-black text-[11px] font-bold py-2 rounded-lg mt-1 transition-all">
                          Exchange 150 Credits
                        </button>
                      </div>
                    </div>

                    {/* Sync source details */}
                    <div className="bg-neutral-900 p-3 rounded-2xl border border-neutral-850 flex items-center justify-between text-[10px]">
                      <div className="flex items-center space-x-2">
                        <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
                        <span className="text-neutral-400">Apple HealthKit Sync</span>
                      </div>
                      <span className="text-neutral-500 font-mono">1m ago</span>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Feature Copy */}
              <div className="lg:col-span-6 space-y-6">
                <div className="bg-neutral-900 border border-neutral-800 text-white font-mono text-[11px] font-bold px-3 py-1.5 rounded-md inline-block">
                  PRODUCT TWO: ENTERPRISE & THIRD-PARTY INTEGRATION
                </div>
                <h3 className="text-3xl font-bold tracking-tight text-white">Powering health motivation in any app</h3>
                <p className="text-neutral-400 leading-relaxed">
                  With the Walker API, fitness apps, educational tools, gaming ecosystems, and lifestyle platforms can hook directly into user-authenticated step balances to drive habits.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <div className="border border-neutral-850 p-4 rounded-xl hover:border-neutral-800 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center mb-3">
                      <Layers className="w-4 h-4 text-white" />
                    </div>
                    <h4 className="text-sm font-semibold text-white">Hosted Wallet Consent</h4>
                    <p className="text-xs text-neutral-500 mt-1">Users grant third-party apps secure permission to view or deduct credits in a standardized, simple prompt.</p>
                  </div>

                  <div className="border border-neutral-850 p-4 rounded-xl hover:border-neutral-800 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center mb-3">
                      <Code className="w-4 h-4 text-white" />
                    </div>
                    <h4 className="text-sm font-semibold text-white">Clean REST Endpoints</h4>
                    <p className="text-xs text-neutral-500 mt-1">Deduct wallet balances, check current credit status, or listen to real-time Webhook updates with ease.</p>
                  </div>

                  <div className="border border-neutral-850 p-4 rounded-xl hover:border-neutral-800 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center mb-3">
                      <RefreshCw className="w-4 h-4 text-white" />
                    </div>
                    <h4 className="text-sm font-semibold text-white">Synchronous Execution</h4>
                    <p className="text-xs text-neutral-500 mt-1">All debit actions are atomic, processed with instant verification or safe refund routes.</p>
                  </div>

                  <div className="border border-neutral-850 p-4 rounded-xl hover:border-neutral-800 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center mb-3">
                      <ShieldCheck className="w-4 h-4 text-white" />
                    </div>
                    <h4 className="text-sm font-semibold text-white">Encrypted Handshakes</h4>
                    <p className="text-xs text-neutral-500 mt-1">Cryptographically signed transaction payloads ensure partner app validation without leak risks.</p>
                  </div>
                </div>
              </div>

              {/* Developer Interactive Sandbox preview */}
              <div className="lg:col-span-6 space-y-6">
                <div className="bg-neutral-900/50 p-6 rounded-2xl border border-neutral-800">
                  <h4 className="text-sm font-bold text-white mb-4 flex items-center justify-between">
                    <span>Interactive Partner Auth Demo</span>
                    <span className="text-xs text-neutral-400 font-normal">Step-by-Step Simulated Connect</span>
                  </h4>

                  {/* Consent Flow Container */}
                  <div className="bg-[#111113] border border-neutral-850 rounded-xl p-5 relative overflow-hidden">
                    {!isConsenting && !consentSuccess ? (
                      <div className="text-center py-6">
                        <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-850 flex items-center justify-center mx-auto mb-4">
                          <Compass className="w-6 h-6 text-neutral-400" />
                        </div>
                        <h5 className="text-sm font-bold text-white">MindfulQuest App wants to sync</h5>
                        <p className="text-xs text-neutral-500 max-w-xs mx-auto mt-1 mb-4">
                          Integrate your real-world progress to earn specialized mindfulness unlocks.
                        </p>
                        <button
                          onClick={startConsentSimulation}
                          className="bg-white hover:bg-neutral-200 text-black text-xs font-bold px-4 py-2 rounded-lg transition-all"
                        >
                          Simulate Consent Handshake
                        </button>
                      </div>
                    ) : isConsenting ? (
                      <div className="space-y-4">
                        {/* Step indicator header */}
                        <div className="flex justify-between items-center text-[10px] text-neutral-500 uppercase font-bold border-b border-neutral-850 pb-2">
                          <span>Hosted Consent Protocol</span>
                          <span>Step {consentStep} of 3</span>
                        </div>

                        {consentStep === 1 && (
                          <div className="space-y-3">
                            <h5 className="text-xs font-bold text-white">1. Verify Identity</h5>
                            <p className="text-xs text-neutral-400">
                              Walker verifies MindfulQuest is a verified ecosystem partner with safe parameters.
                            </p>
                            <div className="bg-neutral-900 p-3 rounded-lg border border-neutral-850 text-xs">
                              <div className="flex justify-between text-[11px] mb-1">
                                <span className="text-neutral-500">Partner App ID:</span>
                                <span className="font-mono text-neutral-300">mq_901x_live</span>
                              </div>
                              <div className="flex justify-between text-[11px]">
                                <span className="text-neutral-500">Redirect URI:</span>
                                <span className="font-mono text-neutral-300">mindfulquest://callback</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {consentStep === 2 && (
                          <div className="space-y-3">
                            <h5 className="text-xs font-bold text-white">2. Permissions Requested</h5>
                            <p className="text-xs text-neutral-400">
                              MindfulQuest requests permission to view steps balance and deduct up to 500 Credits per transaction.
                            </p>
                            <div className="space-y-2 bg-neutral-900 p-3 rounded-lg border border-neutral-850">
                              <div className="flex items-center space-x-2 text-[11px]">
                                <Check className="w-3.5 h-3.5 text-green-500" />
                                <span className="text-neutral-300">Read current Step balance</span>
                              </div>
                              <div className="flex items-center space-x-2 text-[11px]">
                                <Check className="w-3.5 h-3.5 text-green-500" />
                                <span className="text-neutral-300">Spend wallet credits with explicit tap approval</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {consentStep === 3 && (
                          <div className="space-y-3">
                            <h5 className="text-xs font-bold text-white">3. Complete Authorization</h5>
                            <p className="text-xs text-neutral-400">
                              Establish secure connection on behalf of user account <code className="text-white bg-neutral-900 px-1 py-0.5 rounded font-mono">usr_9x82jf0a</code>.
                            </p>
                            <div className="bg-neutral-900 p-3 rounded-lg border border-neutral-850 text-center py-4">
                              <span className="text-xs text-neutral-500">Generates unique Walker-API-Access-Token</span>
                            </div>
                          </div>
                        )}

                        <div className="flex justify-between items-center pt-2 mt-4 border-t border-neutral-850">
                          <button
                            onClick={() => setIsConsenting(false)}
                            className="text-neutral-400 hover:text-white text-xs font-semibold"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={nextConsentStep}
                            className="bg-white hover:bg-neutral-200 text-black text-xs font-bold px-4 py-2 rounded-lg transition-all"
                          >
                            {consentStep === 3 ? 'Authorize' : 'Next Step'}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <div className="w-12 h-12 rounded-full bg-green-950/40 border border-green-800/80 flex items-center justify-center mx-auto mb-4">
                          <CheckCircle className="w-6 h-6 text-green-500" />
                        </div>
                        <h5 className="text-sm font-bold text-white">Connected Successfully!</h5>
                        <p className="text-xs text-neutral-400 max-w-xs mx-auto mt-1 mb-4">
                          Your balance of <strong>{steps.toLocaleString()} Credits</strong> is now linked securely to MindfulQuest.
                        </p>
                        <button
                          onClick={() => setConsentSuccess(false)}
                          className="bg-neutral-900 hover:bg-neutral-850 text-neutral-300 border border-neutral-800 text-xs font-semibold px-4 py-2 rounded-lg transition-all"
                        >
                          Reset Demo
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Developer API Console section */}
      <section id="api" className="py-24 px-6 bg-[#0c0c0e] border-t border-neutral-900 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* API Content Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center space-x-2 bg-neutral-900 border border-neutral-850 px-3 py-1 rounded-full text-xs text-neutral-400">
                <Code className="w-3.5 h-3.5 text-white animate-pulse" />
                <span>REST API & Endpoints</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                Simple, secure API integrations
              </h2>
              <p className="text-neutral-400 leading-relaxed">
                Connect your user's healthy accomplishments to your application logic with ease. Our standard REST framework accepts simple tokenized requests, keeping your development pipeline swift and predictable.
              </p>

              {/* Endpoint selectors */}
              <div className="space-y-3">
                <button
                  onClick={() => setApiEndpoint('GET_BALANCE')}
                  className={`w-full flex items-center justify-between p-4 rounded-xl text-left border transition-all ${
                    apiEndpoint === 'GET_BALANCE'
                      ? 'bg-neutral-900 border-neutral-700 shadow-sm'
                      : 'bg-transparent border-neutral-900 hover:border-neutral-850'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-[10px] bg-green-950 text-green-400 font-bold px-2 py-0.5 rounded border border-green-900 uppercase font-mono">GET</span>
                    <div>
                      <h4 className="text-sm font-bold text-white">/v1/wallets/balance</h4>
                      <p className="text-xs text-neutral-500 mt-0.5">Read synced step-credit balance</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-neutral-500" />
                </button>

                <button
                  onClick={() => setApiEndpoint('SYNC_ACTIVITY')}
                  className={`w-full flex items-center justify-between p-4 rounded-xl text-left border transition-all ${
                    apiEndpoint === 'SYNC_ACTIVITY'
                      ? 'bg-neutral-900 border-neutral-700 shadow-sm'
                      : 'bg-transparent border-neutral-900 hover:border-neutral-850'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-[10px] bg-blue-950 text-blue-400 font-bold px-2 py-0.5 rounded border border-blue-900 uppercase font-mono">POST</span>
                    <div>
                      <h4 className="text-sm font-bold text-white">/v1/sync/activity</h4>
                      <p className="text-xs text-neutral-500 mt-0.5">Request sync session execution</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-neutral-500" />
                </button>

                <button
                  onClick={() => setApiEndpoint('POST_SPEND')}
                  className={`w-full flex items-center justify-between p-4 rounded-xl text-left border transition-all ${
                    apiEndpoint === 'POST_SPEND'
                      ? 'bg-neutral-900 border-neutral-700 shadow-sm'
                      : 'bg-transparent border-neutral-900 hover:border-neutral-850'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-[10px] bg-orange-950 text-orange-400 font-bold px-2 py-0.5 rounded border border-orange-900 uppercase font-mono">POST</span>
                    <div>
                      <h4 className="text-sm font-bold text-white">/v1/wallets/spend</h4>
                      <p className="text-xs text-neutral-500 mt-0.5">Deduct credits on explicit user consent</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-neutral-500" />
                </button>
              </div>
            </div>

            {/* Live Interactive API Response Console */}
            <div className="lg:col-span-7 bg-[#111113] border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl">
              
              {/* Console Header */}
              <div className="bg-neutral-950/60 p-4 border-b border-neutral-850 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  <span className="text-xs text-neutral-400 font-mono ml-2">walker-interactive-shell -- bash</span>
                </div>
                <div className="flex items-center space-x-2 bg-neutral-900 border border-neutral-800 rounded px-2 py-1">
                  <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-wider">Live Sandbox</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                </div>
              </div>

              {/* Shell Content Block */}
              <div className="p-6 font-mono text-xs text-neutral-300 leading-relaxed overflow-x-auto min-h-[360px] flex flex-col justify-between">
                <div>
                  {/* Prompt */}
                  <div className="mb-4">
                    <span className="text-neutral-500">$</span> <span className="text-white">curl -X {apiEndpoint === 'GET_BALANCE' ? 'GET' : 'POST'} \</span> <br />
                    <span className="text-neutral-500 pl-4">https://api.walker.wellness/v1/{apiEndpoint === 'GET_BALANCE' ? 'wallets/balance' : apiEndpoint === 'SYNC_ACTIVITY' ? 'sync/activity' : 'wallets/spend'} \</span> <br />
                    <span className="text-neutral-500 pl-4">-H "Authorization: Bearer wk_live_sec_77af..." \</span> <br />
                    {apiEndpoint === 'POST_SPEND' && (
                      <span className="text-neutral-500 pl-4">-d '{"{"} "partner_id": "partner_mindful_quest", "credits": 150, "reason": "Zen level unlock" {"}"}'</span>
                    )}
                  </div>

                  {/* Loading / Response Output */}
                  <div className="mt-6 bg-neutral-950 p-4 rounded-xl border border-neutral-850 relative">
                    <div className="absolute top-2 right-2 flex space-x-2">
                      <button 
                        onClick={() => handleCopy(JSON.stringify(apiResponse, null, 2))}
                        className="text-neutral-500 hover:text-white transition-colors"
                        title="Copy Response JSON"
                      >
                        {copiedText ? (
                          <span className="text-[10px] text-green-500 font-sans">Copied!</span>
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    {isLoadingApi ? (
                      <div className="flex items-center space-x-2 text-neutral-500 py-12 justify-center">
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Fetching API Response...</span>
                      </div>
                    ) : (
                      <pre className="text-green-400 text-[11px] overflow-auto max-h-[220px]">
                        {JSON.stringify(apiResponse, null, 2)}
                      </pre>
                    )}
                  </div>
                </div>

                {/* Simulated Interactive Hint */}
                <div className="mt-6 pt-4 border-t border-neutral-850 text-neutral-500 text-[11px] flex items-center justify-between">
                  <span>✨ Try dragging the <strong>Steps Slider</strong> in the simulator section above to see this live balance react.</span>
                  <button 
                    onClick={() => updateApiResponse(apiEndpoint)}
                    className="flex items-center space-x-1.5 hover:text-white transition-colors text-neutral-400 border border-neutral-800 px-2 py-1 rounded bg-neutral-900"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Run Query</span>
                  </button>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Behavioral Philosophy & Product Principles Section */}
      <section className="py-24 px-6 bg-[#070708] relative">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Philosophy text */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold tracking-widest text-neutral-500 uppercase block">Behavior Design Principles</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Designed for wellness. Not financial rewards.</h2>
              
              <p className="text-neutral-400 leading-relaxed">
                By maintaining a pure 1:1 steps-to-credits baseline, Walker avoids the cognitive anxiety of variable economic reward schedules. Credits represent clear, self-directed wellness investment. They are never tradeable, investable, or purchasable.
              </p>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-white mt-1 shrink-0" />
                  <div>
                    <h4 className="text-sm font-semibold text-white">Combats Doomscrolling</h4>
                    <p className="text-xs text-neutral-500 mt-1">Requiring real physical steps to earn access to highly distracting platforms triggers cognitive friction, disrupting passive scrolling habits.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-white mt-1 shrink-0" />
                  <div>
                    <h4 className="text-sm font-semibold text-white">Logical Baseline (1 step = 1 credit)</h4>
                    <p className="text-xs text-neutral-500 mt-1">Simple representation makes habit tracking concrete and effortless. Zero fluctuating currency values.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-white mt-1 shrink-0" />
                  <div>
                    <h4 className="text-sm font-semibold text-white">Guaranteed Privacy Bounds</h4>
                    <p className="text-xs text-neutral-500 mt-1">Walker reads steps but never sells demographics or location histories. Health metrics are local and private.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Graphic Illustration Grid */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#0c0c0e] border border-neutral-850 p-6 rounded-2xl relative overflow-hidden">
                <Flame className="w-8 h-8 text-neutral-400 mb-4" />
                <h3 className="text-base font-bold text-white mb-2">Daily Consistency</h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  Consistently walking 7,500 steps per day provides the ideal credit reserve for a balanced lifestyle.
                </p>
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/[0.01] rounded-full blur-xl pointer-events-none" />
              </div>

              <div className="bg-[#0c0c0e] border border-neutral-850 p-6 rounded-2xl relative overflow-hidden">
                <Clock className="w-8 h-8 text-neutral-400 mb-4" />
                <h3 className="text-base font-bold text-white mb-2">Intentional Breaks</h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  Convert physical steps into structured moments of relaxation. Avoid accidental multi-hour screen blackholes.
                </p>
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/[0.01] rounded-full blur-xl pointer-events-none" />
              </div>

              <div className="bg-[#0c0c0e] border border-neutral-850 p-6 rounded-2xl relative overflow-hidden">
                <Compass className="w-8 h-8 text-neutral-400 mb-4" />
                <h3 className="text-base font-bold text-white mb-2">Open Integrations</h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  Third-party developers construct robust, game-like pathways to reward steps with exclusive, non-monetary achievements.
                </p>
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/[0.01] rounded-full blur-xl pointer-events-none" />
              </div>

              <div className="bg-[#0c0c0e] border border-neutral-850 p-6 rounded-2xl relative overflow-hidden">
                <ShieldCheck className="w-8 h-8 text-neutral-400 mb-4" />
                <h3 className="text-base font-bold text-white mb-2">Strictly Non-Finance</h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  No currency speculation. Zero crypto, and no conversion to dollars. Walker maintains purely mindful motivations.
                </p>
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/[0.01] rounded-full blur-xl pointer-events-none" />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-24 px-6 border-t border-neutral-900 bg-[#0c0c0e]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-widest text-neutral-500 uppercase block mb-3">Questions & Verification</span>
            <h2 className="text-3xl font-bold text-white tracking-tight">Understanding Walker Wellness Incentives</h2>
          </div>

          <div className="space-y-6">
            {[
              {
                q: "Are Walker Credits actual currency or crypto?",
                a: "No. Walker Credits are wellness-tech incentives with zero financial value. They cannot be sold, converted into cash, or traded. Their only function is unlocking local iOS Screen Time allowances or participating in connected developer-partner experiences."
              },
              {
                q: "How does the Screen Time blocker work safely on iOS?",
                a: "The Walker iOS app integrates with Apple's official Screen Time/Family Controls framework. Once set, chosen social or entertainment applications require a dedicated allocation of steps from your synced HealthKit to unlock access."
              },
              {
                q: "What does the Walker API allow developers to do?",
                a: "The API allows secure, authorized third-party applications to link directly with a user's Walker credit balance. For example, a language study application can authorize access to an advanced daily course by deducting 200 Walker Credits earned by the user’s real-world walking."
              },
              {
                q: "Is my personal movement data secure?",
                a: "Yes. Walker holds strict architectural privacy barriers. Detailed step sequences, routes, or physiological metrics remain strictly inside Apple HealthKit locally. Only verified aggregated step counts are registered to validate user-earned credits."
              }
            ].map((faq, idx) => (
              <div key={idx} className="bg-[#111113] border border-neutral-850 rounded-2xl p-6">
                <h4 className="text-base font-bold text-white mb-2">{faq.q}</h4>
                <p className="text-sm text-neutral-400 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Footer & CTA Banner */}
      <footer className="relative bg-[#070708] border-t border-neutral-900 py-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f2e03_1px,transparent_1px),linear-gradient(to_bottom,#1f1f2e03_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-neutral-900/30 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start mb-12">
            
            {/* Logo details column */}
            <div className="md:col-span-4 space-y-4">
              <div className="flex items-center space-x-3">
                <WalkerLogo className="w-10 h-10" />
                <div>
                  <span className="text-base font-bold tracking-widest text-white block">WALKER</span>
                  <span className="text-[9px] text-neutral-500 tracking-wider font-semibold">WELLNESS INCENTIVES</span>
                </div>
              </div>
              <p className="text-xs text-neutral-500 leading-relaxed max-w-sm">
                Walker helps people turn movement into healthier digital choices. We provide frictionless digital limits powered entirely by real-world physical investment.
              </p>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-2 space-y-3">
              <h5 className="text-xs font-bold text-white uppercase tracking-wider">Consumer Product</h5>
              <ul className="space-y-2 text-xs text-neutral-400">
                <li><a href="#simulator" className="hover:text-white transition-colors">iOS App Download</a></li>
                <li><a href="#simulator" className="hover:text-white transition-colors">Screen Time Setup</a></li>
                <li><a href="#simulator" className="hover:text-white transition-colors">HealthKit Integration</a></li>
                <li><a href="#simulator" className="hover:text-white transition-colors">Safety Standards</a></li>
              </ul>
            </div>

            {/* Dev Links */}
            <div className="md:col-span-2 space-y-3">
              <h5 className="text-xs font-bold text-white uppercase tracking-wider">API & Ecosystem</h5>
              <ul className="space-y-2 text-xs text-neutral-400">
                <li><a href="#api" className="hover:text-white transition-colors">Developer Portal</a></li>
                <li><a href="#api" className="hover:text-white transition-colors">API Reference Docs</a></li>
                <li><a href="#api" className="hover:text-white transition-colors">Ecosystem Consent</a></li>
                <li><a href="#api" className="hover:text-white transition-colors">Platform Security</a></li>
              </ul>
            </div>

            {/* Join Banner */}
            <div className="md:col-span-4 bg-[#0c0c0e] border border-neutral-850 p-6 rounded-2xl">
              <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-2">Ecosystem Updates</h5>
              <p className="text-xs text-neutral-400 mb-4 leading-normal">
                Sign up to stay informed on our open-source tools and developer-partner integrations.
              </p>
              <div className="flex space-x-2">
                <input 
                  type="email" 
                  placeholder="name@organization.com" 
                  className="bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-neutral-700 w-full"
                />
                <button 
                  onClick={() => alert("Simulated: Thank you for your interest in Walker!")}
                  className="bg-white hover:bg-neutral-200 text-black font-bold px-4 py-2 rounded-lg text-xs shrink-0 transition-all"
                >
                  Join List
                </button>
              </div>
            </div>

          </div>

          <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-500">
            <span>&copy; {new Date().getFullYear()} Walker Inc. All rights reserved.</span>
            <div className="flex space-x-4 mt-4 sm:mt-0">
              <span className="hover:text-white transition-colors cursor-pointer">Privacy Guidelines</span>
              <span>&bull;</span>
              <span className="hover:text-white transition-colors cursor-pointer">Consumer Terms</span>
              <span>&bull;</span>
              <span className="hover:text-white transition-colors cursor-pointer">API Agreement</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
