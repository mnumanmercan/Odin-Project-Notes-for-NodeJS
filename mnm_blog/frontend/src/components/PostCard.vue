<template>
  <div class="post-card">
    <div class="post-header">
      <h2>{{ post.title }}</h2>
      <span class="category">{{ post.category.name }}</span>
    </div>
    
    <p class="post-content">{{ truncatedContent }}</p>
    
    <div class="post-footer">
      <div class="author">
        <span>✍️ {{ post.author.name }}</span>
      </div>
      <div class="meta">
        <span>👁️ {{ post.view_count }}</span>
        <span>📅 {{ formatDate(post.created_at) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  post: {
    type: Object,
    required: true
  }
});

const truncatedContent = computed(() => {
  const maxLength = 150;
  if (props.post.content.length > maxLength) {
    return props.post.content.substring(0, maxLength) + '...';
  }
  return props.post.content;
});

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
</script>

<style scoped>
.post-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.post-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 1rem;
}

h2 {
  font-size: 1.5rem;
  color: #2c3e50;
  margin: 0;
  flex: 1;
}

.category {
  background: #3498db;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.85rem;
  white-space: nowrap;
  margin-left: 1rem;
}

.post-content {
  color: #555;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.post-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #eee;
  font-size: 0.9rem;
  color: #777;
}

.author {
  font-weight: 500;
}

.meta {
  display: flex;
  gap: 1rem;
}
</style>