import React, { useState } from 'react';
import { User, MoreHorizontal } from 'lucide-react';
import { FTU_LOGO_URL } from '../constants';

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Allow any input as per requirements
    onLogin();
  };

  const handleForgotPassword = () => {
    window.open('https://qldt.cs2.ftu.edu.vn/#/forgetpass', '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#FAF9FE] flex flex-col items-center justify-center p-6 animate-in fade-in duration-300">
      
      {/* Logo Container */}
      <div className="mb-6 flex flex-col items-center">
        <div className="w-40 h-40 rounded-full bg-emerald-50/50 flex items-center justify-center mb-4 relative overflow-hidden border-4 border-emerald-50">
            {/* Using the constant logo */}
            <img 
              src={FTU_LOGO_URL} 
              alt="FTU Logo" 
              className="w-full h-full object-cover drop-shadow-sm"
            />
        </div>
        <h1 className="text-xl font-extrabold text-emerald-900 tracking-wide uppercase mt-2">
          FTU2 GREEN CAMPUS
        </h1>
      </div>

      {/* Form Section */}
      <form onSubmit={handleLogin} className="w-full max-w-xs space-y-4">
        
        {/* Student ID Input */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <User size={20} className="text-emerald-600 font-bold" fill="currentColor" fillOpacity={0.2} />
          </div>
          <input
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            placeholder="Mã sinh viên"
            className="w-full bg-[#F2F0F0] text-gray-800 font-bold placeholder-gray-500 text-sm rounded-2xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:bg-white transition-all border border-transparent focus:border-emerald-200"
          />
        </div>

        {/* Password Input */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <MoreHorizontal size={20} className="text-emerald-600 font-bold" />
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mật khẩu"
            className="w-full bg-[#F2F0F0] text-gray-800 font-bold placeholder-gray-500 text-sm rounded-2xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:bg-white transition-all border border-transparent focus:border-emerald-200"
          />
        </div>

        {/* Spacer */}
        <div className="h-4"></div>

        {/* Buttons */}
        <div className="space-y-3">
          <button
            type="submit"
            className="w-full bg-[#059669] hover:bg-[#047857] text-white font-extrabold text-sm py-3.5 rounded-full shadow-lg shadow-emerald-200 active:scale-[0.98] transition-all tracking-wide uppercase"
          >
            Đăng nhập
          </button>

          <button
            type="button"
            onClick={handleForgotPassword}
            className="w-full bg-[#059669] hover:bg-[#047857] text-white font-extrabold text-sm py-3.5 rounded-full shadow-lg shadow-emerald-200 active:scale-[0.98] transition-all tracking-wide uppercase"
          >
            Quên mật khẩu
          </button>
        </div>

      </form>
    </div>
  );
};

export default LoginScreen;