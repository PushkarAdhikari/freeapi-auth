import { LogoutIcon } from '../util/icons';

export default function Header({ user, handleLogout, isLoading }) {
  return (
    <header className="app-header">
      <div className="header-container">
        <div className="brand">
          <div className="brand-icon">F</div>
          <span className="brand-name">Auth App</span>
        </div>
        <div className="nav-links">
          {user && (
            <div className="user-badge">
              <span className="badge-dot"></span>
              <span>{user.username}</span>
            </div>
          )}
          {user && (
            <button
              onClick={handleLogout}
              className="btn btn-secondary"
              style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem', width: 'auto' }}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="spinner" style={{ width: '0.8rem', height: '0.8rem' }}></span>
              ) : (
                <LogoutIcon />
              )}
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
