<template>
  <div class="container mx-auto min-h-screen px-2">
    <NavBar />
    <div class="flex items-center justify-center full-height">
      <div class="min-w-full">
        <WelcomeBanner />
        <LinkGenerator />
      </div>
    </div>
    <div class="max-w-md p-6 bg-black-100 rounded-lg text-left mt-12">
      <p class="text-xl font-semibold text-gray-400 italic">
        "Shortly: Fast, clean, and to the point. Just as they should be."
      </p>
      <span class="block mt-4 text-sm text-green-600">- Unknown luminary in the field of IT</span>
    </div>
  </div>
</template>
