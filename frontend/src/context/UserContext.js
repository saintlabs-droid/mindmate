import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('mindmate_user');
        return savedUser ? JSON.parse(savedUser) : {
            fullName: 'Richard Ochieng',
            email: 'sitb01-029042022@student.mmust.ac.ke',
            phone: '+254 7xx xxx xxx',
            campus: 'Masinde Muliro University of Science and Technology',
            profilePic: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200'
        };
    });

    useEffect(() => {
        localStorage.setItem('mindmate_user', JSON.stringify(user));
    }, [user]);

    const updateUser = (updates) => {
        setUser(prev => ({ ...prev, ...updates }));
    };

    const updateProfilePic = (url) => {
        setUser(prev => ({ ...prev, profilePic: url }));
    };

    return (
        <UserContext.Provider value={{ user, updateUser, updateProfilePic }}>
            {children}
        </UserContext.Provider>
    );
};
