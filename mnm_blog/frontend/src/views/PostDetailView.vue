<template>
  <div class="post-detail-container">
    <div v-if="loading" class="loading">
      Yükleniyor...
    </div>
    
    <div v-else-if="error" class="error">
      {{ error }}
      <router-link to="/posts" class="back-link">← Geri Dön</router-link>
    </div>
    
    <article v-else class="post-detail">
      <header class="post-header">
        <div class="navigation">
          <router-link to="/posts" class="back-link">← Tüm Yazılar</router-link>
          
          <!-- Admin için butonlar -->
          <div v-if="isAdmin" class="admin-actions">
            <button @click="editPost" class="edit-btn">
              ✏️ Düzenle
            </button>
            <button @click="deletePost" class="delete-btn">
              🗑️ Sil
            </button>
          </div>
        </div>
        
        <div class="category-badge">{{ post.category.name }}</div>
        
        <h1>{{ post.title }}</h1>
        
        <div class="post-meta">
          <div class="author-info">
            <span class="author">✍️ {{ post.author.name }}</span>
          </div>
          <div class="post-stats">
            <span>👁️ {{ post.view_count }} görüntülenme</span>
            <span>📅 {{ formatDate(post.created_at) }}</span>
          </div>
        </div>
      </header>
      
      <div class="post-content">
        {{ post.content }}
      </div>
    </article>
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
    error.value = 'Bir hata oluştu';
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
        alert('Post silinemedi');
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Bir hata oluştu');
    }
  }
};

onMounted(() => {
  fetchPost();
});
</script>

<style scoped>
.post-detail-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.loading, .error {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
}

.error {
  color: #e74c3c;
}

.navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.back-link {
  display: inline-block;
  color: #3498db;
  text-decoration: none;
  font-weight: 500;
}

.admin-actions {
  display: flex;
  gap: 0.75rem;
}

.edit-btn,
.delete-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;
}

.edit-btn {
  background: #3498db;
  color: white;
}

.edit-btn:hover {
  background: #2980b9;
  transform: translateY(-2px);
}

.delete-btn {
  background: #e74c3c;
  color: white;
}

.delete-btn:hover {
  background: #c0392b;
  transform: translateY(-2px);
}

.post-detail {
  background: white;
  border-radius: 8px;
  padding: 2.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.post-header {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid #eee;
}

.category-badge {
  display: inline-block;
  background: #3498db;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin: 1rem 0;
}

.post-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
  color: #777;
  font-size: 0.95rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.post-stats {
  display: flex;
  gap: 1.5rem;
}

.post-content {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #333;
  white-space: pre-wrap;
}

@media (max-width: 768px) {
  .post-detail {
    padding: 1.5rem;
  }
  
  h1 {
    font-size: 1.8rem;
  }
  
  .admin-actions {
    width: 100%;
    justify-content: flex-end;
  }
}
</style>