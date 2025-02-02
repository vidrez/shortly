<template>
  <div class="container mx-auto min-h-screen px-2">
    <NavBar />
    <div v-if="loading">
      <h1 class="text-4xl font-semibold text-gray-400">
        Looking for your link...
      </h1>
    </div>
    <NotFound v-else-if="notFound === true" />
    <AutomaticRedirect
      v-else-if="notFound === false && !passwordRequired"
      :destination="destination"
      :virus-total-analysis="virusTotalAnalysis"
    />
    <PasswordProtectedRedirect
      v-else-if="notFound === false && passwordRequired"
      :slug="slug"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const loading = ref(true)
const notFound = ref(true)
const destination = ref('')
let virusTotalAnalysis = {}
const slug = ref('')
const passwordRequired = ref(false)

onMounted(() => {
  slug.value = window.location.pathname.slice(1)
  const { $csrfFetch } = useNuxtApp()

  $csrfFetch(`/api/urls/${slug.value}`, {
    method: 'POST',
  })
    .then((res) => {
      loading.value = false
      if (!res || res.error === 'URL not found') {
        notFound.value = true
        return
      }

      notFound.value = false
      if (res.error === 'Password required') {
        passwordRequired.value = true
        return
      }

      destination.value = res.destination
      virusTotalAnalysis = res.analysisStats
      console.log(res)
    })
    .catch(() => {
      loading.value = false
    })
})
</script>
