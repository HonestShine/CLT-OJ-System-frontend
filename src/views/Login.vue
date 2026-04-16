<template>
  <div class="min-h-screen flex items-center justify-center px-4">
    <!-- 登录卡片 -->
    <div 
      class="w-full max-w-md p-8 backdrop-blur-md bg-bg-secondary/80 border border-bg-tertiary rounded-radius-lg shadow-glow-accent transition-all duration-500"
      @mousemove="handleMouseMove"
      :style="{
        transform: `perspective(1000px) rotateX(${mouseY}deg) rotateY(${mouseX}deg)`
      }"
    >
      <div class="text-center mb-8">
        <router-link to="/problems" class="block cursor-pointer">
          <h1 class="text-4xl font-bold mb-2 text-accent-primary">CLT OJ系统</h1>
          <p class="text-text-secondary">数字深渊中的代码之光</p>
        </router-link>
      </div>

      <!-- 登录表单 -->
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label for="username" class="block text-text-secondary mb-2">用户名</label>
          <input 
            type="text" 
            id="username" 
            v-model="form.username" 
            class="input w-full"
            placeholder="请输入用户名"
            required
          />
        </div>
        <div>
          <label for="password" class="block text-text-secondary mb-2">密码</label>
          <input 
            type="password" 
            id="password" 
            v-model="form.password" 
            class="input w-full"
            placeholder="请输入密码"
            required
          />
        </div>
        <button 
          type="submit" 
          class="btn btn-primary w-full"
          :disabled="loading"
        >
          {{ loading ? '登录中...' : '登录' }}
        </button>
        <div class="flex justify-between text-sm text-text-secondary">
          <router-link to="/register" class="hover:text-accent-primary transition-colors">注册</router-link>
          <router-link to="/forgot-password" class="hover:text-accent-primary transition-colors">忘记密码</router-link>
        </div>
        <div class="flex justify-center text-sm text-text-secondary mt-2">
          <router-link to="/dashboard" class="hover:text-accent-primary transition-colors">返回主页面</router-link>
        </div>
      </form>
    </div>

    <!-- 自定义提示框 -->
    <transition name="fade">
      <div v-if="showToast" class="fixed top-10 left-1/2 transform -translate-x-1/2 z-50">
        <div class="bg-bg-secondary/90 backdrop-blur-md border border-bg-tertiary rounded-radius-lg shadow-glow-accent px-6 py-3 text-center transition-all duration-300">
          {{ toastMessage }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/api/auth'
import { useUserStore } from '@/store/user'

const router = useRouter()
const userStore = useUserStore()
const form = ref({
  username: '',
  password: ''
})

const mouseX = ref(0)
const mouseY = ref(0)
const loading = ref(false)
const showToast = ref(false)
const toastMessage = ref('')

const handleMouseMove = (e) => {
  const card = e.currentTarget
  const rect = card.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  const centerX = rect.width / 2
  const centerY = rect.height / 2
  
  mouseX.value = (x - centerX) / 20
  mouseY.value = (y - centerY) / 20
}

const showToastMessage = (message) => {
  toastMessage.value = message
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 2000)
}

const handleLogin = async () => {
  loading.value = true
  try {
    const response = await login(form.value)
    if (response.code === '200') {
      console.log('登录成功，用户信息:', response.data.user)
      userStore.setUser(response.data.user)
      userStore.setToken(response.data.token)
    router.push('/dashboard')
    } else {
    showToastMessage(response.message || '登录失败')
}
  } catch (error) {
  showToastMessage(error.message || '登录失败，请检查网络连接')
  } finally {
  loading.value = false
}
}


</script>

<style scoped>
h1 {
  font-family: 'Orbitron', 'Arial Black', sans-serif;
  text-shadow: 0 0 20px rgba(0, 217, 255, 0.7);
  letter-spacing: 2px;
}

/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-20px) scale(0.9);
}
</style>
