<template>
    <div class="create-post-container">
        <div class="create-post-card">
            <div class="header">
                <router-link to="/posts" class="back-link">← Geri Dön</router-link>
                <h1>Post Güncelle</h1>
            </div>

            <div v-if="error" class="error-message">
                {{ error }}
            </div>

            <div v-if="success" class="success-message">
                {{ success }}
            </div>

            <form @submit.prevent="handleSubmit">
                <div class="form-group">
                    <label for="title">Başlık *</label>
                    <input type="text" id="title" v-model="formData.title" placeholder="Post başlığı..." required />
                </div>

                <div class="form-group">
                    <label for="category">Kategori *</label>
                    <select id="category" v-model="formData.category_id" required>
                        <option value="">Kategori seçin</option>
                        <option value="1">Teknoloji</option>
                        <option value="2">Hayat</option>
                        <option value="3">Araştırma</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="content">İçerik *</label>
                    <textarea id="content" v-model="formData.content" placeholder="Post içeriğini yazın..." rows="12"
                        required></textarea>
                    <small>{{ contentLength }} karakter</small>
                </div>

                <div class="form-actions">
                    <button type="button" @click="handleCancel" class="cancel-btn" :disabled="loading">
                        İptal
                    </button>
                    <button type="submit" class="submit-btn" :disabled="loading">
                        <span v-if="loading">Kaydediliyor...</span>
                        <span v-else>📝 Postu Güncelle</span>
                    </button>
                </div>
            </form>
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

    try {
        const postId = router.currentRoute.value.params.id;
        console.log('Fetching post with ID:', postId);
        const response = await api.getPostById(postId);

        const postData = response.data.data || response.data;

        if (postData) {
            formData.value = {
                title: postData.title,
                content: postData.content,
                category_id: parseInt(postData.category_id) // Select box eşleşmesi için string gerekebilir
            };
        }
    } catch (err) {
        console.error('Post fetch error:', err);
        error.value = 'Bir hata oluştu: ' + err.message;
    } finally {
        loading.value = false;
    }
})
const handleSubmit = async () => {
    error.value = '';
    success.value = '';
    loading.value = true;

    try {
        const postId = router.currentRoute.value.params.id;
        const response = await api.updatePost(postId, {
            title: formData.value.title,
            content: formData.value.content,
            category_id: formData.value.category_id
        });

        if (response.data.success) {
            success.value = 'Post başarıyla güncellendi! Yönlendiriliyorsunuz...';

            // Formu temizle
            formData.value = {
                title: '',
                content: '',
                category_id: ''
            };

            // 1.5 saniye sonra post detay sayfasına yönlendir
            setTimeout(() => {
                router.push(`/posts/${response.data.data.id}`);
            }, 1500);
        } else {
            error.value = response.data.message || 'Post oluşturulamadı';
        }
    } catch (err) {
        console.error('Create post error:', err);

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
    if (formData.value.title || formData.value.content) {
        if (confirm('Değişiklikler kaydedilmedi. Çıkmak istediğinize emin misiniz?')) {
            router.push('/posts');
        }
    } else {
        router.push('/posts');
    }
};
</script>

<style scoped>
.create-post-container {
    max-width: 900px;
    margin: 0 auto;
    padding: 2rem;
}

.create-post-card {
    background: white;
    border-radius: 12px;
    padding: 2.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.header {
    margin-bottom: 2rem;
}

.back-link {
    display: inline-block;
    color: #3498db;
    text-decoration: none;
    margin-bottom: 1rem;
    font-weight: 500;
    transition: color 0.2s;
}

.back-link:hover {
    color: #2980b9;
}

h1 {
    font-size: 2rem;
    color: #2c3e50;
    margin: 0;
}

.error-message {
    background: #fee;
    color: #c33;
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 1.5rem;
    border: 1px solid #fcc;
}

.success-message {
    background: #efe;
    color: #3c3;
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 1.5rem;
    border: 1px solid #cfc;
}

.form-group {
    margin-bottom: 1.5rem;
}

label {
    display: block;
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 0.5rem;
}

input,
select,
textarea {
    width: 100%;
    padding: 0.875rem;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    font-size: 1rem;
    font-family: inherit;
    transition: border-color 0.2s;
}

input:focus,
select:focus,
textarea:focus {
    outline: none;
    border-color: #3498db;
}

textarea {
    resize: vertical;
    min-height: 200px;
}

small {
    display: block;
    margin-top: 0.5rem;
    color: #777;
    font-size: 0.875rem;
}

.form-actions {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 2px solid #eee;
}

.cancel-btn,
.submit-btn {
    padding: 0.875rem 2rem;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
}

.cancel-btn {
    background: #e0e0e0;
    color: #555;
}

.cancel-btn:hover:not(:disabled) {
    background: #d0d0d0;
    transform: translateY(-2px);
}

.submit-btn {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
}

.submit-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.cancel-btn:disabled,
.submit-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
}

@media (max-width: 768px) {
    .create-post-container {
        padding: 1rem;
    }

    .create-post-card {
        padding: 1.5rem;
    }

    h1 {
        font-size: 1.5rem;
    }

    .form-actions {
        flex-direction: column-reverse;
    }

    .cancel-btn,
    .submit-btn {
        width: 100%;
    }
}
</style>