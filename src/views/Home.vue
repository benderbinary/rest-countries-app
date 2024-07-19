<template>
    <Navbar />
    <!-- <button @click="toggleDarkMode">Dark Mode</button> -->
    <div class="home-container">
        <div class="search-filter-container">
            <div class="search-container">
                <input type="text" placeholder="Search for a country..." v-model="searchQuery" @input="handleSearch" />
            </div>

            <select v-model="selectedRegion" @change="handleFilter">
                <option value="">Filter by Region</option>
                <option v-for="region in regions" :key="region" :value="region">{{ region }}</option>
            </select>
        </div>

        <div class="country-cards-grid">
            <CountryCard v-for="country in filteredCountries" :key="country.alpha3Code" :country="country" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import CountryCard from "@/components/CountryCard.vue";
import api from "@/services/api";
import type { Country } from "@/types/types";
import Navbar from "@/components/Navbar.vue";
import { storeToRefs } from "pinia";
import { useCountriesStore } from "@/stores/useCountriesStore";

const store = useCountriesStore();
const { searchQuery, selectedRegion, regions } = storeToRefs(store);

const { filteredCountries } = storeToRefs(store);

store.fetchCountries();

const handleSearch = () => {
    store.setSearchQuery(searchQuery.value);
};

const handleFilter = () => {
    store.setSelectedRegion(selectedRegion.value);
};

const countries = ref<Country[]>([]);

const isDarkMode = ref(false);

const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;
    document.documentElement.setAttribute(
        "data-theme",
        isDarkMode.value ? "dark" : "light"
    );
};

onMounted(async (): Promise<void> => {
    try {
        const response = await api.get("/all");
        countries.value = response.data;
    } catch (error) {
        console.error("Error fetching countries:", error);
    }
});
</script>

<style scoped lang="scss">
.home-container {
    font-family: var(--font-family);
    background-color: var(--very-light-gray);
    padding: 40px;
}

.search-filter-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
}

.country-cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(264px, 1fr));
    gap: 72px;
}

.search-container {
    width: 20wv;
    background-color: var(--white);
    border-radius: 5px;
    padding: 0.75rem 1.5rem;
    display: flex;
    align-items: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

    input[type="text"] {
        border: none;
        outline: none;
        width: 100%;
        font-family: var(--font-family);
        margin-left: 1rem;
    }

    .search-icon {
        width: 1rem;
    }
}

select {
    width: 200px;
    background-color: var(--white);
    border: none;
    padding: 0.75rem 1.5rem;
    margin-left: 2rem;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    font-family: var(--font-family);
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    background-position: right 1.5rem center;
    padding-right: 3rem;
}

[data-theme="dark"] {

    .search-container,
    select {
        background-color: var(--dark-blue-elements);
        color: var(--white);
    }

    .search-icon {
        filter: brightness(0) invert(1);
    }
}
</style>
