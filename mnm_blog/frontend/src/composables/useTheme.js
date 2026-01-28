import { ref, watch, onMounted } from 'vue';

const isDark = ref(false);

export function useTheme() {
    // LocalStorage'dan tema tercihini oku
    const initTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            isDark.value = savedTheme === 'dark';
        } else {
            // Sistem tercihini kontrol et
            isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        applyTheme();
    };

    // Temayı DOM'a uygula
    const applyTheme = () => {
        if (isDark.value) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    // Tema değiştiğinde localStorage'a kaydet ve DOM'u güncelle
    watch(isDark, (newValue) => {
        localStorage.setItem('theme', newValue ? 'dark' : 'light');
        applyTheme();
    });

    // Temayı değiştir
    const toggleTheme = () => {
        isDark.value = !isDark.value;
    };

    return {
        isDark,
        toggleTheme,
        initTheme
    };
}