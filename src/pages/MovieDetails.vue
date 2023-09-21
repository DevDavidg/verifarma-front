<template>
  <a :href="`/`" class="backButton">
    Back
  </a>
  <div class="movie_details">
    <div class="movie_details__container">
      <div class="movie_details__container__poster">
        <img :src="getValidPosterUrl(movie?.Poster)" alt="movie poster" />
      </div>
      <div class="movie_details__container__info">
        <h1>{{ getValidValue(movie?.Title) }}</h1>
        <p>{{ getValidValue(movie?.Year) }}</p>
        <p>{{ getValidValue(movie?.Genre) }}</p>
        <p>{{ getValidValue(movie?.Plot) }}</p>
        <p>{{ 'Code: ' + getValidValue(movie?.imdbID) }}</p>
        <p>{{ getValidValue(movie?.imdbRating) + '/10' }}</p>
        <p>{{ getValidValue(movie?.imdbVotes) + ' votes' }}</p>
        <p>{{ getValidValue(movie?.Runtime) + ' minutes' }}</p>
        <p>{{ getValidValue(movie?.Director) + ' is the director' }}</p>
        <p>{{ getValidValue(movie?.Actors) + ' are the actors' }}</p>
        <p>{{ getValidValue(movie?.Language) + ' is the language' }}</p>
        <p>{{ getValidValue(movie?.Country) + ' is the country' }}</p>
        <p>{{ getValidValue(movie?.Awards) + ' are the awards' }}</p>
        <p>{{ getValidValue(movie?.BoxOffice) + ' is the box office' }}</p>
        <p>{{ getValidValue(movie?.Production, 'No Data Found for Production') }}</p>
        <p>{{ getValidValue(movie?.Website, 'No Data Found for Website') }}</p>
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
    const movie = ref<MovieProps | null>(null);
    const movieId = router.currentRoute.value.params.imdbID;
    const id = typeof movieId === 'string' ? movieId : movieId[0];

    const fetchMovieDetails = async () => {
      const movieResponse = await getMovieDetails(id);
      movie.value = movieResponse;
    };

    const getValidPosterUrl = (url: string | undefined): string => {
      return url && url !== 'N/A' ? url : 'https://via.placeholder.com/300x480';
    };

    const getValidValue = (value: string | undefined, fallback: string = 'No results'): string => {
      return value && value !== 'N/A' ? value : fallback;
    };

    return { movie, fetchMovieDetails, getValidPosterUrl, getValidValue };
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

.backButton {
  position: absolute;
  top: 1rem;
  left: 1rem;
  color: #fff;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: 0.1s;

  &:hover {
    transform: scale(1.1);
  }
}

@media screen and (max-width: 600px) {
  .movie_details {
    &__container {
      flex-direction: column;

      &__info {
        width: 100%;
        height: 50%;
      }
    }
  }
}
</style>