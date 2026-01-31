
import React, { useState } from 'react';
import { storeAdminApi } from '../api.ts';

interface LoginProps {
  onLogin: (userData: any, token: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('store@sultan.com');
  const [password, setPassword] = useState('password');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<any>({});

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setFieldErrors({});
    try {
      const res = await storeAdminApi.login({ email, password });
      if (res.success) {
        onLogin(res.data.user, res.data.token);
      } else {
        setError(res.message || 'Login failed');
      }
    } catch (err: any) {
      if (err.errors) {
        setFieldErrors(err.errors);
      } else {
        setError(err.message || 'Failed to connect to server');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark p-6">
      <header className="flex justify-between items-center mb-12">
        <div className="w-12" />
        <h2 className="text-lg font-bold">Admin Login</h2>
        <button className="text-gray-900 dark:text-white">
          <span className="material-symbols-outlined">more_horiz</span>
        </button>
      </header>

      <div className="flex flex-col items-center mb-10">
        <div
          className="w-32 h-32 rounded-full bg-white flex items-center justify-center shadow-lg mb-6 overflow-hidden border-4 border-white"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAO4YP7nye8Tp_7pZYsYprdaaQP0aeNRH_Afob-ENLiPrYOLSpySOBCg9wkt0DjzenM9Zy5UBH87yUZrtzGGjDuFCeMDi0nXvd1mcBzOJ4PCBFsuRAEMzJPSCT-SL6o172T-Y1z_rk9MDBIUxZ7q74C6gVuyZREwzzMmFofILq3TtaYhDiVHG0QoqVRtCqkACR4wBhmMAZ7oK5bf-FZKQDZ4SPVIL43KvHPYeyF16ipSpnMxB_5SdbRXD0i03Ompd9LC6_Z0N7-WtcF')`,
            backgroundSize: 'cover'
          }}
        />
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-1">Parent Admin</h1>
        <p className="text-gray-500 font-medium">Store Management (Read-Only)</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-6" noValidate>
        {error && (
          <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm font-medium border border-red-100">
            {error}
          </div>
        )}
        <div>
          <label className="block text-gray-900 dark:text-gray-200 font-semibold mb-2">Email / Username</label>
          <input
            type="email"
            placeholder="Enter your email or username"
            className={`w-full h-14 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 focus:ring-primary focus:border-primary ${fieldErrors.email ? 'ring-2 ring-red-500' : ''}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {fieldErrors.email && <p className="text-[10px] text-red-500 font-bold mt-1 ml-2">{fieldErrors.email[0]}</p>}
        </div>

        <div>
          <label className="block text-gray-900 dark:text-gray-200 font-semibold mb-2">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              className={`w-full h-14 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 pr-12 focus:ring-primary focus:border-primary ${fieldErrors.password ? 'ring-2 ring-red-500' : ''}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              <span className="material-symbols-outlined">{showPassword ? 'visibility_off' : 'visibility'}</span>
            </button>
          </div>
          {fieldErrors.password && <p className="text-[10px] text-red-500 font-bold mt-1 ml-2">{fieldErrors.password[0]}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-14 bg-primary text-white text-lg font-bold rounded-xl shadow-xl shadow-primary/30 active:scale-95 transition-transform mt-4 disabled:opacity-50"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <footer className="mt-auto py-8 text-center px-6">
        <p className="text-xs text-gray-400 leading-relaxed italic">
          This is a secure read-only administrative portal. Unauthorized access attempts are logged.
        </p>
      </footer>
    </div>
  );
};

export default Login;
