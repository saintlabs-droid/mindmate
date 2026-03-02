import React, { useState, useRef } from 'react';
import { useUser } from '../../context/UserContext';
import PersonalInfoSection from './components/PersonalInfoSection';
import SecuritySection from './components/SecuritySection';
import PrivacyCard from './components/PrivacyCard';

/**
 * AccountSettings Page
 * Allows users to manage their profile, password, and data preferences.
 */
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
                <header className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Account Settings</h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Manage your profile details and privacy preferences.</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Settings Area */}
                    <div className="lg:col-span-2 space-y-8">
                        <PersonalInfoSection
                            user={user}
                            fullName={fullName}
                            phone={phone}
                            campus={campus}
                            setFullName={setFullName}
                            setPhone={setPhone}
                            setCampus={setCampus}
                            handleProfilePicChange={handleProfilePicChange}
                            fileInputRef={fileInputRef}
                            handleSaveChanges={handleSaveChanges}
                        />

                        <SecuritySection />
                    </div>

                    {/* Secondary Information Area */}
                    <div className="space-y-6">
                        <PrivacyCard />

                        <div className="space-y-2">
                            <button className="w-full flex items-center justify-between p-4 bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
                                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Privacy Policy</span>
                                <span className="material-icons-round text-gray-400 text-sm">arrow_forward</span>
                            </button>
                            <button className="w-full flex items-center justify-between p-4 bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
                                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Terms of Service</span>
                                <span className="material-icons-round text-gray-400 text-sm">arrow_forward</span>
                            </button>
                        </div>

                        {/* Data Management Section */}
                        <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
                            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Data Management</h3>
                            <div className="space-y-4">
                                <button className="w-full flex items-center justify-center gap-2 py-3 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20">
                                    <span className="material-icons-round text-gray-600 dark:text-gray-400 text-sm">download</span>
                                    <span className="text-sm font-bold text-gray-700 dark:text-gray-300">Download My Data</span>
                                </button>

                                <div className="pt-2">
                                    <button className="text-[11px] font-bold text-primary hover:text-primary-dark transition-all">
                                        Delete my account permanently
                                    </button>
                                    <p className="text-[9px] text-gray-400 mt-1 uppercase tracking-tight font-medium">This action cannot be undone.</p>
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
