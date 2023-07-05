<template>
  <div class="text-center text-3xl mb-4 font-bold">Sign in</div>

  <div class="px-6 pb-2">
    <TextInput
      placeholder="Full name"
      v-model:input="name"
      inputType="name"
      :autoFocus="true"
      error=""
    />
  </div>

  <div class="px-6 pb-2">
    <TextInput
      placeholder="Email address"
      v-model:input="email"
      inputType="email"
      error=""
    />
  </div>

  <div class="px-6 pb-2">
    <TextInput
      placeholder="Password"
      v-model:input="password"
      inputType="password"
      error=""
    />
  </div>

  <div class="px-6 pb-2">
    <TextInput
      placeholder="Confirm Password"
      v-model:input="confirmPassword"
      inputType="confirmPassword"
      error=""
    />
  </div>

  <div class="px-6 text-xs text-gray-600">Forgot password?</div>

  <div class="px-6 pb-2 mt-6">
    <button
      @click="($event) => register()"
      class="w-full text-[17px] font-semibold text-white py-3 rounded-sm"
      :disabled="!email || !name || !confirmPassword || !password"
      :class="
        (!email || !name || !confirmPassword || !password)
          ? 'bg-gray-200'
          : 'bg-[#F02C56]'
      "
    >
      Sign up
    </button>
  </div>
</template>

<script setup lang="ts">
let email = ref<string | null>(null);
let name = ref<string | null>(null);
let password = ref<string | null>(null);
let confirmPassword = ref<string | null>(null);
let errors = ref(null);
</script>
