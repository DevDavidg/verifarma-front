<template>
    <div>
        <div v-if="isLoading" class="spinner">
            <div class="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
        <div v-else>
            <button @click="logout" class="logout-button">Cerrar sesión</button>
            <HeroFeature />
            <SearchBar @searchMovie="searchMovies($event)" />
            <div class="search_result">
                <p>Search Result:</p>
            </div>
            <div v-if="movies.length === 0" class="no_results">
                <p>No results found</p>
            </div>
            <div class="section_card">
                <MovieCard v-for="movie of movies" :key="movie.imdbID" :movie="movie"
                    @click="goToMovieDetails(movie.imdbID)" />
            </div>
        </div>
    </div>
</template>
  
<script lang='ts'>
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
        SearchBar
    },
    data() {
        return {
            movies: [] as MovieProps[],
            isLoading: true,
        }
    },
    methods: {
        async searchMovies(searchTerm: string, pageNumber: number = 1) {
            try {
                this.isLoading = true;
                const moviesResponse = await getMovieList(searchTerm, pageNumber);
                this.movies = moviesResponse as MovieProps[];
            } finally {
                this.isLoading = true;
            }
        },
        goToMovieDetails(movieId: string) {
            router.push({ name: 'MovieDetails', params: { imdbID: movieId } });
        },
        logout() {
            localStorage.removeItem('authenticated');
            router.push('/login');
        }
    },
    created() {
        this.searchMovies('movie');
        setTimeout(() => {
            this.isLoading = false;
        }, 1000);
    },
})
</script>

<styles lang='scss'>
@import "@/styles/variables";

.spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;

    .lds-ring {
        display: inline-block;
        position: relative;
        width: 80px;
        height: 80px;

        div {
            box-sizing: border-box;
            display: block;
            position: absolute;
            width: 64px;
            height: 64px;
            margin: 8px;
            border: 8px solid $color-1;
            border-radius: 50%;
            animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
            border-color: $color-1 transparent transparent transparent;
        }

        div:nth-child(1) {
            animation-delay: -0.45s;
        }

        div:nth-child(2) {
            animation-delay: -0.3s;
        }

        div:nth-child(3) {
            animation-delay: -0.15s;
        }

        @keyframes lds-ring {
            0% {
                transform: rotate(0deg);
            }

            100% {
                transform: rotate(360deg);
            }
        }
    }
}


.logout-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: 1px solid $color-1;
    background-color: $color-1;
    color: white;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    outline: none;
    transition: all 0.3s ease-in-out;
    z-index: 1;

    &:hover {
        background-color: $color-2;
        color: $color-1;
    }
}

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
</styles>