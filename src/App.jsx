import { useState, useEffect } from 'react';
import './App.css';
import {
  registerUser, loginUser, logoutUser, getCurrentUser,
  getAccessToken
} from './util/api';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Header from './components/Header';
import Footer from './components/Footer';

import { SuccessIcon, ErrorIcon, CloseIcon, CopyIcon, CheckIcon } from './util/icons';

function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('login');
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [toasts, setToasts] = useState([]);

  const [copied, setCopied] = useState(false);

  // Auto session check on mount
  useEffect(() => {
    async function checkSession() {
      const token = getAccessToken();
      if (token) {
        try {
          const userData = await getCurrentUser();
          setUser(userData);
          setView('profile');
          showToast('Welcome back!', 'success');
        } catch (err) {
          // Token expired or invalid
          console.warn('Session restoration failed:', err.message);
        }
      }
      setIsCheckingSession(false);
    }
    checkSession();
  }, []);

  // Show status toasts
  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto remove after 4s
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Register Form Handler
  const handleRegister = async ({ username, email, password, role }) => {
    if (!username || !email || !password) {
      showToast('Please fill in all registration fields.', 'error');
      return;
    }

    setIsLoading(true);
    try {
      await registerUser({
        username,
        email,
        password,
        role,
      });

      showToast('Registration successful! Please log in.', 'success');
      setView('login');
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Login Form Handler
  const handleLogin = async ({ username, password }) => {
    if (!username || !password) {
      showToast('Please enter username and password.', 'error');
      return;
    }

    setIsLoading(true);
    try {
      const loginData = await loginUser({
        username,
        password,
      });

      setUser(loginData.user);
      showToast('Logged in successfully!', 'success');
      setView('profile');
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Logout Handler
  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logoutUser();
      setUser(null);
      setView('login');
      showToast('Logged out successfully.', 'success');
    } catch (err) {
      showToast(`Logged out locally. API responded: ${err.message}`, 'error');
      // Set state anyway
      setUser(null);
      setView('login');
    } finally {
      setIsLoading(false);
    }
  };

  // Copy profile JSON to clipboard
  const handleCopyJSON = () => {
    if (!user) return;
    navigator.clipboard.writeText(JSON.stringify(user, null, 2));
    setCopied(true);
    showToast('User data copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  // Format date helper
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  return (
    <div className="app-container">
      {/* Toast Overlay */}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast ${toast.type}`}>
            <span className="toast-icon">
              {toast.type === 'success' ? <SuccessIcon /> : <ErrorIcon />}
            </span>
            <div className="toast-message">{toast.message}</div>
            <button className="toast-close" onClick={() => removeToast(toast.id)}>
              <CloseIcon />
            </button>
          </div>
        ))}
      </div>

      <Header user={user} handleLogout={handleLogout} isLoading={isLoading} />

      {/* Main Container */}
      <main className="main-content">
        {isCheckingSession ? (
          <div className="glass-card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <span className="spinner" style={{ width: '3rem', height: '3rem', margin: '0 auto 1.5rem', display: 'block', color: 'var(--primary)' }}></span>
            <p style={{ color: 'var(--text-muted)' }}>Restoring secure session...</p>
          </div>
        ) : view === 'login' ? (
          <LoginForm
            onLogin={handleLogin}
            isLoading={isLoading}
            onSwitchToRegister={() => setView('register')}
          />
        ) : view === 'register' ? (
          <RegisterForm
            onRegister={handleRegister}
            isLoading={isLoading}
            onSwitchToLogin={() => setView('login')}
          />
        ) : (
          /* PROFILE/DASHBOARD VIEW */
          <div className="glass-card profile-card">
            <div className="card-header" style={{ marginBottom: '1.5rem' }}>
              <h1 className="card-title">User Dashboard</h1>
              <p className="card-subtitle">Secure session established. Here is your user profile details.</p>
            </div>

            <div className="profile-grid">
              {/* Sidebar card */}
              <div className="profile-sidebar">
                <div className="avatar-wrapper">
                  <div className="avatar-fallback">
                    {user?.username ? user.username.charAt(0).toUpperCase() : '?'}
                  </div>
                  <span className="role-badge">{user?.role || 'USER'}</span>
                </div>
                <h2 className="profile-username">@{user?.username}</h2>
                <p className="profile-email">{user?.email}</p>

                <div className="profile-stats">
                  <div className="stat-item">
                    <span className="stat-label">Verified</span>
                    <span className="stat-val" style={{ color: 'var(--success)' }}>Active</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Joined</span>
                    <span className="stat-val">{formatDate(user?.createdAt)}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Last Login</span>
                    <span className="stat-val">{formatDate(user?.updatedAt)}</span>
                  </div>
                </div>
              </div>

              {/* API Response Details */}
              <div className="profile-details-panel">
                <div className="panel-header">
                  <span className="panel-title">Raw JSON Metadata</span>
                  <button className="copy-btn" onClick={handleCopyJSON}>
                    {copied ? <CheckIcon /> : <CopyIcon />}
                    {copied ? 'Copied!' : 'Copy API Response'}
                  </button>
                </div>

                <div className="json-viewer-container">
                  <pre className="json-viewer">
                    {user ? (
                      <code>
                        {Object.entries(user).map(([key, val], idx, arr) => {
                          const isLast = idx === arr.length - 1;
                          let formattedVal;

                          if (val === null) {
                            formattedVal = <span className="json-null">null</span>;
                          } else if (typeof val === 'boolean') {
                            formattedVal = <span className="json-boolean">{val.toString()}</span>;
                          } else if (typeof val === 'number') {
                            formattedVal = <span className="json-number">{val}</span>;
                          } else {
                            formattedVal = <span className="json-string">"{val.toString()}"</span>;
                          }

                          return (
                            <div key={key} style={{ paddingLeft: '1rem' }}>
                              <span className="json-key">"{key}"</span>: {formattedVal}
                              {!isLast && ','}
                            </div>
                          );
                        })}
                      </code>
                    ) : (
                      'No user data loaded'
                    )}
                  </pre>
                </div>

                <div style={{ marginTop: '1rem' }}>
                  <button
                    onClick={handleLogout}
                    className="btn btn-secondary"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner"></span> Logging out...
                      </>
                    ) : (
                      <>
                        <LogoutIcon /> Log Out of App
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
