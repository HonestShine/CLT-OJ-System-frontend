<template>
  <div class="rank-container">
    <!-- 左侧导航 -->
    <aside class="w-64 bg-bg-secondary border-r border-bg-tertiary p-4 fixed h-full">
      <div class="mb-8">
        <router-link to="/problems" class="block text-center cursor-pointer">
          <h2 class="text-2xl font-bold text-accent-primary">CLT OJ系统</h2>
          <p class="text-text-secondary text-sm">数字深渊中的代码之光</p>
        </router-link>
      </div>
      
      <nav class="space-y-2">
        <router-link to="/dashboard" class="nav-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="8" x="2" y="2" rx="2"/><rect width="20" height="8" x="2" y="14" rx="2"/><line x1="6" x2="6" y1="6" y2="18"/></svg>
          <span>仪表盘</span>
        </router-link>
        <router-link to="/problems" class="nav-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
          <span>题目列表</span>
        </router-link>
        <router-link to="/rank" class="nav-item active">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></svg>
          <span>排行榜</span>
        </router-link>
        <router-link to="/nexus" class="nav-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          <span>社区</span>
        </router-link>
        <router-link to="/profile" class="nav-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          <span>个人中心</span>
        </router-link>
        <template v-if="userStore.isLoggedIn()">
          <button class="nav-item" @click="handleLogout">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
            <span>退出登录</span>
          </button>
        </template>
        <template v-else>
          <router-link to="/login" class="nav-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" x2="3" y1="12" y2="12"/></svg>
            <span>登录</span>
          </router-link>
          <router-link to="/register" class="nav-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            <span>注册</span>
          </router-link>
        </template>
      </nav>
    </aside>

    <!-- 主内容区 -->
    <div class="main-content">
      <div class="content">
        <h1>排行榜</h1>
        <div class="rank-table">
          <div v-if="loading" class="flex items-center justify-center h-64">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-primary"></div>
          </div>
          <div v-else-if="rankList.length === 0" class="flex items-center justify-center h-64 text-text-secondary">
            暂无排名数据
          </div>
          <table v-else>
            <thead>
              <tr>
                <th>排名</th>
                <th>用户</th>
                <th>解题数</th>
                <th>提交数</th>
                <th>通过率</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="user in rankList" 
                :key="user.userId" 
                @click="goToUserProfile(user.userId)"
                class="user-row"
              >
                <td>
                  <span class="rank-badge" :class="getRankClass(user.rank)">
                    {{ user.rank }}
                  </span>
                </td>
                <td class="user-info">
                  <img :src="user.avatar || '/default-avatar.png'" alt="用户头像" class="user-avatar" />
                  <span>{{ user.nickname }}</span>
                </td>
                <td>{{ user.solvedCount }}</td>
                <td>{{ user.submissionCount }}</td>
                <td>{{ user.acceptance }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
import { getRank } from '@/api/rank'

const router = useRouter()
const userStore = useUserStore()



const rankList = ref([])
const loading = ref(false)

const goHome = () => {
  router.push('/')
}

const goLogin = () => {
  router.push('/login')
}

const goRegister = () => {
  router.push('/register')
}

const goToProfile = () => {
  router.push('/users/me')
}

const goToUserProfile = (userId) => {
  // 检查是否是当前登录用户
  const currentUserId = userStore.user?.userId
  if (currentUserId && currentUserId === Number(userId)) {
    // 是当前账户，访问 /users/me
    router.push('/users/me')
  } else {
    // 不是当前账户或未登录，访问 /users/{id}
    router.push(`/users/${userId}`)
  }
}

const handleLogout = () => {
  userStore.logout()
  router.push('/')
}

const getRankClass = (rank) => {
  if (rank === 1) return 'rank-1'
  if (rank === 2) return 'rank-2'
  if (rank === 3) return 'rank-3'
  return ''
}

const loadRank = async () => {
  loading.value = true
  try {
    const res = await getRank()
    // 支持字符串和数字类型的code
    if (res.code == 200) {
      rankList.value = res.data
    }
  } catch (error) {
    // 加载排行榜失败
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadRank()
})
</script>

<style scoped>
.rank-container {
  min-height: 100vh;
  background: transparent;
  display: flex;
}

/* 左侧导航 */
aside {
  width: 64px;
  background: rgba(30, 41, 59, 0.8);
  backdrop-filter: blur(10px);
  border-right: 1px solid rgba(148, 163, 184, 0.2);
  padding: 4px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  transition: width 0.3s ease;
}

aside:hover {
  width: 180px;
}

aside:hover .nav-item span {
  display: inline;
}

aside:hover h2,
aside:hover p {
  display: block;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 8px;
  color: #94A3B8;
  transition: all 0.3s ease;
  text-decoration: none;
  margin-bottom: 8px;
  justify-content: center;
}

aside:hover .nav-item {
  justify-content: flex-start;
}

.nav-item span {
  display: none;
  transition: display 0.3s ease;
}

.nav-item:hover {
  background: rgba(0, 217, 255, 0.1);
  color: #00D9FF;
}

.nav-item.active {
  background: rgba(0, 217, 255, 0.2);
  color: #00D9FF;
  box-shadow: 0 0 10px rgba(0, 217, 255, 0.3);
}

aside h2,
aside p {
  display: none;
  transition: display 0.3s ease;
  text-align: center;
  margin: 10px 0;
}

aside:hover h2 {
  font-size: 18px;
  font-weight: bold;
  color: #00D9FF;
  text-shadow: 0 0 10px rgba(0, 217, 255, 0.5);
}

aside:hover p {
  font-size: 12px;
  color: #94A3B8;
}

/* 主内容区 */
.main-content {
  flex: 1;
  margin-left: 64px;
  padding: 30px;
}

.content {
  max-width: 1000px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  color: #E2E8F0;
  margin-bottom: 30px;
}

.rank-table {
  background: rgba(30, 41, 59, 0.8);
  backdrop-filter: blur(10px);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(148, 163, 184, 0.2);
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background-color: rgba(15, 23, 42, 0.8);
}

th, td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid rgba(148, 163, 184, 0.2);
}

th {
  font-weight: 600;
  color: #94A3B8;
}

.user-row {
  cursor: pointer;
  transition: all 0.3s ease;
  color: #E2E8F0;
}

.user-row:hover {
  background-color: rgba(15, 23, 42, 0.6);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid rgba(148, 163, 184, 0.3);
}

.rank-badge {
  display: inline-block;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border-radius: 50%;
  font-weight: bold;
  background-color: #1E293B;
  color: #94A3B8;
  border: 1px solid rgba(148, 163, 184, 0.3);
}

.rank-badge.rank-1 {
  background-color: #FFD700;
  color: #0F172A;
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
}

.rank-badge.rank-2 {
  background-color: #C0C0C0;
  color: #0F172A;
  box-shadow: 0 0 10px rgba(192, 192, 192, 0.5);
}

.rank-badge.rank-3 {
  background-color: #CD7F32;
  color: #0F172A;
  box-shadow: 0 0 10px rgba(205, 127, 50, 0.5);
}
</style>
