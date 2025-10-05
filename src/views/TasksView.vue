<template>
  <div class="p-4 sm:p-6 max-w-6xl mx-auto">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
      <h1 class="text-2xl font-bold">Tasks</h1>
      <button
        @click="openForm()"
        class="bg-blue-500 hover:bg-blue-600 text-white px-3 sm:px-4 py-2 rounded text-sm sm:text-base cursor-pointer"
      >
        + New Task
      </button>
    </div>

    <!-- Filters -->
    <div class="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
      <select
        v-model="query.status"
        @change="loadTasks"
        class="border p-2 rounded w-full sm:w-auto text-sm cursor-pointer"
      >
        <option value="">All Status</option>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>
    </div>

    <!-- Mobile Friendly Card View -->
    <div class="sm:hidden space-y-3">
      <div v-for="task in tasks" :key="task.id" class="border rounded p-3 bg-white shadow-sm">
        <div class="font-semibold">{{ task.title }}</div>
        <div class="text-sm text-gray-600">{{ task.description }}</div>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto bg-white shadow rounded hidden sm:block">
      <table class="w-full text-left border-collapse text-sm sm:text-base">
        <thead>
          <tr class="bg-gray-100">
            <th class="p-3 cursor-pointer" @click="changeSort('title')">
              Title
              <span v-if="query.sort === 'title'">
                <span v-if="query.order === 'asc'">▲</span>
                <span v-else>▼</span>
              </span>
            </th>
            <th class="p-3">Status</th>
            <th class="p-3">Created At</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in tasks" :key="task.id" class="border-t hover:bg-gray-50">
            <td class="p-3">{{ task.title }}</td>
            <td class="p-3 capitalize">{{ task.status.replace('-', ' ') }}</td>
            <td class="p-3">{{ task.createdAt }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="flex justify-between items-center mt-4 text-sm">
      <button
        @click="query.page--"
        :disabled="query.page === 1"
        class="border px-3 py-1 rounded disabled:opacity-50x"
      >
        Prev
      </button>
      <span>Page {{ query.page }}</span>
      <button @click="query.page++" class="border px-3 py-1 rounded">Next</button>
    </div>

    <!-- Modal -->
    <div
      v-if="showForm"
      class="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-2"
    >
      <div class="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 class="text-xl mb-4 font-semibold">
          {{ form.id ? 'Edit Task' : 'New Task' }}
        </h2>
        <input v-model="form.title" placeholder="Title" class="border p-2 mb-2 w-full rounded" />
        <textarea
          v-model="form.description"
          placeholder="Description"
          class="border p-2 mb-2 w-full rounded"
        ></textarea>
        <select v-model="form.status" class="border p-2 mb-4 w-full rounded">
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <div class="flex justify-end gap-2">
          <button @click="closeForm" class="px-4 py-2 border rounded text-sm cursor-pointer">
            Cancel
          </button>
          <button
            @click="closeForm"
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm cursor-pointer"
          >
            {{ form.id ? 'Update' : 'Create' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Task } from '../types/task'

const showForm = ref(false)
const form = ref<Partial<Task>>({ title: '', description: '', status: 'pending' })

function openForm(task?: Task) {
  form.value = task ? { ...task } : { title: '', description: '', status: 'pending' }
  showForm.value = true
}

function closeForm() {
  showForm.value = false
}

const tasks = ref<Task[]>([
  {
    id: '1',
    title: 'Learn Vue',
    description: 'Composition API practice',
    status: 'in-progress',
    createdAt: '2025-10-04',
  },
  {
    id: '2',
    title: 'Write Code',
    description: 'Build CRUD frontend',
    status: 'pending',
    createdAt: '2025-10-03',
  },
])

const query = ref({
  page: 1,
  limit: 10,
  sort: 'createdAt',
  order: 'desc' as 'asc' | 'desc',
  status: '',
})

function changeSort(field: string) {
  if (query.value.sort === field) {
    query.value.order = query.value.order === 'asc' ? 'desc' : 'asc'
  } else {
    query.value.sort = field
    query.value.order = 'asc'
  }
}
</script>
