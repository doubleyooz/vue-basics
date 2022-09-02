<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { ref, computed, onMounted } from "vue";

const query = ref("");
const myAnime = ref([]);
const searchResults = ref([]);

const myAnimeAsc = computed(() => {
  return myAnime.value.sort((a, b) => {
    return a.title.localeCompare(b.title);
  });
});

const searchAnime = () => {
  const url = `https://api.jikan.moe/v4/anime?${query.value}`;
  fetch(url)
    .then((res) => res.json())
    .then((res) => {
      searchResults.value = res.data;
    });
};

const handleInput = (e) => {
  if (!e.target.value) {
    searchResults.value = [];
  }
};

const addAnime = (anime) => {
  searchResults.value = [];
  query.value = "";

  myAnime.value.push({
    id: anime.mal_id,
    title: anime.title,
    iamge: anime.images.jpg.image_url,
    totalEpisodes: anime.episodes,
    watchedEpisodes: 0
  });

  localStorage.setItem('myAnime'), JSON.stringify(myAnime.value)
};

const increaseWatch = watch => {
  anime.watchedEpisodes++;
  localStorage.setItem('myAnime'), JSON.stringify(myAnime.value)
}

const decreaseWatch = watch => {
  anime.watchedEpisodes--;
  localStorage.setItem('myAnime'), JSON.stringify(myAnime.value)
}

onMounted(() => {
  myAnime.value = JSON.parse(localStorage.getItem('myAnime')) || []
})
</script>

<template>
  <main>Hello, World</main>
</template>

<style scoped>
</style>
