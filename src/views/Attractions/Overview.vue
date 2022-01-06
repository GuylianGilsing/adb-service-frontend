<template>
    <main id="main-content">
        <div class="banner">
            <img src="/assets/img/wallpapers/dlrp-castle-sunset.jpg" alt="" class="banner__background-image">
            <div class="container txt--align-center">
                <h1>Search Attractions</h1>
                <router-link to="/attractions/rollercoasters">RollerCoasters</router-link>
                &nbsp;
                <router-link to="/attractions/dark-rides">Dark-Rides</router-link>
            </div>
        </div>
        <section>
            <div class="container">
                <div class="txt--align-center">
                    <div class="font--headings font--size-heading-3 font--weight-bold">All Rollercoasters</div>
                </div>
                <div v-if="preloaders.attractions" class="space--vertical-small txt--align-center">
                    <div class="preloader preloader--spinner preloader--spinner-blue"></div>
                    <div class="mt-0_5">Loading RollerCoasters...</div>
                </div>
                <div v-if="!preloaders.attractions && attractions.rollerCoasters.length > 0" class="grid grid--attractions">
                    <Attraction
                        v-for="rollerCoaster in attractions.rollerCoasters" :key="rollerCoaster.id"

                        image=""
                        :url="`/attractions/rollercoasters/${rollerCoaster.id}`"
                        :name="rollerCoaster.name"
                        :park="rollerCoaster.park"
                        :description="rollerCoaster.description"
                    />
                </div>
            </div>
        </section>
    </main>
</template>

<script>
import Attraction from '@/components/Attraction.vue';
import RollerCoasterService from '../../services/RollerCoasterService.js';

const rollerCoasterService = new RollerCoasterService();

export default {
    name: 'Home',
    components: {
        Attraction
    },
    data()
    {
        return {
            preloaders: {
                attractions: false
            },
            attractions: {
                rollerCoasters: []
            }
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
                        break;

                    default:
                        this.$router.push('/attractions');
                        break;
                }
            }
        },
        async getAllRollerCoasters()
        {
            this.$data.preloaders.attractions = true;
            this.$data.attractions.rollerCoasters = await rollerCoasterService.getAll();
            this.$data.preloaders.attractions = false;
        }
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
