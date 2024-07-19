<template>
    <div>
        <h1>Country Details</h1>
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
</script>
