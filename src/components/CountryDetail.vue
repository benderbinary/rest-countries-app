<template>
    <Navbar />
    <div v-if="country" class="country-detail">
        <button class="back-button" @click="$router.back()">
            Back
        </button>

        <div class="country-content">
            <img :src="country.flags.png" alt="Country Flag" class="country-flag" />
            <div class="country-details">
                <h2>{{ country.name }}</h2>
                <div class="detail-groups">
                    <div class="detail-group">
                        <p><strong>Native Name:</strong> {{ country.nativeName }}</p>
                        <p><strong>Population:</strong> {{ country.population.toLocaleString() }}</p>
                        <p><strong>Region:</strong> {{ country.region }}</p>
                        <p><strong>Sub Region:</strong> {{ country.subregion }}</p>
                        <p><strong>Capital:</strong> {{ country.capital }}</p>
                    </div>
                    <div class="detail-group">
                        <p><strong>Top Level Domain:</strong> {{ country.topLevelDomain.join(', ') }}</p>
                        <p><strong>Currencies:</strong> {{ country.currencies.map(c => c.name).join(', ') }}</p>
                        <p><strong>Languages:</strong> {{ country.languages.map(l => l.name).join(', ') }}</p>
                    </div>
                </div>

                <div class="border-countries" v-if="country.borders && country.borders.length > 0">
                    <h3>Border Countries:</h3>
                    <div class="border-country-tags">
                        <router-link v-for="borderCode in country.borders" :key="borderCode"
                            :to="{ name: 'CountryView', params: { code: borderCode } }" class="border-country-tag">
                            {{ borderName(borderCode) }}
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
import Navbar from "@/components/Navbar.vue";

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

<style scoped lang="scss">
.country-detail {
    display: flex;
    flex-direction: column;
    padding: 40px 80px;
    /* As per style guide */
    font-size: 16px;
    max-width: 1440px;
    margin: 0 auto;

    @media (max-width: 768px) {
        padding: 20px;
    }

    .back-button {
        display: inline-flex;
        align-items: center;
        background: none;
        border: none;
        padding: 0;
        background-color: var(--white);
        color: var(--very-dark-blue-text) !important;
        font-weight: var(--font-weight-regular);
        cursor: pointer;
        padding: 0.5rem 1rem;
        border-radius: 5px;
        text-decoration: none;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        width: 4rem;

        img {
            width: 20px;
            margin-right: 8px;
        }
    }

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
        border-radius: 10px;

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
            font-size: 1.5em;
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
            flex: 1;

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

            span.label {
                font-weight: var(--font-weight-regular);
            }
        }
    }

    .border-countries {
        margin-top: 72px;

        h3 {
            font-weight: var(--font-weight-bold);
            margin-bottom: 16px;
        }

        .border-country-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }

        .border-country-tag {
            background-color: var(--white);
            color: var(--very-dark-blue-text);
            padding: 0.5rem 1rem;
            border-radius: 5px;
            text-decoration: none;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }
    }
}

[data-theme='dark'] {
    .border-country-tag {
        background-color: var(--dark-blue-elements) !important;
        color: var(--white) !important;
    }

    .back-button {
        padding: 0.5rem 1rem;
        border-radius: 5px;
        text-decoration: none;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        background-color: var(--dark-blue-elements) !important;
        color: var(--white) !important;
        width: 4rem;
    }
}
</style>
