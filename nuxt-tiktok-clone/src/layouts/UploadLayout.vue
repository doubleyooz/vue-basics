<template>
    <TopNav />
    <div class="bg-[#F8F8F8] h-screen">
      <div class="flex justify-between mx-auto w-full x-2 max-w-[1140px]">
        <slot/>
      </div>
     
    </div>
  </template>
  <script setup>
  
  const route = useRoute();;
  </script>
  