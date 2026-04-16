<template>
  <div>
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
          <router-link to="/dashboard" class="nav-item">
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
          <router-link to="/nexus" class="nav-item active">
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
        <!-- 页面头部 -->
        <div class="mb-6">
          <h1 class="text-2xl font-bold text-text-primary">社区</h1>
          <p class="text-text-secondary mt-1">分享题解，交流心得</p>
          <button 
            class="btn btn-primary mt-4" 
            @click="showCreateModal = true"
            v-if="userStore.isLoggedIn()"
          >
            发布题解
          </button>
        </div>

        <!-- 题解列表 -->
        <div class="space-y-6">
          <div 
            v-for="solution in solutions" 
            :key="solution.id"
            class="solution-card"
          >
            <!-- 题解头部 -->
            <div class="flex justify-between items-start mb-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden">
                  <img :src="solution.avatar || '/default-avatar.png'" alt="用户头像" class="w-full h-full object-cover" />
                </div>
                <div>
                  <div class="flex items-center gap-2">
                    <h3 class="font-medium text-text-primary">{{ solution.title }}</h3>
                    <span v-if="solution.isOfficial === 1 || solution.isOfficial === true" class="official-badge">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="#FFD700" stroke="#FFD700" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                      <span class="ml-1 text-xs text-yellow-400">官方</span>
                    </span>
                  </div>
                  <div class="flex items-center gap-2 text-text-secondary text-sm mb-1">
                    <span class="font-medium">{{ formatProblemId(solution.problemId) }}</span>
                    <span>{{ solution.problemTitle }}</span>
                  </div>
                  <p class="text-text-secondary text-sm">{{ solution.nickname }} · {{ solution.createTime }}</p>
                </div>
              </div>
              <span class="text-xs px-2 py-1 bg-bg-tertiary rounded-full">
                {{ solution.language }}
              </span>
            </div>
            
            <!-- Markdown内容渲染 -->
            <div class="bg-bg-tertiary rounded-md p-4 mb-4">
              <div v-if="isCodeContent(solution.contentMd)" class="overflow-x-auto">
                <CodeEditor
                  :value="solution.contentMd"
                  :language="getLanguageFromContent(solution.contentMd)"
                  theme="custom-dark"
                  :height="400"
                  :options="{
                    automaticLayout: true,
                    minimap: { enabled: true },
                    scrollBeyondLastLine: false,
                    fontSize: 14,
                    lineNumbers: 'on',
                    scrollbar: {
                      vertical: 'auto',
                      horizontal: 'auto'
                    },
                    readOnly: true,
                    readOnlyMessage: {
                      value: '不能编辑已发布题解内容',
                      supportThemeIcons: true,
                      supportHtml: true
                    }
                  }"
                />
              </div>
              <div v-else class="markdown-content text-text-secondary text-sm overflow-x-auto" v-html="parseMarkdown(solution.contentMd)"></div>
            </div>
            
            <!-- 题解操作 -->
            <div class="flex justify-between items-center mb-4">
              <div class="flex gap-6">
                <button class="flex items-center gap-2 text-text-secondary hover:text-accent-primary transition-colors" @click="likeSolution(solution.id)" :class="{ 'text-accent-primary': likedSolutions[solution.id] }">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" :fill="likedSolutions[solution.id] ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                  {{ solution.likeCount }}
                </button>
                <button class="flex items-center gap-2 text-text-secondary hover:text-accent-primary transition-colors" @click="toggleComments(solution.id)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                  {{ solution.commentCount }}
                </button>
              </div>
              <div v-if="userStore.user?.id === solution.userId" class="flex gap-4">
                <button class="flex items-center gap-2 text-text-secondary hover:text-accent-primary transition-colors" @click="editSolution(solution)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                  修改
                </button>
                <button class="flex items-center gap-2 text-text-secondary hover:text-red-500 transition-colors" @click="deleteSolution(solution.id)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                  删除
                </button>
              </div>
            </div>
            
            <!-- 评论区 -->
            <div v-if="expandedComments[solution.id]" class="comments-section ml-13 mt-4 space-y-4">
              <!-- 子评论 -->
              <div v-for="comment in solution.comments || []" :key="comment.id" class="comment-item">
                <div class="flex gap-3">
                  <div class="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden">
                    <img :src="comment.avatar || '/default-avatar.png'" alt="用户头像" class="w-full h-full object-cover" />
                  </div>
                  <div class="flex-1">
                    <div class="flex items-center gap-2 mb-1">
                      <span class="text-text-primary text-sm font-medium">{{ comment.nickname }}</span>
                      <span class="text-text-secondary text-xs">{{ comment.createTime }}</span>
                    </div>
                    <p class="text-text-secondary text-sm">{{ comment.content }}</p>
                  </div>
                  <button v-if="userStore.user?.id === comment.userId" class="flex items-center gap-1 text-text-secondary hover:text-red-500 transition-colors" @click="deleteComment(solution.id, comment.id)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                  </button>
                </div>
              </div>
              
              <!-- 评论输入框 -->
              <div class="flex gap-3 items-center">
                <div class="w-8 h-8 bg-bg-tertiary rounded-full flex items-center justify-center">
                  <span class="text-text-primary text-sm">{{ userStore.user?.username?.charAt(0).toUpperCase() || 'U' }}</span>
                </div>
                <div class="flex-1 flex gap-2">
                  <input 
                    type="text" 
                    v-model="commentInputs[solution.id]"
                    class="input flex-1 bg-bg-tertiary border border-bg-tertiary rounded-radius-md px-4 py-2 text-text-primary focus:outline-none focus:border-accent-primary focus:shadow-glow-accent transition-all duration-300"
                    placeholder="写下你的评论..."
                    @keyup.enter="submitComment(solution.id)"
                  />
                  <button 
                    @click="submitComment(solution.id)"
                    class="px-3 py-2 bg-accent-primary text-white rounded-radius-md hover:bg-accent-primary/90 transition-colors duration-300 text-sm font-medium"
                  >
                    评论
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <!-- 发布题解模态框 -->
      <div v-if="showCreateModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-bg-secondary rounded-radius-md p-6 w-full max-w-2xl">
          <h2 class="text-xl font-bold text-text-primary mb-4">发布题解</h2>
          <form @submit.prevent="createSolution">
            <div class="mb-4">
              <label class="block text-text-secondary text-sm mb-2">题目编号</label>
              <input 
                type="text" 
                v-model="solutionForm.problemId"
                class="input w-full"
                placeholder="请输入题目编号，例如 T0001"
                required
              />
            </div>
            <div class="mb-4">
              <label class="block text-text-secondary text-sm mb-2">标题</label>
              <input 
                type="text" 
                v-model="solutionForm.title"
                class="input w-full"
                placeholder="请输入题解标题"
                required
              />
            </div>
            <div class="mb-4">
              <label class="block text-text-secondary text-sm mb-2">编程语言</label>
              <select 
                v-model="solutionForm.language"
                class="input w-full"
                required
              >
                <option value="python">Python(3.12.2)</option>
                <option value="java">Java(OpenJDK 17.0.6)</option>
                <option value="c">C(GCC 14.1.0)</option>
                <option value="c++">C++(GCC 14.1.0)</option>
                <option value="javascript">JavaScript(Node.js 20.17.0)</option>
                <option value="go">Go(1.22.0)</option>
                <option value="typescript">TypeScript(5.6.2)</option>
                <option value="rust">Rust(1.85.0)</option>
                <option value="php">PHP(8.3.11)</option>
                <option value="ruby">Ruby(2.7.0)</option>
                <option value="scala">Scala(3.4.2)</option>
                <option value="kotlin">Kotlin(2.1.10)</option>
              </select>
            </div>
            <div class="mb-4">
              <label class="block text-text-secondary text-sm mb-2">题解内容 (Markdown格式)</label>
              <CodeEditor
                v-model:value="solutionForm.contentMd"
                :language="getMonacoLanguage(solutionForm.language)"
                theme="custom-dark"
                :height="400"
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
            <div class="flex justify-end gap-4">
              <button type="button" class="btn btn-secondary" @click="resetForm">重置</button>
              <button type="button" class="btn btn-secondary" @click="showCreateModal = false">取消</button>
              <button type="submit" class="btn btn-primary">发布</button>
            </div>
          </form>
        </div>
      </div>

      <!-- 编辑题解模态框 -->
      <div v-if="showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-bg-secondary rounded-lg p-6 w-full max-w-2xl">
          <h2 class="text-2xl font-bold mb-6 text-text-primary">修改题解</h2>
          <form @submit.prevent="saveEditSolution">
            <div class="mb-4">
              <label class="block text-text-secondary text-sm mb-2">题目编号</label>
              <input v-model="solutionForm.problemId" type="text" class="w-full bg-bg-tertiary border border-border rounded-md px-4 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary" placeholder="请输入题目编号，例如 T0001">
            </div>
            <div class="mb-4">
              <label class="block text-text-secondary text-sm mb-2">题解标题</label>
              <input v-model="solutionForm.title" type="text" class="w-full bg-bg-tertiary border border-border rounded-md px-4 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary">
            </div>
            <div class="mb-4">
              <label class="block text-text-secondary text-sm mb-2">编程语言</label>
              <select v-model="solutionForm.language" class="w-full bg-bg-tertiary border border-border rounded-md px-4 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary">
                <option value="java">Java(OpenJDK 17.0.6)</option>
                <option value="python">Python(3.9.13)</option>
                <option value="c">C(GCC 11.2.0)</option>
                <option value="c++">C++(GCC 11.2.0)</option>
                <option value="javascript">JavaScript(Node.js 16.14.0)</option>
                <option value="go">Go(1.18.3)</option>
                <option value="typescript">TypeScript(4.7.4)</option>
                <option value="rust">Rust(1.61.0)</option>
                <option value="php">PHP(8.1.6)</option>
                <option value="ruby">Ruby(3.0.3)</option>
                <option value="scala">Scala(3.4.2)</option>
                <option value="kotlin">Kotlin(1.7.10)</option>
              </select>
            </div>
            <div class="mb-4">
              <label class="block text-text-secondary text-sm mb-2">题解内容 (Markdown格式)</label>
              <CodeEditor
                v-model:value="solutionForm.contentMd"
                :language="getMonacoLanguage(solutionForm.language)"
                theme="custom-dark"
                :height="400"
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
            <div class="flex justify-end gap-4">
              <button type="button" class="btn btn-secondary" @click="showEditModal = false">取消</button>
              <button type="submit" class="btn btn-primary">保存修改</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, watch, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { getSolutions, createSolution as createSolutionApi, updateSolution as updateSolutionApi, likeSolution as likeSolutionApi, cancelLikeSolution, getSolutionComments, commentSolution, deleteSolution as deleteSolutionApi, deleteComment as deleteCommentApi } from '@/api/solution'
import { useUserStore } from '@/store/user'
import { marked } from 'marked'
import { CodeEditor } from 'monaco-editor-vue3'
import { formatProblemId } from '@/utils/formatters'

const router = useRouter()

const userStore = useUserStore()

// 题解列表
const solutions = ref([])

// 评论展开状态
const expandedComments = ref({})

// 评论输入框
const commentInputs = ref({})

// 发布题解模态框
const showCreateModal = ref(false)

// 编辑题解模态框
const showEditModal = ref(false)

// 当前编辑的题解ID
const currentEditSolutionId = ref(null)

// 题解表单
const solutionForm = ref({
  problemId: '',
  title: '',
  language: 'java',
  contentMd: 'public class Main {\n    public static void main(String[] args) {\n        // Your code here\n    }\n}'
})

// 获取Monaco支持的语言名称
const getMonacoLanguage = (lang) => {
  const langMap = {
    'c++': 'cpp',
    'c': 'c',
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
  return langMap[lang] || 'plaintext'
}

// 判断内容是否为代码
const isCodeContent = (content) => {
  // 简单判断：如果内容包含常见的代码结构，则认为是代码
  const codePatterns = [
    'public class',
    'def ',
    'function ',
    '#include ',
    'import ',
    'package ',
    'class ',
    'void main'
  ]
  return codePatterns.some(pattern => content.includes(pattern))
}

// 从内容中检测语言
const getLanguageFromContent = (content) => {
  // 简单的语言检测逻辑
  if (content.includes('public class') || content.includes('import java')) {
    return 'java'
  } else if (content.includes('def ') || content.includes('import ')) {
    return 'python'
  } else if (content.includes('#include ')) {
    return content.includes('.cpp') || content.includes('iostream') ? 'cpp' : 'c'
  } else if (content.includes('function ') || content.includes('const ')) {
    return 'javascript'
  } else if (content.includes('package main') || content.includes('func ')) {
    return 'go'
  } else if (content.includes('fn main')) {
    return 'rust'
  } else if (content.includes('<?php')) {
    return 'php'
  } else if (content.includes('def ')) {
    return 'ruby'
  } else if (content.includes('object Main') || content.includes('def main')) {
    return 'scala'
  } else if (content.includes('fun main')) {
    return 'kotlin'
  } else {
    return 'plaintext'
  }
}

// 已点赞的题解
const likedSolutions = ref({})

// 默认起始代码
const defaultCode = {
  java: 'public class Main {\n    public static void main(String[] args) {\n        // Your code here\n    }\n}',
  python: 'def main():\n    # code here\n\nif __name__ == "__main__":\n    main()',
  c: '#include <stdio.h>\n\nint main() {\n    // code here\n    return 0;\n}',
  'c++': '#include <iostream>\n\nint main() {\n    // code here\n    return 0;\n}',
  javascript: 'function main() {\n    // code here\n}\n\nmain();',
  go: 'package main\n\nfunc main() {\n    // code here\n}',
  typescript: 'function main(): void {\n    // code here\n}\n\nmain();',
  rust: 'fn main() {\n    // code here\n}',
  php: '<?php\nfunction main() {\n    // code here\n}\n\nmain();\n?>',
  ruby: 'def main\n  # code here\nend\n\nmain',
  scala: 'object Main {\n  def main(args: Array[String]): Unit = {\n    // code here\n  }\n}',
  kotlin: 'fun main() {\n    // code here\n}'
}

// 监听语言变化
watch(() => solutionForm.value.language, (newLang) => {
  if (showCreateModal.value && newLang) {
    // 更新内容为对应语言的默认代码
    solutionForm.value.contentMd = defaultCode[newLang] || ''
  }
})

// 重置表单
const resetForm = () => {
  solutionForm.value = {
    problemId: '',
    title: '',
    language: 'java',
    contentMd: defaultCode['java'] || 'public class Main {\n    public static void main(String[] args) {\n        // Your code here\n    }\n}'
  }
}

// 获取题解列表
const fetchSolutions = async () => {
  try {
    const response = await getSolutions()
    if (response.code === '200') {
      solutions.value = response.data
    }
  } catch (error) {
  }
}

// 发布题解
const createSolution = async () => {
  try {
    // 解析题目编号
    let problemId = solutionForm.value.problemId
    // 如果是 T 开头的编号格式，解析为数字
    if (typeof problemId === 'string' && problemId.startsWith('T')) {
      // 提取 T 后面的数字部分
      const numPart = problemId.substring(1)
      // 转换为整型数字
      problemId = parseInt(numPart, 10)
      // 验证解析结果
      if (isNaN(problemId)) {
        alert('题目编号格式错误，请输入正确的题目编号，例如 T0001')
        return
      }
    } else if (typeof problemId === 'string') {
      // 如果是纯数字字符串，直接转换为数字
      problemId = parseInt(problemId, 10)
      if (isNaN(problemId)) {
        alert('题目编号格式错误，请输入正确的题目编号，例如 T0001')
        return
      }
    }
    
    // 为管理员设置isOfficial=1
    const formData = {
      ...solutionForm.value,
      problemId: problemId,
      userId: userStore.user?.id,
      isOfficial: userStore.isAdmin() ? 1 : 0
    }
    const response = await createSolutionApi(formData)
    if (response.code === '200') {
      // 先设置表单为默认值
      solutionForm.value = {
        problemId: '',
        title: '',
        language: 'python',
        contentMd: ''
      }
      // 关闭模态框
      showCreateModal.value = false
      // 显示成功提示
      alert('发布题解成功！')
      await fetchSolutions()
    } else {
      // 显示失败提示
      alert('发布题解失败: ' + (response.message || '未知错误'))
    }
  } catch (error) {
    console.error('发布题解失败:', error)
    // 显示失败提示
    alert('发布题解失败，请稍后重试')
  }
}

// 编辑题解
const editSolution = (solution) => {
  // 填充表单数据，将数字类型的 problemId 转换为题目编号格式
  let problemId = solution.problemId
  if (typeof problemId === 'number') {
    // 转换为 T 开头的编号格式，例如 1 → T0001
    problemId = 'T' + problemId.toString().padStart(4, '0')
  }
  solutionForm.value = {
    problemId: problemId,
    title: solution.title,
    language: solution.language,
    contentMd: solution.contentMd
  }
  // 设置当前编辑的题解ID
  currentEditSolutionId.value = solution.id
  // 打开编辑模态框
  showEditModal.value = true
}

// 保存编辑的题解
const saveEditSolution = async () => {
  try {
    // 解析题目编号
    let problemId = solutionForm.value.problemId
    // 如果是 T 开头的编号格式，解析为数字
    if (typeof problemId === 'string' && problemId.startsWith('T')) {
      // 提取 T 后面的数字部分
      const numPart = problemId.substring(1)
      // 转换为整型数字
      problemId = parseInt(numPart, 10)
      // 验证解析结果
      if (isNaN(problemId)) {
        alert('题目编号格式错误，请输入正确的题目编号，例如 T0001')
        return
      }
    } else if (typeof problemId === 'string') {
      // 如果是纯数字字符串，直接转换为数字
      problemId = parseInt(problemId, 10)
      if (isNaN(problemId)) {
        alert('题目编号格式错误，请输入正确的题目编号，例如 T0001')
        return
      }
    }
    
    const formData = {
      id: currentEditSolutionId.value,
      ...solutionForm.value,
      problemId: problemId,
      userId: userStore.user?.id,
      isOfficial: userStore.isAdmin() ? 1 : 0
    }
    const response = await updateSolutionApi(formData)
    if (response.code === '200') {
      // 先设置表单为默认值
      solutionForm.value = {
        problemId: '',
        title: '',
        language: 'python',
        contentMd: ''
      }
      // 关闭模态框
      showEditModal.value = false
      // 重置当前编辑的题解ID
      currentEditSolutionId.value = null
      // 显示成功提示
      alert('修改题解成功！')
      await fetchSolutions()
    } else {
      // 显示失败提示
      alert('修改题解失败: ' + (response.message || '未知错误'))
    }
  } catch (error) {
    console.error('修改题解失败:', error)
    // 显示失败提示
    alert('修改题解失败，请稍后重试')
  }
}

// 点赞功能
const likeSolution = async (solutionId) => {
  try {
    if (likedSolutions.value[solutionId]) {
      // 取消点赞
      const response = await cancelLikeSolution(solutionId)
      if (response.code === '200') {
        // 取消标记
        likedSolutions.value[solutionId] = false
        
        // 自减点赞数
        const solution = solutions.value.find(s => s.id === solutionId)
        if (solution) {
          solution.likeCount = Math.max(0, solution.likeCount - 1)
        }
      }
    } else {
      // 点赞
      const response = await likeSolutionApi(solutionId)
      if (response.code === '200') {
        // 标记为已点赞
        likedSolutions.value[solutionId] = true
        
        // 自增点赞数
        const solution = solutions.value.find(s => s.id === solutionId)
        if (solution) {
          solution.likeCount++
        }
      }
    }
  } catch (error) {
  }
}

// 获取评论功能
const toggleComments = async (solutionId) => {
  expandedComments.value[solutionId] = !expandedComments.value[solutionId]
  
  if (expandedComments.value[solutionId]) {
    if (!commentInputs.value[solutionId]) {
      commentInputs.value[solutionId] = ''
    }
    
    // 调用获取评论接口
    try {
      const response = await getSolutionComments(solutionId)
      if (response.code === '200') {
        const solution = solutions.value.find(s => s.id === solutionId)
        if (solution) {
          solution.comments = response.data
        }
      }
    } catch (error) {
    }
  }
}

// 提交评论
const submitComment = async (solutionId) => {
  const content = commentInputs.value[solutionId]?.trim()
  if (!content) return
  
  // 调用提交评论接口
  try {
    const response = await commentSolution({
      solutionId: solutionId,
      userId: userStore.user?.id,
      content: content
    })
    
    if (response.code === '200') {
      // 清空输入框
      commentInputs.value[solutionId] = ''
      
      // 刷新评论列表
      await toggleComments(solutionId)
      await toggleComments(solutionId)
    }
  } catch (error) {
  }
}

// 删除题解
const deleteSolution = async (solutionId) => {
  if (!confirm('确定要删除这个题解吗？')) return
  
  try {
    const response = await deleteSolutionApi(solutionId)
    if (response.code === '200') {
      // 重新获取题解列表
      await fetchSolutions()
    }
  } catch (error) {
  }
}

// 删除评论
const deleteComment = async (solutionId, commentId) => {
  if (!confirm('确定要删除这个评论吗？')) return
  
  try {
    const response = await deleteCommentApi(solutionId, commentId)
    if (response.code === '200') {
      // 刷新评论列表
      await toggleComments(solutionId)
      await toggleComments(solutionId)
    }
  } catch (error) {
  }
}

// 计算属性：将 markdown 转换为 HTML
const parseMarkdown = (text) => {
  // 保持原始文本，不做任何处理
  let processedText = text || '';
  return marked(processedText);
}



// 处理个人中心点击
const handleProfileClick = () => {
  if (userStore.isLoggedIn()) {
    // 跳转到个人中心页面
    router.push('/profile')
  } else {
    // 跳转到登录页面
    router.push('/login')
  }
}

// 处理退出登录
const handleLogout = () => {
  userStore.logout()
  // 跳转到登录页面
  router.push('/login')
}

onMounted(() => {
  fetchSolutions()
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

.solution-card {
  background-color: var(--bg-secondary);
  border-radius: var(--radius-md);
  padding: 1.5rem;
  transition: all var(--duration-normal) var(--ease-out-expo);
  border: 1px solid var(--bg-tertiary);
}

.solution-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--glow-accent);
}

.official-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: 4px;
}

.comments-section {
  border-top: 1px solid var(--bg-tertiary);
  padding-top: 1rem;
}

.comment-item {
  margin-bottom: 1rem;
}

/* Markdown 内容样式 */
.markdown-content {
  line-height: 1.6;
}

.markdown-content h1,
.markdown-content h2,
.markdown-content h3,
.markdown-content h4,
.markdown-content h5,
.markdown-content h6 {
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  font-weight: 600;
  line-height: 1.3;
}

.markdown-content p {
  margin-bottom: 1rem;
}

.markdown-content ul,
.markdown-content ol {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
}

.markdown-content li {
  margin-bottom: 0.5rem;
}

.markdown-content code {
  font-family: 'Fira Code', 'Courier New', monospace;
  font-size: 0.875rem;
  padding: 0.25rem 0.5rem;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

.markdown-content pre {
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-word;
}

.markdown-content pre code {
  background-color: transparent;
  padding: 0;
  border-radius: 0;
}

.markdown-content blockquote {
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.05);
  border-left: 4px solid var(--accent-primary);
  border-radius: 0 8px 8px 0;
}

.markdown-content table {
  margin-bottom: 1rem;
  width: 100%;
  border-collapse: collapse;
}

.markdown-content th,
.markdown-content td {
  padding: 0.75rem;
  border: 1px solid var(--bg-tertiary);
  text-align: left;
}

.markdown-content th {
  background-color: rgba(255, 255, 255, 0.05);
  font-weight: 600;
}

.markdown-content img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 1rem;
}
</style>