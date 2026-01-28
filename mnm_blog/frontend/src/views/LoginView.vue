<template>
  <div class="page-wrapper">
    <div class="login-container">
      <!-- Login Card -->
      <div class="login-card">
        <!-- Card Header -->
        <div class="card-header">
          <div class="logo-wrapper">
            <svg class="logo-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"/>
            </svg>
          </div>
          <h1 class="title">Admin Girişi</h1>
          <p class="subtitle">Blog yönetim paneline hoş geldiniz</p>
        </div>

        <!-- Card Body -->
        <div class="card-body">
          <!-- Alerts -->
          <transition name="slide-fade">
            <div v-if="error" class="alert error-alert">
              <div class="alert-content">
                <svg class="alert-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
                </svg>
                <p class="alert-message">{{ error }}</p>
              </div>
            </div>
          </transition>

          <transition name="slide-fade">
            <div v-if="success" class="alert success-alert">
              <div class="alert-content">
                <svg class="alert-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <p class="alert-message">{{ success }}</p>
              </div>
            </div>
          </transition>

          <!-- Login Form -->
          <form @submit.prevent="handleLogin" class="login-form">
            <!-- Email Field -->
            <div class="field-group">
              <label class="field-label" for="email">Email Adresi</label>
              <div class="input-wrapper">
                <svg class="input-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
                <input
                  type="email"
                  id="email"
                  v-model="formData.email"
                  class="field-input"
                  placeholder="admin@example.com"
                  required
                  autocomplete="email"
                />
              </div>
            </div>

            <!-- Password Field -->
            <div class="field-group">
              <label class="field-label" for="password">Şifre</label>
              <div class="input-wrapper">
                <svg class="input-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/>
                </svg>
                <input
                  type="password"
                  id="password"
                  v-model="formData.password"
                  class="field-input"
                  placeholder="••••••••"
                  required
                  autocomplete="current-password"
                />
              </div>
            </div>

            <!-- Submit Button -->
            <button type="submit" class="login-button" :disabled="loading">
              <span v-if="loading" class="button-content">
                <span class="spinner"></span>
                <span>Giriş yapılıyor...</span>
              </span>
              <span v-else class="button-content">
                <svg class="button-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                <span>Giriş Yap</span>
              </span>
            </button>
          </form>
        </div>

        <!-- Card Footer -->
        <div class="card-footer">
          <router-link to="/posts" class="footer-link">
            <svg class="link-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd"/>
            </svg>
            <span>Blog yazılarına dön</span>
          </router-link>
        </div>
      </div>

      <!-- Decorative Elements -->
      <div class="decorative-circle circle-1"></div>
      <div class="decorative-circle circle-2"></div>
      <div class="decorative-circle circle-3"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '../services/api';

const router = useRouter();

const formData = ref({
  email: '',
  password: ''
});

const loading = ref(false);
const error = ref('');
const success = ref('');

const handleLogin = async () => {
  error.value = '';
  success.value = '';
  loading.value = true;

  try {
    const response = await api.login(formData.value);

    if (response.data.success) {
      success.value = 'Giriş başarılı! Yönlendiriliyorsunuz...';

      // Token'ı localStorage'a kaydet
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));

      // Admin paneline yönlendir (şimdilik posts'a)
      setTimeout(() => {
        router.push('/posts');
      }, 1000);
    } else {
      error.value = response.data.message || 'Giriş başarısız';
    }
  } catch (err) {
    console.error('Login error:', err);
    
    if (err.response?.status === 401) {
      error.value = 'Email veya şifre hatalı';
    } else if (err.response?.data?.message) {
      error.value = err.response.data.message;
    } else {
      error.value = 'Bir hata oluştu. Lütfen tekrar deneyin.';
    }
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* Page Wrapper */
.page-wrapper {
  min-height: 100vh;
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  position: relative;
  overflow: hidden;
}

.login-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 1rem;
  position: relative;
  z-index: 1;
}

/* Decorative Circles */
.decorative-circle {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%);
  pointer-events: none;
}

.circle-1 {
  width: 600px;
  height: 600px;
  top: -300px;
  right: -200px;
}

.circle-2 {
  width: 400px;
  height: 400px;
  bottom: -150px;
  left: -100px;
}

.circle-3 {
  width: 300px;
  height: 300px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.5;
}

/* Login Card */
.login-card {
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 440px;
  overflow: hidden;
  animation: slideUp 0.5s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Card Header */
.card-header {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  padding: 2.5rem 2rem;
  text-align: center;
  position: relative;
}

.logo-wrapper {
  width: 64px;
  height: 64px;
  margin: 0 auto 1.5rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
}

.logo-icon {
  width: 36px;
  height: 36px;
  color: white;
}

.title {
  font-size: 2rem;
  font-weight: 800;
  color: white;
  margin: 0 0 0.5rem;
  letter-spacing: -0.02em;
}

.subtitle {
  font-size: 0.9375rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  font-weight: 400;
}

/* Card Body */
.card-body {
  padding: 2rem;
}

/* Alerts */
.alert {
  padding: 1rem;
  border-radius: 10px;
  margin-bottom: 1.5rem;
  border: 1px solid;
}

.alert-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.alert-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.alert-message {
  font-size: 0.875rem;
  margin: 0;
  font-weight: 500;
}

.error-alert {
  background: #fef2f2;
  border-color: #fecaca;
  color: #991b1b;
}

.error-alert .alert-icon {
  color: #dc2626;
}

.success-alert {
  background: #f0fdf4;
  border-color: #bbf7d0;
  color: #166534;
}

.success-alert .alert-icon {
  color: #16a34a;
}

/* Form */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.field-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1e293b;
  letter-spacing: 0.01em;
}

.input-wrapper {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: #94a3b8;
  pointer-events: none;
}

.field-input {
  width: 100%;
  padding: 0.875rem 1rem 0.875rem 3rem;
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 0.9375rem;
  color: #1e293b;
  transition: all 0.2s ease;
}

.field-input:focus {
  outline: none;
  background: white;
  border-color: #3b82f6;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
}

.field-input::placeholder {
  color: #94a3b8;
}

/* Login Button */
.login-button {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  margin-top: 0.5rem;
}

.login-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(59, 130, 246, 0.4);
}

.login-button:active:not(:disabled) {
  transform: translateY(0);
}

.login-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.button-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.button-icon {
  width: 20px;
  height: 20px;
}

/* Spinner */
.spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Card Footer */
.card-footer {
  padding: 1.5rem 2rem 2rem;
  background: #f8fafc;
  border-top: 1px solid #e2e8f0;
}

.footer-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #3b82f6;
  text-decoration: none;
  font-size: 0.9375rem;
  font-weight: 600;
  transition: all 0.2s ease;
}

.footer-link:hover {
  color: #2563eb;
  gap: 0.75rem;
}

.link-icon {
  width: 18px;
  height: 18px;
}

/* Animations */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.2s ease;
}

.slide-fade-enter-from {
  transform: translateY(-10px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateY(10px);
  opacity: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .login-container {
    padding: 1.5rem 1rem;
  }

  .card-header {
    padding: 2rem 1.5rem;
  }

  .logo-wrapper {
    width: 56px;
    height: 56px;
  }

  .logo-icon {
    width: 32px;
    height: 32px;
  }

  .title {
    font-size: 1.75rem;
  }

  .card-body {
    padding: 1.5rem;
  }

  .card-footer {
    padding: 1.25rem 1.5rem;
  }

  .circle-1,
  .circle-2 {
    opacity: 0.5;
  }
}
</style>