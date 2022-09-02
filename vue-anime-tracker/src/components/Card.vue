<script setup>
import { ref } from "vue";

defineProps({
    id: String,
    title: String,
    image: String,
    totalEpisodes: Number,
    watchedEpisodes: Number,
});

const count = ref(0);
</script>

<template>

    <div class="card">
        <span>{{title}}</span>
        <img :src="image" alt="image">
    </div>

</template>

<style scoped>
.read-the-docs {
    color: #888;
}
</style>
