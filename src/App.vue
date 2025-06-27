<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getUsers } from '@/service/userService'
import UserDetailModal from '@/components/UserDetailModal.vue'
import UserListTable from '@/components/UserListTable.vue'
import type { User } from '@/types/user'

const users = ref<User[]>([])
const isLoading = ref(true)
const hasError = ref(false)

const selectedUser = ref<User | null>(null)
const isModalOpen = ref(false)

onMounted(async () => {
  try {
    users.value = await getUsers()
  } catch (e) {
    hasError.value = true
  } finally {
    isLoading.value = false
  }
})

const openModal = (user: User) => {
  selectedUser.value = user
  isModalOpen.value = true
}
const closeModal = () => {
  isModalOpen.value = false
  selectedUser.value = null
}
const handleDelete = (user: User) => {
  users.value = users.value.filter(u => u.id !== user.id)
  if (selectedUser.value?.id === user.id) closeModal()
}
</script>

<template>
  <div class="container" :class="{ 'blurred': isModalOpen }">
    <h1 class="title">Users</h1>
    <UserListTable
      :users="users"
      :isLoading="isLoading"
      :hasError="hasError"
      @rowClick="openModal"
      @deleteClick="handleDelete"
    />
    <UserDetailModal :user="selectedUser" :open="isModalOpen" @close="closeModal" />
  </div>
</template>

<style module scoped>
.container {
  max-width: 800px;
  margin: 40px auto;
  padding: 0 16px;
}
.title {
  text-align: center;
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 24px;
}
.user-table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  border-radius: 8px;
  overflow: hidden;
}
.user-table th, .user-table td {
  padding: 16px 12px;
  text-align: left;
  font-size: 1rem;
}
.user-table th {
  background: #f8fafc;
  font-weight: 500;
  color: #6b7280;
  letter-spacing: 0.05em;
  border-bottom: 1px solid #e5e7eb;
}
.user-table tbody tr:not(:last-child) {
  border-bottom: 1px solid #e5e7eb;
}
.user-name {
  font-weight: 600;
  color: #222;
}
.user-email {
  color: #6b7280;
  font-size: 0.95em;
}
.user-website {
  color: #2563eb;
  text-decoration: underline;
  font-size: 0.98em;
}
.action-cell {
  text-align: center;
}
.delete-action {
  color: #ef4444;
  font-size: 1.2em;
  cursor: pointer;
  transition: color 0.2s;
}
.delete-action:hover {
  color: #b91c1c;
}
.loading, .error {
  text-align: center;
  margin: 32px 0;
  color: #6b7280;
}
@media (max-width: 600px) {
  .user-table th, .user-table td {
    padding: 10px 6px;
    font-size: 0.92rem;
  }
  .container {
    padding: 0 2px;
  }
}
.blurred {
  filter: blur(2px) grayscale(0.2);
  pointer-events: none;
  user-select: none;
}
</style>
