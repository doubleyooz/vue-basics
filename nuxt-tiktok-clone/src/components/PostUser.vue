<template>
  <div
    @mouseenter="($event) => isHover(true)"
    @mouseleave="($event) => isHover(false)"
    class="relative brightness-90 hover:brightness-[1.1] cursor-pointer"
  >
    <div
      v-if="!isLoaded"
      class="absolute flex items-center justify-center top-0 left-0 aspect-[3/4] w-full rounded-md bg-black object-cover"
    >
      <Icon
        class="animate-spin ml-1"
        name="mingcute:loading-line"
        size="100"
        color="#FFFFFF"
      />
    </div>
    <div>
      <video
        ref="video"
        muted
        loop
        class="aspect-[3/4] object-cover rounded-md"
        src="~/assets/cassio.mp4"
      />
    </div>
    <div class="px-1">
      <div class="text-gray-700 text-[15px] pt-1 break-words">
        This is some text
      </div>
      <div class="flex items-center -ml-1 text-gray-600 font-bold text-xs">
        <Icon name="gg:loadbar-sound" size="20" />
        <Icon class="ml-1" name="tabler:alert-circle" size="16" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps(["post"]);

const route = useRoute();
const router = useRouter();

let video = ref<HTMLVideoElement | null>(null);
let isLoaded = ref<boolean>(false);

const isHover = (bool: boolean) => {
  if (bool) video.value?.play();
  else video.value?.pause();
};

onMounted(() => {
  if (video.value) {
    video.value.addEventListener("loadeddata", (e) => {
      if (e.target) {
        setTimeout(() => {
          isLoaded.value = true;
        }, 200);
      }
    });
  }
});

onBeforeUnmount(() => {
  if (!video.value) return;
  video.value.pause();
  video.value.currentTime = 0;
  video.value.src = "";
});
</script>
