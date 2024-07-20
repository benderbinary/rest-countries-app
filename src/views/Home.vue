<template>
    <Navbar />
    <div class="home-container">
        <div class="search-filter-container">
            <div class="search-container">
                <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="search-icon" />
                <input type="text" placeholder="Search for a country..." v-model="searchQuery" @input="handleSearch" />
            </div>

            <div class="select-wrapper" ref="selectWrapper">
                <div class="custom-select" @click="toggleDropdown" :class="{ 'open': isOpen }">
                    <span>{{ selectedRegion || 'Filter by Region' }}</span>
                    <font-awesome-icon :icon="['fas', 'chevron-down']" class="select-icon"
                        :class="{ 'rotated': isOpen }" />
                </div>
                <div v-if="isOpen" class="select-options">
                    <div v-for="region in regions" :key="region" @click="selectOption(region)" class="select-option">
                        {{ region }}
                    </div>
                </div>
            </div>
        </div>

        <div class="country-cards-grid">
            <CountryCard v-for="country in filteredCountries" :key="country.alpha3Code" :country="country" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, onUnmounted } from "vue";
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

const countries = ref<Country[]>([]);
const isOpen = ref(false);
const selectWrapper = ref<HTMLElement | null>(null);

const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
};

const selectOption = (region: string) => {
    store.setSelectedRegion(region);
    isOpen.value = false;
};

const handleClickOutside = (event: MouseEvent) => {
    if (selectWrapper.value && !selectWrapper.value.contains(event.target as Node)) {
        isOpen.value = false;
    }
};

onMounted(async () => {
    try {
        const response = await api.get("/all");
        countries.value = response.data;
    } catch (error) {
        console.error("Error fetching countries:", error);
    }

    document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped lang="scss">
.home-container {
    font-family: var(--font-family);
    background-color: var(--very-light-gray);
    padding: 40px;
    font-size: 14px;
    max-width: 1440px;
    margin: 0 auto;
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

.select-wrapper {
    position: relative;
    width: 200px;

    .custom-select {
        width: 100%;
        background-color: var(--white);
        border: none;
        padding: 0.75rem 1.5rem;
        padding-right: 2.5rem;
        margin-left: -4rem;
        border-radius: 5px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        font-family: var(--font-family);
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;

        &.open {
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
        }
    }

    .select-icon {
        transition: transform 0.3s ease;

        &.rotated {
            transform: rotate(180deg);
        }
    }

    .select-options {
        position: absolute;
        top: 100%;
        left: -4rem;
        right: 0;
        background-color: var(--white);
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        z-index: 10;
        margin-top: 0.2rem;
    }

    .select-option {
        padding: 0.75rem 1.5rem;
        cursor: pointer;

        &:hover {
            background-color: rgba(0, 0, 0, 0.05);
        }
    }
}

[data-theme="dark"] {

    .custom-select,
    .select-options,
    .select-option {
        background-color: var(--dark-blue-elements);
        color: var(--white);
    }

    .select-option:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }

    .select-icon {
        color: var(--white);
    }
}
</style>