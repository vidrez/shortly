<template>
  <div class="flex items-center justify-center full-height">
    <div
      v-if="!unlocked"
      class="min-w-full"
    >
      <h1 class="text-4xl font-semibold text-gray-400">
        This resource was password protected
      </h1>
      <UAlert
        v-if="error"
        color="red"
        :description="error"
        class="mt-4"
      />
      <UInput
        v-model="password"
        color="white"
        type="password"
        variant="outline"
        placeholder="Password..."
        class="mt-4"
        @keydown.enter="unlock"
      />
      <div class="mt-2 flex align-center justify-end">
        <UButton
          icon="i-heroicons-lock-closed"
          size="xl"
          color="primary"
          variant="solid"
          label="Unlock"
          class="mt-4"
          @click="unlock"
        />
      </div>
    </div>
    <AutomaticRedirect
      v-else-if="unlocked && destination"
      :destination="destination"
      :virus-total-analysis="virusTotalAnalysis"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue'

const props = defineProps({
  slug: {
    type: String,
    required: true,
  },
})

const password = ref('')
const unlocked = ref(false)
const destination = ref('')
let virusTotalAnalysis = {}
const error = ref('')
const { $csrfFetch } = useNuxtApp()

const unlock = () => {
  error.value = ''
  $csrfFetch(`/api/urls/${props.slug}`, {
    method: 'POST',
    body: JSON.stringify({ password: password.value }),
  })
    .then((res) => {
      if (!res) return

      if (res.error) {
        error.value = res.error
        return
      }

      destination.value = res.destination
      virusTotalAnalysis = res.virusTotalAnalysis
      unlocked.value = true
    })
    .catch((e) => {
      console.error(e)
    })
}
</script>
