<template>
  <div class="page-wrapper">
    <div class="container">
      <!-- Loading State -->
      <div v-if="loading" class="state-card">
        <div class="loading-content">
          <div class="loading-spinner"></div>
          <p class="loading-text">Post yükleniyor...</p>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="state-card error-state">
        <div class="error-content">
          <svg class="error-icon" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
          </svg>
          <h3 class="error-title">Bir hata oluştu</h3>
          <p class="error-message">{{ error }}</p>
          <router-link to="/posts" class="error-back-button">
            <svg class="icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd"/>
            </svg>
            <span>Tüm Postlara Dön</span>
          </router-link>
        </div>
      </div>

      <!-- Post Content -->
      <article v-else class="post-article">
        <!-- Navigation Bar -->
        <nav class="nav-bar">
          <router-link to="/posts" class="back-button">
            <svg class="icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd"/>
            </svg>
            <span>Tüm Yazılar</span>
          </router-link>

          <!-- Admin Actions -->
          <div v-if="isAdmin" class="admin-actions">
            <button @click="editPost" class="action-button edit-button">
              <svg class="icon" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
              </svg>
              <span>Düzenle</span>
            </button>
            <button @click="deletePost" class="action-button delete-button">
              <svg class="icon" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"/>
              </svg>
              <span>Sil</span>
            </button>
          </div>
        </nav>

        <!-- Post Card -->
        <div class="post-card">
          <!-- Post Header -->
          <header class="post-header">
            <!-- Category Badge -->
            <div class="category-wrapper">
              <span class="category-badge">
                <svg class="badge-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"/>
                </svg>
                <span>{{ post.category.name }}</span>
              </span>
            </div>

            <!-- Title -->
            <h1 class="post-title">{{ post.title }}</h1>

            <!-- Meta Information -->
            <div class="post-meta">
              <div class="meta-item author-meta">
                <svg class="meta-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
                </svg>
                <span class="meta-text">{{ post.author.name }}</span>
              </div>
              <div class="meta-divider"></div>
              <div class="meta-item">
                <svg class="meta-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                  <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
                </svg>
                <span class="meta-text">{{ post.view_count }} görüntülenme</span>
              </div>
              <div class="meta-divider"></div>
              <div class="meta-item">
                <svg class="meta-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
                </svg>
                <span class="meta-text">{{ formatDate(post.created_at) }}</span>
              </div>
            </div>
          </header>

          <!-- Post Content -->
          <div class="post-content">
            <div class="content-text">{{ post.content }}</div>
          </div>

          <!-- Post Footer -->
          <footer class="post-footer">
            <div class="footer-info">
              <svg class="footer-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
              </svg>
              <p>Bu yazı {{ formatDate(post.created_at) }} tarihinde yayınlandı.</p>
            </div>
          </footer>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '../services/api';
import { useAuth } from '../composables/useAuth';

const route = useRoute();
const router = useRouter();
const { isAdmin } = useAuth();

const post = ref(null);
const loading = ref(true);
const error = ref(null);

const fetchPost = async () => {
  try {
    loading.value = true;
    const response = await api.getPostById(route.params.id);
    
    if (response.data.success) {
      post.value = response.data.data;
    } else {
      error.value = 'Post bulunamadı';
    }
  } catch (err) {
    console.error('Post fetch error:', err);
    if (err.response?.status === 404) {
      error.value = 'Aradığınız post bulunamadı';
    } else {
      error.value = 'Post yüklenirken bir hata oluştu';
    }
  } finally {
    loading.value = false;
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const editPost = () => {
  router.push(`/admin/edit-post/${route.params.id}`);
};

const deletePost = async () => {
  if (confirm(`"${post.value.title}" başlıklı postu silmek istediğinize emin misiniz?`)) {
    try {
      const response = await api.deletePost(route.params.id);
      
      if (response.data.success) {
        alert('Post başarıyla silindi!');
        router.push('/posts');
      } else {
        alert('Post silinemedi: ' + (response.data.message || 'Bilinmeyen hata'));
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Bir hata oluştu. Lütfen tekrar deneyin.');
    }
  }
};

onMounted(() => {
  fetchPost();
});
</script>

<style scoped>
/* Page Wrapper */
.page-wrapper {
  min-height: 100vh;
  background: linear-gradient(to bottom, #f8fafc 0%, #e2e8f0 100%);
  padding: 2rem 1rem;
}

.container {
  max-width: 900px;
  margin: 0 auto;
}

/* State Card (Loading & Error) */
.state-card {
  background: white;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  padding: 4rem 2rem;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* Loading State */
.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.loading-spinner {
  width: 48px;
  height: 48px;
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

/* Error State */
.error-state {
  background: #fef2f2;
  border-color: #fecaca;
}

.error-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.error-icon {
  width: 56px;
  height: 56px;
  color: #dc2626;
}

.error-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #991b1b;
  margin: 0;
}

.error-message {
  font-size: 1rem;
  color: #7f1d1d;
  margin: 0 0 1.5rem;
}

.error-back-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #dc2626;
  color: white;
  text-decoration: none;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.9375rem;
  transition: all 0.2s ease;
}

.error-back-button:hover {
  background: #b91c1c;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
}

.error-back-button .icon {
  width: 18px;
  height: 18px;
}

/* Navigation Bar */
.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  gap: 1rem;
  flex-wrap: wrap;
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

/* Admin Actions */
.admin-actions {
  display: flex;
  gap: 0.75rem;
}

.action-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  border: 1px solid;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-button .icon {
  width: 16px;
  height: 16px;
}

.edit-button {
  background: white;
  color: #3b82f6;
  border-color: #3b82f6;
}

.edit-button:hover {
  background: #3b82f6;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.delete-button {
  background: white;
  color: #dc2626;
  border-color: #dc2626;
}

.delete-button:hover {
  background: #dc2626;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
}

/* Post Card */
.post-card {
  background: white;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* Post Header */
.post-header {
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  padding: 3rem 3rem 2.5rem;
  color: white;
}

.category-wrapper {
  margin-bottom: 1.5rem;
}

.category-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(59, 130, 246, 0.15);
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  color: #60a5fa;
}

.badge-icon {
  width: 16px;
  height: 16px;
}

.post-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: white;
  margin: 0 0 2rem;
  line-height: 1.2;
  letter-spacing: -0.025em;
}

.post-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.meta-icon {
  width: 18px;
  height: 18px;
  color: #94a3b8;
}

.meta-text {
  font-size: 0.9375rem;
  color: #cbd5e1;
  font-weight: 500;
}

.author-meta .meta-text {
  color: #e0e7ff;
  font-weight: 600;
}

.meta-divider {
  width: 1px;
  height: 20px;
  background: #475569;
}

/* Post Content */
.post-content {
  padding: 3rem;
}

.content-text {
  font-size: 1.0625rem;
  line-height: 1.8;
  color: #1e293b;
  white-space: pre-wrap;
  word-wrap: break-word;
}

/* Post Footer */
.post-footer {
  padding: 1.5rem 3rem 2rem;
  background: #f8fafc;
  border-top: 1px solid #e2e8f0;
}

.footer-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.footer-icon {
  width: 18px;
  height: 18px;
  color: #3b82f6;
  flex-shrink: 0;
}

.footer-info p {
  margin: 0;
  font-size: 0.875rem;
  color: #64748b;
}

/* Responsive */
@media (max-width: 768px) {
  .page-wrapper {
    padding: 1rem 0.75rem;
  }

  .nav-bar {
    margin-bottom: 1rem;
  }

  .admin-actions {
    width: 100%;
    justify-content: flex-end;
  }

  .post-header {
    padding: 2rem 1.5rem;
  }

  .post-title {
    font-size: 1.75rem;
  }

  .post-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }

  .meta-divider {
    display: none;
  }

  .post-content {
    padding: 2rem 1.5rem;
  }

  .content-text {
    font-size: 1rem;
  }

  .post-footer {
    padding: 1.25rem 1.5rem;
  }
}
</style>