<template>
  <div class="page-wrapper">
    <div class="container">
      <!-- Header with Back Button -->
      <div class="header-nav">
        <router-link to="/posts" class="back-button">
          <svg class="icon" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd"/>
          </svg>
          <span>Geri Dön</span>
        </router-link>
      </div>

      <!-- Main Card -->
      <div class="post-card">
        <!-- Card Header -->
        <div class="card-header">
          <div class="header-content">
            <div class="icon-wrapper">
              <svg class="header-icon" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
              </svg>
            </div>
            <div class="header-text">
              <h1 class="title">Post Güncelle</h1>
              <p class="subtitle">Mevcut yazınızı düzenleyin</p>
            </div>
          </div>
        </div>

        <!-- Card Body -->
        <div class="card-body">
          <!-- Loading State -->
          <div v-if="loading && !formData.title" class="loading-state">
            <div class="loading-spinner"></div>
            <p class="loading-text">Post yükleniyor...</p>
          </div>

          <!-- Form Content -->
          <div v-else>
            <!-- Alerts -->
            <transition name="slide-fade">
              <div v-if="error" class="alert error-alert">
                <div class="alert-content">
                  <svg class="alert-icon" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
                  </svg>
                  <div class="alert-message">
                    <p class="alert-title">Hata</p>
                    <p class="alert-description">{{ error }}</p>
                  </div>
                </div>
              </div>
            </transition>

            <transition name="slide-fade">
              <div v-if="success" class="alert success-alert">
                <div class="alert-content">
                  <svg class="alert-icon" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  <div class="alert-message">
                    <p class="alert-title">Başarılı</p>
                    <p class="alert-description">{{ success }}</p>
                  </div>
                </div>
              </div>
            </transition>

            <!-- Form -->
            <form @submit.prevent="handleSubmit" class="form">
              <!-- Title Field -->
              <div class="field-group">
                <label class="field-label" for="title">
                  <span>Post Başlığı</span>
                  <span class="required-mark">*</span>
                </label>
                <div class="input-wrapper">
                  <input
                    type="text"
                    id="title"
                    v-model="formData.title"
                    class="field-input"
                    placeholder="Örn: Yapay Zeka ve Gelecek"
                    required
                  />
                </div>
              </div>

              <!-- Category Field -->
              <div class="field-group">
                <label class="field-label" for="category">
                  <span>Kategori</span>
                  <span class="required-mark">*</span>
                </label>
                <div class="select-wrapper">
                  <select
                    id="category"
                    v-model="formData.category_id"
                    class="field-select"
                    required
                  >
                    <option value="" disabled>Bir kategori seçin</option>
                    <option value="1">Teknoloji</option>
                    <option value="2">Hayat</option>
                    <option value="3">Araştırma</option>
                  </select>
                  <svg class="select-arrow" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
                  </svg>
                </div>
              </div>

              <!-- Content Field -->
              <div class="field-group">
                <div class="label-row">
                  <label class="field-label" for="content">
                    <span>İçerik</span>
                    <span class="required-mark">*</span>
                  </label>
                  <span class="character-count">
                    <span class="count-number">{{ contentLength }}</span>
                    <span class="count-text">karakter</span>
                  </span>
                </div>
                <div class="textarea-wrapper">
                  <textarea
                    id="content"
                    v-model="formData.content"
                    class="field-textarea"
                    placeholder="Postunuzun içeriğini buraya yazın..."
                    rows="14"
                    required
                  ></textarea>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="action-bar">
                <button
                  type="button"
                  @click="handleCancel"
                  class="button button-secondary"
                  :disabled="loading"
                >
                  <span>İptal Et</span>
                </button>
                <button
                  type="submit"
                  class="button button-primary"
                  :disabled="loading"
                >
                  <span v-if="loading" class="button-content">
                    <span class="spinner"></span>
                    <span>Kaydediliyor...</span>
                  </span>
                  <span v-else class="button-content">
                    <svg class="button-icon" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z"/>
                    </svg>
                    <span>Güncelle</span>
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Footer Info -->
      <div class="footer-info">
        <svg class="info-icon" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
        </svg>
        <p>Değişiklikleriniz kaydedildikten sonra hemen yayınlanacaktır.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '../services/api';

const router = useRouter();

const formData = ref({
  title: '',
  content: '',
  category_id: ''
});

const loading = ref(false);
const error = ref('');
const success = ref('');

const contentLength = computed(() => formData.value.content.length);

onMounted(async () => {
  loading.value = true;
  error.value = '';

  try {
    const postId = router.currentRoute.value.params.id;
    console.log('Fetching post with ID:', postId);
    const response = await api.getPostById(postId);

    const postData = response.data.data || response.data;

    if (postData) {
      formData.value = {
        title: postData.title,
        content: postData.content,
        category_id: postData.category_id || postData.category?.id
      };
    } else {
      error.value = 'Post bulunamadı';
    }
  } catch (err) {
    console.error('Post fetch error:', err);
    error.value = 'Post yüklenirken bir hata oluştu';
  } finally {
    loading.value = false;
  }
});

const handleSubmit = async () => {
  error.value = '';
  success.value = '';
  loading.value = true;

  try {
    const postId = router.currentRoute.value.params.id;
    const response = await api.updatePost(postId, {
      title: formData.value.title,
      content: formData.value.content,
      category_id: parseInt(formData.value.category_id)
    });

    if (response.data.success) {
      success.value = 'Post başarıyla güncellendi! Yönlendiriliyorsunuz...';

      setTimeout(() => {
        router.push(`/posts/${postId}`);
      }, 1500);
    } else {
      error.value = response.data.message || 'Post güncellenemedi';
    }
  } catch (err) {
    console.error('Update post error:', err);

    if (err.response?.status === 401 || err.response?.status === 403) {
      error.value = 'Oturum süreniz dolmuş. Lütfen tekrar giriş yapın.';
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } else if (err.response?.data?.message) {
      error.value = err.response.data.message;
    } else {
      error.value = 'Bir hata oluştu. Lütfen tekrar deneyin.';
    }
  } finally {
    loading.value = false;
  }
};

const handleCancel = () => {
  const postId = router.currentRoute.value.params.id;
  if (confirm('Değişiklikler kaydedilmedi. Çıkmak istediğinize emin misiniz?')) {
    router.push(`/posts/${postId}`);
  }
};
</script>

<style scoped>
/* Page Wrapper */
.page-wrapper {
  min-height: 100vh;
  background: linear-gradient(to bottom, #f8fafc 0%, #e2e8f0 100%);
  padding: 2rem 1rem;
}

.container {
  max-width: 800px;
  margin: 0 auto;
}

/* Header Navigation */
.header-nav {
  margin-bottom: 2rem;
}

.back-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  background: white;
  color: #475569;
  text-decoration: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  border: 1px solid #e2e8f0;
  transition: all 0.2s ease;
}

.back-button:hover {
  background: #f8fafc;
  border-color: #cbd5e1;
  color: #1e293b;
  transform: translateX(-4px);
}

.back-button .icon {
  width: 18px;
  height: 18px;
}

/* Main Card */
.post-card {
  background: white;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

/* Card Header */
.card-header {
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  padding: 2rem;
  border-bottom: 1px solid #334155;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.icon-wrapper {
  flex-shrink: 0;
  width: 56px;
  height: 56px;
  background: rgba(59, 130, 246, 0.1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(59, 130, 246, 0.2);
}

.header-icon {
  width: 28px;
  height: 28px;
  color: #3b82f6;
}

.header-text {
  flex: 1;
}

.title {
  font-size: 1.75rem;
  font-weight: 700;
  color: white;
  margin: 0 0 0.25rem;
  letter-spacing: -0.02em;
}

.subtitle {
  font-size: 0.9375rem;
  color: #94a3b8;
  margin: 0;
  font-weight: 400;
}

/* Card Body */
.card-body {
  padding: 2rem;
}

/* Loading State */
.loading-state {
  text-align: center;
  padding: 3rem;
}

.loading-spinner {
  width: 48px;
  height: 48px;
  margin: 0 auto 1.5rem;
  border: 4px solid #e2e8f0;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-text {
  font-size: 1.125rem;
  color: #64748b;
  font-weight: 500;
  margin: 0;
}

/* Alerts */
.alert {
  padding: 1rem 1.25rem;
  border-radius: 10px;
  margin-bottom: 1.5rem;
  border: 1px solid;
}

.alert-content {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.alert-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  margin-top: 2px;
}

.alert-message {
  flex: 1;
}

.alert-title {
  font-weight: 600;
  font-size: 0.875rem;
  margin: 0 0 0.25rem;
}

.alert-description {
  font-size: 0.875rem;
  margin: 0;
  line-height: 1.5;
}

.error-alert {
  background: #fef2f2;
  border-color: #fecaca;
}

.error-alert .alert-icon {
  color: #dc2626;
}

.error-alert .alert-title {
  color: #991b1b;
}

.error-alert .alert-description {
  color: #7f1d1d;
}

.success-alert {
  background: #f0fdf4;
  border-color: #bbf7d0;
}

.success-alert .alert-icon {
  color: #16a34a;
}

.success-alert .alert-title {
  color: #166534;
}

.success-alert .alert-description {
  color: #14532d;
}

/* Form */
.form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.label-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.field-label {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #1e293b;
  letter-spacing: 0.01em;
}

.required-mark {
  color: #dc2626;
  font-weight: 700;
}

.character-count {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
  font-size: 0.75rem;
}

.count-number {
  font-weight: 600;
  color: #3b82f6;
}

.count-text {
  color: #94a3b8;
}

/* Input Styles */
.input-wrapper,
.select-wrapper,
.textarea-wrapper {
  position: relative;
}

.field-input,
.field-select,
.field-textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 0.9375rem;
  color: #1e293b;
  font-family: inherit;
  transition: all 0.2s ease;
}

.field-input:focus,
.field-select:focus,
.field-textarea:focus {
  outline: none;
  background: white;
  border-color: #3b82f6;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
}

.field-input::placeholder,
.field-textarea::placeholder {
  color: #94a3b8;
}

.field-select {
  appearance: none;
  cursor: pointer;
  padding-right: 2.5rem;
}

.select-arrow {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: #64748b;
  pointer-events: none;
}

.field-textarea {
  resize: vertical;
  min-height: 280px;
  line-height: 1.6;
}

/* Action Bar */
.action-bar {
  display: flex;
  gap: 1rem;
  padding-top: 1.5rem;
  margin-top: 0.5rem;
  border-top: 2px solid #f1f5f9;
}

/* Buttons */
.button {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.875rem 1.5rem;
  border: none;
  border-radius: 10px;
  font-size: 0.9375rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
}

.button-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.button-icon {
  width: 18px;
  height: 18px;
}

.button-secondary {
  background: #f1f5f9;
  color: #475569;
  border: 1px solid #e2e8f0;
}

.button-secondary:hover:not(:disabled) {
  background: #e2e8f0;
  border-color: #cbd5e1;
}

.button-primary {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.button-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(59, 130, 246, 0.4);
}

.button-primary:active:not(:disabled) {
  transform: translateY(0);
}

/* Spinner */
.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

/* Footer Info */
.footer-info {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-top: 1.5rem;
  padding: 1rem 1.25rem;
  background: white;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
}

.info-icon {
  width: 18px;
  height: 18px;
  color: #3b82f6;
  flex-shrink: 0;
  margin-top: 2px;
}

.footer-info p {
  margin: 0;
  font-size: 0.8125rem;
  color: #64748b;
  line-height: 1.5;
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
  .page-wrapper {
    padding: 1rem 0.75rem;
  }

  .card-header {
    padding: 1.5rem;
  }

  .header-content {
    gap: 1rem;
  }

  .icon-wrapper {
    width: 48px;
    height: 48px;
  }

  .header-icon {
    width: 24px;
    height: 24px;
  }

  .title {
    font-size: 1.5rem;
  }

  .subtitle {
    font-size: 0.875rem;
  }

  .card-body {
    padding: 1.5rem;
  }

  .action-bar {
    flex-direction: column-reverse;
  }

  .button {
    width: 100%;
  }
}
</style>