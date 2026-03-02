import React from 'react';

const PrivacyCard = () => (
    <div className="bg-[#FEF6F5] dark:bg-primary/5 rounded-2xl border border-primary/10 p-6">
        <div className="flex items-center gap-3 mb-4 text-primary">
            <span className="material-icons-round">verified_user</span>
            <h3 className="font-bold text-sm tracking-tight uppercase">Your Privacy Matters</h3>
        </div>
        <p className="text-xs text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            At MindMate, we understand that seeking help takes courage. Your mental health journey is private. Here is how we protect you:
        </p>

        <ul className="space-y-5">
            {[
                {
                    title: 'University Independence',
                    desc: 'We do not share your chat logs or session details with university administration.'
                },
                {
                    title: 'End-to-End Encryption',
                    desc: 'All messages and video calls are encrypted. Only you and your counselor have access.'
                },
                {
                    title: 'Anonymous Mode',
                    desc: 'You can choose to appear anonymous in community forums.'
                }
            ].map((item, idx) => (
                <li key={idx} className="flex gap-3">
                    <span className="material-icons-round text-green-500 text-sm mt-0.5">check_circle</span>
                    <div>
                        <p className="text-xs font-bold text-gray-900 dark:text-white">{item.title}</p>
                        <p className="text-[10px] text-gray-500 mt-0.5">{item.desc}</p>
                    </div>
                </li>
            ))}
        </ul>
    </div>
);

export default PrivacyCard;
