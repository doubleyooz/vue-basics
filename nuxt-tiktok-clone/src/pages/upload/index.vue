<template>
  <UploadError :errorType="errorType" />
  <div
    v-if="isUploading"
    class="fixed flex items-center justify-center top-0 left-0 w-full h-screen bg-black z-50 bg-opacity-50"
  >
    <Icon
      class="animate-spin ml-1"
      name="mingcute:loading-line"
      size="100"
      color="#FFFFFF"
    />
  </div>
  <UploadLayout>
    <div
      class="w-full mt-20 mb-10 bg-white \shadow-lg rounded-md py-6 md:px-10 px-4"
    >
      <div>
        <div class="text-[23px] font-semibold">Upload video</div>
        <div class="text-gray-400 mt-1">Post a video to your account</div>
      </div>
      <div class="mt-8 md:flex gap-6">
        <label
          v-if="!fileDisplay"
          for="fileInput"
          @drop.prevent="onDrop"
          @dragover.prevent=""
          class="md:mx-0 mx-auto mt-4 mb-6 flex flex-col items-center justify-center w-full max-w-[260px] h-[470px] text-center p-3 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-100 cursor-pointer"
        >
          <Icon name="majesticons:cloud-upload" size="40" color="#b3b3b1" />
          <div class="mt-4 text-[17px]">Select video to upload</div>
          <div class="mt-1.5 text-gray-500 text-[13px]">
            Or drag and drop a file
          </div>
          <div class="mt-12 text-gray-400 text-sm">MP4</div>
          <div class="mt-2 text-gray-400 text-[13px]">Up to 30 minutes</div>
          <div class="mt-2 text-gray-400 text-[13px]">Less than 2 GB</div>
          <div
            class="px-2 py-1.5 mt-8 text-white text-[15px] w-4/5 bg-[#F02C56] rounded-sm"
          >
            Select a file
          </div>
          <input
            ref="file"
            @input="onChange"
            type="file"
            id="fileInput"
            hidden
            accept=".mp4"
          />
        </label>
        <div
          v-else
          class="md:mx-0 mx-auto mt-4 md:mb-12 mb-16 flex items-center justify-center w-full max-w-[260px] h-[540px] p-3 rounded-2xl cursor-pointer relative"
        >
          <div class="bg-black h-full w-full" />
          <img
            class="absolute z-20 pointer-events-none"
            src="~/assets/mobile-case.png"
            alt=""
          />
          <img
            width="90"
            class="absolute right-4 bottom-6 z-20"
            src="~/assets/tiktok-logo-white.png"
            alt=""
          />

          <video
            autoplay
            loop
            muted
            class="absolute rounded-xl object-colver z-10 p-[13px] w-full h-full"
            :src="fileDisplay"
          />
          <div
            class="absolute -bottom-12 flex items-center justify-between z-50 rounded-xl border w-full p-2 border-gray-300"
          >
            <div class="flex items-center truncate">
              <Icon
                name="clarity:success-standard-line"
                size="16"
                class="min-w-[16px]"
              />
              <div class="text-[11px] pl-1 truncate text-ellipsis">
                {{ fileData.name }}
              </div>
            </div>
            <button
              @click="($event) => clearVideo()"
              class="text-[11px] ml-2 font-semibold"
            >
              Change
            </button>
          </div>
        </div>
        <div class="mt-4 mb-6">
          <div class="flex bg-[#F8F8F8] py-4 px-6">
            <div>
              <Icon class="mr-4" size="20" name="mdi:box-cutter-off" />
            </div>
            <div>
              <div class="text-semibold text-[15px] mb-1.5">
                Divide videos an edit
              </div>
              <div class="text-semibold text-[13px] text-gray-400">
                You can quickly divide videos into multiple parts, remove
                redudant parts and turn landscape videos into portrait videos
              </div>
            </div>
            <div
              class="flex justify-end max-w-[130px] w-full h-full tet-center my-auto"
            >
              <button
                class="px-8 py-1.5 text-white text-[15px] bg-[#F02C56] rounded-sm"
              >
                Edit
              </button>
            </div>
          </div>
          <div class="mt-5">
            <div class="flex items-center justify-between">
              <div class="mb-1 text-[15px]">Caption</div>
              <div class="text-gray-400 text-xs">{{ caption.length }}/150</div>
            </div>
            <input
              v-model="caption"
              maxlength="150"
              class="w-full border p-2.5 rounded-md focus:outline-none"
              type="text"
            />
          </div>
          <div class="flex gap-3">
            <button
              @click="($event) => discard()"
              class="px-10 py-2.5 mt-8 border text-base hover:bg-gray-100 rounded-sm"
            >
              Discard
            </button>
            <button
              class="px-10 py-2.5 mt-8 border text-base text-white bg-[#F02C56] hover:bg-[#e51f4a] rounded-sm"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  </UploadLayout>
</template>

<script setup>
import UploadLayout from "~/layouts/UploadLayout.vue";

let file = ref(null);
let fileDisplay = ref(null);
let errorType = ref(null);
let caption = ref("");
let fileData = ref(null);
let errors = ref(null);
let isUploading = ref(false);

watch(
  () => caption.value,
  (caption) => {
    if (caption.length >= 150) {
      errorType.value = "caption";
      return;
    }
    errorType.value = null;
  }
);

const onChange = () => {
  fileDisplay.value = URL.createObjectURL(file.value.files[0]);
  fileData.value = file.value.files[0];
};

const onDrop = (e) => {
  errorType.value = "";
  file.value = e.dataTransfer.files[0];
  fileData.value = e.dataTransfer.files[0];

  let extension = file.value.name.substring(
    file.value.name.lastIndexOf(".") + 1
  );

  if (extension !== "mp4") {
    errorType.value = "file";
    return;
  }

  fileDisplay.value = URL.createObjectURL(e.dataTransfer.files[0]);
};

const discard = () => {
  file.value = null;
  fileDisplay.value = null;
  fileData.value = null;
  caption.value = "";
};

const clearVideo = () => {
  file.value = null;
  fileDisplay.value = null;
  fileData.value = null;
};
</script>
