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
        <router-link to="/dashboard" class="nav-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="8" x="2" y="2" rx="2"/><rect width="20" height="8" x="2" y="14" rx="2"/><line x1="6" x2="6" y1="6" y2="18"/></svg>
          <span>仪表盘</span>
        </router-link>
        <router-link to="/problems" class="nav-item active">
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
    <main class="flex-1 ml-64 p-6">
      <div class="mb-6">
        <h1 class="text-3xl font-bold">题目列表</h1>
        <p class="text-text-secondary">探索并解决各种算法问题</p>
      </div>

      <!-- 顶部筛选栏 -->
      <div class="bg-bg-secondary rounded-radius-md p-4 mb-6">
        <div class="flex flex-wrap gap-4 items-center">
          <div class="flex-1">
            <input 
              type="text" 
              v-model="searchKeyword" 
              placeholder="搜索题目..." 
              class="input w-full"
              @keyup.enter="handleSearch"
            />
          </div>
          <div class="flex gap-2">
            <button 
              v-for="difficulty in difficulties" 
              :key="difficulty.value"
              class="px-4 py-2 rounded-radius-md transition-all duration-300"
              :class="selectedDifficulty === difficulty.value ? 'bg-accent-primary text-bg-primary' : 'bg-bg-tertiary text-text-primary hover:bg-bg-secondary'"
              @click="selectedDifficulty = selectedDifficulty === difficulty.value ? '' : difficulty.value; handleSearch()"
            >
              {{ difficulty.label }}
            </button>
          </div>
          <div v-if="userStore.isAdmin()" class="flex gap-2">
            <button class="btn btn-secondary" @click="showAddModal = true">添加题目</button>
            <button class="btn btn-secondary" @click="showAIModal = true">AI生成题目</button>
          </div>
          <button class="btn btn-primary" @click="handleSearch">搜索</button>
        </div>
      </div>

      <!-- 题目表格 -->
      <div class="bg-bg-secondary rounded-radius-md overflow-hidden">
        <div v-if="loading" class="flex items-center justify-center h-64">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-primary"></div>
        </div>
        <div v-else-if="problems.length === 0" class="flex items-center justify-center h-64 text-text-secondary">
          暂无题目
        </div>
        <table v-else class="w-full">
          <thead>
            <tr class="border-b border-bg-tertiary">
              <th class="px-6 py-4 text-left text-text-secondary">编号</th>
              <th class="px-6 py-4 text-left text-text-secondary">题目</th>
              <th class="px-6 py-4 text-left text-text-secondary">标签</th>
              <th class="px-6 py-4 text-left text-text-secondary">难度</th>
              <th class="px-6 py-4 text-left text-text-secondary">通过率</th>
              <th v-if="userStore.isAdmin()" class="px-6 py-4 text-left text-text-secondary">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="problem in problems" 
              :key="problem.problemId"
              class="border-b border-bg-tertiary hover:bg-bg-tertiary transition-all duration-300 cursor-pointer"
              @click="openProblemDetail(problem.problemId)"
            >
              <td class="px-6 py-4 text-text-secondary">{{ formatProblemId(problem.problemId) }}</td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-2">
                  <div class="w-1 h-8 bg-accent-primary rounded-full transition-all duration-300 group-hover:w-2"></div>
                  <span class="text-text-primary hover:text-accent-primary transition-colors">{{ problem.title }}</span>
                </div>
              </td>
              <td class="px-6 py-4">
                <div v-if="problem.tags && problem.tags.length > 0" class="flex flex-wrap gap-1">
                  <span 
                    v-for="tag in problem.tags" 
                    :key="tag.id || tag.name" 
                    class="text-xs px-2 py-0.5 rounded-radius-full"
                    :style="{ backgroundColor: (tag.color || '#1677ff') + '20', color: tag.color || '#1677ff' }"
                  >
                    {{ tag.name || tag }}
                  </span>
                </div>
              </td>
              <td class="px-6 py-4">
                <span 
                  class="px-2 py-1 rounded-radius-full text-xs"
                  :class="{
                    'bg-success/20 text-success': problem.difficulty === '简单',
                    'bg-warning/20 text-warning': problem.difficulty === '中等',
                    'bg-error/20 text-error': problem.difficulty === '困难'
                  }"
                >
                  {{ problem.difficulty }}
                </span>
              </td>
              <td class="px-6 py-4 text-text-secondary">{{ problem.passRate }}</td>
              <td v-if="userStore.isAdmin()" class="px-6 py-4">
                <div class="flex gap-2">
                  <button 
                    class="px-2 py-1 text-xs bg-accent-primary text-bg-primary rounded-radius-md hover:bg-accent-primary/90 transition-colors"
                    @click.stop="handleEditProblem(problem.problemId)"
                  >
                    修改
                  </button>
                  <button 
                    class="px-2 py-1 text-xs bg-error text-bg-primary rounded-radius-md hover:bg-error/90 transition-colors"
                    @click.stop="handleDeleteProblem(problem.problemId)"
                  >
                    删除
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 分页 -->
      <div class="mt-6 flex justify-center">
        <div class="flex gap-2">
          <button 
            class="btn btn-secondary px-4 py-2" 
            :disabled="currentPage === 1" 
            @click="handlePrevPage"
          >
            上一页
          </button>
          <button 
            v-for="page in pageNumbers" 
            :key="page"
            class="btn px-4 py-2"
            :class="currentPage === page ? 'btn-primary' : 'btn-secondary'"
            @click="handlePageChange(page)"
          >
            {{ page }}
          </button>
          <button 
            class="btn btn-secondary px-4 py-2" 
            :disabled="currentPage === totalPages" 
            @click="handleNextPage"
          >
            下一页
          </button>
        </div>
      </div>

      <!-- 编辑题目模态框 -->
      <div v-if="showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-bg-secondary rounded-radius-md p-6 w-full max-w-2xl max-h-[90vh] flex flex-col">
          <h2 class="text-xl font-bold text-text-primary mb-4">修改题目</h2>
          <form @submit.prevent="submitEdit" class="flex-1 overflow-y-auto">
            <div class="mb-4">
              <label class="block text-text-secondary text-sm mb-2">题目标题</label>
              <input 
                type="text" 
                v-model="editForm.title"
                class="input w-full"
                placeholder="请输入题目标题"
                required
              />
            </div>
            <div class="mb-4">
              <label class="block text-text-secondary text-sm mb-2">题目描述</label>
              <textarea 
                v-model="editForm.description"
                class="input w-full h-32"
                placeholder="请输入题目描述"
                required
              ></textarea>
            </div>
            <div class="mb-4">
              <label class="block text-text-secondary text-sm mb-2">输入格式</label>
              <textarea 
                v-model="editForm.inputFormat"
                class="input w-full h-24"
                placeholder="请输入输入格式"
              ></textarea>
            </div>
            <div class="mb-4">
              <label class="block text-text-secondary text-sm mb-2">输出格式</label>
              <textarea 
                v-model="editForm.outputFormat"
                class="input w-full h-24"
                placeholder="请输入输出格式"
              ></textarea>
            </div>
            <div class="mb-4">
              <label class="block text-text-secondary text-sm mb-2">提示</label>
              <textarea 
                v-model="editForm.hint"
                class="input w-full h-20"
                placeholder="请输入提示"
              ></textarea>
            </div>
            <div class="mb-4">
              <label class="block text-text-secondary text-sm mb-2">难度</label>
              <select 
                v-model="editForm.difficulty"
                class="input w-full"
                required
              >
                <option value="简单">简单</option>
                <option value="中等">中等</option>
                <option value="困难">困难</option>
              </select>
            </div>
            <div class="mb-4">
              <label class="block text-text-secondary text-sm mb-2">时间限制 (秒)</label>
              <input 
                type="number" 
                v-model.number="editForm.timeLimit"
                class="input w-full"
                min="1"
                max="20"
                required
              />
              <p class="text-text-secondary text-xs mt-1">时间限制不超过20秒</p>
            </div>
            <div class="mb-4">
              <label class="block text-text-secondary text-sm mb-2">内存限制 (MB)</label>
              <input 
                type="number" 
                v-model.number="editForm.memoryLimit"
                class="input w-full"
                min="1"
                max="2048"
                required
              />
              <p class="text-text-secondary text-xs mt-1">内存限制不超过2048MB (2GB)</p>
            </div>
            <!-- 标签管理 -->
            <div class="mb-4">
              <div class="flex justify-between items-center mb-2">
                <label class="block text-text-secondary text-sm">标签</label>
                <button type="button" class="btn btn-sm btn-secondary" @click="addEditTag">+ 添加标签</button>
              </div>
              
              <div v-for="(tag, index) in editForm.tags" :key="index" class="border border-border-primary rounded-radius-md p-3 mb-2">
                <div class="flex justify-between items-start mb-2">
                  <h4 class="text-text-primary font-medium">标签 {{ index + 1 }}</h4>
                  <button 
                    type="button" 
                    class="btn btn-sm btn-danger" 
                    @click="removeEditTag(index)"
                    :disabled="editForm.tags.length <= 1"
                  >
                    - 删除
                  </button>
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-text-secondary text-sm mb-1">标签名称</label>
                    <input 
                      type="text" 
                      v-model="tag.name"
                      class="input w-full"
                      placeholder="例如: 数组"
                    />
                  </div>
                  <div>
                    <label class="block text-text-secondary text-sm mb-1">标签颜色</label>
                    <div class="flex items-center gap-2">
                      <input 
                        type="color" 
                        v-model="tag.color"
                        class="w-10 h-10 rounded-full cursor-pointer"
                      />
                      <input 
                        type="text" 
                        v-model="tag.color"
                        class="input flex-1"
                        placeholder="#1677ff"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- 样例管理 -->
            <div class="mb-4">
              <div class="flex justify-between items-center mb-2">
                <label class="block text-text-secondary text-sm">样例</label>
                <button type="button" class="btn btn-sm btn-secondary" @click="addEditSample">+ 添加样例</button>
              </div>
              
              <div v-for="(sample, index) in editForm.samples" :key="index" class="border border-border-primary rounded-radius-md p-3 mb-2">
                <div class="flex justify-between items-start mb-2">
                  <h4 class="text-text-primary font-medium">样例 {{ index + 1 }}</h4>
                  <div class="flex gap-2">
                    <div class="flex items-center">
                      <label class="text-text-secondary text-sm mr-2">是否示例</label>
                      <input 
                        :checked="sample.isExample === 1" 
                        @change="sample.isExample = $event.target.checked ? 1 : 0" 
                        type="checkbox" 
                        class="w-4 h-4 rounded border-border-primary"
                      />
                    </div>
                    <button 
                      type="button" 
                      class="btn btn-sm btn-danger" 
                      @click="removeEditSample(index)"
                      :disabled="editForm.samples.length <= 1"
                    >
                      - 删除
                    </button>
                  </div>
                </div>
                
                <div class="mb-2">
                  <label class="block text-text-secondary text-sm mb-1">输入</label>
                  <textarea 
                    v-model="sample.inputContent" 
                    class="input w-full h-20"
                    placeholder="输入样例内容"
                  ></textarea>
                </div>
                
                <div>
                  <label class="block text-text-secondary text-sm mb-1">输出</label>
                  <textarea 
                    v-model="sample.outputContent" 
                    class="input w-full h-20"
                    placeholder="输出样例内容"
                  ></textarea>
                </div>
              </div>
            </div>
            
            <div class="flex justify-end gap-4 mt-6">
              <button type="button" class="btn btn-secondary" @click="showEditModal = false">取消</button>
              <button type="submit" class="btn btn-primary">保存修改</button>
            </div>
          </form>
        </div>
      </div>

      <!-- 添加题目模态框 -->
      <div v-if="showAddModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-bg-secondary rounded-radius-md p-6 w-full max-w-2xl max-h-[90vh] flex flex-col">
          <h2 class="text-xl font-bold text-text-primary mb-4">添加题目</h2>
          <form @submit.prevent="submitAdd" class="flex-1 overflow-y-auto">
            <div class="mb-4">
              <label class="block text-text-secondary text-sm mb-2">题目标题</label>
              <input 
                type="text" 
                v-model="addForm.title"
                class="input w-full"
                placeholder="请输入题目标题"
                required
              />
            </div>
            <div class="mb-4">
              <label class="block text-text-secondary text-sm mb-2">题目描述</label>
              <textarea 
                v-model="addForm.description"
                class="input w-full h-32"
                placeholder="请输入题目描述"
                required
              ></textarea>
            </div>
            <div class="mb-4">
              <label class="block text-text-secondary text-sm mb-2">输入格式</label>
              <textarea 
                v-model="addForm.inputFormat"
                class="input w-full h-24"
                placeholder="请输入输入格式"
              ></textarea>
            </div>
            <div class="mb-4">
              <label class="block text-text-secondary text-sm mb-2">输出格式</label>
              <textarea 
                v-model="addForm.outputFormat"
                class="input w-full h-24"
                placeholder="请输入输出格式"
              ></textarea>
            </div>
            <div class="mb-4">
              <label class="block text-text-secondary text-sm mb-2">提示</label>
              <textarea 
                v-model="addForm.hint"
                class="input w-full h-20"
                placeholder="请输入提示"
              ></textarea>
            </div>
            <div class="mb-4">
              <label class="block text-text-secondary text-sm mb-2">难度</label>
              <select 
                v-model="addForm.difficulty"
                class="input w-full"
                required
              >
                <option value="简单">简单</option>
                <option value="中等">中等</option>
                <option value="困难">困难</option>
              </select>
            </div>
            <div class="mb-4">
              <label class="block text-text-secondary text-sm mb-2">时间限制 (秒)</label>
              <input 
                type="number" 
                v-model.number="addForm.timeLimit"
                class="input w-full"
                min="1"
                max="20"
                required
              />
              <p class="text-text-secondary text-xs mt-1">时间限制不超过20秒</p>
            </div>
            <div class="mb-4">
              <label class="block text-text-secondary text-sm mb-2">内存限制 (MB)</label>
              <input 
                type="number" 
                v-model.number="addForm.memoryLimit"
                class="input w-full"
                min="1"
                max="2048"
                required
              />
              <p class="text-text-secondary text-xs mt-1">内存限制不超过2048MB (2GB)</p>
            </div>
            <!-- 标签管理 -->
            <div class="mb-4">
              <div class="flex justify-between items-center mb-2">
                <label class="block text-text-secondary text-sm">标签</label>
                <button type="button" class="btn btn-sm btn-secondary" @click="addTag">+ 添加标签</button>
              </div>
              
              <div v-for="(tag, index) in addForm.tags" :key="index" class="border border-border-primary rounded-radius-md p-3 mb-2">
                <div class="flex justify-between items-start mb-2">
                  <h4 class="text-text-primary font-medium">标签 {{ index + 1 }}</h4>
                  <button 
                    type="button" 
                    class="btn btn-sm btn-danger" 
                    @click="removeTag(index)"
                    :disabled="addForm.tags.length <= 1"
                  >
                    - 删除
                  </button>
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-text-secondary text-sm mb-1">标签名称</label>
                    <input 
                      type="text" 
                      v-model="tag.name"
                      class="input w-full"
                      placeholder="例如: 数组"
                    />
                  </div>
                  <div>
                    <label class="block text-text-secondary text-sm mb-1">标签颜色</label>
                    <div class="flex items-center gap-2">
                      <input 
                        type="color" 
                        v-model="tag.color"
                        class="w-10 h-10 rounded-full cursor-pointer"
                      />
                      <input 
                        type="text" 
                        v-model="tag.color"
                        class="input flex-1"
                        placeholder="#1677ff"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- 样例管理 -->
            <div class="mb-4">
              <div class="flex justify-between items-center mb-2">
                <label class="block text-text-secondary text-sm">样例</label>
                <button type="button" class="btn btn-sm btn-secondary" @click="addSample">+ 添加样例</button>
              </div>
              
              <div v-for="(sample, index) in addForm.samples" :key="index" class="border border-border-primary rounded-radius-md p-3 mb-2">
                <div class="flex justify-between items-start mb-2">
                  <h4 class="text-text-primary font-medium">样例 {{ index + 1 }}</h4>
                  <div class="flex gap-2">
                    <div class="flex items-center">
                      <label class="text-text-secondary text-sm mr-2">是否示例</label>
                      <input 
                        :checked="sample.isExample === 1" 
                        @change="sample.isExample = $event.target.checked ? 1 : 0" 
                        type="checkbox" 
                        class="w-4 h-4 rounded border-border-primary"
                      />
                    </div>
                    <button 
                      type="button" 
                      class="btn btn-sm btn-danger" 
                      @click="removeSample(index)"
                      :disabled="addForm.samples.length <= 1"
                    >
                      - 删除
                    </button>
                  </div>
                </div>
                
                <div class="mb-2">
                  <label class="block text-text-secondary text-sm mb-1">输入</label>
                  <textarea 
                    v-model="sample.inputContent" 
                    class="input w-full h-20"
                    placeholder="输入样例内容"
                  ></textarea>
                </div>
                
                <div>
                  <label class="block text-text-secondary text-sm mb-1">输出</label>
                  <textarea 
                    v-model="sample.outputContent" 
                    class="input w-full h-20"
                    placeholder="输出样例内容"
                  ></textarea>
                </div>
              </div>
            </div>
            
            <div class="flex justify-end gap-4 mt-6">
              <button type="button" class="btn btn-secondary" @click="showAddModal = false">取消</button>
              <button type="submit" class="btn btn-primary">添加题目</button>
            </div>
          </form>
        </div>
      </div>

      <!-- AI生成题目模态框 -->
      <div v-if="showAIModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-bg-secondary rounded-radius-md p-6 w-full max-w-2xl max-h-[90vh] flex flex-col">
          <h2 class="text-xl font-bold text-text-primary mb-4">AI生成题目</h2>
          <form @submit.prevent="generateAIProblem" class="mb-4">
            <div class="mb-4">
              <label class="block text-text-secondary text-sm mb-2">提示词</label>
              <textarea 
                v-model="aiPrompt"
                class="input w-full h-24"
                placeholder="例如: 生成一道关于数组的中等难度题目，要求使用动态规划解决"
                required
              ></textarea>
            </div>
            <div class="flex justify-end gap-4">
              <button type="button" class="btn btn-secondary" @click="resetAIGenerate">重置</button>
              <button type="button" class="btn btn-secondary" @click="showAIModal = false">取消</button>
              <button type="submit" class="btn btn-primary" :disabled="aiGenerating">
                {{ aiGenerating ? '生成中...' : '生成题目' }}
              </button>
            </div>
          </form>
          <!-- AI生成结果 -->
          <div v-if="aiGeneratedProblem" class="flex-1 overflow-y-auto p-4 bg-bg-tertiary rounded-radius-md mb-4">
            <h3 class="text-lg font-semibold text-text-primary mb-4">生成结果</h3>
            <div class="space-y-4">
              <div>
                <span class="text-text-secondary block mb-1">标题:</span>
                <span class="text-text-primary">{{ aiGeneratedProblem.title }}</span>
              </div>
              <div>
                <span class="text-text-secondary block mb-1">描述:</span>
                <div class="text-text-primary whitespace-pre-wrap">{{ aiGeneratedProblem.description }}</div>
              </div>
              <div>
                <span class="text-text-secondary block mb-1">输入格式:</span>
                <div class="text-text-primary whitespace-pre-wrap">{{ aiGeneratedProblem.inputFormat }}</div>
              </div>
              <div>
                <span class="text-text-secondary block mb-1">输出格式:</span>
                <div class="text-text-primary whitespace-pre-wrap">{{ aiGeneratedProblem.outputFormat }}</div>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <span class="text-text-secondary block mb-1">难度:</span>
                  <span class="text-text-primary">{{ aiGeneratedProblem.difficulty }}</span>
                </div>
                <div>
                  <span class="text-text-secondary block mb-1">时间限制:</span>
                  <span class="text-text-primary">{{ aiGeneratedProblem.timeLimit }}</span>
                </div>
                <div>
                  <span class="text-text-secondary block mb-1">内存限制:</span>
                  <span class="text-text-primary">{{ aiGeneratedProblem.memoryLimit }}</span>
                </div>
                <div>
                  <span class="text-text-secondary block mb-1">标签:</span>
                  <div class="flex flex-wrap gap-1">
                    <span 
                      v-for="(tag, index) in aiGeneratedProblem.tags" 
                      :key="index"
                      class="text-xs px-2 py-0.5 bg-accent-primary/20 text-accent-primary rounded-radius-full"
                    >
                      {{ tag.name }}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <span class="text-text-secondary block mb-1">提示:</span>
                <div class="text-text-primary whitespace-pre-wrap">{{ aiGeneratedProblem.hint }}</div>
              </div>
              <div v-if="aiGeneratedProblem.samples && aiGeneratedProblem.samples.length > 0">
                <span class="text-text-secondary block mb-1">样例:</span>
                <div class="space-y-2">
                  <div 
                    v-for="(sample, index) in aiGeneratedProblem.samples" 
                    :key="index"
                    class="p-2 bg-bg-secondary rounded-radius-md"
                  >
                    <div class="mb-1">
                      <span class="text-text-secondary">样例 {{ sample.sampleOrder }}:</span>
                    </div>
                    <div class="mb-1">
                      <span class="text-text-secondary">输入:</span>
                      <div class="text-text-primary whitespace-pre-wrap mt-1">{{ sample.inputContent }}</div>
                    </div>
                    <div>
                      <span class="text-text-secondary">输出:</span>
                      <div class="text-text-primary whitespace-pre-wrap mt-1">{{ sample.outputContent }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="aiGeneratedProblem" class="mt-4">
            <button class="btn btn-primary" @click="useGeneratedProblem">使用此题目</button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { getProblemDetail, searchProblems, filterProblems, getProblemsByPage, getProblemsSize, updateProblem, deleteProblem, addProblem, generateProblem } from '@/api/problem'
import { useUserStore } from '@/store/user'
import { formatProblemId } from '@/utils/formatters'
import { logout } from '@/api/auth'

const router = useRouter()
const userStore = useUserStore()



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

const problems = ref([])
const searchKeyword = ref('')
const selectedDifficulty = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const totalProblems = ref(0)
const loading = ref(false)

// 编辑题目相关
const showEditModal = ref(false)
const editingProblem = ref(null)
const editForm = ref({
  title: '',
  description: '',
  inputFormat: '',
  outputFormat: '',
  hint: '',
  difficulty: '简单',
  timeLimit: 1,
  memoryLimit: 128,
  tags: [
    {
      name: '',
      color: '#1677ff'
    }
  ],
  samples: [
    {
      inputContent: '',
      outputContent: '',
      isExample: 1
    }
  ]
})

// 添加题目相关
const showAddModal = ref(false)
const addForm = ref({
  title: '',
  description: '',
  inputFormat: '',
  outputFormat: '',
  hint: '',
  difficulty: '简单',
  timeLimit: 1,
  memoryLimit: 128,
  tags: [
    {
      name: '',
      color: '#1677ff'
    }
  ],
  samples: [
    {
      inputContent: '',
      outputContent: '',
      isExample: 1
    }
  ]
})

// AI生成题目相关
const showAIModal = ref(false)
const aiPrompt = ref('')
const aiGenerating = ref(false)
const aiGeneratedProblem = ref(null)

const totalPages = computed(() => {
  return Math.ceil(totalProblems.value / pageSize.value)
})

const pageNumbers = computed(() => {
  const pages = []
  const total = totalPages.value
  const current = currentPage.value
  
  // 生成页码数组，最多显示5个页码
  let start = Math.max(1, current - 2)
  let end = Math.min(total, start + 4)
  
  if (end - start < 4 && start > 1) {
    start = Math.max(1, end - 4)
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

const difficulties = [
  { label: '简单', value: '简单' },
  { label: '中等', value: '中等' },
  { label: '困难', value: '困难' }
]



const openProblemDetail = (problemId) => {
  window.open(`/problem/${problemId}`, '_blank')
}

const fetchProblems = async () => {
  loading.value = true
  try {
    const response = await getProblemsByPage(currentPage.value, pageSize.value)
    if (response && response.code === '200') {
      problems.value = response.data.data || response.data
      totalProblems.value = response.data.total || 0
    }
  } catch (error) {
  } finally {
    loading.value = false
  }
}

const fetchProblemsSize = async () => {
  try {
    const response = await getProblemsSize()
    if (response && response.code === '200') {
      totalProblems.value = response.data || 0
    }
  } catch (error) {
  }
}

const handleSearch = async () => {
  loading.value = true
  try {
    if (searchKeyword.value) {
      const response = await searchProblems(searchKeyword.value, currentPage.value, pageSize.value)
      if (response.code === '200') {
        problems.value = response.data.data || response.data
        totalProblems.value = response.data.total || 0
      }
    } else if (selectedDifficulty.value) {
      const response = await filterProblems(selectedDifficulty.value, currentPage.value, pageSize.value)
      if (response.code === '200') {
        problems.value = response.data.data || response.data
        totalProblems.value = response.data.total || 0
      }
    } else {
      await fetchProblems()
    }
  } catch (error) {
  } finally {
    loading.value = false
  }
}

const handlePageChange = (page) => {
  currentPage.value = page
  fetchProblems()
}

const handlePrevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    fetchProblems()
  }
}

const handleNextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    fetchProblems()
  }
}

// 处理修改题目
const handleEditProblem = async (problemId) => {
  try {
    const response = await getProblemDetail(problemId)
    if (response.code === '200') {
      editingProblem.value = response.data
      // 确保 editingProblem 包含 id 字段
      if (!editingProblem.value.id && editingProblem.value.problemId) {
        editingProblem.value.id = editingProblem.value.problemId
      }
      // 处理标签数据，确保格式正确
      const tags = response.data.tags || []
      const formattedTags = tags.length > 0 ? tags.map(tag => ({
        name: tag.name || tag,
        color: tag.color || '#1677ff'
      })) : [{
        name: '',
        color: '#1677ff'
      }]
      editForm.value = {
        title: response.data.title || '',
        description: response.data.description || '',
        inputFormat: response.data.inputFormat || '',
        outputFormat: response.data.outputFormat || '',
        hint: response.data.hint || '',
        difficulty: response.data.difficulty || '简单',
        timeLimit: response.data.timeLimit || 1,
        memoryLimit: response.data.memoryLimit || 128,
        tags: formattedTags,
        samples: response.data.samples || [
          {
            inputContent: '',
            outputContent: '',
            isExample: 1
          }
        ]
      }
      showEditModal.value = true
    }
  } catch (error) {
    console.error('获取题目详情失败:', error)
  }
}

// 处理删除题目
const handleDeleteProblem = async (problemId) => {
  if (confirm('确定要删除这个题目吗？')) {
    try {
      const response = await deleteProblem(problemId)
      if (response.code === '200') {
        // 重新加载题目列表
        await fetchProblems()
      } else {
        alert('删除失败: ' + (response.message || '未知错误'))
      }
    } catch (error) {
      console.error('删除题目失败:', error)
      alert('删除失败，请稍后重试')
    }
  }
}

// 提交修改
const submitEdit = async () => {
  if (!editingProblem.value) return
  
  // 验证时间限制和内存限制
  if (editForm.value.timeLimit > 20) {
    alert('时间限制不能超过20秒')
    return
  }
  if (editForm.value.memoryLimit > 2048) {
    alert('内存限制不能超过2048MB (2GB)')
    return
  }
  
  try {
    // 转换难度为数值
    const formData = {
      id: editingProblem.value.id || editingProblem.value.problemId,
      title: editForm.value.title,
      description: editForm.value.description,
      inputFormat: editForm.value.inputFormat,
      outputFormat: editForm.value.outputFormat,
      hint: editForm.value.hint,
      difficulty: {
        '简单': 1,
        '中等': 2,
        '困难': 3
      }[editForm.value.difficulty] || 1,
      timeLimit: editForm.value.timeLimit,
      memoryLimit: editForm.value.memoryLimit,
      // 过滤空标签并保持格式
      tags: editForm.value.tags.filter(tag => tag.name.trim()).map(tag => ({
        name: tag.name.trim(),
        color: tag.color || '#1677ff' // 使用标签的颜色或默认颜色
      })),
      // 转换samples格式，添加sampleOrder并排除problemId
      samples: editForm.value.samples.map((sample, index) => {
        const { problemId: _, ...sampleData } = sample
        return {
          id: sample.id || index + 1, // 确保每个样例都有id字段
          sampleOrder: index + 1,
          inputContent: sample.inputContent,
          outputContent: sample.outputContent,
          isExample: sample.isExample
        }
      })
    }
    const response = await updateProblem(editingProblem.value.id || editingProblem.value.problemId, formData)
    if (response.code === '200' || response.code === 200) {
      showEditModal.value = false
      // 重新加载题目列表
      await fetchProblems()
    } else {
      alert('修改失败: ' + (response.message || '未知错误'))
    }
  } catch (error) {
    console.error('修改题目失败:', error)
    alert('修改失败，请稍后重试')
  }
}

// 提交添加题目
// 添加样例
const addSample = () => {
  addForm.value.samples.push({
    inputContent: '',
    outputContent: '',
    isExample: 1
  })
}

// 删除样例
const removeSample = (index) => {
  if (addForm.value.samples.length > 1) {
    addForm.value.samples.splice(index, 1)
  }
}

// 编辑题目添加样例
const addEditSample = () => {
  editForm.value.samples.push({
    inputContent: '',
    outputContent: '',
    isExample: 1
  })
}

// 编辑题目删除样例
const removeEditSample = (index) => {
  if (editForm.value.samples.length > 1) {
    editForm.value.samples.splice(index, 1)
  }
}

// 添加题目添加标签
const addTag = () => {
  addForm.value.tags.push({
    name: '',
    color: '#1677ff'
  })
}

// 添加题目删除标签
const removeTag = (index) => {
  if (addForm.value.tags.length > 1) {
    addForm.value.tags.splice(index, 1)
  }
}

// 编辑题目添加标签
const addEditTag = () => {
  editForm.value.tags.push({
    name: '',
    color: '#1677ff'
  })
}

// 编辑题目删除标签
const removeEditTag = (index) => {
  if (editForm.value.tags.length > 1) {
    editForm.value.tags.splice(index, 1)
  }
}

const submitAdd = async () => {
  // 验证时间限制和内存限制
  if (addForm.value.timeLimit > 20) {
    alert('时间限制不能超过20秒')
    return
  }
  if (addForm.value.memoryLimit > 2048) {
    alert('内存限制不能超过2048MB (2GB)')
    return
  }
  
  try {
    // 转换难度为数值
    const formData = {
      title: addForm.value.title,
      description: addForm.value.description,
      inputFormat: addForm.value.inputFormat,
      outputFormat: addForm.value.outputFormat,
      hint: addForm.value.hint,
      difficulty: {
        '简单': 1,
        '中等': 2,
        '困难': 3
      }[addForm.value.difficulty] || 1,
      timeLimit: addForm.value.timeLimit,
      memoryLimit: addForm.value.memoryLimit,
      // 过滤空标签并保持格式
      tags: addForm.value.tags.filter(tag => tag.name.trim()).map(tag => ({
        name: tag.name.trim(),
        color: tag.color || '#1677ff' // 使用标签的颜色或默认颜色
      })),
      // 转换samples格式，添加sampleOrder并排除problemId
      samples: addForm.value.samples.map((sample, index) => {
        const { problemId: _, ...sampleData } = sample
        return {
          ...sampleData,
          id: sample.id || index + 1, // 确保每个样例都有id字段
          sampleOrder: index + 1
        }
      })
    }
    const response = await addProblem(formData)
    if (response.code === '200' || response.code === 200) {
      showAddModal.value = false
      // 重置表单
      addForm.value = {
        title: '',
        description: '',
        difficulty: '简单',
        timeLimit: 1,
        memoryLimit: 128,
        tags: [],
        samples: [
          {
            inputContent: '',
            outputContent: '',
            isExample: 1
          }
        ]
      }
      // 重新加载题目列表
      await fetchProblems()
    } else {
      alert('添加失败: ' + (response.message || '未知错误'))
    }
  } catch (error) {
    console.error('添加题目失败:', error)
    alert('添加失败，请稍后重试')
  }
}

// 重置AI生成
const resetAIGenerate = () => {
  aiPrompt.value = ''
  aiGeneratedProblem.value = null
}

// 生成AI题目
const generateAIProblem = async () => {
  if (!aiPrompt.value.trim()) {
    alert('请输入提示词')
    return
  }
  
  aiGenerating.value = true
  try {
    const response = await generateProblem(aiPrompt.value)
    // 后端返回的数据结构是 { code, message, data }，实际题目数据在 data 字段中
    aiGeneratedProblem.value = response.data
    aiGenerating.value = false
  } catch (error) {
    console.error('生成题目失败:', error)
    alert('生成失败，请稍后重试')
    aiGenerating.value = false
  }
}

// 使用AI生成的题目
const useGeneratedProblem = async () => {
  if (!aiGeneratedProblem.value) return
  
  // 构建添加题目的表单数据
  const formData = {
    title: aiGeneratedProblem.value.title || '',
    description: aiGeneratedProblem.value.description || '',
    inputFormat: aiGeneratedProblem.value.inputFormat || '',
    outputFormat: aiGeneratedProblem.value.outputFormat || '',
    hint: aiGeneratedProblem.value.hint || '',
    difficulty: aiGeneratedProblem.value.difficulty || '简单',
    timeLimit: parseFloat(aiGeneratedProblem.value.timeLimit) || 1,
    memoryLimit: parseFloat(aiGeneratedProblem.value.memoryLimit) || 128,
    tags: aiGeneratedProblem.value.tags || [],
    samples: aiGeneratedProblem.value.samples || [
      {
        inputContent: '',
        outputContent: '',
        isExample: 1
      }
    ]
  }
  
  // 验证时间限制和内存限制
  if (formData.timeLimit > 20) {
    alert('时间限制不能超过20秒')
    return
  }
  if (formData.memoryLimit > 2048) {
    alert('内存限制不能超过2048MB (2GB)')
    return
  }
  
  try {
    // 转换难度为数值
    const submitData = {
      title: formData.title,
      description: formData.description,
      inputFormat: formData.inputFormat,
      outputFormat: formData.outputFormat,
      hint: formData.hint,
      difficulty: {
        '简单': 1,
        '中等': 2,
        '困难': 3
      }[formData.difficulty] || 1,
      timeLimit: formData.timeLimit,
      memoryLimit: formData.memoryLimit,
      // 转换tags格式
      tags: formData.tags.map(tag => ({
        name: tag.name || tag,
        color: tag.color || '#1677ff'
      })),
      // 转换samples格式，添加sampleOrder并排除problemId
      samples: formData.samples.map((sample, index) => {
        const { problemId: _, ...sampleData } = sample
        return {
          ...sampleData,
          id: sample.id || index + 1, // 确保每个样例都有id字段
          sampleOrder: index + 1
        }
      })
    }
    const response = await addProblem(submitData)
    if (response.code === '200' || response.code === 200 || response.code === '201' || response.code === 201) {
      alert('添加成功')
      // 关闭模态框
      showAIModal.value = false
      // 重新加载题目列表
      await fetchProblemsSize()
      await fetchProblems()
    } else {
      alert('添加失败: ' + (response.message || '未知错误'))
    }
  } catch (error) {
    console.error('添加题目失败:', error)
    alert('添加失败，请稍后重试')
  }
}

onMounted(async () => {
  await fetchProblemsSize()
  await fetchProblems()
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

/* 主内容区样式 */
.problems-content {
  max-width: 1200px;
  margin: 0 auto;
}

/* 搜索和筛选区样式 */
.search-filter-section {
  background: rgba(30, 41, 59, 0.8);
  backdrop-filter: blur(10px);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(148, 163, 184, 0.2);
  margin-bottom: 30px;
}

/* 题目列表样式 */
.problems-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
}

.problem-card {
  background: rgba(30, 41, 59, 0.8);
  backdrop-filter: blur(10px);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(148, 163, 184, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.problem-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
}

.problem-id {
  font-family: 'Courier New', monospace;
  font-weight: bold;
  color: #00D9FF;
  margin-bottom: 10px;
}

.problem-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #E2E8F0;
}

.problem-description {
  font-size: 14px;
  color: #94A3B8;
  margin-bottom: 16px;
  line-height: 1.5;
}

.problem-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #64748B;
}

.problem-difficulty {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.difficulty-easy {
  background: rgba(34, 197, 94, 0.1);
  color: #22C55E;
}

.difficulty-medium {
  background: rgba(245, 158, 11, 0.1);
  color: #F59E0B;
}

.difficulty-hard {
  background: rgba(239, 68, 68, 0.1);
  color: #EF4444;
}

/* 分页样式 */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 30px;
}

.pagination button {
  padding: 8px 16px;
  border: 1px solid rgba(148, 163, 184, 0.2);
  background: rgba(30, 41, 59, 0.8);
  color: #94A3B8;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.pagination button:hover {
  background: rgba(0, 217, 255, 0.1);
  color: #00D9FF;
  border-color: #00D9FF;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination button:disabled:hover {
  background: rgba(30, 41, 59, 0.8);
  color: #94A3B8;
  border-color: rgba(148, 163, 184, 0.2);
}

.page-info {
  color: #94A3B8;
  font-size: 14px;
}
</style>