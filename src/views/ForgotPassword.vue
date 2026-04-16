<template>
  <div class="min-h-screen flex items-center justify-center px-4">
    <!-- 忘记密码卡片 -->
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

      <!-- 忘记密码表单 -->
      <form @submit.prevent="handleChangePassword" class="space-y-4">
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
          <label for="oldPassword" class="block text-text-secondary mb-2">旧密码</label>
          <input 
            type="password" 
            id="oldPassword" 
            v-model="oldPassword" 
            class="input w-full"
            placeholder="请输入旧密码"
            @blur="validateOldPassword"
            required
          />
          <span class="error" v-if="oldPasswordError">{{ oldPasswordError }}</span>
        </div>
        <div>
          <label for="newPassword" class="block text-text-secondary mb-2">新密码</label>
          <input 
            type="password" 
            id="newPassword" 
            v-model="newPassword" 
            class="input w-full"
            placeholder="请输入新密码"
            @blur="validateNewPassword"
            required
          />
          <span class="error" v-if="newPasswordError">{{ newPasswordError }}</span>
        </div>
        <div>
          <label for="confirmPassword" class="block text-text-secondary mb-2">确认新密码</label>
          <input 
            type="password" 
            id="confirmPassword" 
            v-model="confirmPassword" 
            class="input w-full"
            placeholder="请再次输入新密码"
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
          {{ loading ? '修改中...' : '修改密码' }}
        </button>
        <div class="flex justify-center text-sm text-text-secondary">
          <router-link to="/login" class="hover:text-accent-primary transition-colors">返回登录</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { changePassword } from '@/api/auth'

const router = useRouter()

const username = ref('')
const oldPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const usernameError = ref('')
const oldPasswordError = ref('')
const newPasswordError = ref('')
const confirmPasswordError = ref('')
const mouseX = ref(0)
const mouseY = ref(0)

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

const validateOldPassword = () => {
  if (!oldPassword.value) {
    oldPasswordError.value = '旧密码不能为空'
    return false
  }
  oldPasswordError.value = ''
  return true
}

const validateNewPassword = () => {
  const value = newPassword.value
  if (!value) {
    newPasswordError.value = '新密码不能为空'
    return false
  }
  if (value.length < 8 || value.length > 16) {
    newPasswordError.value = '密码长度必须在8-16位之间'
    return false
  }
  let count = 0
  if (/[A-Z]/.test(value)) count++
  if (/[a-z]/.test(value)) count++
  if (/\d/.test(value)) count++
  if (/[.#?+\-*]/.test(value)) count++
  if (count < 3) {
    newPasswordError.value = '密码必须包含大写字母、小写字母、数字、特殊符号中的三类'
    return false
  }
  newPasswordError.value = ''
  return true
}

const validateConfirmPassword = () => {
  if (confirmPassword.value !== newPassword.value) {
    confirmPasswordError.value = '两次密码不一致'
    return false
  }
  confirmPasswordError.value = ''
  return true
}

const handleChangePassword = async () => {
  if (!validateUsername() || !validateOldPassword() || !validateNewPassword() || !validateConfirmPassword()) {
    return
  }

  loading.value = true
  try {
    const res = await changePassword({
      username: username.value,
      oldPassword: oldPassword.value,
      newPassword: newPassword.value
    })
    // 支持字符串和数字类型的code
    if (res.code == 200) {
      alert('密码修改成功，请重新登录')
      router.push('/login')
    } else {
      alert(res.message || '密码修改失败')
    }
  } catch (error) {
    alert(error.message || '密码修改失败，请检查网络连接')
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
</style>
