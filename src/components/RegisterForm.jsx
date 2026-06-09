import { useState } from 'react';
import { UserIcon, MailIcon, LockIcon, ShieldIcon } from '../util/icons';

export default function RegisterForm({ onRegister, isLoading, onSwitchToLogin }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('USER');

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ username, email, password, role });
  };

  return (
    <div className="glass-card">
      <div className="card-header">
        <h1 className="card-title">Create Account</h1>
        <p className="card-subtitle">Sign up to explore FreeAPI features and dashboards</p>
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
              placeholder="Create a unique username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">
            Email Address
          </label>
          <div className="input-container">
            <span className="input-icon"><MailIcon /></span>
            <input
              type="email"
              className="form-input"
              placeholder="yourname@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              placeholder="Minimum 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">
            Account Role
          </label>
          <div className="input-container">
            <span className="input-icon"><ShieldIcon /></span>
            <select
              className="form-input role-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              disabled={isLoading}
            >
              <option value="USER">User (Standard Access)</option>
              <option value="ADMIN">Admin (Elevated Access)</option>
            </select>
          </div>
        </div>

        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? (
            <>
              <span className="spinner"></span> Creating Account...
            </>
          ) : (
            'Register'
          )}
        </button>
      </form>

      <div className="card-footer">
        Already have an account?{' '}
        <button
          type="button"
          className="btn-text"
          onClick={onSwitchToLogin}
          disabled={isLoading}
        >
          Sign in
        </button>
      </div>
    </div>
  );
}
