<template>
    <div>
        <HeroFeature />
        <SearchBar @searchMovie="searchMovies($event)" />
        <div class="search_result">
            <p>Search Result:</p>
        </div>
        <div v-if="isLoading" class="loader">
            ...loading
        </div>
        <div v-else-if="movies.length === 0" class="no_results">
            <p>No results found</p>
        </div>
        <div class="section_card" v-else>
            <MovieCard v-for="movie of movies" :key="movie.imdbID" :movie="movie" @click="goToMovieDetails(movie.imdbID)" />
        </div>
    </div>
</template>
  
<script lang="ts">
import MovieCard from '@/components/MovieCard.vue';
import HeroFeature from '@/components/HeroFeature.vue';
import SearchBar from '@/components/SearchBar.vue';
import { getMovieList } from '@/services/api';
import { MovieProps } from '@/types/movie';
import { defineComponent } from 'vue';
import router from '@/router';

export default defineComponent({
    name: 'IndexScreen',
    components: {
        MovieCard,
        HeroFeature,
        SearchBar,
    },
    data() {
        return {
            movies: [] as MovieProps[],
            isLoading: true,
        };
    },
    methods: {
        async searchMovies(searchTerm: string, pageNumber: number = 1) {
            const moviesResponse = await getMovieList(searchTerm, pageNumber);
            this.movies = moviesResponse as MovieProps[];
            this.isLoading = false;
        },
        goToMovieDetails(movieId: string) {
            router.push({ name: 'MovieDetails', params: { imdbID: movieId } });
        },
    },
    created() {
        setTimeout(() => {
            this.searchMovies('movie');
        }, 1000);
    },
});
</script>
  
<style scoped lang="scss">
@import '@/styles/variables';

.no_results {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    height: 50vh;

    p {
        font-size: 1.5rem;
        font-weight: 600;
    }
}

.search_result {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    width: 100%;
    max-width: 80vw;
    padding-top: 1rem;
    padding-bottom: 1.5rem;

    p {
        font-size: 1.5rem;
        font-weight: 600;
    }
}

.section_card {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    width: 100%;
    max-width: 80vw;
    gap: 3rem 5rem;
}
</style>
  