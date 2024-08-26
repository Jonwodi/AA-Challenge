<template>
  <section>
    <dl class="movies-list">
      <div v-for="movie in data" :key="movie.title" class="movies-list__item">
        <dt>{{ movie.title }} - {{ getDateYear(movie.releaseDateUK) }}</dt>
        <dd>
          <p>{{ movie.synopsis }}</p>
          <p><strong>Directed by:</strong> {{ movie.director }}</p>
          <p>
            See more on
            <a :href="movie.imdbLink" target="_blank" rel="noopener noreferrer">
              IMDB
            </a>
          </p>
          <button
            class="movies-list__delete"
            @click="handleDelete(movie.title)"
          >
            Delete
          </button>
        </dd>
      </div>
    </dl>
    <Modal
      :modalIsOpen="modalState"
      @close="handleCloseModal"
      @confirm="handleConfirm"
    >
      Are you sure you want to delete
      <strong>{{ store.currentMovie }} &quest;</strong>
    </Modal>
  </section>
</template>

<script lang="ts">
import { store } from "../store";
import type { Movie } from "../store";
import Modal from "./Modal.vue";

export default {
  name: "MoviesList",
  components: {
    Modal,
  },
  props: {
    data: {
      type: Array as () => Movie[],
      required: true,
    },
  },
  emits: ["movie-deleted"],
  data() {
    return {
      store,
      modalState: false,
    };
  },
  methods: {
    getDateYear(date: string | null) {
      if (date === null) {
        return "No Release Date";
      }
      return new Date(date).getFullYear();
    },
    handleDelete(movie: string) {
      this.store.currentMovie = movie;
      this.modalState = true;
    },
    handleCloseModal() {
      this.modalState = !this.modalState;
    },
    handleConfirm() {
      this.store.movies = this.store.movies.filter(
        (movie: Movie) => movie.title !== this.store.currentMovie
      );
      this.$emit("movie-deleted", [...this.store.movies]);
      this.modalState = !this.modalState;
    },
  },
};
</script>

<style lang="scss" scoped>
.movies-list {
  margin-top: 50px;

  &__item {
    margin-bottom: 50px;
  }

  &__delete {
    border: 2px solid var(--alert);
    background-color: var(--light);

    &:hover {
      background-color: var(--alert);
      color: var(--light);
    }
  }
}
</style>
