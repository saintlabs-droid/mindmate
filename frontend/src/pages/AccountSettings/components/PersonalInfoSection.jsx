import React from 'react';

const PersonalInfoSection = ({ user, fullName, phone, campus, setFullName, setPhone, setCampus, handleProfilePicChange, fileInputRef, handleSaveChanges }) => (
    <section className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
        <div className="flex items-center gap-2 mb-6">
            <span className="material-icons-round text-primary">person</span>
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
                    <span className="material-icons-round text-xs">edit</span>
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
);

export default PersonalInfoSection;
