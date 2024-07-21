<template>
    <router-link :to="{ name: 'CountryView', params: { code: country.alpha3Code } }">
        <div class="country-card">
            <img :src="country.flags.png" alt="Country Flag" class="country-flag" />
            <div class="country-info">
                <h3>{{ country.name }}</h3>
                <p>
                    <strong>Population:</strong> {{ country.population.toLocaleString() }}
                </p>
                <p><strong>Region:</strong> {{ country.region }}</p>
                <p><strong>Capital:</strong> {{ country.capital }}</p>
            </div>
        </div>
    </router-link>
</template>

<script setup lang="ts">
const { country } = defineProps<{
    country: {
        flags: {
            png: string;
        },
        name: string;
        population: number;
        region: string;
        capital: string;
        alpha3Code: string;
    };
}>();
</script>

<style scoped lang="scss">
.country-card {
    background-color: var(--white);
    color: var(--dark-blue-elements);
    box-shadow: 0 0 7px 2px rgba(0, 0, 0, 0.03);
    border-radius: 5px;

    a {
        text-decoration: none;
        color: inherit;
    }

    .country-flag {
        height: 160px;
        width: 100%;
        object-fit: cover;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    }

    .country-info {
        padding: 24px;
    }

    h3 {
        margin-bottom: 16px;
        font-weight: var(--font-weight-bold);
    }

    p {
        font-size: var(--homepage-item-size);
        font-weight: var(--font-weight-light);
    }
}

[data-theme='dark'] {
    .country-card {
        background-color: var(--dark-blue-elements);
        color: var(--white);

        .country-info {
            p {
                color: var(--white);

                span {
                    color: var(--white);
                }
            }
        }
    }
}
</style>
