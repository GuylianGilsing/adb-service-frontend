<template>
    <div class="attraction">
        <div class="attraction__image-wrapper">
            <img :src="imgSrc" alt="Attraction image" class="attraction__image">
        </div>
        <div class="attraction__info-wrapper">
            <div class="attraction__name">{{ name }}</div>
            <div class="attraction__park">{{ park }}</div>
            <div class="attraction__description">{{ description }}</div>
            <router-link :to="url" class="btn btn--primary">View</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Attraction',
    props: ["image", "url", "name", "park", "description"],
    data()
    {
        return {
            imgSrc: '/assets/img/placeholders/image.svg'
        }
    },
    mounted()
    {
        if(typeof this.$props.image == 'string' && this.$props.image.length > 0)
            this.$data.imgSrc = this.$props.image;
    }
}
</script>

<style>

</style>
