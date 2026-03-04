import { memo } from 'react';
import { Card, Button } from '../../../shared/components';

/**
 * PersonalInfoSection Component
 * Restored to exact mockup specifications.
 */
const PersonalInfoSection = memo(({
    user,
    fullName,
    phone,
    campus,
    setFullName,
    setPhone,
    setCampus,
    handleProfilePicChange,
    fileInputRef,
    handleSaveChanges
}) => (
    <Card padding="sm" className="rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-slate-900 dark:text-white flex items-center gap-2">
                <span className="material-icons text-primary text-xl">person</span>
                Personal Information
            </h2>
        </div>

        {/* Avatar Section */}
        <div className="flex items-center gap-6 mb-8">
            <div className="relative group">
                <div className="h-24 w-24 rounded-full overflow-hidden ring-4 ring-primary/10 bg-slate-100 dark:bg-slate-800">
                    <img
                        src={user.profilePic || `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName || 'U')}&background=E2725B&color=fff`}
                        alt="Profile"
                        className="h-full w-full object-cover"
                    />
                </div>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleProfilePicChange}
                    accept="image/*"
                    className="hidden"
                    aria-label="Upload profile photo"
                />
                <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className="absolute bottom-0 right-0 bg-primary hover:bg-primary-dark text-white p-1.5 rounded-full shadow-lg transition-colors border-2 border-white dark:border-surface-dark"
                    aria-label="Change profile photo"
                >
                    <span className="material-icons text-sm">edit</span>
                </button>
            </div>
            <div>
                <h3 className="font-medium text-slate-900 dark:text-white">Profile Photo</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Accepts JPG, GIF or PNG. Max size of 800K.</p>
            </div>
        </div>

        <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1" htmlFor="fullName">Full Name</label>
                    <input
                        className="block w-full rounded-lg border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2.5 border"
                        id="fullName"
                        name="fullName"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1" htmlFor="email">University Email</label>
                    <input
                        className="block w-full rounded-lg border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2.5 border cursor-not-allowed"
                        id="email"
                        name="email"
                        readOnly
                        type="email"
                        value={user.email}
                    />
                    <p className="mt-1 text-xs text-slate-400">Contact admin to change email.</p>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1" htmlFor="phone">Phone Number (Optional)</label>
                    <input
                        className="block w-full rounded-lg border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2.5 border"
                        id="phone"
                        name="phone"
                        placeholder="+254 700 000000"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1" htmlFor="university">Campus / University</label>
                    <select
                        className="block w-full rounded-lg border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2.5 border"
                        id="university"
                        name="university"
                        value={campus}
                        onChange={(e) => setCampus(e.target.value)}
                    >
                        <option>University of Nairobi</option>
                        <option>Kenyatta University</option>
                        <option>Strathmore University</option>
                        <option>JKUAT</option>
                        <option>USIU Africa</option>
                    </select>
                </div>
            </div>
            <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
                <Button type="button" onClick={handleSaveChanges} size="sm">
                    Save Changes
                </Button>
            </div>
        </form>
    </Card>
));

PersonalInfoSection.displayName = 'PersonalInfoSection';

export default PersonalInfoSection;


