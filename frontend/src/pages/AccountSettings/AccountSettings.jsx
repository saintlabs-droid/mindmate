import { useState, useRef, useCallback } from 'react';
import { useUser } from '../../context/UserContext';
import PersonalInfoSection from './components/PersonalInfoSection';
import SecuritySection from './components/SecuritySection';
import PrivacyCard from './components/PrivacyCard';
import { Card, Button } from '../../shared/components';

/**
 * AccountSettings Page
 * Clean design matching Landing page aesthetic.
 */
const AccountSettings = () => {
    const { user, updateUser, updateProfilePic } = useUser();
    const [fullName, setFullName] = useState(user.fullName);
    const [phone, setPhone] = useState(user.phone);
    const [campus, setCampus] = useState(user.campus);
    const fileInputRef = useRef(null);

    const handleProfilePicChange = useCallback((e) => {
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
    }, [updateProfilePic]);

    const handleSaveChanges = useCallback(() => {
        updateUser({ fullName, phone, campus });
    }, [updateUser, fullName, phone, campus]);

    return (
        <div className="flex-1 overflow-y-auto px-6 md:px-12 pb-16 bg-background-light">
            <div className="max-w-7xl mx-auto pt-8">
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    {/* Left Column */}
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

                    {/* Right Column */}
                    <div className="xl:col-span-1 space-y-8">
                        <PrivacyCard />

                        {/* Data Management */}
                        <Card>
                            <h3 className="text-sm font-medium text-text-main mb-6">Data Management</h3>
                            <div className="space-y-4">
                                <Button variant="outline" fullWidth icon="download" iconPosition="left">
                                    Export My Data
                                </Button>
                                <div className="pt-4 border-t border-gray-100">
                                    <Button variant="danger" fullWidth>
                                        Delete Account
                                    </Button>
                                    <p className="text-xs text-gray-400 mt-2">This action is irreversible.</p>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountSettings;
