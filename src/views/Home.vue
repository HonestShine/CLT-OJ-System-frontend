<template>
  <div class="home-container">
    <header class="header">
      <div class="logo" @click="goHome">CLT OJ系统</div>
      <div class="user-info" v-if="userStore.isLoggedIn()">
        <div class="user-avatar" @click="goToProfile">
          <img :src="userStore.user?.avatar || '/default-avatar.png'" alt="头像" class="avatar" />
          <span>{{ userStore.user?.nickname || userStore.user?.username }}</span>
        </div>
        <button @click="handleLogout">退出登录</button>
      </div>
      <div class="auth-buttons" v-else>
        <button @click="goLogin">登录</button>
        <button @click="goRegister">注册</button>
      </div>
    </header>

    <!-- 英雄区域 -->
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">数字深渊中的代码之光</h1>
        <p class="hero-subtitle">挑战算法，提升技能，成为编程大师</p>
        <div class="hero-buttons">
          <button @click="goToProblems" class="btn btn-primary">开始挑战</button>
          <button @click="goToRank" class="btn btn-secondary">查看排行榜</button>
        </div>
      </div>
    </section>

    <!-- 功能介绍 -->
    <section class="features-section">
      <h2 class="section-title">核心功能</h2>
      <div class="features-grid">
        <div class="feature-card display-only">
          <div class="feature-icon">📝</div>
          <h3>丰富的题目库</h3>
          <p>包含从简单到困难的各种算法题目，覆盖多个领域</p>
        </div>
        <div class="feature-card display-only">
          <div class="feature-icon">⚡</div>
          <h3>实时评测</h3>
          <p>提交代码后立即获得评测结果，快速反馈</p>
        </div>
        <div class="feature-card display-only">
          <div class="feature-icon">🏆</div>
          <h3>个人排行榜</h3>
          <p>查看全球用户的排名，激发竞争意识</p>
        </div>
        <div class="feature-card display-only">
          <div class="feature-icon">💬</div>
          <h3>社区讨论</h3>
          <p>与其他开发者交流解题思路，共同进步</p>
        </div>
      </div>
    </section>

    <!-- 快速链接 -->
    <section class="quick-links-section">
      <h2 class="section-title">快速导航</h2>
      <div class="quick-links-grid">
        <router-link to="/problems" class="quick-link-card group">
          <div class="link-icon">📚</div>
          <span>题目列表</span>
          <span class="link-arrow opacity-0 group-hover:opacity-100 transition-opacity">→</span>
        </router-link>
        <router-link to="/rank" class="quick-link-card group">
          <div class="link-icon">🏅</div>
          <span>排行榜</span>
          <span class="link-arrow opacity-0 group-hover:opacity-100 transition-opacity">→</span>
        </router-link>
        <router-link to="/dashboard" class="quick-link-card group">
          <div class="link-icon">📊</div>
          <span>个人仪表盘</span>
          <span class="link-arrow opacity-0 group-hover:opacity-100 transition-opacity">→</span>
        </router-link>
        <router-link to="/nexus" class="quick-link-card group">
          <div class="link-icon">🌐</div>
          <span>社区</span>
          <span class="link-arrow opacity-0 group-hover:opacity-100 transition-opacity">→</span>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'

const router = useRouter()
const userStore = useUserStore()

const goHome = () => {
  router.push('/')
}

const goLogin = () => {
  router.push('/login')
}

const goRegister = () => {
  router.push('/register')
}

const goToProblems = () => {
  try {
    router.push('/dashboard')
  } catch (error) {
  }
}

const goToRank = () => {
  router.push('/rank')
}

const goToProfile = () => {
  router.push('/users/me')
}

const handleLogout = () => {
  userStore.logout()
  router.push('/')
}
</script>

<style scoped>
.home-container {
  min-height: 100vh;
  background: transparent;
}

.header {
  background-color: rgba(30, 41, 59, 0.8);
  backdrop-filter: blur(10px);
  padding: 15px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  border-bottom: 1px solid rgba(148, 163, 184, 0.2);
  position: sticky;
  top: 0;
  z-index: 100;
}

.logo {
  font-size: 24px;
  font-weight: bold;
  color: #00D9FF;
  cursor: pointer;
  font-family: 'Orbitron', 'Arial Black', sans-serif;
  text-shadow: 0 0 10px rgba(0, 217, 255, 0.7);
  letter-spacing: 2px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.user-avatar {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  color: #E2E8F0;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid rgba(0, 217, 255, 0.5);
}

.auth-buttons {
  display: flex;
  gap: 10px;
}

button {
  padding: 8px 16px;
  background-color: #00D9FF;
  color: #0F172A;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

button:hover {
  background-color: #00B4D8;
  box-shadow: 0 0 10px rgba(0, 217, 255, 0.5);
}

/* 英雄区域 */
.hero-section {
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  text-align: center;
}

.hero-content {
  max-width: 800px;
}

.hero-title {
  font-size: 48px;
  font-weight: bold;
  color: #E2E8F0;
  margin-bottom: 20px;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 20px;
  color: #94A3B8;
  margin-bottom: 40px;
}

.hero-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

/* 功能介绍 */
.features-section {
  padding: 80px 20px;
}

.section-title {
  font-size: 32px;
  font-weight: bold;
  color: #E2E8F0;
  text-align: center;
  margin-bottom: 60px;
}

.features-grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
}

.feature-card {
  background: rgba(30, 41, 59, 0.8);
  backdrop-filter: blur(10px);
  padding: 40px;
  border-radius: 12px;
  border: 1px solid rgba(148, 163, 184, 0.2);
  transition: all 0.3s ease;
  text-align: center;
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 25px rgba(0, 217, 255, 0.3);
  border-color: rgba(0, 217, 255, 0.5);
}

.feature-card.display-only {
  background: transparent;
  border: none;
  padding: 40px 20px;
  opacity: 0.6;
}

.feature-card.display-only:hover {
  transform: none;
  box-shadow: none;
  border-color: transparent;
}

.feature-icon {
  font-size: 48px;
  margin-bottom: 20px;
}

.feature-card.display-only .feature-icon {
  color: #64748B;
}

.feature-card h3 {
  font-size: 20px;
  font-weight: bold;
  color: #E2E8F0;
  margin-bottom: 15px;
}

.feature-card.display-only h3 {
  font-weight: normal;
  color: #94A3B8;
}

.feature-card p {
  color: #94A3B8;
  line-height: 1.6;
}

.feature-card.display-only p {
  color: #64748B;
}

/* 快速链接 */
.quick-links-section {
  padding: 80px 20px;
  background: rgba(15, 23, 42, 0.5);
}

.quick-links-grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
}

.quick-link-card {
  background: rgba(30, 41, 59, 0.8);
  backdrop-filter: blur(10px);
  padding: 30px;
  border-radius: 12px;
  border: 1px solid rgba(148, 163, 184, 0.2);
  transition: all 0.3s ease;
  text-align: center;
  text-decoration: none;
  color: #E2E8F0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.quick-link-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 217, 255, 0.3);
  border-color: rgba(0, 217, 255, 0.5);
}

.quick-link-card:hover span:first-of-type {
  color: #00D9FF;
}

.link-icon {
  font-size: 36px;
}

.quick-link-card span {
  font-size: 18px;
  font-weight: bold;
}

.link-arrow {
  font-size: 14px;
  color: #00D9FF;
  margin-top: 5px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .hero-title {
    font-size: 36px;
  }
  
  .hero-subtitle {
    font-size: 18px;
  }
  
  .hero-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .features-grid,
  .quick-links-grid {
    grid-template-columns: 1fr;
  }
}
</style>
