<template>
  <div class="bg-white rounded-lg uneven-border p-4 ">
    <div class="p-12">
      <UAlert
        v-if="shortLink"
        icon="i-heroicons-link"
        color="primary"
        variant="solid"
        title="Your F.A.R.T. is ready!"
        class="mb-4"
      >
        <template #description>
          <div class="flex justify-between items-center">
            <a
              :href="shortLink"
              target="_blank"
              rel="noopener noreferrer"
              class="text-black underline"
            >
              {{ shortLink }}
            </a>
            <UButton
              icon="i-heroicons-clipboard"
              size="sm"
              color="black"
              variant="outline"
              label="Copy"
              @click="copyLink(shortLink)"
            />
          </div>
        </template>
      </UAlert>
      <p class="text-4xl text-gray-800 font-bold mb-10">
        Paste below your long link
      </p>
      <UInput
        v-model="destination"
        icon="i-heroicons-link-20-solid"
        size="sm"
        color="white"
        :trailing="false"
        placeholder="https://www.wikihow.com/Determine-if-You-Are-Addicted-to-Wearing-Diapers-as-an-Adult"
        style="height: 60px !important; font-size: large; border-radius: 30px;"
        @keydown.enter="createLink"
      />
      <div class="mt-2 flex align-center justify-start">
        <div>
          <label class="text-gray-800 font-semibold">
            Password (empty for none)
          </label>
          <UInput
            v-model="password"
            color="white"
            type="password"
            variant="outline"
            placeholder="Password..."
          />
        </div>
        <div class="ms-4">
          <label class="text-gray-800 font-semibold">
            Expiration Date (empty for no expiry)
          </label>
          <UInput
            v-model="expiryDate"
            color="white"
            type="date"
            variant="outline"
            placeholder="Date..."
          />
        </div>
      </div>
      <div class="mt-2 flex align-center justify-end">
        <UButton
          icon="i-heroicons-cloud"
          size="xl"
          color="primary"
          variant="solid"
          label="Create & Share"
          :trailing="false"
          :disabled="waiting"
          @click="createLink"
        />
      </div>
    </div>
  </div>
  <UNotification
    v-if="error"
    id="error"
    icon="i-heroicons-x-circle"
    pause-timeout-on-hover
    :description="error"
    :timeout="3000"
    title="Error"
    color="red"
    class="absolute top-0 right-0 max-w-sm m-4"
    @close="error = ''"
  />
  <UNotification
    v-if="shortLink"
    id="short-link"
    icon="i-heroicons-check-circle"
    :timeout="0"
    :closeable="false"
    title="Short Link Created"
    class="fixed top-0 right-0 max-w-sm m-4"
  >
    <template #description>
      <div class="flex justify-between items-center">
        <a
          :href="shortLink"
          target="_blank"
          rel="noopener noreferrer"
          class="text-blue-500 underline"
        >
          {{ shortLink }}
        </a>
        <UButton
          icon="i-heroicons-clipboard"
          size="sm"
          color="primary"
          variant="outline"
          label="Copy"
          @click="copyLink(shortLink)"
        />
      </div>
    </template>
  </UNotification>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const destination = ref('')
const password = ref('')
const expiryDate = ref('')
const shortLink = ref('')
const error = ref('')
const waiting = ref(false)

async function createLink() {
  error.value = ''
  waiting.value = true

  const { $csrfFetch } = useNuxtApp()

  try {
    const url = await $csrfFetch('/api/urls/create', {
      method: 'POST',
      body: JSON.stringify({
        destination: destination.value,
        password: password.value,
        expiryDate: expiryDate.value,
      }),
    })

    shortLink.value = `${window.location.origin}/${url.slug}`
    reset()
  }
  catch {
    error.value = 'Failed to create short link'
    shortLink.value = ''
  }

  waiting.value = false
}

const reset = () => {
  destination.value = ''
  password.value = ''
  expiryDate.value = ''
}

const copyLink = (shortLink: string) => {
  navigator.clipboard.writeText(shortLink)
}
</script>
