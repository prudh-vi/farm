import React, { useState } from 'react';
import Marketplace from './Marketplace';
import Analysis from './Analysis';


const translations = {
    en: {
        welcome: "Welcome to FarmSmart",
        greeting: "Hello",
        quickActions: "Quick Actions",
        actions: [
            {
                title: "Field Analysis",
                description: "Analyze your field for AI-powered recommendations",
                icon: "🌱",
                id: "analysis"
            },
            {
                title: "Marketplace",
                description: "Buy and sell agricultural products directly",
                icon: "🏪",
                id: "marketplace"
            },
            {
                title: "Community",
                description: "Connect with local farmers and share knowledge",
                icon: "👥",
                id: "community"
            }
        ],
        logout: "Logout"
    },
    hi: {
        welcome: "फार्मस्मार्ट में आपका स्वागत है",
        greeting: "नमस्ते",
        quickActions: "त्वरित कार्य",
        actions: [
            {
                title: "मैदान विश्लेषण",
                description: "अपनी मिट्टी की गुणवत्ता, वनस्पति स्वास्थ्य का विश्लेषण करें और अन्य एआई-संचालित अनुशंसाएँ प्राप्त करें",
                icon: "🌱",
                id: "analysis"
            },
            {
                title: "बाज़ार",
                description: "कृषि उत्पादों को सीधे खरीदें और बेचें",
                icon: "🏪",
                id: "marketplace"
            },
            {
                title: "समुदाय",
                description: "स्थानीय किसानों से जुड़ें और ज्ञान साझा करें",
                icon: "👥",
                id: "community"
            }
        ],
        logout: "लॉग आउट"
    }
};

const ActionCard = ({ icon, title, description, onClick }) => (
  <div 
    className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
    onClick={onClick}
  >
    <div className="text-3xl mb-4">{icon}</div>
    <h3 className="text-lg font-semibold text-green-800 mb-2">
      {title}
    </h3>
    <p className="text-gray-600">
      {description}
    </p>
  </div>
);

const DashboardHome = ({ t, userName, onNavigate }) => (
  <div className="space-y-8">
    <div className="text-center space-y-4">
      <h1 className="text-4xl font-bold text-green-900">{t.welcome}</h1>
      <p className="text-xl text-green-700">
        {t.greeting}, <span className="font-semibold capitalize">{userName}</span>!
      </p>
    </div>

    <section>
      <h2 className="text-2xl font-bold text-green-900 mb-6">{t.quickActions}</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {t.actions.map((action, index) => (
          <ActionCard
            key={index}
            icon={action.icon}
            title={action.title}
            description={action.description}
            onClick={() => onNavigate(action.id)}
          />
        ))}
      </div>
    </section>
  </div>
);

const Dashboard = ({ user, onLogout, currentLang = 'en' }) => {
  const t = translations[currentLang];
  const userName = user?.email?.split('@')[0] || 'User';
  const [currentView, setCurrentView] = useState('home');

  const handleNavigate = (view) => {
    setCurrentView(view);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return (
          <DashboardHome 
            t={t} 
            userName={userName} 
            onNavigate={handleNavigate}
          />
        );
      case 'marketplace':
        return <Marketplace user={user} />;
      case 'analysis':
        return <Analysis />;
      case 'community':
        return <Community />;
      default:
        return <DashboardHome t={t} userName={userName} onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <nav className="bg-white shadow">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div 
              className="text-green-800 font-bold text-xl cursor-pointer"
              onClick={() => setCurrentView('home')}
            >
              FarmSmart
            </div>
            <button
              onClick={onLogout}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              {t.logout}
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {renderCurrentView()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
