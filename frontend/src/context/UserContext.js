import { createContext, useContext, useState, useEffect } from 'react';
import logger from '../shared/utils/logger';

const UserContext = createContext();

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error('useUser must be used within a UserProvider');
    return context;
};

// STORAGE_KEY: Fresh version (v4) to ensure no stale artifacts
const SESSION_KEY = 'MM_SESSION_V4';

const extractSessionFromUrl = () => {
    try {
        const params = new URLSearchParams(window.location.search);
        let token = params.get('session');
        if (!token) return null;

        /**
         * Normalize Base64 string from URL-safe format.
         * Django uses urlsafe_b64encode which replaces + and / with - and _.
         * We restore standard chars and add mandatory padding for atob() compatibility.
         */
        token = token.replace(/-/g, '+').replace(/_/g, '/');
        while (token.length % 4) token += '=';

        const decoded = JSON.parse(atob(token));

        // Sanitize the browser history by removing the session token.
        // This prevents the credentials from being bookmarked, leaked in history,
        // or re-parsed if the user performs a hard refresh.
        window.history.replaceState({}, document.title, window.location.pathname);
        return decoded;
    } catch {
        return null;
    }
};

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Run once on initial boot
        const freshFromUrl = extractSessionFromUrl();

        if (freshFromUrl) {
            setUser(freshFromUrl);
            localStorage.setItem(SESSION_KEY, JSON.stringify(freshFromUrl));
        } else {
            const saved = localStorage.getItem(SESSION_KEY);
            if (saved) {
                try {
                    setUser(JSON.parse(saved));
                } catch {
                    localStorage.removeItem(SESSION_KEY);
                }
            }
        }

        // PURGE ALL PREVIOUS VERSIONS FOREVER
        ['mindmate_user', 'mindmate_user_v2', 'mindmate_session_active', 'mindmate_v3_session'].forEach(k => {
            localStorage.removeItem(k);
        });

        setLoading(false);
    }, []);

    const logout = () => {
        logger.info("Logout initiated: Clearing all state and performing hard navigation.");

        // 1. ATOMIC PURGE: Nuke EVERYTHING in browser storage
        localStorage.clear();
        sessionStorage.clear();
        setUser(null);

        // 2. HARD REDIRECT: Bypass React router entirely.
        window.location.href = '/logout/';
    };

    const updateUser = (upd) => {
        setUser(prev => {
            const next = { ...prev, ...upd };
            localStorage.setItem(SESSION_KEY, JSON.stringify(next));
            return next;
        });
    };

    return (
        <UserContext.Provider value={{ user, loading, updateUser, logout }}>
            {children}
        </UserContext.Provider>
    );
};
