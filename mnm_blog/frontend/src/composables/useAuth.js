import { ref, computed } from 'vue';

export function useAuth() {
    const isAuthenticated = computed(() => {
        return !!localStorage.getItem('token');
    });

    const user = computed(() => {
        const userData = localStorage.getItem('user');
        return userData ? JSON.parse(userData) : null;
    });

    const isAdmin = computed(() => {
        return user.value?.role === 'admin';
    });

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    return {
        isAuthenticated,
        user,
        isAdmin,
        logout
    };
}