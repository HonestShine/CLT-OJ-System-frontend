<template>
  <div class="profile-container">
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
        <router-link to="/nexus" class="nav-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          <span>社区</span>
        </router-link>
        <router-link to="/profile" class="nav-item active">
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
      <div class="content" v-if="user">
        <button class="back-button" @click="goBack">返回</button>
        
        <div class="profile-card">
          <div class="avatar-section">
            <div class="avatar-container">
              <img :src="user.avatar || '/default-avatar.png'" alt="头像" class="avatar" />
              <input 
                v-if="isOwnProfile" 
                type="file" 
                ref="avatarInput" 
                @change="handleAvatarUpload" 
                accept="image/*"
                style="display: none"
              />
              <button 
                v-if="isOwnProfile" 
                @click="$refs.avatarInput?.click()" 
                class="avatar-upload-icon"
                title="更换头像"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
              </button>
            </div>
          </div>

          <div class="info-section">
            <h1>{{ user.nickname || user.username }}</h1>
            <div class="stats">
              <div class="stat-item">
                <span class="stat-label">解题数</span>
                <span class="stat-value">{{ user.solvedCount }}</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">提交数</span>
                <span class="stat-value">{{ user.submissionCount }}</span>
              </div>
              <div class="stat-item" v-if="user.lastSubmitTime">
                <span class="stat-label">最后提交</span>
                <span class="stat-value">{{ formatTime(user.lastSubmitTime) }}</span>
              </div>
            </div>

            <div class="details">
              <div class="detail-item" v-if="isOwnProfile">
                <span class="detail-label">用户名:</span>
                <span class="detail-value">{{ user.username }}</span>
              </div>
              <div class="detail-item" v-if="user.hobby">
                <span class="detail-label">爱好:</span>
                <span class="detail-value">{{ user.hobby }}</span>
              </div>
              <div class="detail-item" v-if="user.introduction">
                <span class="detail-label">简介:</span>
                <span class="detail-value">{{ user.introduction }}</span>
              </div>
            </div>

            <div class="edit-section" v-if="isOwnProfile">
              <h2>编辑信息</h2>
              <div class="form-group">
                <label>昵称</label>
                <input 
                  v-model="editForm.nickname" 
                  type="text" 
                  placeholder="请输入昵称"
                />
              </div>
              <div class="form-group">
                <label>爱好</label>
                <input 
                  v-model="editForm.hobby" 
                  type="text" 
                  placeholder="请输入爱好"
                />
              </div>
              <div class="form-group">
                <label>简介</label>
                <textarea 
                  v-model="editForm.introduction" 
                  placeholder="请输入简介"
                ></textarea>
              </div>
              <div class="button-group">
                <button @click="handleSave" :disabled="saving">
                  {{ saving ? '保存中...' : '保存修改' }}
                </button>
                <button @click="handleDelete" class="delete-btn" v-if="userStore.user?.role !== 0">
                  删除账户
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="loading" v-else>
        加载中...
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
import { getUserDetail, getCurrentUser, updateUser, uploadAvatar, deleteUser } from '@/api/user'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const user = ref(null)
const saving = ref(false)
const editForm = ref({
  nickname: '',
  hobby: '',
  introduction: ''
})

const isOwnProfile = computed(() => {
  // 当访问 /users/me 或 /profile 时，是自己的个人主页
  if (route.path === '/users/me' || route.path === '/profile') {
    return true
  }
  // 当访问 /users/:id 或 /profile/:id 时，检查是否是当前登录用户
  if (route.params.id) {
    return route.params.id === userStore.user?.userId?.toString()
  }
  return true
})



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

const goBack = () => {
  router.back()
}

const handleLogout = () => {
  userStore.logout()
  router.push('/')
}

const formatTime = (time) => {
  if (!time) return ''
  const date = new Date(time)
  return date.toLocaleString('zh-CN')
}

const handleAvatarUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  const formData = new FormData()
  formData.append('newAvatar', file)

  try {
    const res = await uploadAvatar(formData)
    // 支持字符串和数字类型的code
    if (res.code == 200) {
      user.value.avatar = res.data
      alert('头像上传成功')
    } else {
      alert(res.message || '头像上传失败')
    }
  } catch (error) {
    alert(error.message || '头像上传失败，请检查网络连接')
  }
}

const handleSave = async () => {
  saving.value = true
  try {
    const res = await updateUser(editForm.value)
    // 支持字符串和数字类型的code
    if (res.code == 200) {
      user.value = { ...user.value, ...res.data }
      alert('保存成功')
    } else {
      alert(res.message || '保存失败')
    }
  } catch (error) {
    alert(error.message || '保存失败，请检查网络连接')
  } finally {
    saving.value = false
  }
}

const handleDelete = () => {
  if (confirm('确定要删除账户吗？此操作不可恢复！')) {
    deleteUserAccount()
  }
}

const deleteUserAccount = async () => {
  try {
    const res = await deleteUser()
    // 支持字符串和数字类型的code
    if (res.code == 200) {
      alert('账户删除成功')
      userStore.logout()
      router.push('/')
    } else {
      alert(res.message || '删除失败')
    }
  } catch (error) {
    alert(error.message || '删除失败，请检查网络连接')
  }
}

const loadUser = async () => {
  try {
    let res
    if (isOwnProfile.value) {
      // 访问自己的个人主页，获取当前用户信息
      res = await getCurrentUser()
    } else {
      // 访问其他用户的个人主页，根据ID获取用户信息
      res = await getUserDetail(route.params.id)
    }
    
    // 支持字符串和数字类型的code
    if (res.code == 200) {
      user.value = res.data
      if (isOwnProfile.value) {
        // 只有在自己的个人主页才显示编辑表单
        editForm.value = {
          nickname: res.data.nickname || '',
          hobby: res.data.hobby || '',
          introduction: res.data.introduction || ''
        }
      }
    } else {
      alert(res.message || '加载用户信息失败')
      router.push('/')
    }
  } catch (error) {
    // 加载失败时设置默认用户数据，避免页面空白
    user.value = {
      userId: 1,
      username: 'guest',
      nickname: '游客用户',
      solvedCount: 0,
      submissionCount: 0,
      lastSubmitTime: null,
      hobby: '',
      introduction: ''
    }
  }
}

onMounted(() => {
  loadUser()
})
</script>

<style scoped>
.profile-container {
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
  padding: 80px 30px 120px;
}

.content {
  max-width: 800px;
  margin: 0 auto;
}

.back-button {
  margin-bottom: 20px;
  background-color: #1E293B;
  color: #E2E8F0;
  border: 1px solid rgba(148, 163, 184, 0.3);
  transition: all 0.3s ease;
}

.back-button:hover {
  background-color: #334155;
  border-color: rgba(0, 217, 255, 0.5);
}

.profile-card {
  background: rgba(30, 41, 59, 0.8);
  backdrop-filter: blur(10px);
  padding: 40px;
  border-radius: 12px;
  border: 1px solid rgba(148, 163, 184, 0.2);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

.avatar-section {
  text-align: center;
  margin-bottom: 30px;
}

.avatar-container {
  position: relative;
  display: inline-block;
}

.avatar-upload-icon {
  position: absolute;
  bottom: 15px;
  right: 0;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.7);
  color: #00D9FF;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.avatar-upload-icon:hover {
  background-color: rgba(0, 0, 0, 0.9);
  transform: scale(1.1);
  box-shadow: 0 4px 8px rgba(0, 217, 255, 0.4);
}

.avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #00D9FF;
  margin-bottom: 15px;
  box-shadow: 0 0 20px rgba(0, 217, 255, 0.3);
  animation: breathe 3s ease-in-out infinite;
}

@keyframes breathe {
  0%, 100% { opacity: 0.6; box-shadow: 0 0 10px rgba(0, 217, 255, 0.2); }
  50% { opacity: 1; box-shadow: 0 0 30px rgba(0, 217, 255, 0.4); }
}

.upload-avatar-btn {
  background-color: #00D9FF;
  color: #0F172A;
  margin-top: 10px;
  transition: all 0.3s ease;
}

.upload-avatar-btn:hover {
  background-color: #00B4D8;
  box-shadow: 0 0 10px rgba(0, 217, 255, 0.5);
}

.info-section h1 {
  text-align: center;
  color: #E2E8F0;
  margin-bottom: 30px;
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

.stat-item {
  text-align: center;
  padding: 20px;
  background: rgba(15, 23, 42, 0.8);
  border-radius: 8px;
  border: 1px solid rgba(148, 163, 184, 0.2);
  transition: all 0.3s ease;
}

.stat-item:hover {
  border-color: rgba(0, 217, 255, 0.5);
  box-shadow: 0 0 10px rgba(0, 217, 255, 0.3);
}

.stat-label {
  display: block;
  color: #94A3B8;
  margin-bottom: 10px;
}

.stat-value {
  display: block;
  font-size: 24px;
  font-weight: bold;
  color: #6B7280;
  transition: color 0.3s ease;
}

.stat-item:hover .stat-value {
  color: #00D9FF;
}

.details {
  margin-bottom: 30px;
}

.detail-item {
  display: flex;
  padding: 15px;
  border-bottom: 1px solid rgba(148, 163, 184, 0.2);
  align-items: center;
}

.detail-item:last-child {
  border-bottom: none;
}

.detail-label {
  font-weight: 600;
  color: #E2E8F0;
  width: 100px;
  flex-shrink: 0;
}

.detail-value {
  color: #94A3B8;
  flex: 1;
}

.edit-section {
  margin-top: 30px;
  padding-top: 30px;
  border-top: 2px solid rgba(148, 163, 184, 0.2);
  border-left: 4px solid #00D9FF;
  padding-left: 20px;
  position: relative;
}

.edit-section h2 {
  color: #E2E8F0;
  margin-bottom: 20px;
  padding: 8px 16px;
  background-color: rgba(0, 217, 255, 0.05);
  border-radius: 4px;
  display: inline-block;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #94A3B8;
  font-weight: 500;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid rgba(148, 163, 184, 0.3);
  border-radius: 4px;
  font-size: 14px;
  background: rgba(15, 23, 42, 0.8);
  color: #E2E8F0;
  transition: all 0.3s ease;
}

.form-group textarea {
  min-height: 100px;
  max-height: 200px;
  resize: vertical;
}

/* 限制表单区域高度，避免与底部滚动通知栏冲突 */
.edit-section {
  max-height: 500px;
  overflow-y: auto;
  padding-right: 10px;
}

/* 自定义滚动条 */
.edit-section::-webkit-scrollbar {
  width: 6px;
}

.edit-section::-webkit-scrollbar-track {
  background: rgba(15, 23, 42, 0.5);
  border-radius: 3px;
}

.edit-section::-webkit-scrollbar-thumb {
  background: rgba(0, 217, 255, 0.5);
  border-radius: 3px;
}

.edit-section::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 217, 255, 0.8);
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #00D9FF;
  box-shadow: 0 0 0 2px rgba(0, 217, 255, 0.2);
}

.button-group {
  display: flex;
  gap: 15px;
  margin-top: 20px;
  flex-wrap: wrap;
  padding: 20px;
  background: rgba(30, 41, 59, 0.8);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 0 0 8px 8px;
  position: sticky;
  bottom: 0;
  z-index: 20;
  margin: 20px -20px -20px -20px;
}

.button-group button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.button-group button:first-child {
  background-color: #00D9FF;
  color: #0F172A;
}

.button-group button:first-child:hover {
  background-color: #00B4D8;
  box-shadow: 0 0 10px rgba(0, 217, 255, 0.5);
}

.delete-btn {
  background-color: #EF4444;
  color: white;
}

.delete-btn:hover {
  background-color: #DC2626;
  box-shadow: 0 0 10px rgba(239, 68, 68, 0.5);
}

.loading {
  text-align: center;
  padding: 50px;
  color: #94A3B8;
  background: rgba(30, 41, 59, 0.8);
  border-radius: 8px;
  border: 1px solid rgba(148, 163, 184, 0.2);
}

@media (max-width: 768px) {
  .stats {
    grid-template-columns: 1fr;
  }
  
  .detail-item {
    flex-direction: column;
  }
  
  .detail-label {
    margin-bottom: 5px;
  }
}
</style>
