<template>
  <div class="min-h-screen bg-bg-primary relative overflow-hidden">
    <!-- 粒子背景 -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="particles-container">
        <div 
          v-for="i in 50" 
          :key="i"
          class="particle"
          :style="{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${5 + Math.random() * 10}s`,
            opacity: 0.3 + Math.random() * 0.7,
            fontSize: `${10 + Math.random() * 14}px`
          }"
        >
          {{ getRandomChar() }}
        </div>
      </div>
    </div>

    <!-- 主内容区 -->
    <main class="relative z-10 min-h-screen px-4">
      <!-- 路由视图 -->
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>


  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// 清理localStorage中的guest_token残留
onMounted(() => {
  const token = localStorage.getItem('token')
  if (token === 'guest-token') {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }
})

const getRandomChar = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789{}[]()<>;:=+-*/&|!~'
  return chars[Math.floor(Math.random() * chars.length)]
}
</script>

<style scoped>
.particles-container {
  position: absolute;
  inset: 0;
}

.particle {
  position: absolute;
  color: var(--accent-primary);
  opacity: 0.6;
  animation: float linear infinite;
}

@keyframes float {
  0% {
    transform: translateY(100vh) rotate(0deg);
  }
  100% {
    transform: translateY(-100px) rotate(360deg);
  }
}



/* 路由过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>