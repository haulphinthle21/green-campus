import React from 'react';
import { useApp } from '../services/appContext';
import { User, GraduationCap, Calendar, LogOut } from 'lucide-react';
import GamificationBanner from '../components/GamificationBanner';

const ProfileTab: React.FC = () => {
  const { resetData } = useApp();
  
  // Hardcoded data to match the screenshot requirements
  const profileData = {
    name: "Lê Thành Nguyên",
    studentId: "2312155138",
    dob: "21/02/2005",
    gender: "Nam",
    status: "Đang học",
    phone: "0368052559",
    cccd: "089205002173",
    ethnicity: "Kinh",
    religion: "Không",
    birthPlace: "An Giang",
    nationality: "Việt Nam",
    email1: "k62.2312155138@ftu.edu.vn",
    email2: "haulphinxftu21@gmail.com",
    address: "Số 7 đường Hải Thượng Lãn Ông",
    classId: "DC62KTDNC5",
    major: "Kinh tế đối ngoại (Chương trình chất lượng cao giảng dạy bằng tiếng Anh)",
    faculty: "Kinh doanh & Thương mại quốc tế",
    level: "Đại học chính quy",
    period: "2023–2027"
  };

  return (
    <div className="flex flex-col h-full bg-[#FAFAFA] relative">
      
      {/* Standard Gamification Banner - Unified with ScheduleTab */}
      <div className="bg-[#FAFAFA] px-4 pt-6 pb-2 sticky top-0 z-20">
        <GamificationBanner />
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-4 pb-24 space-y-4">
         
         {/* Page Title - Styled to match ScheduleTab headers */}
         <div className="pl-1 mt-2">
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Tài khoản</h2>
            <p className="text-xs font-medium text-slate-500 mt-1">Hồ sơ sinh viên & thiết lập cá nhân</p>
         </div>

         {/* Welcome Card */}
         <div className="bg-white rounded-2xl p-4 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] border border-emerald-50 flex items-center justify-between">
            <div>
                <p className="text-xs font-bold text-gray-800 flex items-center mb-1">
                  <span className="mr-1">👋</span> Chào mừng {profileData.name}
                </p>
                <div className="flex items-center text-blue-500">
                  <Calendar size={10} className="mr-1" />
                  <p className="text-[10px] font-medium">Thứ 3, 20 Tháng 01</p>
                </div>
            </div>
            <span className="px-2 py-0.5 bg-pink-50 text-pink-500 text-[10px] font-bold rounded-full border border-pink-100">FTU ID</span>
         </div>

         {/* Student Info Card */}
         <div className="bg-white rounded-2xl p-4 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] border border-red-50 relative">
             <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-200/50 to-transparent rounded-t-2xl"></div>

            <div className="flex items-center mb-4">
                <div className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center mr-2">
                   <User size={12} className="text-pink-600" />
                </div>
                <h3 className="font-bold text-xs text-gray-800">Thông tin cá nhân</h3>
            </div>
            
            <div className="flex gap-4 mb-4">
                {/* Avatar Box */}
                <div className="w-20 h-24 bg-[#F0FDF9] rounded-xl flex flex-col items-center justify-center border border-emerald-100 shrink-0 overflow-hidden">
                   <img 
                     src="https://lh3.googleusercontent.com/pw/AP1GczNRWsNt0DfhGu6m4S9ONz6o2EIoU9uky3TkcCpqDkkZeBe5pN0ZpXjNY69_8npYJffbLQfZuBXI-lSoAFGC2yFxr8ClQFXNzbUZSg2pjTEeaW-8ti7LpQMNpiRVe_90R2U2k6ebeNbNReLoD3HPJQwq=w317-h353-s-no-gm?authuser=0" 
                     alt="Profile"
                     className="w-full h-full object-cover"
                   />
                </div>

                {/* Basic Info Grid */}
                <div className="flex-1 space-y-1.5">
                    <InfoRow label="Mã SV" value={profileData.studentId} />
                    <InfoRow label="Tên sinh viên" value={profileData.name} />
                    <InfoRow label="Ngày sinh" value={profileData.dob} />
                    <InfoRow label="Giới tính" value={profileData.gender} />
                    <InfoRow label="Trạng thái" value={profileData.status} />
                </div>
            </div>

            {/* Detailed Green Box */}
            <div className="bg-[#ECFDF5] rounded-xl p-3 border border-emerald-100 space-y-2 mb-4">
                <InfoRow label="Số điện thoại" value={profileData.phone} />
                <InfoRow label="Số CMND/CCCD" value={profileData.cccd} />
                <InfoRow label="Dân tộc" value={profileData.ethnicity} />
                <InfoRow label="Tôn giáo" value={profileData.religion} />
                <InfoRow label="Nơi sinh" value={profileData.birthPlace} />
            </div>
            
            {/* Additional Info */}
            <div className="space-y-2 pt-1 border-t border-gray-50">
                 <InfoRow label="Quốc tịch" value={profileData.nationality} />
                 <InfoRow label="Email 1" value={profileData.email1} />
                 <InfoRow label="Email 2" value={profileData.email2} />
                 <InfoRow label="Địa chỉ" value={profileData.address} alignTop />
            </div>
         </div>

         {/* Course Info Card */}
         <div className="bg-white rounded-2xl p-4 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] border border-red-50 relative">
             <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-200/50 to-transparent rounded-t-2xl"></div>

            <div className="flex items-center mb-4">
                <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center mr-2">
                   <GraduationCap size={12} className="text-orange-600" />
                </div>
                <h3 className="font-bold text-xs text-gray-800">Thông tin sinh viên</h3>
            </div>
            
            <div className="space-y-2 mb-2">
                <InfoRow label="Lớp" value={profileData.classId} />
                <InfoRow label="Ngành" value={profileData.major} alignTop />
                <InfoRow label="Khoa" value={profileData.faculty} />
                <InfoRow label="Bậc hệ đào tạo" value={profileData.level} />
                <InfoRow label="Niên khóa" value={profileData.period} />
            </div>
         </div>

         {/* Logout Button */}
         <div className="pt-2">
             <button 
               onClick={resetData}
               className="w-full py-3 bg-red-50 text-red-500 font-bold text-xs rounded-xl hover:bg-red-100 transition-colors border border-red-100 shadow-sm flex items-center justify-center gap-2"
             >
                <LogOut size={16} />
                Đăng xuất
             </button>
         </div>

      </div>
    </div>
  );
};

// Helper component for consistent row styling
const InfoRow: React.FC<{ label: string; value: string; alignTop?: boolean }> = ({ label, value, alignTop }) => (
  <div className={`grid grid-cols-[90px_1fr] ${alignTop ? 'items-start' : 'items-center'} gap-2`}>
    <span className={`text-[10px] text-gray-500 font-medium ${alignTop ? 'mt-0.5' : ''}`}>{label}:</span>
    <span className="text-[10px] font-bold text-gray-900 leading-snug">{value}</span>
  </div>
);

export default ProfileTab;