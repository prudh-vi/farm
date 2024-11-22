import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Button from './components/Button';
import Navbar from './components/Navbar';


const translations = {
  en: {
    nav: {
      solutions: "Solutions",
      company: "Company",
      contact: "Contact"
    },
    hero: {
      title: "Transform Agricultural Waste into Sustainable Profit",
      subtitle: "Harness the power of AI to optimize your farm's productivity while contributing to a greener future.",
      getStarted: "Get Started →",
      watchDemo: "Watch Demo"
    },
    stats: [
      { number: '85%', label: 'Waste Reduction' },
      { number: '2.5x', label: 'Yield Increase' },
      { number: '10k+', label: 'Farmers Helped' }
    ],
    features: {
      title: "Intelligent Solutions for Modern Farming",
      items: [
        {
          icon: "🌱",
          title: 'AI-Powered Analysis',
          description: 'Real-time insights from advanced algorithms analyzing soil health and climate patterns'
        },
        {
          icon: "📊",
          title: 'Smart Recommendations',
          description: 'Personalized suggestions for optimal stubble management and resource utilization'
        },
        {
          icon: "👥",
          title: 'Community Support',
          description: 'Connect with local farmers and access government incentive programs'
        }
      ]
    },
    cta: {
      title: "Ready to Revolutionize Your Farm?",
      subtitle: "Join thousands of farmers already benefiting from our AI-powered platform",
      button: "Get Started Now →"
    },
    footer: {
      tagline: "Sustainable farming solutions powered by AI",
      solutions: {
        title: "Solutions",
        items: ["Soil Analysis", "Yield Optimization", "Waste Management"]
      },
      company: {
        title: "Company",
        items: ["About Us", "Careers", "Contact"]
      },
      connect: {
        title: "Connect",
        items: ["Twitter", "LinkedIn", "info@farmsmart.ai"]
      }
    },
    auth: {
      login: {
        title: "Welcome Back",
        subtitle: "Enter your credentials to access your account",
        button: "Log In",
        altText: "Don't have an account?",
        altAction: "Sign Up"
      },
      signup: {
        title: "Create Account",
        subtitle: "Register to start optimizing your farm",
        button: "Sign Up",
        altText: "Already have an account?",
        altAction: "Log In"
      },
      fields: {
        name: "Full Name",
        email: "Email Address",
        password: "Password",
        confirmPassword: "Confirm Password"
      }
    }
  },
  hi: {
    // ... Hindi translations as before
  }
};

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [mode, setMode] = useState('login');
  const [currentLang, setCurrentLang] = useState('en');
  const [hoveredCard, setHoveredCard] = useState(null);

  const t = translations[currentLang];

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    if (!email) return;
    
    setUser({ email });
    setIsAuthenticated(true);
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const LandingPage = () => (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Navbar currentLang={currentLang} onLanguageChange={setCurrentLang} />
      
      {/* Hero Section */}
      <header className="relative overflow-hidden bg-gradient-to-r from-green-900 via-green-700 to-green-800">
        <div className="absolute inset-0 bg-[url('/api/placeholder/1200/800')] opacity-10 bg-center bg-cover" />
        <div className="container mx-auto px-6 py-24 relative">
          <div className="max-w-3xl space-y-8">
            <h1 className="text-5xl font-bold text-white leading-tight">
              {t.hero.title}
            </h1>
            <p className="text-xl text-green-100 leading-relaxed">
              {t.hero.subtitle}
            </p>
            <div className="flex gap-4 flex-wrap">
              <Button 
                variant="white" 
                className="text-lg font-semibold"
                onClick={() => setIsAuthModalOpen(true)}
              >
                {t.hero.getStarted}
              </Button>
              <Button variant="outline" className="text-lg text-white">
                {t.hero.watchDemo}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="py-16 bg-white bg-opacity-90 backdrop-blur-lg">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {t.stats.map((stat, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="text-4xl font-bold text-green-700">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16 text-green-900">
            {t.features.title}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {t.features.items.map((feature, index) => (
              <div
                key={index}
                className={`bg-white rounded-lg shadow-lg p-6 transition-all duration-300 ${
                  hoveredCard === index ? 'transform -translate-y-2' : ''
                }`}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-green-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-green-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-2xl mx-auto space-y-8">
            <h2 className="text-4xl font-bold">
              {t.cta.title}
            </h2>
            <p className="text-xl text-green-100">
              {t.cta.subtitle}
            </p>
            <Button 
              variant="white" 
              className="text-lg"
              onClick={() => setIsAuthModalOpen(true)}
            >
              {t.cta.button}
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-950 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <span className="text-2xl">🌿</span>
                <span className="text-xl font-bold">FarmSmart</span>
              </div>
              <p className="text-green-300">
                {t.footer.tagline}
              </p>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">{t.footer.solutions.title}</h3>
              <ul className="space-y-2">
                {t.footer.solutions.items.map((item, index) => (
                  <li key={index}>
                    <a href="#" className="text-green-300 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">{t.footer.company.title}</h3>
              <ul className="space-y-2">
                {t.footer.company.items.map((item, index) => (
                  <li key={index}>
                    <a href="#" className="text-green-300 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">{t.footer.connect.title}</h3>
              <ul className="space-y-2">
                {t.footer.connect.items.map((item, index) => (
                  <li key={index}>
                    <a href="#" className="text-green-300 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );

  return (
    <Router>
      <Routes>
        {/* Protected Dashboard Routes */}
        {isAuthenticated ? (
          <Route 
            path="/dashboard/*" 
            element={
              <Dashboard 
                user={user} 
                onLogout={handleLogout} 
                currentLang={currentLang} 
              />
            } 
          />
        ) : (
          <Route path="/dashboard/*" element={<Navigate to="/" replace />} />
        )}

        {/* Landing Page Route */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <LandingPage />
            )
          }
        />
      </Routes>

      {/* Auth Modal */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsAuthModalOpen(false)} />
          <div className="absolute inset-0 overflow-y-auto">
            <div className="min-h-full flex items-center justify-center p-4">
              <div className="relative bg-white rounded-lg w-full max-w-md p-6">
                <button 
                  onClick={() => setIsAuthModalOpen(false)}
                  className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {mode === 'login' ? t.auth.login.title : t.auth.signup.title}
                    </h2>
                    <p className="text-gray-600 mt-2">
                      {mode === 'login' ? t.auth.login.subtitle : t.auth.signup.subtitle}
                    </p>
                  </div>

                  <div className="space-y-4">
                    {mode === 'signup' && (
                      <input
                        type="text"
                        name="name"
                        placeholder={t.auth.fields.name}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    )}
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder={t.auth.fields.email}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <input
                      type="password"
                      name="password"
                      required
                      placeholder={t.auth.fields.password}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    {mode === 'signup' && (
                      <input
                        type="password"
                        name="confirmPassword"
                        placeholder={t.auth.fields.confirmPassword}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    )}
                  </div>

                  <Button type="submit" variant="primary" className="w-full">
                    {mode === 'login' ? t.auth.login.button : t.auth.signup.button}
                  </Button>

                  <div className="text-center text-gray-600">
                    {mode === 'login' ? (
                      <p>
                        {t.auth.login.altText}{' '}
                        <button 
                          type="button"
                          onClick={() => setMode('signup')}
                          className="text-green-600 hover:underline font-medium"
                        >
                          {t.auth.login.altAction}
                        </button>
                      </p>
                    ) : (
                      <p>
                        {t.auth.signup.altText}{' '}
                        <button 
                          type="button"
                          onClick={() => setMode('login')}
                          className="text-green-600 hover:underline font-medium"
                        >
                          {t.auth.signup.altAction}
                        </button>
                      </p>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </Router>
  );
}

export default App;