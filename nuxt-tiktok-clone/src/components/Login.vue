<template>
  <div class="text-center text-3xl mb-4 font-bold">Log in</div>

  <div class="px-6 pb-1.5 text-[15px]">Email address</div>

  <div class="px-6 pb-2">
    <TextInput
      placeholder="Email address"
      v-model:input="email"
      inputType="email"
      :autoFocus="true"
      error=""
    />
  </div>

  <div class="px-6 pb-2">
    <TextInput
      placeholder="Password"
      v-model:input="password"
      inputType="password"
    />
  </div>

  <div class="px-6 text-xs text-gray-600">Forgot password?</div>

  <div class="px-6 pb-2 mt-6">
    <button
      @click="($event) => login()"
      class="w-full text-[17px] font-semibold text-white py-3 rounded-sm"
      :disabled="!email || !password"
      :class="!email || !password ? 'bg-gray-200' : 'bg-[#F02C56]'"
    >
      Log in
    </button>
  </div>
</template>

<script setup lang="ts">
let email = ref<string | null>(null);
let password = ref<string | null>(null);
let errors = ref(null);
</script>
