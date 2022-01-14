<template>
    <main id="main-content">
        <div class="banner">
            <img src="/assets/img/wallpapers/dlrp-castle-sunset.jpg" alt="" class="banner__background-image">
            <div class="container txt--align-center">
                <h1>Search Attractions</h1>
                <LargeSearchBar
                    v-on:search="searchEvent"
                />
                <router-link to="/attractions/rollercoasters">RollerCoasters</router-link>
                &nbsp;
                <router-link to="/attractions/dark-rides">Dark-Rides</router-link>
            </div>
        </div>
        <section>
            <div class="container">
                <div class="txt--align-center">
                    <div v-if="showView.attractions && !showView.search" class="font--headings font--size-heading-3 font--weight-bold">All Rollercoasters</div>
                    <div v-if="!showView.attractions && showView.search" class="font--headings font--size-heading-3 font--weight-bold">Search results</div>
                    <button v-if="!showView.attractions && showView.search" @click="showAttractionsView" class="btn btn--primary mt-1">Reset search</button>
                </div>
                <div v-if="preloaders.attractions && !preloaders.search" class="space--vertical-small txt--align-center">
                    <div class="preloader preloader--spinner preloader--spinner-blue"></div>
                    <div class="mt-0_5">Loading RollerCoasters...</div>
                </div>
                <div v-if="!preloaders.attractions && preloaders.search" class="space--vertical-small txt--align-center">
                    <div class="preloader preloader--spinner preloader--spinner-blue"></div>
                    <div class="mt-0_5">Searching for attractions...</div>
                </div>
                <div v-if="!preloaders.attractions && !preloaders.search && display.length > 0" class="grid grid--attractions">
                    <Attraction
                        v-for="rollerCoaster in display" :key="rollerCoaster.id"

                        image=""
                        :url="`/attractions/rollercoasters/${rollerCoaster.id}`"
                        :name="rollerCoaster.name"
                        :park="rollerCoaster.park"
                        :description="rollerCoaster.description"
                    />
                </div>
                <p v-if="!preloaders.attractions && !preloaders.search && display.length == 0" class="txt--align-center">No attractions found</p>
            </div>
        </section>
    </main>
</template>

<script>
import RollerCoasterService from '../../services/RollerCoasterService.js';

import Attraction from '@/components/Attraction.vue';
import LargeSearchBar from '@/components/LargeSearchBar.vue';

const rollerCoasterService = new RollerCoasterService();

export default {
    name: 'Home',
    components: {
        Attraction,
        LargeSearchBar
    },
    data()
    {
        return {
            preloaders: {
                attractions: false,
                search: false
            },
            attractions: {
                rollerCoasters: [],
                search: []
            },
            showView: {
                attractions: true,
                search: false
            },
            display: []
        }
    },
    methods: {
        setup(attractionType)
        {
            if(attractionType != undefined && typeof attractionType == 'string' && attractionType.length > 0)
            {
                switch(attractionType)
                {
                    case "rollercoasters":
                        this.getAllRollerCoasters();
                        this.showAttractionsView();
                        break;

                    default:
                        this.$router.push('/attractions');
                        break;
                }
            }
        },
        async searchEvent(searchText = "")
        {
            if(searchText.length == 0)
            {
                this.showAttractionsView();
                return;
            }
            
            this.showSearchView();

            this.$data.preloaders.search = true;
            const results = await this.searchForCoasters(searchText);
            this.$data.preloaders.search = false;

            this.$data.attractions.search = results;
            this.$data.display = this.$data.attractions.search;
        },
        async getAllRollerCoasters()
        {
            this.$data.preloaders.attractions = true;
            this.$data.attractions.rollerCoasters = await rollerCoasterService.getAll();
            this.$data.preloaders.attractions = false;

            if(this.$data.showView.attractions)
                this.$data.display = this.$data.attractions.rollerCoasters;
        },
        async searchForCoasters(searchText)
        {
            return await rollerCoasterService.search(searchText, searchText);
        },
        showAttractionsView()
        {
            this.$data.showView.attractions = true;
            this.$data.showView.search = false;

            if(this.$route.params.attractionType == "rollercoasters")
            {
                this.$data.display = this.$data.attractions.rollerCoasters;
            }
        },
        showSearchView()
        {
            this.$data.showView.attractions = false;
            this.$data.showView.search = true;

            this.$data.display = this.$data.attractions.search;
        },
    },
    mounted()
    {
        if(this.$route.params.attractionType != undefined)
            this.setup(this.$route.params.attractionType);
    },
    beforeRouteUpdate(to, from, next)
    {
        if(to.name == 'AttractionsOverview')
        {
            this.setup(to.params.attractionType);
            next();
        }
    }
}
</script>
