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
import { PropType } from "vue";

defineProps({
    country: {
        type: Object as PropType<any>,
        required: true,
    },
});
</script>

<style scoped></style>
