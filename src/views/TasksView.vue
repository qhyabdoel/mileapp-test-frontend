<template>
  <div class="px-4 pb-12 pt-4 sm:p-6 max-w-6xl mx-auto">
    <!-- Header -->
    <header class="flex justify-between mb-6 border-b-2 pb-3 border-gray-200">
      <h1 class="text-xl font-semibold text-gray-700">Tasks Dashboard</h1>

      <div class="flex flex-col sm:flex-row items-end sm:items-center gap-2 sm:gap-3 text-left">
        <span class="text-gray-600 text-sm">Hi, {{ username }}</span>
        <button
          @click="logout"
          class="bg-red-400 hover:bg-red-600 text-white px-3 py-1.5 rounded text-sm cursor-pointer"
        >
          Logout
        </button>
      </div>
    </header>

    <!-- Filters -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
      <div class="flex items-center gap-2">
        <label for="status" class="text-sm font-medium text-gray-600">Filter:</label>
        <select
          id="status"
          v-model="query.status"
          @change="loadTasks"
          class="border p-2 rounded text-sm"
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
      <button
        @click="openForm()"
        class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm sm:text-base cursor-pointer"
      >
        + New Task
      </button>
    </div>

    <!-- Mobile Friendly Card View -->
    <div class="sm:hidden space-y-3">
      <div v-for="task in tasks" :key="task.id" class="border rounded p-3 bg-white shadow-sm">
        <div class="font-semibold">{{ task.title }}</div>
        <div class="text-sm text-gray-600">{{ task.description }}</div>
        <div class="mt-2 flex justify-between items-center text-sm">
          <span
            :class="{
              'text-yellow-600': task.status === 'pending',
              'text-blue-600': task.status === 'in-progress',
              'text-green-600': task.status === 'done',
            }"
          >
            {{ task.status }}
          </span>
          <span class="text-gray-500">{{ formatData(task.createdAt) }}</span>
        </div>
        <div class="flex gap-2 justify-end mt-2">
          <button
            @click="openForm(task)"
            class="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded text-sm cursor-pointer"
          >
            Edit
          </button>
          <button
            @click="openDeleteModal(task)"
            class="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto bg-white shadow rounded hidden sm:block">
      <table class="min-w-full border-collapse table-fixed">
        <thead>
          <tr class="bg-gray-100">
            <th class="p-3 cursor-pointer whitespace-nowrap w-1/6" @click="changeSort('title')">
              Title
              <span v-if="query.sort === 'title'">
                {{ query.order === 'asc' ? '↑' : '↓' }}
              </span>
            </th>
            <th class="p-3 w-1/3">Description</th>
            <th class="p-3 cursor-pointer whitespace-nowrap w-1/6" @click="changeSort('status')">
              Status
              <span v-if="query.sort === 'status'">
                {{ query.order === 'asc' ? '↑' : '↓' }}
              </span>
            </th>
            <th class="p-3 cursor-pointer whitespace-nowrap w-1/6" @click="changeSort('createdAt')">
              Created
              <span v-if="query.sort === 'createdAt'">
                {{ query.order === 'asc' ? '↑' : '↓' }}
              </span>
            </th>
            <th class="p-3 w-1/6">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in tasks" :key="task.id" class="border-t hover:bg-gray-50">
            <td class="p-3 font-medium align-top">{{ task.title }}</td>
            <td class="p-3">{{ task.description }}</td>
            <td class="p-3 capitalize align-top text-center">
              <span
                :class="{
                  'text-yellow-600': task.status === 'pending',
                  'text-blue-600': task.status === 'in-progress',
                  'text-green-600': task.status === 'done',
                }"
              >
                {{ task.status }}
              </span>
            </td>
            <td class="p-3 whitespace-nowrap align-top">{{ formatData(task.createdAt) }}</td>
            <td class="p-3 flex flex-wrap gap-2 justify-end">
              <button
                @click="openForm(task)"
                class="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded text-sm cursor-pointer"
              >
                Edit
              </button>
              <button
                @click="openDeleteModal(task)"
                class="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm cursor-pointer"
              >
                Delete
              </button>
            </td>
          </tr>
          <tr v-if="tasks.length === 0">
            <td colspan="5" class="text-center p-4 text-gray-500">No tasks found</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination Section -->
    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-4 gap-3">
      <!-- Info Label -->
      <div class="text-center sm:text-left text-gray-600 text-sm sm:text-base whitespace-nowrap">
        Page {{ query.page }} of {{ totalPages }} | Showing {{ tasks.length }} of {{ total }} tasks
      </div>

      <!-- Navigation Buttons -->
      <div class="flex justify-between sm:justify-end items-center w-full sm:w-auto gap-2">
        <button
          @click="prevPage"
          :disabled="!query.page || query.page <= 1 || isLoading"
          class="flex-1 sm:flex-none px-4 py-2 border rounded disabled:opacity-50 hover:bg-gray-100 transition text-sm sm:text-base cursor-pointer"
        >
          Prev
        </button>
        <button
          @click="nextPage"
          :disabled="!query.page || query.page >= totalPages || isLoading"
          class="flex-1 sm:flex-none px-4 py-2 border rounded disabled:opacity-50 hover:bg-gray-100 transition text-sm sm:text-base cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>

    <!-- Modal -->
    <div
      v-if="showForm"
      class="fixed inset-0 flex justify-center items-start pt-28 sm:pt-24 bg-black/50 z-50 px-2"
    >
      <div class="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 class="text-xl mb-4 font-semibold">
          {{ form.id ? 'Edit Task' : 'New Task' }}
        </h2>
        <input v-model="form.title" placeholder="Title" class="border p-2 mb-2 w-full rounded" />

        <!-- Validation Error -->
        <div
          class="bg-red-100 w-full flex p-0 justify-between px-2 py-1 rounded mb-3"
          v-if="errorMsg"
        >
          <p class="text-red-600 text-sm mt-1">{{ errorMsg }}</p>
          <button @click="errorMsg = ''" class="text-red-600 font-bold cursor-pointer">x</button>
        </div>

        <textarea
          v-model="form.description"
          placeholder="Description"
          class="border p-2 mb-2 mt-1 w-full rounded"
        ></textarea>
        <select v-model="form.status" class="border p-2 mb-4 w-full rounded">
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <div class="flex justify-end gap-2">
          <button
            @click="saveTask"
            class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm cursor-pointer"
            :disabled="isSaving"
          >
            Save
          </button>
          <button
            @click="closeForm"
            class="border px-4 py-2 rounded text-sm cursor-pointer"
            :disabled="isSaving"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 flex justify-center items-start pt-28 bg-black/50 z-50 px-2"
    >
      <div class="bg-white p-6 rounded shadow-lg w-full max-w-sm text-center">
        <h2 class="text-lg font-semibold mb-4">Confirm Deletion</h2>
        <p class="text-gray-600 mb-6">
          Are you sure you want to delete
          <span class="font-medium text-red-500">{{ taskToDelete?.title }}</span
          >?
        </p>
        <div class="flex justify-center gap-3">
          <button
            @click="confirmDelete"
            class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm cursor-pointer"
            :disabled="isDeleting"
          >
            Delete
          </button>
          <button
            @click="closeDeleteModal"
            class="border px-4 py-2 rounded text-sm cursor-pointer"
            :disabled="isDeleting"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import type { Task, TaskQuery } from '../types/task'
import { createTask, deleteTask, getTasks, updateTask } from '../api/tasks'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const auth = useAuthStore()

function logout() {
  auth.logout()
  router.push('/') // redirect back to login
}

const showForm = ref(false)
const form = ref<Partial<Task>>({ title: '', description: '', status: 'pending' })
const isLoading = ref(false)
const isSaving = ref(false)
const isDeleting = ref(false)
const username = ref(localStorage.getItem('username') || 'User')

function openForm(task?: Task) {
  form.value = task ? { ...task } : { title: '', description: '', status: 'pending' }
  showForm.value = true
}

function closeForm() {
  showForm.value = false
}

// existing refs
const tasks = ref<Task[]>([])
const total = ref(0)
const totalPages = ref(1)
const errorMsg = ref('')

const query = ref<TaskQuery>({
  page: 1,
  limit: 5,
  sort: 'createdAt',
  order: 'desc' as 'asc' | 'desc',
  status: '',
})

async function loadTasks() {
  try {
    isLoading.value = true
    const res = await getTasks(query.value)
    tasks.value = res.data
    total.value = res.meta.total
    totalPages.value = Math.ceil(total.value / (query.value.limit || 5))
  } catch (error) {
    console.error('Failed to load tasks:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(loadTasks)

async function saveTask() {
  try {
    isSaving.value = true
    if (form.value.id) {
      await updateTask(form.value.id, form.value)
    } else {
      await createTask(form.value)
    }

    // Refresh the task list after saving
    await loadTasks()
    closeForm()
  } catch (error: unknown) {
    console.error('Failed to save task:', error)
    if (typeof error === 'object' && error && 'response' in error) {
      const err = error as { response?: { data?: { error?: string } } }
      errorMsg.value = err.response?.data?.error || 'An error occurred'
    } else {
      errorMsg.value = 'An unknown error occurred'
    }
  } finally {
    isSaving.value = false
  }
}

function changeSort(field: 'createdAt' | 'title' | 'status') {
  if (query.value.sort === field) {
    query.value.order = query.value.order === 'asc' ? 'desc' : 'asc'
  } else {
    query.value.sort = field
    query.value.order = 'asc'
  }

  loadTasks()
}

function nextPage() {
  if (!query.value.page) query.value.page = 1 // ensure it's defined
  query.value.page++
  loadTasks()
}

function prevPage() {
  if (query.value.page && query.value.page > 1) {
    query.value.page--
    loadTasks()
  }
}

function formatData(dateStr: string) {
  const date = new Date(dateStr)
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
}

function handleKeydown(e: KeyboardEvent) {
  if (!showForm.value) return

  // ✅ Ctrl+S or Cmd+S
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
    e.preventDefault()
    saveTask()
  }

  // ✅ Enter key (save form)
  if (e.key === 'Enter' && e.target instanceof HTMLElement && e.target.tagName !== 'TEXTAREA') {
    e.preventDefault()
    saveTask()
  }

  // ✅ Escape key (close modal)
  if (e.key === 'Escape') {
    e.preventDefault()
    closeForm()
  }
}

// Automatically add/remove listener based on modal visibility
watch(showForm, (val) => {
  if (val) window.addEventListener('keydown', handleKeydown)
  else window.removeEventListener('keydown', handleKeydown)
})

const showDeleteModal = ref(false)
const taskToDelete = ref<Task | null>(null)

function openDeleteModal(task: Task) {
  taskToDelete.value = task
  showDeleteModal.value = true
}

function closeDeleteModal() {
  showDeleteModal.value = false
  taskToDelete.value = null
}

async function confirmDelete() {
  if (!taskToDelete.value) return

  try {
    isDeleting.value = true
    await deleteTask(taskToDelete.value.id!)
    await loadTasks()
    closeDeleteModal()
  } catch (err) {
    console.error('Failed to delete task:', err)
    alert('Failed to delete task')
  } finally {
    isDeleting.value = false
  }
}
</script>
