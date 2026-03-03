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
        <div className="flex-1 overflow-y-auto px-6 md:px-12 pb-16 bg-background-light">
            <div className="max-w-7xl mx-auto pt-12">
                {/* --- Page Header --- */}
                <header className="mb-16">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-4">Your Account</p>
                    <h1 className="text-4xl font-black text-text-main dark:text-white tracking-tight">Account Settings</h1>
                    <p className="mt-2 text-neutral-warm font-medium">Manage your profile details, security, and privacy preferences.</p>
                </header>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
                    {/* --- Left Column: Profile & Security --- */}
                    <div className="xl:col-span-2 space-y-12">
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
                    <div className="xl:col-span-1 space-y-10">
                        <PrivacyCard />

                        {/* Data Management */}
                        <div className="bg-white dark:bg-surface-dark rounded-[2.5rem] shadow-premium border border-gray-50 dark:border-slate-800 p-10">
                            <h3 className="text-[11px] font-black text-text-main dark:text-white uppercase tracking-[0.25em] mb-8">Data Management</h3>
                            <div className="space-y-6">
                                <button className="w-full flex items-center justify-center gap-3 px-6 py-4 border border-gray-100 dark:border-slate-600 rounded-2xl text-[11px] font-black uppercase tracking-widest text-neutral-warm dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-text-main transition-all">
                                    <span className="material-icons-outlined text-base">download</span>
                                    Export My Data
                                </button>
                                <div className="pt-4 border-t border-gray-50">
                                    <button className="w-full text-left text-[11px] font-black text-secondary/60 hover:text-secondary dark:hover:text-secondary underline decoration-secondary/20 hover:decoration-secondary transition-all uppercase tracking-widest">
                                        Delete Account Permanently
                                    </button>
                                    <p className="text-[10px] text-neutral-warm/40 mt-2 uppercase tracking-widest font-black">This action is irreversible.</p>
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
