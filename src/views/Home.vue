<template>
    <button @click="toggleDarkMode">Dark Mode</button>
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

const isDarkMode = ref(false);

const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;
    document.documentElement.setAttribute('data-theme', isDarkMode.value ? 'dark' : 'light');
};

onMounted(async (): Promise<void> => {
    try {
        const response = await api.get('/all');
        countries.value = response.data;
    } catch (error) {
        console.error('Error fetching countries:', error);
    }
});
</script>

<style scoped>
.home-container {
    font-family: var(--font-family);
    background-color: var(--very-light-gray);
    padding: 40px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(264px, 1fr));
    gap: 72px;
}
</style>
