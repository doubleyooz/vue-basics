import { defineStore } from "pinia";

export const useGeneralStore = defineStore("general", {
  state: () => ({
    isLoginOpen: false,
    isEditProfileOpen: false,
    selectedPost: null,
    ids: null,
    isBackURL: "/",
    posts: null,
    suggested: null,
    following: null
  }),
  action: {},
  persist: true
});
