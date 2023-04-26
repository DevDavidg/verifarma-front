<template>
    <div class="card-main">
      <img :src="movie.Poster === 'N/A' ? 'https://via.placeholder.com/300x480' : movie.Poster" alt="Movie poster" />
      <p>{{ (movie.Year) }}</p>
      <h2>{{ movie.Title }}</h2>
    </div>
</template>
  
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { MovieProps } from '@/types/movie';

export default defineComponent({
  name: 'MovieList',
  props: {
    movie: {
      type: Object as PropType<MovieProps>,
      default: () => ({
        Title: 'Title no data',
        Year: 'No data found',
        imdbID: '-',
        Type: '-',
        Poster: 'N/A',
      }),
    },
  }
});
</script>

<style lang="scss" scoped>
@import "@/styles/variables";

.card-main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 15vw;
    overflow: hidden;
    min-width: 150px;
    cursor: pointer;
    gap: 0.5rem;
    transition: scale 0.3s ease-in-out, transform 0.3s ease-in-out;

    &:hover {
      scale: 1.025;
      transform: translateY(-5%);
      
    }

    img {
      width: 100%;
      height: 100%;
      max-height: 15rem;
      object-fit: contain;
      object-position: center;
      background-color: $color-1;
      border-radius: 5px;
    }

    h2 {
      font-size: 1rem;
      font-weight: 600;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 100%;

    }

    p {
      font-size: 0.8rem;
      font-weight: 400;
      color: $color-gray;
    }
  }
</style>