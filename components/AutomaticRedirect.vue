<template>
  <div

    class="flex items center justify-center full-height"
  >
    <div class="min-w-full text-center">
      <h1 class="text-4xl font-semibold text-gray-400">
        Redirecting to {{ destination }}
      </h1>
      <p class="text-lg text-gray-400 mt-2">
        You will be redirected in
        <span
          v-if="!redirectCancelled"
          class="font-bold"
        >{{ visualCountdown }} seconds.</span>
        <span
          v-else
          class="font-bold text-red-500"
        >CANCELLED</span>
      </p>
      <p class="text-lg text-gray-400">
        If you are not redirected automatically you can still proceed by clicking <a
          class="text-blue-500 underline"
          :href="destination"
          target="_blank"
          rel="noopener noreferrer"
        >{{ destination }}</a>.
      </p>
      <div v-if="props.virusTotalAnalysis.status === 200">
        <div
          class="my-4"
        >
          <h4 class="font-bold text-xl mb-2">
            VirusTotal Results
          </h4>
          <p class="mb-6 text-gray-200">
            Full Analysis available at <a
              class="text-blue-500 underline"
              :href="'https://www.virustotal.com/gui/url/' + encodedDestination"
              target="_blank"
              rel="noopener noreferrer"
            >
              VirusTotal
            </a>
          </p>
          <div class="flex justify-between items-center">
            <UAlert
              :color="props.virusTotalAnalysis.malicious ? 'red' : 'green'"
              :icon="props.virusTotalAnalysis.malicious ? 'i-heroicons-x-circle' : 'i-heroicons-check-circle'"
            >
              <template #description>
                This link was found malicious by <span class="font-bold">{{ props.virusTotalAnalysis.malicious }}</span> engines
              </template>
            </UAlert>
            <UAlert
              :color="props.virusTotalAnalysis.suspicious ? 'yellow' : 'green'"
              :icon="props.virusTotalAnalysis.suspicious ? 'i-heroicons-x-circle' : 'i-heroicons-check-circle'"
              class="ms-2"
            >
              <template #description>
                This link was found suspicious by <span class="font-bold">{{ props.virusTotalAnalysis.suspicious }}</span> engines
              </template>
            </UAlert>
            <UAlert
              :color="props.virusTotalAnalysis.harmless ? 'green' : 'yellow'"
              :icon="props.virusTotalAnalysis.harmless ? 'i-heroicons-x-circle' : 'i-heroicons-check-circle'"
              class="ms-2"
            >
              <template #description>
                This link was found harmless by <span class="font-bold">{{ props.virusTotalAnalysis.harmless }}</span> engines
              </template>
            </UAlert>
          </div>
        </div>
      </div>
      <div v-else>
        <UAlert
          color="red"
          icon="i-heroicons-x-circle"
          title="VirusTotal analysis is not available at the moment."
          class="mt-4"
        >
          <template #description>
            You can still check the URL manually by going to <a
              class="text-white-500 underline"
              :href="'https://www.virustotal.com/gui/url/' + encodedDestination"
              target="_blank"
              rel="noopener noreferrer"
            >
              VirusTotal
            </a>
          </template>
        </UAlert>
      </div>
      <UButton
        icon="i-heroicons-x-circle"
        :disabled="redirectCancelled"
        size="xl"
        color="red"
        variant="outline"
        label="Panic! Stop the redirect!"
        class="mt-12"
        @click="clearRedirectTimer"
      />
    </div>
  </div>
  <UNotification
    v-if="redirectBlocked"
    id="error"
    icon="i-heroicons-x-circle"
    pause-timeout-on-hover
    :timeout="3000"
    title="Warning"
    color="yellow"
    class="absolute top-0 right-0 max-w-sm m-4"
    @close="redirectBlocked = false"
  >
    <template #description>
      It was not safe to redirect you to <span class="font-bold">{{ destination }}</span>.
      <span v-if="props.virusTotalAnalysis.status === 200">
        The link was found to be malicious or suspicious by <span class="font-bold">{{ props.virusTotalAnalysis.malicious + props.virusTotalAnalysis.suspicious }}</span> engines.
      </span>
      <span v-else>
        VirusTotal analysis is not available at the moment. You can still check the URL manually by going to <a
          class="text-blue-500 underline"
          :href="'https://www.virustotal.com/gui/url/' + encodedDestination"
          target="_blank"
          rel="noopener noreferrer"
        >
          VirusTotal
        </a>
      </span>
    </template>
  </UNotification>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount, defineProps, onMounted } from 'vue'

const props = defineProps({
  destination: {
    type: String,
    required: true,
  },
  virusTotalAnalysis: {
    type: Object,
    required: false,
    default: () => ({
      status: 0,
      malicious: 0,
      undetected: 0,
      harmless: 0,
      suspicious: 0,
      timeout: 0,
    }),
  },
})

const visualCountdown = ref(3)
const redirectCancelled = ref(false)
const redirectBlocked = ref(false)
const encodedDestination = btoa(props.destination).replaceAll('=', '')

let updateTimerInterval: NodeJS.Timeout | null = null
let redirectTimeout: NodeJS.Timeout | null = null

onMounted(() => {
  if (props.virusTotalAnalysis.suspicious > 0 || props.virusTotalAnalysis.malicious > 0 || props.virusTotalAnalysis.status !== 200) {
    redirectBlocked.value = true
    redirectCancelled.value = true
    return
  }

  setTimeout(timerUpdate, 1000)
  redirectTimeout = setTimeout(() => {
    window.location.href = props.destination
  }, 3000)
})

onBeforeUnmount(() => {
  clearRedirectTimer()
  clearUpdateTimer()
})

const clearRedirectTimer = () => {
  if (redirectTimeout) {
    clearTimeout(redirectTimeout)
    redirectTimeout = null
    redirectCancelled.value = true
  }
}

const clearUpdateTimer = () => {
  if (updateTimerInterval) {
    clearTimeout(updateTimerInterval)
    updateTimerInterval = null
  }
}

const timerUpdate = () => {
  if (visualCountdown.value > 0) {
    visualCountdown.value--
    updateTimerInterval = setTimeout(timerUpdate, 1000)
  }
  else {
    clearUpdateTimer()
  }
}
</script>
