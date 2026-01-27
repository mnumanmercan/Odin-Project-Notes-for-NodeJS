<template>
  <div class="posts-container">
    <div class="header">
      <h1>Blog Yazıları</h1>
      
      <!-- Admin için butonlar -->
      <div v-if="isAdmin" class="admin-actions">
        <router-link to="/admin/create-post" class="create-btn">
          ➕ Yeni Post
        </router-link>
        <button @click="handleLogout" class="logout-btn">
          🚪 Çıkış Yap
        </button>
      </div>
    </div>
    
    <div v-if="loading" class="loading">
      Yükleniyor...
    </div>
    
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    
    <div v-else class="posts-grid">
      <PostCard 
        v-for="post in posts" 
        :key="post.id" 
        :post="post"
        :is-admin="isAdmin"
      />
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
    const response = await api.getPosts();
    
    if (response.data.success) {
      posts.value = response.data.data;
    } else {
      error.value = 'Postlar yüklenemedi';
    }
  } catch (err) {
    console.error('Posts fetch error:', err);
    error.value = 'Bir hata oluştu: ' + err.message;
  } finally {
    loading.value = false;
  }
};

const handleLogout = () => {
  logout();
  router.push('/posts');
  // Sayfayı yenile ki admin butonları kaybolsun
  window.location.reload();
};

onMounted(() => {
  fetchPosts();
});
</script>

<style scoped>
.posts-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

h1 {
  color: #2c3e50;
  margin: 0;
}

.admin-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.create-btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: #27ae60;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: background 0.2s;
}

.create-btn:hover {
  background: #229954;
}

.logout-btn {
  padding: 0.75rem 1.5rem;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.logout-btn:hover {
  background: #c0392b;
}

.loading, .error {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
}

.error {
  color: #e74c3c;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .admin-actions {
    flex-direction: column;
  }
}
</style>