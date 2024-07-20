<template>
    <div v-if="country" class="country-detail">
        <button class="back-button" @click="$router.back()">
            <!-- <img src="@/assets/arrow-left.svg" alt="Back Arrow" /> --> Back
        </button>

        <div class="country-content">
            <img :src="country.flags.png" alt="Country Flag" class="country-flag" />
            <div class="country-details">
                <h2>{{ country.name }}</h2>
                <div class="detail-groups">
                    <div class="detail-group">
                        <p><span>Native Name:</span> {{ country.nativeName }}</p>
                        <p><span>Population:</span> {{ country.population.toLocaleString() }}</p>
                        <p><span>Region:</span> {{ country.region }}</p>
                        <p><span>Sub Region:</span> {{ country.subregion }}</p>
                        <p><span>Capital:</span> {{ country.capital }}</p>
                    </div>
                    <div class="detail-group">
                        <p><span>Top Level Domain:</span> {{ country.topLevelDomain.join(', ') }}</p>
                        <p><span>Currencies:</span> {{ country.currencies.map(c => c.name).join(', ') }}</p>
                        <p><span>Languages:</span> {{ country.languages.map(l => l.name).join(', ') }}</p>
                    </div>
                </div>

                <div class="border-countries" v-if="country.borders.length">
                    <h3>Border Countries:</h3>
                    <div class="border-country-tags">
                        <router-link v-for="border in country.borders" :key="border"
                            :to="{ name: 'CountryView', params: { code: border } }" class="border-country-tag">
                            {{ borderName(border) }}
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import api from '@/services/api';
import type { Country } from '@/types/types';

const route = useRoute();
const country = ref<Country | null>(null);

onMounted(async () => {
    try {
        const response = await api.get(`/alpha/${route.params.code}`);
        country.value = response.data;
    } catch (error) {
        console.error('Error fetching country details:', error);
    }
});

const borderName = (code: string) => {
    const borderCountriesData = ref<Country[]>([]);

    onMounted(async () => {
        if (country.value?.borders.length) {
            try {
                const response = await api.get(`/alpha?codes=${country.value.borders.join(',')}`);
                borderCountriesData.value = response.data;
            } catch (error) {
                console.error('Error fetching border countries:', error);
            }
        }
    });
    const borderCountry = borderCountriesData.value.find(c => c.alpha3Code === code);
    return borderCountry ? borderCountry.name : code;
};
</script>

<style scoped>
.country-detail {
    display: flex;
    flex-direction: column;
    padding: 40px 80px;

    @media (max-width: 768px) {
        padding: 20px;
    }

    .back-button {}

    .country-content {
        display: flex;
        margin-top: 55px;

        @media (max-width: 768px) {
            flex-direction: column;
        }
    }

    .country-flag {
        width: 560px;
        height: 401px;
        object-fit: cover;

        @media (max-width: 768px) {
            width: 100%;
            height: 200px;
        }
    }

    .country-details {
        margin-left: 120px;

        @media (max-width: 768px) {
            margin-left: 0;
            margin-top: 32px;
        }

        h2 {
            font-size: 22px;
            margin-bottom: 24px;
            font-weight: var(--font-weight-bold);
        }

        .detail-groups {
            display: flex;

            @media (max-width: 768px) {
                flex-direction: column;
            }
        }

        .detail-group {
            &:first-child {
                margin-right: 145px;
            }

            @media (max-width: 768px) {
                margin-right: 0;

                &:not(:last-child) {
                    margin-bottom: 48px;
                }
            }
        }

        p {
            font-size: 16px;
            line-height: 1.5;
            margin-bottom: 10px;

            span {
                font-weight: var(--font-weight-bold);
            }
        }

        .border-countries {
            margin-top: 72px;

            h3 {
                font-weight: var(--font-weight-bold);
                margin-bottom: 16px;
            }
        }
    }

}
</style>
