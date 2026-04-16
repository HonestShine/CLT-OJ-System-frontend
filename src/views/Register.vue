<template>
  <div class="min-h-screen flex items-center justify-center px-4">
    <!-- 注册卡片 -->
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

      <!-- 注册表单 -->
      <form @submit.prevent="handleRegister" class="space-y-4">
        <div>
          <label for="username" class="block text-text-secondary mb-2">用户名</label>
          <input 
            type="text" 
            id="username" 
            v-model="username" 
            class="input w-full"
            placeholder="请输入用户名"
            @blur="validateUsername"
            required
          />
          <span class="error" v-if="usernameError">{{ usernameError }}</span>
        </div>
        <div>
          <label for="password" class="block text-text-secondary mb-2">密码</label>
          <input 
            type="password" 
            id="password" 
            v-model="password" 
            class="input w-full"
            placeholder="请输入密码"
            @blur="validatePassword"
            required
          />
          <span class="error" v-if="passwordError">{{ passwordError }}</span>
        </div>
        <div>
          <label for="confirmPassword" class="block text-text-secondary mb-2">确认密码</label>
          <input 
            type="password" 
            id="confirmPassword" 
            v-model="confirmPassword" 
            class="input w-full"
            placeholder="请再次输入密码"
            @blur="validateConfirmPassword"
            required
          />
          <span class="error" v-if="confirmPasswordError">{{ confirmPasswordError }}</span>
        </div>
        <button 
          type="submit" 
          class="btn btn-primary w-full"
          :disabled="loading"
        >
          {{ loading ? '注册中...' : '注册' }}
        </button>
        <div class="flex justify-center text-sm text-text-secondary">
          <router-link to="/login" class="hover:text-accent-primary transition-colors">返回登录</router-link>
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { register } from '@/api/auth'

const router = useRouter()

const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const usernameError = ref('')
const passwordError = ref('')
const confirmPasswordError = ref('')
const mouseX = ref(0)
const mouseY = ref(0)
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

const validateUsername = () => {
  const value = username.value
  if (!value) {
    usernameError.value = '用户名不能为空'
    return false
  }
  if (/^\d/.test(value)) {
    usernameError.value = '用户名不能以数字开头'
    return false
  }
  if (!/^[a-zA-Z0-9]+$/.test(value)) {
    usernameError.value = '用户名只能包含字母和数字'
    return false
  }
  if (value.length > 15) {
    usernameError.value = '用户名不能超过15个字符'
    return false
  }
  usernameError.value = ''
  return true
}

const validatePassword = () => {
  const value = password.value
  if (!value) {
    passwordError.value = '密码不能为空'
    return false
  }
  if (value.length < 8 || value.length > 16) {
    passwordError.value = '密码长度必须在8-16位之间'
    return false
  }
  let count = 0
  if (/[A-Z]/.test(value)) count++
  if (/[a-z]/.test(value)) count++
  if (/\d/.test(value)) count++
  if (/[.#?+\-*]/.test(value)) count++
  if (count < 3) {
    passwordError.value = '密码必须包含大写字母、小写字母、数字、特殊符号中的三类'
    return false
  }
  passwordError.value = ''
  return true
}

const validateConfirmPassword = () => {
  if (confirmPassword.value !== password.value) {
    confirmPasswordError.value = '两次密码不一致'
    return false
  }
  confirmPasswordError.value = ''
  return true
}

const showToastMessage = (message) => {
  toastMessage.value = message
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 2000)
}

const handleRegister = async () => {
  if (!validateUsername() || !validatePassword() || !validateConfirmPassword()) {
    return
  }

  loading.value = true
  try {
    const res = await register({
      username: username.value,
      password: password.value
    })
    // 支持字符串和数字类型的code
    if (res.code == 200) {
      showToastMessage('注册成功，请登录')
      setTimeout(() => {
        router.push('/login')
      }, 1000)
    } else {
      showToastMessage(res.message || '注册失败')
    }
  } catch (error) {
    showToastMessage(error.message || '注册失败，请检查网络连接')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.error {
  color: #f44336;
  font-size: 12px;
  margin-top: 5px;
  display: block;
}

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
