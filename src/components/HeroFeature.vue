<template>
    <div class="hero_main">
        <img src="@/assets/poster.svg" alt="" class="img_hero">
        <div class="hero_text">
            <h1>Hero Movie</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Quisquam, quod. </p>
            <button><img src="@/assets/button.svg" alt=""><span>Watch trailer</span></button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'HeroFeature'
});

</script>

<style lang="scss">
@import '@/styles/variables';

.hero_main {
    width: 100%;

    .img_hero {
        width: 100%;
        height: 100%;
        object-fit: contain;
        filter: brightness(0.5);
    }

    .hero_text {
        position: absolute;
        top: 5rem;
        left: 5rem;
        color: white;
        text-align: left;
        max-width: 30rem;

        h1 {
            font-size: 2.8rem;
        }

        p {
            font-size: .9rem;
        }

        button {
            display: flex;
            padding: 0.5rem;
            border-radius: 6px;
            background: $color-1;
            border: none;
            color: $color-white;
            font-size: 1rem;
            font-weight: 700;
            margin-top: 1rem;
            text-transform: uppercase;
            align-items: center;
            cursor: pointer;
            gap: 0.5rem;
            transition: .1s;

            &:active {
                transform: scale(.95);
            }

            img {
                width: 1.5rem;
            }
        }
    }
}
</style>