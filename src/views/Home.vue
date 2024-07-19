<template>
    <div class="home-container">
        <CountryCard v-for="country in countries" :key="country.alpha3Code" :country="country" />
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import CountryCard from '@/components/CountryCard.vue';
import api from '@/services/api';
import type { Country } from '@/types/types';

const countries = ref<Country[]>([]);

onMounted(async (): Promise<void> => {
    try {
        const response = await api.get('/all');
        countries.value = response.data;
    } catch (error) {
        console.error('Error fetching countries:', error);
    }
});
</script>

<style scoped></style>
