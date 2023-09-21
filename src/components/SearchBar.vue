<template>
    <div class="input_section">
        <input v-model="searchTerm" type="text" placeholder="Buscar películas" @input="delayedSearch">
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'SearchBar',
    data() {
        return {
            searchTerm: '',
            searchTimeout: 0,
        };
    },
    methods: {
        delayedSearch() {
            if (this.searchTerm) {
                clearTimeout(this.searchTimeout);
                this.searchTimeout = setTimeout(() => {
                    this.$emit('searchMovie', this.searchTerm);
                }, 200);
            }
        },
    },
});
</script>
  
<style lang="scss">
@import "@/styles/variables";

.input_section {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    width: 100%;
    padding-top: 1rem;
    padding-bottom: 1.5rem;

    input {
        width: 100%;
        max-width: 30rem;
        height: 2rem;
        border-radius: 5px;
        border: 1px solid $color-gray;
        padding: 0 1rem;
        font-size: 1rem;
        font-weight: 400;
        outline: none;

        &::placeholder {
            font-size: 1rem;
            font-weight: 400;
            color: $color-2;
            opacity: 0.4;
        }

        &:focus {
            border: 1px solid $color-2;
        }
    }
}

@keyframes rgb {
    from {
        filter: hue-rotate(0deg);
    }

    to {
        filter: hue-rotate(360deg);
    }
}
</style>
  