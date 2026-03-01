import React, { useState, useRef } from 'react';
import { useUser } from '../../context/UserContext';

const AccountSettings = () => {
    const { user, updateUser, updateProfilePic } = useUser();
    const [fullName, setFullName] = useState(user.fullName);
    const [phone, setPhone] = useState(user.phone);
    const [campus, setCampus] = useState(user.campus);
    const fileInputRef = useRef(null);

    const handleProfilePicChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 800 * 1024) {
                alert('File size too large. Max 800KB.');
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                updateProfilePic(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveChanges = () => {
        updateUser({ fullName, phone, campus });
        alert('Changes saved successfully!');
    };

    return (
        <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-background-light dark:bg-background-dark min-h-full">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <header className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Account Settings</h1>
                    <p className="text-gray-500 dark:text-gray-400">Manage your profile details and privacy preferences.</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Personal Information */}
                        <section className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
                            <div className="flex items-center gap-2 mb-6">
                                <span className="material-icons-outlined text-primary">person</span>
                                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Personal Information</h2>
                            </div>

                            <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
                                <div className="relative">
                                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-sm bg-gray-100 dark:bg-gray-700">
                                        <img
                                            src={user.profilePic}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleProfilePicChange}
                                        accept="image/*"
                                        className="hidden"
                                    />
                                    <button
                                        onClick={() => fileInputRef.current.click()}
                                        className="absolute bottom-0 right-0 p-1.5 bg-primary text-white rounded-full shadow-lg hover:bg-primary-dark transition-colors border-2 border-white dark:border-gray-800"
                                    >
                                        <span className="material-icons-outlined text-xs">edit</span>
                                    </button>
                                </div>
                                <div className="text-center md:text-left">
                                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Profile Photo</h3>
                                    <p className="text-xs text-gray-500">Accepts JPG, GIF or PNG. Max size of 800K.</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Full Name</label>
                                    <input
                                        type="text"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">University Email</label>
                                    <input
                                        type="email"
                                        value={user.email}
                                        disabled
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 text-gray-400 cursor-not-allowed italic"
                                    />
                                    <p className="text-[10px] text-gray-400 mt-1">Contact admin to change email.</p>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Phone Number (Optional)</label>
                                    <input
                                        type="text"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Campus / University</label>
                                    <select
                                        value={campus}
                                        onChange={(e) => setCampus(e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                    >
                                        <option>University of Nairobi</option>
                                        <option>Kenyatta University</option>
                                        <option>Strathmore University</option>
                                        <option>Jomo Kenyatta University</option>
                                        <option>Maseno University</option>
                                        <option>Masinde Muliro University of Science and Technology</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <button
                                    onClick={handleSaveChanges}
                                    className="px-6 py-2.5 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark shadow-sm transition-all transform hover:scale-[1.02]"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </section>

                        {/* Password & Security */}
                        <section className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
                            <div className="flex items-center gap-2 mb-6">
                                <span className="material-icons-outlined text-primary">lock</span>
                                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Password & Security</h2>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-1.5 max-w-md">
                                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Current Password</label>
                                    <input
                                        type="password"
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">New Password</label>
                                        <input
                                            type="password"
                                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Confirm New Password</label>
                                        <input
                                            type="password"
                                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                        />
                                    </div>
                                </div>
                                <button className="text-sm font-bold text-primary hover:text-primary-dark transition-colors">
                                    Update Password
                                </button>
                            </div>
                        </section>
                    </div>

                    {/* Sidebar / Right Column */}
                    <div className="space-y-6">
                        {/* Privacy Card */}
                        <div className="bg-[#FEF6F5] dark:bg-primary/5 rounded-2xl border border-primary/10 p-6">
                            <div className="flex items-center gap-3 mb-4 text-primary">
                                <span className="material-icons-outlined">verified_user</span>
                                <h3 className="font-bold">Your Privacy Matters</h3>
                            </div>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                                At MindMate, we understand that seeking help takes courage. Your mental health journey is private. Here is how we protect you:
                            </p>

                            <ul className="space-y-5">
                                <li className="flex gap-3">
                                    <span className="material-icons text-green-500 text-sm mt-0.5">check_circle</span>
                                    <div>
                                        <p className="text-xs font-bold text-gray-900 dark:text-white">University Independence</p>
                                        <p className="text-[10px] text-gray-500 mt-0.5">We do not share your chat logs or session details with university administration.</p>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="material-icons text-green-500 text-sm mt-0.5">check_circle</span>
                                    <div>
                                        <p className="text-xs font-bold text-gray-900 dark:text-white">End-to-End Encryption</p>
                                        <p className="text-[10px] text-gray-500 mt-0.5">All messages and video calls are encrypted. Only you and your counselor have access.</p>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="material-icons text-green-500 text-sm mt-0.5">check_circle</span>
                                    <div>
                                        <p className="text-xs font-bold text-gray-900 dark:text-white">Anonymous Mode</p>
                                        <p className="text-[10px] text-gray-500 mt-0.5">You can choose to appear anonymous in community forums.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {/* Navigation Links */}
                        <div className="space-y-2">
                            <button className="w-full flex items-center justify-between p-4 bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm">
                                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Privacy Policy</span>
                                <span className="material-icons-outlined text-gray-400 text-sm">arrow_forward</span>
                            </button>
                            <button className="w-full flex items-center justify-between p-4 bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm">
                                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Terms of Service</span>
                                <span className="material-icons-outlined text-gray-400 text-sm">arrow_forward</span>
                            </button>
                        </div>

                        {/* Data Management */}
                        <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Data Management</h3>
                            <div className="space-y-4">
                                <button className="w-full flex items-center justify-center gap-2 py-3 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                    <span className="material-icons-outlined text-gray-600 dark:text-gray-400 text-sm">download</span>
                                    <span className="text-sm font-bold text-gray-700 dark:text-gray-300">Download My Data</span>
                                </button>

                                <div className="pt-2">
                                    <button className="text-[11px] font-bold text-primary hover:underline transition-all">
                                        Delete my account permanently
                                    </button>
                                    <p className="text-[9px] text-gray-400 mt-1">This action cannot be undone.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountSettings;
