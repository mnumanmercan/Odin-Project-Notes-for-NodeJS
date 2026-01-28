<template>
  <div class="page-wrapper">
    <div class="container">
      <!-- Page Header -->
      <header class="page-header">
        <div class="header-content">
          <div class="title-section">
            <h1 class="page-title">Blog Yazıları</h1>
            <p class="page-subtitle">Teknoloji, hayat ve araştırma üzerine yazılar</p>
          </div>

          <!-- Admin Actions -->
          <div v-if="isAdmin" class="admin-toolbar">
            <router-link to="/admin/create-post" class="toolbar-button create-button">
              <svg class="button-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
              </svg>
              <span>Yeni Post</span>
            </router-link>
            <button @click="handleLogout" class="toolbar-button logout-button">
              <svg class="button-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd"/>
              </svg>
              <span>Çıkış Yap</span>
            </button>
          </div>
        </div>
      </header>

      <!-- Loading State -->
      <div v-if="loading" class="state-container">
        <div class="loading-card">
          <div class="loading-spinner"></div>
          <p class="loading-text">Postlar yükleniyor...</p>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="state-container">
        <div class="error-card">
          <svg class="error-icon" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
          </svg>
          <h3 class="error-title">Bir hata oluştu</h3>
          <p class="error-message">{{ error }}</p>
          <button @click="fetchPosts" class="retry-button">
            <svg class="button-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd"/>
            </svg>
            <span>Tekrar Dene</span>
          </button>
        </div>
      </div>

      <!-- Posts Grid -->
      <div v-else>
        <!-- Posts Count -->
        <div class="posts-info">
          <div class="info-badge">
            <svg class="info-icon" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
              <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd"/>
            </svg>
            <span>{{ posts.length }} yazı bulundu</span>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="posts.length === 0" class="empty-state">
          <svg class="empty-icon" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd"/>
          </svg>
          <h3 class="empty-title">Henüz post yok</h3>
          <p class="empty-message">İlk postu oluşturmak için "Yeni Post" butonuna tıklayın.</p>
        </div>

        <!-- Posts Grid -->
        <div v-else class="posts-grid">
          <PostCard 
            v-for="post in posts" 
            :key="post.id" 
            :post="post"
            :is-admin="isAdmin"
            @delete="handleDeletePost"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '../services/api';
import PostCard from '../components/PostCard.vue';
import { useAuth } from '../composables/useAuth';

const router = useRouter();
const { isAdmin, logout } = useAuth();

const posts = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchPosts = async () => {
  try {
    loading.value = true;
    error.value = null;
    const response = await api.getPosts();
    
    if (response.data.success) {
      posts.value = response.data.data;
    } else {
      error.value = 'Postlar yüklenemedi';
    }
  } catch (err) {
    console.error('Posts fetch error:', err);
    error.value = 'Postlar yüklenirken bir hata oluştu';
  } finally {
    loading.value = false;
  }
};

const handleLogout = () => {
  if (confirm('Çıkış yapmak istediğinize emin misiniz?')) {
    logout();
    router.push('/posts');
    window.location.reload();
  }
};

const handleDeletePost = async (postId) => {
  try {
    const response = await api.deletePost(postId);
    
    if (response.data.success) {
      posts.value = posts.value.filter(post => post.id !== postId);
      alert('Post başarıyla silindi!');
    } else {
      alert('Post silinemedi: ' + response.data.message);
    }
  } catch (err) {
    console.error('Delete error:', err);
    if (err.response?.status === 401 || err.response?.status === 403) {
      alert('Oturum süreniz dolmuş. Lütfen tekrar giriş yapın.');
      router.push('/login');
    } else {
      alert('Bir hata oluştu: ' + (err.response?.data?.message || err.message));
    }
  }
};

onMounted(() => {
  fetchPosts();
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
  max-width: 1400px;
  margin: 0 auto;
}

/* Page Header */
.page-header {
  margin-bottom: 3rem;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
  padding: 2rem;
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  border-radius: 16px;
  border: 1px solid #334155;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.title-section {
  flex: 1;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: white;
  margin: 0 0 0.5rem;
  letter-spacing: -0.025em;
}

.page-subtitle {
  font-size: 1rem;
  color: #94a3b8;
  margin: 0;
  font-weight: 400;
}

/* Admin Toolbar */
.admin-toolbar {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.toolbar-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border: 1px solid;
  border-radius: 10px;
  font-size: 0.9375rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
}

.button-icon {
  width: 18px;
  height: 18px;
}

.create-button {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

.create-button:hover {
  background: #2563eb;
  border-color: #2563eb;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}

.logout-button {
  background: transparent;
  color: #f87171;
  border-color: #f87171;
}

.logout-button:hover {
  background: #f87171;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(248, 113, 113, 0.4);
}

/* State Container */
.state-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}

/* Loading State */
.loading-card {
  text-align: center;
  padding: 3rem;
  background: white;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
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

/* Error State */
.error-card {
  text-align: center;
  padding: 3rem;
  background: white;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  max-width: 500px;
}

.error-icon {
  width: 56px;
  height: 56px;
  color: #dc2626;
  margin: 0 auto 1.5rem;
}

.error-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 0.75rem;
}

.error-message {
  font-size: 1rem;
  color: #64748b;
  margin: 0 0 2rem;
  line-height: 1.6;
}

.retry-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 0.9375rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.retry-button:hover {
  background: #2563eb;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

/* Posts Info */
.posts-info {
  margin-bottom: 2rem;
}

.info-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  color: #475569;
}

.info-icon {
  width: 18px;
  height: 18px;
  color: #3b82f6;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
}

.empty-icon {
  width: 64px;
  height: 64px;
  color: #cbd5e1;
  margin: 0 auto 1.5rem;
}

.empty-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 0.75rem;
}

.empty-message {
  font-size: 1rem;
  color: #64748b;
  margin: 0;
}

/* Posts Grid */
.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

/* Responsive */
@media (max-width: 1024px) {
  .posts-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
}

@media (max-width: 768px) {
  .page-wrapper {
    padding: 1rem 0.75rem;
  }

  .header-content {
    flex-direction: column;
    padding: 1.5rem;
  }

  .page-title {
    font-size: 2rem;
  }

  .admin-toolbar {
    width: 100%;
    flex-direction: column;
  }

  .toolbar-button {
    width: 100%;
    justify-content: center;
  }

  .posts-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>