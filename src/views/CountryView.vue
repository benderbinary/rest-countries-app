<template>
    <Suspense>
        <template #default>
            <CountryDetail v-if="country" :country="country" :border-countries="borderCountriesData"
                :key="(route.params.code as string)" />
        </template>
        <template #fallback>
            <div>loading</div>
        </template>
    </Suspense>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import api from '@/services/api';
import type { Country } from '@/types/types';
import CountryDetail from '@/components/CountryDetail.vue';

const route = useRoute();
const country = ref<Country | null>(null);
const borderCountriesData = ref<Country[]>([]);

onMounted(async () => {
    try {
        const response = await api.get(`/alpha/${route.params.code}`);
        country.value = response.data;
        await fetchBorderCountries(response.data.borders);
    } catch (error) {
        console.error('Error fetching country details:', error);
    }
});

watch(
    () => route.params.code,
    async (newCode, oldCode) => {
        if (newCode !== oldCode) {
            try {
                const response = await api.get(`/alpha/${newCode}`);
                country.value = response.data;
                await fetchBorderCountries(response.data.borders);
            } catch (error) {

            }
        }
    }
);

const fetchBorderCountries = async (borders: string[]) => {
    if (borders && borders.length > 0) {
        try {
            const response = await api.get(`/alpha?codes=${borders.join(',')}`);
            borderCountriesData.value = response.data;
        } catch (error) {
            console.error('Error fetching border countries:', error);
        }
    }
};
</script>
