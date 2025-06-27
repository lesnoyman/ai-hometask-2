<script setup lang="ts">
import { ref, nextTick } from 'vue'
import type { User } from '@/types/user'

defineProps<{
  users: User[]
  isLoading: boolean
  hasError: boolean
}>()

const emit = defineEmits<{
  (e: 'rowClick', user: User): void
  (e: 'deleteClick', user: User): void
}>()

const getAddress = (user: User) => `${user.address.city}, ${user.address.street} ${user.address.suite}`

const deletedIds = ref<number[]>([])

const handleDelete = async (user: User) => {
  deletedIds.value.push(user.id)
  await new Promise(r => setTimeout(r, 300))
  emit('deleteClick', user)
}
</script>

<template>
  <div>
    <div v-if="isLoading" :class="$style.loading">Loading...</div>
    <div v-else-if="hasError" :class="$style.error">Failed to load users.</div>
    <table :class="$style.userTable">
      <thead>
        <tr>
          <th>NAME / EMAIL</th>
          <th>ADDRESS</th>
          <th>PHONE</th>
          <th>WEBSITE</th>
          <th>COMPANY</th>
          <th>ACTION</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id" @click="$emit('rowClick', user)" :class="$style.userRow" :style="deletedIds.includes(user.id) ? { opacity: 0, pointerEvents: 'none', transition: 'opacity 0.3s' } : { opacity: 1, transition: 'opacity 0.3s' }">
          <td>
            <div :class="$style.userName">{{ user.name }}</div>
            <div :class="$style.userEmail">{{ user.email }}</div>
          </td>
          <td>{{ getAddress(user) }}</td>
          <td>{{ user.phone }}</td>
          <td>
            <a :href="'http://' + user.website" target="_blank" :class="$style.userWebsite" @click.stop>{{ user.website }}</a>
          </td>
          <td>{{ user.company.name }}</td>
          <td :class="$style.actionCell">
            <span :class="$style.deleteAction" @click.stop="handleDelete(user)" title="Delete user">✗</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style module scoped>
.userTable {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: #fff;
  box-shadow: 0 4px 24px rgba(0,0,0,0.07);
  border-radius: 14px;
  margin-bottom: 24px;
  transition: box-shadow 0.2s;
}
.userTable th, .userTable td {
  padding: 18px 14px;
  text-align: left;
  font-size: 1rem;
  transition: background 0.18s, color 0.18s;
}
.userTable th {
  background: #f8fafc;
  font-weight: 600;
  color: #6b7280;
  letter-spacing: 0.05em;
  border-bottom: 1px solid #e5e7eb;
}
.userTable tbody tr:not(:last-child) {
  border-bottom: 1px solid #e5e7eb;
}
.userRow {
  transition: opacity 0.3s, background 0.18s;
  cursor: pointer;
}
.userRow:hover {
  background: #f3f4f6;
}
.userName {
  font-weight: 600;
  color: #222;
}
.userEmail {
  color: #6b7280;
  font-size: 0.95em;
}
.userWebsite {
  color: #2563eb;
  text-decoration: none;
  font-size: 0.98em;
  cursor: pointer;
  transition: color 0.18s;
}
.userWebsite:hover, .userWebsite:focus {
  color: #1749b1;
  text-decoration: underline;
}
.actionCell {
  text-align: center;
}
.deleteAction {
  color: #6b7280;
  font-size: 1.2em;
  cursor: pointer;
  transition: color 0.2s;
  border-radius: 50%;
  outline: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background: none;
  padding: 0;
}
.deleteAction:hover, .deleteAction:focus {
  color: #ef4444;
  background: none;
}
.loading, .error {
  text-align: center;
  margin: 32px 0;
  color: #6b7280;
}
@media (max-width: 900px) {
  .userTable, .userTable thead, .userTable tbody, .userTable tr, .userTable th, .userTable td {
    display: block;
    width: 100%;
  }
  .userTable thead {
    display: none;
  }
  .userRow {
    margin-bottom: 18px;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
    background: #fff;
    padding: 8px 0;
  }
  .userTable td {
    padding: 10px 12px;
    border-bottom: none;
    font-size: 0.95rem;
    white-space: normal;
  }
  .actionCell {
    text-align: right;
    padding-right: 18px;
  }
}
@media (max-width: 600px) {
  .userTable, .userTable thead, .userTable tbody, .userTable tr, .userTable th, .userTable td {
    display: block;
    width: 100%;
  }
  .userTable thead {
    display: none;
  }
  .userRow {
    margin-bottom: 18px;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
    background: #fff;
    padding: 8px 0;
  }
  .userTable td {
    padding: 10px 12px;
    border-bottom: none;
    font-size: 0.95rem;
    white-space: normal;
  }
  .actionCell {
    text-align: right;
    padding-right: 18px;
  }
}
</style> 