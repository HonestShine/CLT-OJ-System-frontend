<template>
  <div class="submission-detail-container">
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

    <div class="content" v-if="submission">
      <h1>提交详情</h1>
      
      <div class="submission-info">
        <div class="info-row">
          <span class="label">提交ID:</span>
          <span class="value">{{ submission.id }}</span>
        </div>
        <div class="info-row">
          <span class="label">题目ID:</span>
          <span class="value">{{ formatProblemId(submission.problemId) }}</span>
        </div>
        <div class="info-row">
          <span class="label">语言:</span>
          <span class="value">{{ submission.language }}</span>
        </div>
        <div class="info-row">
          <span class="label">状态:</span>
          <span class="value" :class="getStatusClass(submission.status)">{{ submission.status }}</span>
        </div>
        <div class="info-row">
          <span class="label">运行时间:</span>
          <span class="value">{{ submission.runtime }}</span>
        </div>
        <div class="info-row">
          <span class="label">内存占用:</span>
          <span class="value">{{ submission.memory }}</span>
        </div>
        <div class="info-row">
          <span class="label">提交时间:</span>
          <span class="value">{{ formatTime(submission.submitTime) }}</span>
        </div>
      </div>

      <div class="code-section">
        <h2>提交的代码</h2>
        <pre class="code-block">{{ submission.code }}</pre>
      </div>

      <div class="output-section" v-if="submission.stderr || submission.compileOutput || submission.message">
        <h2>输出信息</h2>
        <div v-if="submission.compileOutput" class="output-block compile-output">
          <h3>编译输出:</h3>
          <pre>{{ submission.compileOutput }}</pre>
        </div>
        <div v-if="submission.stderr" class="output-block error-output">
          <h3>错误信息:</h3>
          <pre>{{ submission.stderr }}</pre>
        </div>
        <div v-if="submission.message" class="output-block error-output">
          <h3>错误信息:</h3>
          <pre>{{ submission.message }}</pre>
        </div>
      </div>

      <div class="test-results" v-if="submission.testResults && submission.testResults.length > 0">
        <h2>测试结果</h2>
        <div class="test-result-item" v-for="(test, index) in submission.testResults" :key="index">
          <div class="test-header">
            <span class="test-index">测试用例 {{ index + 1 }}</span>
            <span class="test-status" :class="getStatusClass(test.status)">{{ test.status }}</span>
          </div>
          <div class="test-details" v-if="test.message">
            <pre>{{ test.message }}</pre>
          </div>
        </div>
      </div>

      <div class="actions">
        <button @click="goBack" class="btn btn-secondary">返回</button>
      </div>
    </div>

    <div class="loading" v-else>
      加载中...
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
import { getSubmissionDetail } from '@/api/submission'
import { formatProblemId } from '@/utils/formatters'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const submission = ref(null)

const goHome = () => {
  router.push('/problems')
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

const handleLogout = () => {
  userStore.logout()
  router.push('/')
}

const goBack = () => {
  if (submission.value && submission.value.problemId) {
    router.push(`/problem/${submission.value.problemId}`)
  } else {
    router.back()
  }
}

const getStatusClass = (status) => {
  const statusMap = {
    'Accepted': 'accepted',
    'Wrong Answer': 'wrong-answer',
    'Time Limit Exceeded': 'tle',
    'Memory Limit Exceeded': 'mle',
    'Runtime Error': 'runtime-error',
    'Compile Error': 'compile-error',
    'pending': 'pending'
  }
  return statusMap[status] || ''
}

const formatTime = (time) => {
  if (!time) return ''
  const date = new Date(time)
  return date.toLocaleString('zh-CN')
}

const loadSubmission = async () => {
  try {
    const res = await getSubmissionDetail(route.params.id)
    // 支持字符串和数字类型的code
    if (res.code == 200) {
      submission.value = res.data
    } else {
      alert(res.message || '加载提交详情失败')
      router.push('/')
    }
  } catch (error) {
    alert('加载提交详情失败，请检查网络连接')
    router.push('/')
  }
}

onMounted(() => {
  loadSubmission()
})
</script>

<style scoped>
.submission-detail-container {
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

.content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 20px;
}

h1 {
  color: #E2E8F0;
  margin-bottom: 30px;
  font-family: 'Orbitron', 'Arial Black', sans-serif;
  text-shadow: 0 0 10px rgba(0, 217, 255, 0.5);
}

h2 {
  color: #E2E8F0;
  margin: 30px 0 15px;
  font-size: 18px;
  font-family: 'Orbitron', 'Arial Black', sans-serif;
}

h3 {
  color: #94A3B8;
  margin: 15px 0 10px;
  font-size: 14px;
}

.submission-info {
  background: rgba(30, 41, 59, 0.8);
  backdrop-filter: blur(10px);
  padding: 20px;
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  margin-bottom: 30px;
}

.info-row {
  display: flex;
  margin-bottom: 10px;
  align-items: center;
}

.label {
  width: 120px;
  color: #94A3B8;
  font-weight: 500;
}

.value {
  color: #E2E8F0;
  flex: 1;
}

.code-section {
  background: rgba(30, 41, 59, 0.8);
  backdrop-filter: blur(10px);
  padding: 20px;
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  margin-bottom: 30px;
}

.code-block {
  background-color: rgba(15, 23, 42, 0.8);
  padding: 15px;
  border-radius: 4px;
  overflow-x: auto;
  margin: 0;
  color: #94A3B8;
  border: 1px solid rgba(148, 163, 184, 0.2);
  font-family: 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.5;
}

.output-section {
  background: rgba(30, 41, 59, 0.8);
  backdrop-filter: blur(10px);
  padding: 20px;
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  margin-bottom: 30px;
}

.output-block {
  margin-bottom: 20px;
}

.output-block pre {
  background-color: rgba(15, 23, 42, 0.8);
  padding: 15px;
  border-radius: 4px;
  overflow-x: auto;
  margin: 0;
  border: 1px solid rgba(148, 163, 184, 0.2);
  font-family: 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.5;
}

.compile-output pre {
  color: #94A3B8;
}

.error-output pre {
  color: #f44336;
}

.test-results {
  background: rgba(30, 41, 59, 0.8);
  backdrop-filter: blur(10px);
  padding: 20px;
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  margin-bottom: 30px;
}

.test-result-item {
  background-color: rgba(15, 23, 42, 0.5);
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 10px;
  border: 1px solid rgba(148, 163, 184, 0.2);
}

.test-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.test-index {
  color: #E2E8F0;
  font-weight: 500;
}

.test-status {
  font-weight: 500;
}

.test-details pre {
  background-color: rgba(15, 23, 42, 0.8);
  padding: 10px;
  border-radius: 4px;
  overflow-x: auto;
  margin: 0;
  color: #94A3B8;
  border: 1px solid rgba(148, 163, 184, 0.2);
  font-family: 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.5;
}

.actions {
  margin-top: 30px;
}

.btn {
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: #00D9FF;
  color: #0F172A;
  border: none;
}

.btn-primary:hover {
  background-color: #00B4D8;
  box-shadow: 0 0 10px rgba(0, 217, 255, 0.5);
}

.btn-secondary {
  background-color: rgba(99, 102, 241, 0.2);
  color: #6366F1;
  border: 1px solid rgba(99, 102, 241, 0.5);
}

.btn-secondary:hover {
  background-color: rgba(99, 102, 241, 0.3);
  box-shadow: 0 0 10px rgba(99, 102, 241, 0.5);
}

.accepted {
  color: #4caf50;
  font-weight: 500;
}

.wrong-answer {
  color: #f44336;
}

.tle {
  color: #ff9800;
}

.mle {
  color: #9c27b0;
}

.runtime-error {
  color: #e91e63;
}

.compile-error {
  color: #795548;
}

.pending {
  color: #607d8b;
}

.loading {
  text-align: center;
  padding: 50px;
  color: #94A3B8;
}

@media (max-width: 768px) {
  .content {
    padding: 20px 15px;
  }
  
  .info-row {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .label {
    width: 100%;
    margin-bottom: 5px;
  }
}
</style>