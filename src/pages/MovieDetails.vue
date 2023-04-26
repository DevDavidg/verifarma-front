<template>
  <div class="movie_details">
    <div class="movie_details__container">
      <div class="movie_details__container__poster">
        <img :src="(
          movie?.Poster === undefined || movie?.Poster === 'N/A'
            ? 'https://via.placeholder.com/300x480'
            : movie?.Poster
        )" alt="movie poster" />
      </div>
      <div class="movie_details__container__info">
        <h1>{{ 
          movie?.Title === undefined || movie?.Title === 'N/A'
            ? 'Loading title...'
            : movie?.Title
          }}</h1>
        <p>{{ 
          movie?.Year === undefined || movie?.Year === 'N/A'
            ? 'Loading year...'
            : movie?.Year
        }}</p>
        <p>{{
          movie?.Genre === undefined || movie?.Genre === 'N/A'
            ? 'Loading genre...'
            : movie?.Genre
          }}</p>
        <p>
          {{ movie?.Plot === undefined || movie?.Plot === 'N/A'
            ? 'Loading plot...'
            : movie?.Plot }}
        </p>
        <p>{{ 'Code:' + ' ' + (movie?.imdbID === undefined || movie?.imdbID === 'N/A'
          ? 'Loading code...'
          : movie?.imdbID) }}</p>
        <p>{{ (
          movie?.imdbRating === undefined || movie?.imdbRating === 'N/A'
            ? 'Loading rating...'
            : movie?.imdbRating) + '/10' }}</p>
        <p>{{ (
          movie?.imdbVotes === undefined || movie?.imdbVotes === 'N/A'
            ? 'Loading votes...'
            : movie?.imdbVotes) + ' ' + 'votes' }}</p>
        <p>{{ (
          movie?.Runtime === undefined || movie?.Runtime === 'N/A'
            ? 'Loading runtime...'
            : movie?.Runtime) + ' ' + 'minutes' }}</p>
        <p>{{ (
          movie?.Director === undefined || movie?.Director === 'N/A'
            ? 'Loading director...'
            : movie?.Director) + ' ' + 'is the director' }}</p>
        <p>{{ (
          movie?.Actors === undefined || movie?.Actors === 'N/A'
            ? 'Loading actors...'
            : movie?.Actors) + ' ' + 'are the actors' }}</p>
        <p>{{ (
          movie?.Language === undefined || movie?.Language === 'N/A'
            ? 'Loading language...'
            : movie?.Language) + ' ' + 'is the language' }}</p>
        <p>{{ (
          movie?.Country === undefined || movie?.Country === 'N/A'
            ? 'Loading country...'
            : movie?.Country) + ' ' + 'is the country' }}</p>
        <p>{{ (
          movie?.Awards === undefined || movie?.Awards === 'N/A'
            ? 'Loading awards...'
            : movie?.Awards) + ' ' + 'are the awards' }}</p>
        <p>{{ (
          movie?.BoxOffice === undefined || movie?.BoxOffice === 'N/A'
            ? 'Loading box office...'
            : movie?.BoxOffice) + ' ' + 'is the box office' }}</p>
        <p>{{ (
          movie?.Production === undefined || movie?.Production === 'N/A'
            ? 'No Data Found for Production'
            : movie?.Production) }}</p>
        <p>{{ (
          movie?.Website === undefined || movie?.Website === 'N/A'
            ? ''
            : movie?.Website) }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { MovieProps } from '@/types/movie';
import router from '@/router';
import { getMovieDetails } from '@/services/api';

export default defineComponent({
  name: 'MovieDetails',

  async created() {
    this.fetchMovieDetails();
  },

  setup() {
    const movie = ref<MovieProps>();
    const movieId = router.currentRoute.value.params.imdbID;
    const id = typeof movieId === 'string' ? movieId : movieId[0];

    const fetchMovieDetails = async () => {
      const movieResponse = await getMovieDetails(id);
      movie.value = movieResponse;
    };

    return { movie, fetchMovieDetails };
  },
});
</script>

<style lang="scss">
.movie_details {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #000;
  color: #fff;

  &__container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 1200px;
    padding: 0 1rem;

    &__poster {
      width: 25rem;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &__info {
      width: 50%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      padding: 0 1rem;
      max-height: 100vh;
      overflow-y: scroll;

      h1 {
        font-size: 1rem;
        font-weight: 600;
        margin-bottom: 1rem;
      }

      p {
        font-size: 0.9rem;
        font-weight: 400;
        margin-bottom: 1rem;
      }
    }
  }
}
</style>