<template>
    <main id="main-content">
        <section>
            <div class="container">
                <div class="row row--gapped">
                    <div class="col-xs-100 col-sm-100 col-md-45 col-lg-45">
                        <img src="/assets/img/placeholders/image.svg" alt="" style="width: 100%; height: auto">
                    </div>
                    <div class="col-xs-100 col-sm-100 col-md-50 col-lg-50 space-md-left-5 space-lg-left-5">
                        <div class="font--size-heading-2 font--weight-semi-bold mb-0_5">{{ attractionData.rollerCoaster.name }}</div>
                        <div class="font--size-heading-5 font--weight-semi-bold">{{ attractionData.rollerCoaster.park }}</div>
                        <p  v-show="attractionData.rollerCoaster.description.length > 0">{{ attractionData.rollerCoaster.description }}</p>
                        <div class="information-table mb-1">
                            <div class="information-table__title">General information</div>
                            <div class="information-table__row">
                                <span class="font--weight-semi-bold">Opening date: </span>{{ attractionData.rollerCoaster.openingDate }}
                            </div>
                            <div class="information-table__row">
                                <span class="font--weight-semi-bold">Status: </span>{{ attractionData.rollerCoaster.status }}
                            </div>
                            <div class="information-table__row">
                                <span class="font--weight-semi-bold">Country: </span>{{ attractionData.rollerCoaster.country }}
                            </div>
                            <div class="information-table__row">
                                <span class="font--weight-semi-bold">Height: </span>{{ attractionData.rollerCoaster.height }}
                            </div>
                            <div class="information-table__row">
                                <span class="font--weight-semi-bold">Speed: </span>{{ attractionData.rollerCoaster.speed }}
                            </div>
                            <div class="information-table__row">
                                <span class="font--weight-semi-bold">Elements: </span>{{ attractionData.rollerCoaster.elements }}
                            </div>
                            <div class="information-table__row">
                                <span class="font--weight-semi-bold">Inversions: </span>{{ attractionData.rollerCoaster.inversions }}
                            </div>
                        </div>
                        <div class="information-table">
                            <div class="information-table__title">Technical information</div>
                            <div class="information-table__row" v-for="techInfo in attractionData.rollerCoaster.technicalInformation" :key="techInfo.id">
                                <span class="font--weight-semi-bold">{{ techInfo.name }}: </span>{{ techInfo.value }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
import RollerCoasterService from '../../services/RollerCoasterService.js';
import AttractionStatus from '../../enums/AttractionStatus.js';

const rollerCoasterService = new RollerCoasterService();

export default {
    name: 'AttractionDetail',
    data()
    {
        return {
            attractionData: {
                rollerCoaster: {
                    name: '',
                    description: '',
                    authorId: 1,
                    openingDate: '',
                    status: AttractionStatus.OPERATIONAL.id,
                    park: '',
                    country: '',
                    height: '',
                    speed: '',
                    elements: '',
                    inversions: '',
                    technicalInformation: [
                        {
                            id: 0,
                            name: 'coasterType',
                            value: ''
                        },
                        {
                            id: 0,
                            name: 'manufacturer',
                            value: ''
                        },
                        {
                            id: 0,
                            name: 'trackLength',
                            value: 0
                        },
                        {
                            id: 0,
                            name: 'rideDuration',
                            value: 0.00
                        },
                        {
                            id: 0,
                            name: 'capacity',
                            value: 0
                        },
                        {
                            id: 0,
                            name: 'gForces',
                            value: 0
                        },
                        {
                            id: 0,
                            name: 'trainType',
                            value: ''
                        },
                        {
                            id: 0,
                            name: 'amountOfCartsPerTrain',
                            value: 0
                        },
                        {
                            id: 0,
                            name: 'amountOfSeatsPerTrain',
                            value: 0
                        },
                        {
                            id: 0,
                            name: 'amountOfTrains',
                            value: 0
                        }
                    ]
                }
            }
        }
    },
    methods: {
        setup(attractionType)
        {
            if(
                attractionType != undefined && typeof attractionType == 'string' && attractionType.length > 0 &&
                this.$route.params.attractionId != undefined
            )
            {
                switch(attractionType)
                {
                    case "rollercoasters":
                        this.getCoasterData(this.$route.params.attractionId);
                        break;

                    default:
                        this.$router.push('/attractions');
                        break;
                }
            }
        },
        async getCoasterData(coasterId)
        {
            let coasterData = await rollerCoasterService.get(coasterId);

            coasterData.status = this.getStatusText(coasterData.status);

            this.$data.attractionData.rollerCoaster = coasterData;
        },
        getStatusText(rawStatus)
        {
            const capitalizeFirstLetter = (statusText) => {
                return `${statusText.charAt(0).toUpperCase()}${statusText.substring(1, statusText.length).toLowerCase()}`;
            };

            let status = '';
            const statusEnum = AttractionStatus.getName(rawStatus);

            status = capitalizeFirstLetter(statusEnum.name);

            if(status.length == 0)
                return capitalizeFirstLetter(AttractionStatus.CLOSED.name);

            return status;
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

<style>

</style>
