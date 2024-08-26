<template>
  <section class="app">
    <div class="text-center">
      <h1 class="display-4">
        Favourite Movies List - &lpar;{{ store.movies.length }}&rpar;
      </h1>
    </div>
    <section class="app__actions">
      <button class="app__actions-btn" @click="modalState = true">
        Add New Movie
      </button>
      <template v-for="button in sortButtons">
        <button
          :key="button.label"
          v-if="store.movies.length > 1"
          class="app__actions-btn"
          @click="button.onClick()"
        >
          {{ button.label }}
        </button>
      </template>
    </section>
    <MoviesList :data="store.movies" @movie-deleted="updateOriginalMovies" />
  </section>
  <Modal
    :modalIsOpen="modalState"
    @close="handleCloseModal"
    @confirm="handleSubmit"
    confirmType="submit"
  >
    <form class="app__form" @submit.prevent="handleSubmit">
      <h3>Add Movie</h3>
      <ul v-if="formErrors.length > 0">
        <b>You have {{ formErrors.length }} errors</b>
        <li v-for="(error, index) in formErrors" :key="index">{{ error }}</li>
      </ul>
      <label for="title">
        Movie Title
        <input
          type="text"
          placeholder="Enter movie title"
          v-model="formData.title"
        />
      </label>
      <label for="director">
        Movie Director
        <input
          type="text"
          placeholder="Enter movie director"
          v-model="formData.director"
        />
      </label>
      <label for="release-date">
        Movie Release date
        <VueDatePicker v-model="formData.releaseDateUK" :teleport="true" />
      </label>
      <label for="synopsis">
        Movie Synopsis
        <textarea
          type="text"
          placeholder="Enter movie synopsis"
          v-model="formData.synopsis"
        />
      </label>
      <label for="link">
        Movie Link
        <input
          type="text"
          placeholder="Enter movie IMDB link"
          v-model="formData.imdbLink"
        />
      </label>
    </form>
  </Modal>
</template>

<script lang="ts">
import { store } from "../src/store";
import type { Movie } from "../src/store";
import Modal from "./components/Modal.vue";
import MoviesList from "./components/MoviesList.vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

interface FormData {
  title: string;
  director: string;
  releaseDateUK: Date | null;
  synopsis: string;
  imdbLink: string;
}

export default {
  name: "App",
  components: {
    MoviesList,
    Modal,
    VueDatePicker,
  },
  data() {
    return {
      store,
      originalMovies: [...store.movies],
      modalState: false,
      sortButtons: [
        { label: "Sort by Title", onClick: () => store.sortByTitle() },
        {
          label: "Sort by Release Date",
          onClick: () => store.sortByReleaseDate(),
        },
        { label: "Sort by Director", onClick: () => store.sortByDirector() },
        { label: "Reset", onClick: () => this.handleReset() },
      ],
      formErrors: [] as string[],
      formData: {
        title: "",
        director: "",
        releaseDateUK: null,
        synopsis: "",
        imdbLink: "",
      } as FormData,
    };
  },
  methods: {
    handleReset() {
      this.store.movies = [...this.originalMovies];
    },
    updateOriginalMovies(updatedMovies: Movie[]) {
      this.originalMovies = [...updatedMovies];
    },
    handleCloseModal() {
      this.modalState = !this.modalState;
      this.resetForm();
      this.formErrors = [];
    },
    resetForm() {
      this.formData = {
        title: "",
        director: "",
        releaseDateUK: null,
        synopsis: "",
        imdbLink: "",
      };
    },
    handleConfirm() {
      this.modalState = !this.modalState;
    },
    formatDate(date: Date | null): string {
      if (!date) return "";
      return new Date(date).toISOString().split(".")[0]; // Format date to 'YYYY-MM-DDTHH:mm:ss'
    },
    validateForm() {
      this.formErrors = [];

      if (!this.formData.title.trim()) {
        this.formErrors.push("Movie title is required.");
      }
      if (!this.formData.director.trim()) {
        this.formErrors.push("Movie director is required.");
      }
      if (!this.formData.releaseDateUK) {
        this.formErrors.push("Movie release date is required.");
      }
      if (!this.formData.synopsis.trim()) {
        this.formErrors.push("Movie synopsis is required.");
      }
      if (!this.formData.imdbLink.trim()) {
        this.formErrors.push("Movie IMDB link is required.");
      }

      return this.formErrors.length === 0;
    },
    handleSubmit() {
      if (!this.validateForm()) {
        return;
      }

      const formattedReleaseDate = this.formatDate(this.formData.releaseDateUK);

      this.store.movies = [
        ...this.store.movies,
        {
          ...this.formData,
          releaseDateUK: formattedReleaseDate,
        },
      ];

      this.updateOriginalMovies(this.store.movies);

      this.handleCloseModal();
    },
  },
};
</script>

<style lang="scss" scoped>
.app {
  margin-top: 50px;

  &__actions {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 25px;
    margin-top: 50px;

    &-btn {
      border: 2px solid var(--success);
      background-color: var(--light);
    }

    &-btn:hover {
      background-color: var(--success);
      color: var(--light);
    }
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 20px;

    ul {
      color: var(--alert);
    }

    h3 {
      text-align: center;
    }

    label {
      display: flex;
      flex-direction: column;
    }
  }
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
  .app {
    &__actions {
      flex-direction: row;
    }
  }
}
</style>
