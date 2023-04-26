<template>
        <HeroFeature />
        <MovieCard />
</template>

<script lang='ts'>
import MovieCard from '@/components/MovieCard.vue';
import HeroFeature from '@/components/HeroFeature.vue';

export default {
    name: 'IndexScreen',
    components: {
    MovieCard,
    HeroFeature
},
    data() {
        return {
        }
    },
}

</script>