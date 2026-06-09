import { useState } from 'react';
import { UserIcon, LockIcon } from '../util/icons';

export default function LoginForm({ onLogin, isLoading, onSwitchToRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ username, password });
  };

  return (
    <div className="glass-card">
      <div className="card-header">
        <h1 className="card-title">Welcome Back</h1>
        <p className="card-subtitle">Enter your credentials to log in to your account</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">
            Username
          </label>
          <div className="input-container">
            <span className="input-icon"><UserIcon /></span>
            <input
              type="text"
              className="form-input"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">
            Password
          </label>
          <div className="input-container">
            <span className="input-icon"><LockIcon /></span>
            <input
              type="password"
              className="form-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? (
            <>
              <span className="spinner"></span> Logging in...
            </>
          ) : (
            'Sign In'
          )}
        </button>
      </form>

      <div className="card-footer">
        Don't have an account?{' '}
        <button
          type="button"
          className="btn-text"
          onClick={onSwitchToRegister}
          disabled={isLoading}
        >
          Create one now
        </button>
      </div>
    </div>
  );
}
