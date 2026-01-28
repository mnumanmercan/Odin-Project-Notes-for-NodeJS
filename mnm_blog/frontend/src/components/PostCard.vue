<template>
  <div class="card-wrapper">
    <!-- Card Link -->
    <router-link :to="`/posts/${post.id}`" class="card-link">
      <article class="post-card">
        <!-- Admin Controls (Card İçinde) -->
        <div v-if="isAdmin" class="admin-controls">
          <button @click.stop="editPost" class="control-button edit-button" title="Düzenle">
            <svg class="control-icon" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
            </svg>
          </button>
          <button @click.stop="deletePost" class="control-button delete-button" title="Sil">
            <svg class="control-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"/>
            </svg>
          </button>
        </div>

        <!-- Card Header -->
        <header class="card-header">
          <div class="title-section">
            <h3 class="card-title">{{ post.title }}</h3>
          </div>
        </header>

        <!-- Category Badge -->
        <div class="category-wrapper">
          <div class="category-badge">
            <svg class="badge-icon" viewBox="0 0 20 20" fill="currentColor">
              <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"/>
            </svg>
            <span>{{ post.category.name }}</span>
          </div>
        </div>

        <!-- Card Content -->
        <div class="card-content">
          <p class="content-text">{{ truncatedContent }}</p>
        </div>

        <!-- Card Footer -->
        <footer class="card-footer">
          <div class="footer-item author-item">
            <svg class="footer-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
            </svg>
            <span class="footer-text">{{ post.author.name }}</span>
          </div>
          <div class="footer-meta">
            <div class="meta-item">
              <svg class="meta-icon" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
              </svg>
              <span class="meta-text">{{ post.view_count }}</span>
            </div>
            <div class="meta-item">
              <svg class="meta-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
              </svg>
              <span class="meta-text">{{ formatDate(post.created_at) }}</span>
            </div>
          </div>
        </footer>

        <!-- Read More Indicator -->
        <div class="read-more">
          <span class="read-more-text">Devamını oku</span>
          <svg class="read-more-arrow" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"/>
          </svg>
        </div>
      </article>
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
  const maxLength = 180;
  if (props.post.content.length > maxLength) {
    return props.post.content.substring(0, maxLength) + "...";
  }
  return props.post.content;
});

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const editPost = () => {
  console.log('Edit clicked for post:', props.post.id);
  router.push(`/admin/edit-post/${props.post.id}`);
};

const deletePost = () => {
  console.log('Delete clicked for post:', props.post.id);
  if (confirm(`"${props.post.title}" başlıklı postu silmek istediğinize emin misiniz?`)) {
    emit("delete", props.post.id);
  }
};
</script>

<style scoped>
/* Card Wrapper */
.card-wrapper {
  position: relative;
  height: 100%;
}

/* Card Link */
.card-link {
  text-decoration: none;
  color: inherit;
  display: block;
  height: 100%;
}

/* Post Card */
.post-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.post-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #3b82f6 0%, #2563eb 100%);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.post-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  border-color: #cbd5e1;
}

.post-card:hover::before {
  transform: scaleX(1);
}

/* Admin Controls - Card İçinde Sağ Üst Köşe */
.admin-controls {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 10;
  display: flex;
  gap: 0.5rem;
}

.control-button {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(4px);
}

.control-icon {
  width: 16px;
  height: 16px;
}

.edit-button {
  color: #3b82f6;
}

.edit-button:hover {
  background: #3b82f6;
  border-color: #3b82f6;
  color: white;
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.delete-button {
  color: #dc2626;
}

.delete-button:hover {
  background: #dc2626;
  border-color: #dc2626;
  color: white;
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
}

/* Card Header - Admin butonları için sağdan padding */
.card-header {
  margin-bottom: 0.75rem;
  padding-right: 5rem; /* Admin butonları için alan */
}

.title-section {
  flex: 1;
  min-width: 0;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
  line-height: 1.4;
  transition: color 0.2s ease;
  word-wrap: break-word;
}

.post-card:hover .card-title {
  color: #3b82f6;
}

/* Category Badge */
.category-wrapper {
  margin-bottom: 1rem;
}

.category-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
  border: 1px solid #bfdbfe;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  color: #2563eb;
  white-space: nowrap;
}

.badge-icon {
  width: 14px;
  height: 14px;
}

/* Card Content */
.card-content {
  flex: 1;
  margin-bottom: 1rem;
}

.content-text {
  font-size: 0.9375rem;
  line-height: 1.7;
  color: #475569;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Card Footer */
.card-footer {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-top: 1rem;
  border-top: 1px solid #f1f5f9;
}

.footer-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.footer-icon {
  width: 18px;
  height: 18px;
  color: #3b82f6;
  flex-shrink: 0;
}

.footer-text {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1e293b;
}

.footer-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.375rem;
}

.meta-icon {
  width: 16px;
  height: 16px;
  color: #94a3b8;
}

.meta-text {
  font-size: 0.8125rem;
  color: #64748b;
  font-weight: 500;
}

/* Read More Indicator */
.read-more {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.75rem;
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s ease;
}

.post-card:hover .read-more {
  opacity: 1;
  transform: translateX(0);
}

.read-more-text {
  font-size: 0.875rem;
  font-weight: 600;
  color: #3b82f6;
}

.read-more-arrow {
  width: 16px;
  height: 16px;
  color: #3b82f6;
}

/* Responsive */
@media (max-width: 768px) {
  .card-header {
    padding-right: 4.5rem; /* Mobile için daha az padding */
  }

  .admin-controls {
    top: 0.75rem;
    right: 0.75rem;
  }

  .control-button {
    width: 32px;
    height: 32px;
  }

  .control-icon {
    width: 14px;
    height: 14px;
  }

  .footer-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>