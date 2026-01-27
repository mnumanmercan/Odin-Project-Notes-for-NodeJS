<template>
  <div class="post-card-wrapper">
    <!-- Admin için düzenleme/silme butonları - CARD DIŞINDA -->
    <div v-if="isAdmin" class="admin-controls">
      <button @click.stop="editPost" class="edit-btn" title="Düzenle">
        ✏️
      </button>
<!--       
      <button @click.stop="deletePost" class="delete-btn" title="Sil">
        🗑️
      </button> -->
    </div>

    <!-- Card tıklanabilir -->
    <router-link :to="`/posts/${post.id}`" class="post-card-link">
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
    </router-link>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["delete"]);

const truncatedContent = computed(() => {
  const maxLength = 150;
  if (props.post.content.length > maxLength) {
    return props.post.content.substring(0, maxLength) + "...";
  }
  return props.post.content;
});

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const editPost = () => {
  console.log('Edit clicked for post:', props.post.id); // Debug için
  router.push(`/admin/edit-post/${props.post.id}`);
};

const deletePost = () => {
  console.log('Delete clicked for post:', props.post.id); // Debug için
  if (
    confirm(
      `"${props.post.title}" başlıklı postu silmek istediğinize emin misiniz?`,
    )
  ) {
    emit("delete", props.post.id);
  }
};
</script>

<style scoped>
.post-card-wrapper {
  position: relative;
}

.admin-controls {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  z-index: 10;
  display: flex;
  gap: 0.5rem;
}

.edit-btn,
.delete-btn {
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.edit-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
  background: #3498db;
  color: white;
}

.delete-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(231, 76, 60, 0.3);
  background: #e74c3c;
  color: white;
}

.post-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.post-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  height: 100%;
  display: flex;
  flex-direction: column;
  cursor: pointer;
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
  transition: color 0.2s;
}

.post-card:hover h2 {
  color: #3498db;
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
  flex: 1;
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