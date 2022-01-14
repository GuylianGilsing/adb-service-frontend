<template>
    <div class="search-bar search-bar--large mt-1 mb-1">
        <input type="text" class="search-bar__input" v-model="searchInputText">
        <button @click="emitSearchEvent" class="search-bar__btn btn btn--primary">Search</button>
    </div>
</template>

<script>
export default {
    name: 'LargeSearchBar',
    data()
    {
        return {
            searchInputText: ''
        }
    },
    methods: {
        emitSearchEvent()
        {
            this.$emit('search', this.$data.searchInputText);
        }
    }
}
</script>
