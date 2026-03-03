import React, { useState, useRef } from 'react';
import { useUser } from '../../context/UserContext';
import PersonalInfoSection from './components/PersonalInfoSection';
import SecuritySection from './components/SecuritySection';
import PrivacyCard from './components/PrivacyCard';

/**
 * AccountSettings Page
 * Restored to exact mockup specifications.
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
                alert('File size exceeds 800K limit.');
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
    };

    return (
        <div className="flex-1 overflow-y-auto px-4 md:px-8 pb-12">
            <div className="max-w-7xl mx-auto mt-8">
                {/* --- Page Header --- */}
                <header className="mb-8">
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Account Settings</h1>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Manage your profile details and privacy preferences.</p>
                </header>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    {/* --- Left Column: Profile & Security --- */}
                    <div className="xl:col-span-2 space-y-8">
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

                    {/* --- Right Column: Privacy & Data --- */}
                    <div className="xl:col-span-1 space-y-8">
                        <PrivacyCard />

                        {/* Data Management */}
                        <div className="bg-surface-light dark:bg-surface-dark rounded-lg shadow-sm border border-slate-100 dark:border-slate-800 p-6">
                            <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">Data Management</h3>
                            <div className="space-y-4">
                                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                    <span className="material-icons text-base">download</span>
                                    Download My Data
                                </button>
                                <div className="pt-2">
                                    <button className="w-full text-left text-xs text-red-500 hover:text-red-700 dark:hover:text-red-400 underline decoration-red-500/30 hover:decoration-red-500 transition-all">
                                        Delete my account permanently
                                    </button>
                                    <p className="text-[10px] text-slate-400 mt-1">This action cannot be undone.</p>
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
