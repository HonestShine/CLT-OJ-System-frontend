<template>
  <div class="min-h-screen bg-bg-primary flex">
    <!-- 左侧导航 -->
    <aside class="w-64 bg-bg-secondary border-r border-bg-tertiary p-4 fixed h-full">
      <div class="mb-8">
        <router-link to="/problems" class="block text-center cursor-pointer">
          <h2 class="text-2xl font-bold text-accent-primary">CLT OJ系统</h2>
          <p class="text-text-secondary text-sm">数字深渊中的代码之光</p>
        </router-link>
      </div>
      
      <nav class="space-y-2">
        <router-link to="/dashboard" class="nav-item active">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="8" x="2" y="2" rx="2"/><rect width="20" height="8" x="2" y="14" rx="2"/><line x1="6" x2="6" y1="6" y2="18"/></svg>
          <span>仪表盘</span>
        </router-link>
        <router-link to="/problems" class="nav-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
          <span>题目列表</span>
        </router-link>
        <router-link to="/rank" class="nav-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></svg>
          <span>排行榜</span>
        </router-link>
        <router-link to="/nexus" class="nav-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          <span>社区</span>
        </router-link>
        <div @click="handleProfileClick" class="nav-item cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          <span>个人中心</span>
        </div>
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
    <main class="flex-1 ml-64 p-6">
      <div class="mb-6">
        <h1 class="text-3xl font-bold">仪表盘</h1>
        <p class="text-text-secondary">欢迎回来，{{ user?.nickname || user?.username }}</p>
      </div>

      <!-- Bento Grid 布局 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- 热力图 -->
        <div class="card lg:col-span-2">
          <h3 class="text-lg font-medium mb-4">解题热力图</h3>
          <div class="h-64 bg-bg-tertiary rounded-radius-md flex items-center justify-center">
            <!-- <div class="grid grid-cols-52 gap-1 p-4">
              <div 
                v-for="i in 364" 
                :key="i"
                class="w-2 h-2 rounded-full transition-all duration-300 hover:scale-150"
                :class="{
                  'bg-bg-tertiary': Math.random() > 0.7,
                  'bg-accent-secondary/30': Math.random() > 0.4,
                  'bg-accent-secondary/60': Math.random() > 0.2,
                  'bg-accent-primary': Math.random() > 0.1
                }"
              ></div>
            </div> -->
          </div>
        </div>

        <!-- 能力雷达图 -->
        <div class="card">
          <h3 class="text-lg font-medium mb-4">能力雷达图</h3>
          <div class="h-64 bg-bg-tertiary rounded-radius-md flex items-center justify-center">
            <div v-if="loading.radar" class="flex items-center justify-center h-full">
              <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-primary"></div>
            </div>
            <div v-else-if="!radarData" class="flex items-center justify-center h-full text-text-secondary">
              暂无数据
            </div>
            <canvas v-else ref="radarChart"></canvas>
          </div>
        </div>

        <!-- 最近活动流 -->
        <div class="card lg:col-span-2">
          <h3 class="text-lg font-medium mb-4">最近活动</h3>
          <div v-if="loading.activities" class="flex items-center justify-center h-40">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-primary"></div>
          </div>
          <div v-else-if="activities.length === 0" class="flex items-center justify-center h-40 text-text-secondary">
            暂无活动记录
          </div>
          <div v-else class="space-y-4">
            <div v-for="(activity, index) in activities" :key="index" class="flex gap-4">
              <div class="w-8 h-8 bg-accent-primary rounded-radius-full flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path></svg>
              </div>
              <div>
                <p class="text-text-primary">成功通过了题目 <span class="text-accent-primary">{{ activity.title }}</span></p>
                <p class="text-text-secondary text-sm">{{ activity.time }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 虚拟宠物状态 -->
        <div class="card">
          <h3 class="text-lg font-medium mb-4">虚拟宠物</h3>
          <div class="bg-bg-tertiary rounded-radius-md p-4 text-center">
            <div v-if="loading.pet" class="flex items-center justify-center h-40">
              <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-primary"></div>
            </div>
            <div v-else-if="!petData" class="flex items-center justify-center h-40 text-text-secondary">
              暂无宠物
            </div>
            <div v-else>
              <div class="text-4xl mb-2">🐱</div>
              <h4 class="font-medium">{{ petData.name }}</h4>
              <p class="text-text-secondary text-sm">等级: {{ petData.level }}</p>
              <div class="mt-4 bg-bg-primary rounded-radius-full h-2">
                <div class="bg-accent-primary h-2 rounded-radius-full" :style="{ width: (petData.experience / petData.maxExperience) * 100 + '%' }"></div>
              </div>
              <p class="text-text-secondary text-xs mt-1">经验值: {{ petData.experience }}/{{ petData.maxExperience }}</p>
              <button class="btn btn-primary mt-4 w-full" :disabled="!petData">打卡</button>
            </div>
          </div>
        </div>

        <!-- 推荐题目 -->
        <div class="card lg:col-span-3">
          <h3 class="text-lg font-medium mb-4">推荐题目</h3>
          <div v-if="loading.problems" class="flex items-center justify-center h-64">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-primary"></div>
          </div>
          <div v-else-if="recommendedProblems.length === 0" class="flex items-center justify-center h-64 text-text-secondary">
            暂无推荐题目
          </div>
          <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div v-for="problem in recommendedProblems" :key="problem.id" class="bg-bg-secondary/80 backdrop-blur-md border border-bg-tertiary rounded-radius-lg p-4 shadow-glow-accent relative min-h-[180px]">
              <!-- 标题 -->
              <div class="absolute top-4 left-4">
                <span class="text-sm font-medium">{{ problem.problemTitle }}</span>
                <span :class="{
                  'text-xs px-2 py-1 rounded-radius-full ml-2': true,
                  'bg-success/20 text-success': problem.difficulty === '简单',
                  'bg-warning/20 text-warning': problem.difficulty === '中等',
                  'bg-error/20 text-error': problem.difficulty === '困难'
                }">{{ problem.difficulty }}</span>
              </div>
              <!-- 标签 -->
              <div v-if="problem.tags && problem.tags.length > 0" class="absolute top-4 right-4 flex flex-wrap gap-1">
                <span 
                  v-for="tag in problem.tags" 
                  :key="tag.id || tag.name" 
                  class="text-xs px-2 py-0.5 rounded-radius-full"
                  :style="{ backgroundColor: (tag.color || '#1677ff') + '20', color: tag.color || '#1677ff' }"
                >
                  {{ tag.name || tag }}
                </span>
              </div>
              <!-- 描述 -->
              <p class="text-text-secondary text-sm mt-12 mb-8 line-clamp-3">
                {{ problem.description || '给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那两个整数，并返回它们的数组下标。' }}
              </p>
              <!-- 通过率 -->
              <div class="absolute bottom-4 left-4">
                <span class="text-text-secondary text-xs">通过率: {{ problem.passRate }}</span>
              </div>
              <!-- 查看详情 -->
              <div class="absolute bottom-4 right-4">
                <a :href="`/problem/${problem.problemId || problem.id}`" target="_blank" class="text-accent-primary text-sm hover:underline">查看详情</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
import { logout } from '@/api/auth'
import { getRecommendedProblems } from '@/api/problem'
import { getCurrentUser } from '@/api/user'
import { getSubmissions } from '@/api/submission'
import Chart from 'chart.js/auto'
import { formatProblemId } from '@/utils/formatters'

const router = useRouter()
const userStore = useUserStore()
const user = userStore.user
const radarChart = ref(null)


// 状态管理
const loading = ref({
  heatmap: false,
  activities: false,
  pet: false,
  problems: false,
  radar: false
})

// 数据
const activities = ref([])
const recommendedProblems = ref([])
const petData = ref(null)
const heatmapData = ref([])
const radarData = ref(null)

const handleLogout = async () => {
  try {
    await logout()
    userStore.logout()
    router.push('/login')
  } catch (error) {
    userStore.logout()
    router.push('/login')
  }
}

const handleProfileClick = () => {
  if (isLoggedIn.value) {
    router.push('/profile')
  } else {
    alert('您需要先登录才能访问个人中心页面')
  }
}

// 加载最近活动
const loadActivities = async () => {
  loading.value.activities = true
  try {
    const response = await getSubmissions()
    if (response.code === '200') {
      activities.value = response.data.slice(0, 3).map(submission => ({
        type: submission.status === 'Accepted' ? 'success' : 'submission',
        title: formatProblemId(submission.problemId),
        time: new Date(submission.createdAt).toLocaleString() // 使用真实的时间
      }))
    }
  } catch (error) {
  } finally {
    loading.value.activities = false
  }
}

// 加载推荐题目
const loadRecommendedProblems = async () => {
  loading.value.problems = true
  try {
    const response = await getRecommendedProblems()
    if (response.code === '200') {
      recommendedProblems.value = response.data
    }
  } catch (error) {
  } finally {
    loading.value.problems = false
  }
}

// 加载用户数据
// 初始化雷达图
const initRadarChart = () => {
  if (radarChart.value && radarData.value) {
    new Chart(radarChart.value, {
      type: 'radar',
      data: {
        labels: radarData.value.labels,
        datasets: [{
          label: '能力值',
          data: radarData.value.data,
          backgroundColor: 'rgba(0, 217, 255, 0.2)',
          borderColor: 'rgba(0, 217, 255, 1)',
          pointBackgroundColor: 'rgba(0, 217, 255, 1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(0, 217, 255, 1)'
        }]
      },
      options: {
        scales: {
          r: {
            angleLines: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            pointLabels: {
              color: 'rgba(255, 255, 255, 0.7)'
            },
            ticks: {
              color: 'rgba(255, 255, 255, 0.5)',
              backdropColor: 'transparent'
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              color: 'rgba(255, 255, 255, 0.7)'
            }
          }
        }
      }
    })
  }
}

// 加载用户数据
const loadUserData = async () => {
  loading.value.radar = true
  try {
    const response = await getCurrentUser()
    if (response.code === '200') {
      // 从API获取能力数据
      radarData.value = {
        labels: ['算法', '数据结构', '数学', '字符串', '动态规划', '贪心'],
        data: response.data.abilities || [0, 0, 0, 0, 0, 0]
      }
      // 重新初始化雷达图
      initRadarChart()
    }
  } catch (error) {
  } finally {
    loading.value.radar = false
  }
}

onMounted(() => {
  loadActivities()
  loadRecommendedProblems()
  loadUserData()
})
</script>

<style scoped>
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

h2 {
  font-family: 'Orbitron', 'Arial Black', sans-serif;
  text-shadow: 0 0 10px rgba(0, 217, 255, 0.7);
  letter-spacing: 2px;
}

/* 主内容区样式 */
.dashboard-content {
  max-width: 1200px;
  margin: 0 auto;
}

/* 统计卡片样式 */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: rgba(30, 41, 59, 0.8);
  backdrop-filter: blur(10px);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(148, 163, 184, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
}

.stat-icon {
  font-size: 24px;
  margin-bottom: 10px;
  color: #00D9FF;
}

.stat-value {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 5px;
  color: #E2E8F0;
}

.stat-label {
  font-size: 14px;
  color: #94A3B8;
}

/* 最近活动样式 */
.recent-activity {
  background: rgba(30, 41, 59, 0.8);
  backdrop-filter: blur(10px);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(148, 163, 184, 0.2);
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid rgba(148, 163, 184, 0.2);
}

.activity-item:last-child {
  border-bottom: none;
}

.activity-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(0, 217, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #00D9FF;
}

.activity-content {
  flex: 1;
}

.activity-title {
  font-weight: 600;
  margin-bottom: 4px;
  color: #E2E8F0;
}

.activity-description {
  font-size: 14px;
  color: #94A3B8;
}

.activity-time {
  font-size: 12px;
  color: #64748B;
}
</style>