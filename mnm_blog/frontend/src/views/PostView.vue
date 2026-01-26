<template>
  <div class="posts-container">
    <h1>Blog Yazıları</h1>
    
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
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../services/api';
import PostCard from '../components/PostCard.vue';

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

h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: #2c3e50;
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
</style>