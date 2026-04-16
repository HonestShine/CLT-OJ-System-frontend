<template>
  <div class="problem-detail-container">
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

    <div class="content" v-if="problem">
      <div class="main-content">
        <div class="left-section">
          <div class="tabs">
            <button 
              class="tab-button" 
              :class="{ active: activeTab === 'problem' }"
              @click="activeTab = 'problem'"
            >
              题目信息
            </button>
            <button 
              class="tab-button" 
              :class="{ active: activeTab === 'submissions' }"
              @click="activeTab = 'submissions'"
              v-if="userStore.isLoggedIn()"
            >
              提交记录
            </button>
          </div>

          <div class="tab-content">
            <div v-show="activeTab === 'problem'" class="problem-info">
              <h1>{{ problem.title }}</h1>
              <div class="problem-meta">
                <span class="difficulty" :class="problem.difficulty">
                  {{ problem.difficulty }}
                </span>
                <span>时间限制: {{ problem.timeLimit }}s</span>
                <span>内存限制: {{ problem.memoryLimit }}MB</span>
              </div>

              <!-- 标签展示 -->
              <div v-if="problem.tags && problem.tags.length > 0" class="problem-tags flex flex-wrap gap-1 mt-4">
                <span 
                  v-for="tag in problem.tags" 
                  :key="tag.id || tag.name" 
                  class="text-xs px-2 py-0.5 rounded-radius-full"
                  :style="{ backgroundColor: (tag.color || '#1677ff') + '20', color: tag.color || '#1677ff' }"
                >
                  {{ tag.name || tag }}
                </span>
              </div>

              <div class="problem-description">
                <h2>题目描述</h2>
                <p>{{ problem.description }}</p>
              </div>

              <div class="problem-format">
                <h2>输入格式</h2>
                <p>{{ problem.inputFormat }}</p>
              </div>

              <div class="problem-format">
                <h2>输出格式</h2>
                <p>{{ problem.outputFormat }}</p>
              </div>

              <div class="problem-samples" v-if="problem.samples && problem.samples.length > 0">
                <h2>样例</h2>
                <div class="sample" v-for="sample in problem.samples" :key="sample.id">
                  <div class="sample-input">
                    <h3>输入</h3>
                    <pre>{{ sample.inputContent }}</pre>
                  </div>
                  <div class="sample-output">
                    <h3>输出</h3>
                    <pre>{{ sample.outputContent }}</pre>
                  </div>
                </div>
              </div>

              <div class="problem-hint" v-if="problem.hint">
                <h2>提示</h2>
                <p>{{ problem.hint }}</p>
              </div>
            </div>

            <div v-show="activeTab === 'submissions'" class="submissions-section" v-if="userStore.isLoggedIn()">
              <div class="submissions-table">
                <table>
                  <thead>
                    <tr>
                      <th>提交ID</th>
                      <th>语言</th>
                      <th>状态</th>
                      <th>提交时间</th>
                      <th>操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="submission in submissions" :key="submission.id">
                      <td>{{ submission.id }}</td>
                      <td>{{ submission.language }}</td>
                      <td :class="getStatusClass(submission.status)">
                        {{ submission.status }}
                      </td>
                      <td>{{ formatTime(submission.submitTime) }}</td>
                      <td>
                        <button @click="viewSubmission(submission.id)">查看详情</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div class="right-section" v-if="userStore.isLoggedIn()">
          <div class="submit-section">
            <div class="language-select">
              <label>选择语言:</label>
              <select v-model="selectedLanguage" class="language-select-input">
                <option value="c">C (GCC 14.1.0)</option>
                <option value="c++">C++ (GCC 14.1.0)</option>
                <option value="java">Java (OpenJDK 17.0.6)</option>
                <option value="python">Python (3.12.2)</option>
                <option value="javascript">JavaScript (Node.js 20.17.0)</option>
                <option value="go">Go (1.22.0)</option>
                <option value="typescript">TypeScript (5.6.2)</option>
                <option value="rust">Rust (1.85.0)</option>
                <option value="php">PHP (8.3.11)</option>
                <option value="ruby">Ruby (2.7.0)</option>
                <option value="scala">Scala (3.4.2)</option>
                <option value="kotlin">Kotlin (2.1.10)</option>
              </select>
            </div>
            <div class="code-editor-wrapper">
              <CodeEditor
                v-model:value="code"
                :language="languageMap[selectedLanguage]"
                theme="custom-dark"
                :height="'100%'"
                :options="{
                  automaticLayout: true,
                  minimap: { enabled: true },
                  scrollBeyondLastLine: false,
                  fontSize: 14,
                  lineNumbers: 'on',
                  scrollbar: {
                    vertical: 'auto',
                    horizontal: 'auto'
                  }
                }"
              />
            </div>
            <button @click="handleSubmit" :disabled="submitting">
              {{ submitting ? '提交中...' : '提交' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="loading" v-else>
      加载中...
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
import { getProblemDetail } from '@/api/problem'
import { submitCode, getProblemSubmissions, getSubmissionDetail } from '@/api/submission'
import { CodeEditor } from 'monaco-editor-vue3'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const problem = ref(null)
const code = ref('')
const selectedLanguage = ref('java')
const submitting = ref(false)
const submissions = ref([])
const activeTab = ref('problem') // 'problem' 或 'submissions'
const codeTextarea = ref(null)

const languageMap = {
  'c': 'c',
  'c++': 'cpp',
  'java': 'java',
  'python': 'python',
  'javascript': 'javascript',
  'go': 'go',
  'typescript': 'typescript',
  'rust': 'rust',
  'php': 'php',
  'ruby': 'ruby',
  'scala': 'scala',
  'kotlin': 'kotlin'
}

const getDefaultCode = (language) => {
  const defaultCodes = {
    'c': '#include <stdio.h>\n\nint main() {\n    // Your code here\n    return 0;\n}',
    'c++': '#include <iostream>\nusing namespace std;\n\nint main() {\n    // Your code here\n    return 0;\n}',
    'java': 'public class Main {\n    public static void main(String[] args) {\n        // Your code here\n    }\n}',
    'python': '# Your code here\n',
    'javascript': '// Your code here\n',
    'go': 'package main\n\nimport "fmt"\n\nfunc main() {\n    // Your code here\n}\n',
    'typescript': '// Your code here\n',
    'rust': 'fn main() {\n    // Your code here\n}\n',
    'php': '<?php\n// Your code here\n?>',
    'ruby': '# Your code here\n',
    'scala': 'object Main extends App {\n  // Your code here\n}\n',
    'kotlin': 'fun main() {\n    // Your code here\n}\n'
  }
  return defaultCodes[language] || ''
}

// 监听语言变化，更新默认代码
watch(selectedLanguage, (newLanguage) => {
  code.value = getDefaultCode(newLanguage)
})

// 计算行数
const lineCount = computed(() => {
  return code.value.split('\n').length
})

// 同步滚动
const syncScroll = (e) => {
  const lineNumbers = e.target.previousElementSibling
  if (lineNumbers) {
    lineNumbers.scrollTop = e.target.scrollTop
  }
}

// 更新行数（用于input事件）
const updateLineCount = () => {
  // 行数会自动通过计算属性更新
}

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

const handleSubmit = async () => {
  if (!code.value.trim()) {
    alert('请输入代码')
    return
  }

  submitting.value = true
  try {
    const res = await submitCode({
      problemId: parseInt(route.params.id),
      code: code.value,
      language: selectedLanguage.value
    })
    // 支持字符串和数字类型的code
    if (res.code == 200) {
      alert('提交成功')
      loadSubmissions()
    } else {
      alert(res.message || '提交失败')
    }
  } catch (error) {
    alert(error.message || '提交失败，请检查网络连接')
  } finally {
    submitting.value = false
  }
}

const loadSubmissions = async () => {
  if (!userStore.isLoggedIn()) return

  try {
    const res = await getProblemSubmissions(route.params.id)
    // 支持字符串和数字类型的code
    if (res.code == 200) {
      submissions.value = res.data
    }
  } catch (error) {
    // 加载提交记录失败
  }
}

const viewSubmission = (id) => {
  // 在新标签页打开提交详情页面
  router.push(`/submission/${id}`)
}

const loadProblem = async () => {
  try {
    const res = await getProblemDetail(route.params.id)
    // 支持字符串和数字类型的code
    if (res.code == 200) {
      problem.value = res.data
    } else {
      alert(res.message || '加载题目失败')
      router.push('/')
    }
  } catch (error) {
    alert('加载题目失败，请检查网络连接')
    router.push('/')
  }
}

onMounted(() => {
  loadProblem()
  loadSubmissions()
  // 初始化默认代码
  code.value = getDefaultCode(selectedLanguage.value)
})
</script>

<style scoped>
.problem-detail-container {
  height: 100vh;
  background: transparent;
  display: flex;
  flex-direction: column;
  overflow: hidden;
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
  flex-shrink: 0;
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

button:disabled {
  background-color: #64748B;
  cursor: not-allowed;
}

.content {
  flex: 1;
  margin: 0;
  padding: 30px 20px;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.main-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  flex: 1;
  min-height: 0;
}

.left-section {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.tabs {
  display: flex;
  background: rgba(30, 41, 59, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 8px 8px 0 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}

.tab-button {
  flex: 1;
  padding: 15px 20px;
  background: rgba(15, 23, 42, 0.5);
  border: none;
  border-radius: 0;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  color: #94A3B8;
  transition: all 0.3s;
}

.tab-button:hover {
  background: rgba(30, 41, 59, 0.8);
  color: #E2E8F0;
}

.tab-button.active {
  background: rgba(30, 41, 59, 0.8);
  color: #00D9FF;
  border-bottom: 2px solid #00D9FF;
}

.tab-content {
  background: rgba(30, 41, 59, 0.8);
  backdrop-filter: blur(10px);
  padding: 30px;
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 0 0 8px 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  flex: 1;
  overflow-y: auto;
}

.right-section {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.problem-info {
  padding: 0;
}

h1 {
  color: #E2E8F0;
  margin-bottom: 20px;
  font-family: 'Orbitron', 'Arial Black', sans-serif;
  text-shadow: 0 0 10px rgba(0, 217, 255, 0.5);
}

.problem-meta {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  flex-wrap: wrap;
  color: #94A3B8;
  align-items: center;
}

.language-select {
  display: flex;
  align-items: center;
  gap: 10px;
}

.language-select label {
  color: #94A3B8;
  font-size: 14px;
}

.language-select-input {
  padding: 6px 10px;
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 4px;
  font-size: 14px;
  background-color: rgba(15, 23, 42, 0.8);
  color: #E2E8F0;
}

.difficulty {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
}

.difficulty.简单 {
  background-color: rgba(76, 175, 80, 0.2);
  color: #4caf50;
}

.difficulty.中等 {
  background-color: rgba(255, 152, 0, 0.2);
  color: #ff9800;
}

.difficulty.困难 {
  background-color: rgba(244, 67, 54, 0.2);
  color: #f44336;
}

.problem-description,
.problem-format,
.problem-samples,
.problem-hint {
  margin-bottom: 30px;
}

.problem-description h2,
.problem-format h2,
.problem-samples h2,
.problem-hint h2 {
  color: #E2E8F0;
  margin-bottom: 15px;
  font-size: 18px;
  font-family: 'Orbitron', 'Arial Black', sans-serif;
}

.problem-description p,
.problem-format p,
.problem-hint p {
  color: #94A3B8;
  line-height: 1.6;
}

.sample {
  background-color: rgba(15, 23, 42, 0.5);
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 15px;
  border: 1px solid rgba(148, 163, 184, 0.2);
}

.sample h3 {
  color: #E2E8F0;
  margin-bottom: 10px;
  font-size: 14px;
}

.sample pre {
  background-color: rgba(15, 23, 42, 0.8);
  padding: 10px;
  border-radius: 4px;
  overflow-x: auto;
  margin: 0;
  color: #94A3B8;
  border: 1px solid rgba(148, 163, 184, 0.2);
}

.submit-section {
  background: rgba(30, 41, 59, 0.8);
  backdrop-filter: blur(10px);
  padding: 30px;
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.submit-section h2 {
  color: #E2E8F0;
  margin-bottom: 20px;
  font-family: 'Orbitron', 'Arial Black', sans-serif;
}

.language-select {
  margin-bottom: 20px;
}

.language-select label {
  display: block;
  margin-bottom: 8px;
  color: #94A3B8;
}

.language-select select {
  width: 100%;
  padding: 10px;
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 4px;
  font-size: 14px;
  background-color: rgba(15, 23, 42, 0.8);
  color: #E2E8F0;
}

.code-editor-wrapper {
  flex: 1;
  overflow: hidden;
  margin-bottom: 20px;
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 4px;
  background-color: rgba(15, 23, 42, 0.8);
}

.line-numbers {
  background-color: rgba(15, 23, 42, 0.8);
  padding: 15px 10px;
  text-align: right;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  color: #64748B;
  line-height: 1.5;
  overflow: hidden;
  user-select: none;
  min-width: 40px;
  border-right: 1px solid rgba(148, 163, 184, 0.2);
}

.line-number {
  height: 21px;
  line-height: 21px;
}

.code-editor {
  flex: 1;
  min-height: 300px;
  padding: 15px;
  border: none;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.5;
  resize: vertical;
  background-color: rgba(15, 23, 42, 0.8);
  overflow: auto;
  color: #E2E8F0;
}

.code-editor:focus {
  outline: none;
}

.submissions-section {
  margin-top: 0;
}

.submissions-section h2 {
  color: #E2E8F0;
  margin-bottom: 20px;
  font-family: 'Orbitron', 'Arial Black', sans-serif;
}

.submissions-table table {
  width: 100%;
  border-collapse: collapse;
}

.submissions-table thead {
  background-color: rgba(15, 23, 42, 0.5);
}

.submissions-table th,
.submissions-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid rgba(148, 163, 184, 0.2);
  color: #94A3B8;
}

.submissions-table th {
  font-weight: 600;
  color: #E2E8F0;
}

.submissions-table tbody tr:hover {
  background-color: rgba(30, 41, 59, 0.5);
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

/* Monaco Editor 样式 */
.code-editor-wrapper :deep(.monaco-editor) {
  height: 100% !important;
  min-height: 300px;
}

.code-editor-wrapper :deep(.monaco-editor .overflow-guard) {
  height: 100% !important;
}

.code-editor-wrapper :deep(.monaco-editor .monaco-editor-background) {
  background-color: #1e293b !important;
}

.code-editor-wrapper :deep(.monaco-editor .margin) {
  background-color: #1e293b !important;
}

.code-editor-wrapper :deep(.monaco-editor .line-numbers) {
  color: #64748b !important;
}

.code-editor-wrapper :deep(.monaco-editor .cursor) {
  border-left-color: #c5cceb !important;
}

.code-editor-wrapper :deep(.monaco-editor .current-line) {
  background-color: rgba(255, 255, 255, 0.05) !important;
}

.code-editor-wrapper :deep(.monaco-editor .selection) {
  background-color: rgba(69, 137, 255, 0.3) !important;
}

.code-editor-wrapper :deep(.monaco-editor .inactive-selection) {
  background-color: rgba(69, 137, 255, 0.15) !important;
}

.code-editor-wrapper :deep(.monaco-editor .suggest-widget) {
  background-color: #29344c !important;
  border: 1px solid #535f79 !important;
}

.code-editor-wrapper :deep(.monaco-editor .suggest-widget .suggestion-item.selected) {
  background-color: #3b4c6b !important;
}

@media (max-width: 1024px) {
  .main-content {
    grid-template-columns: 1fr;
    height: auto;
  }
  
  .left-section,
  .right-section {
    height: auto;
    min-height: 500px;
  }
}
</style>
