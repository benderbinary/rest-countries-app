<template>
  <Navbar />
  <LoadingComponent v-if="isLoading" />
  <div v-else class="home-container">
    <div class="search-filter-container">
      <div class="search-container">
        <font-awesome-icon
          icon="fa-solid fa-magnifying-glass"
          class="search-icon"
        />
        <input
          type="text"
          placeholder="Search for a country..."
          v-model="searchQuery"
          @input="handleSearch"
        />
      </div>

      <div class="filters-wrapper">
        <div class="sort-by-container">
          <select v-model="sortBy" @change="handleSort">
            <option value="">Sort by</option>
            <option value="name">Name</option>
            <option value="population">Population</option>
          </select>
        </div>

        <div class="select-wrapper" ref="selectWrapper">
          <div
            class="custom-select"
            @click="toggleDropdown"
            :class="{ open: isOpen }"
          >
            <span class="select-item">{{
              selectedRegion || "Filter by Region"
            }}</span>
            <font-awesome-icon
              :icon="['fas', 'chevron-down']"
              class="select-icon"
              :class="{ rotated: isOpen }"
            />
          </div>
          <div v-if="isOpen" class="select-options">
            <div
              v-for="region in regions"
              :key="region"
              @click="selectOption(region)"
              class="select-option"
            >
              {{ region }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="country-cards-grid">
      <CountryCard
        v-for="country in filteredCountries"
        :key="country.alpha3Code"
        :country="country"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, onUnmounted } from "vue";
import CountryCard from "@/components/CountryCard.vue";
import api from "@/services/api";
import type { Country } from "@/types/types";
import Navbar from "@/components/Navbar.vue";
import LoadingComponent from "@/components/LoadingComponent.vue";
import { storeToRefs } from "pinia";
import { useCountriesStore } from "@/stores/useCountriesStore";

const store = useCountriesStore();
const { searchQuery, selectedRegion, regions, filteredCountries, isLoading } =
  storeToRefs(store);
const countries = ref<Country[]>([]);
const isOpen = ref(false);
const selectWrapper = ref<HTMLElement | null>(null);
const { sortBy } = storeToRefs(store);

store.fetchCountries();

const handleSearch = () => {
  store.setSearchQuery(searchQuery.value);
};

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = (region: string) => {
  if (region === "All") region = "";
  store.setSelectedRegion(region);
  isOpen.value = false;
};

const handleClickOutside = (event: MouseEvent) => {
  if (
    selectWrapper.value &&
    !selectWrapper.value.contains(event.target as Node)
  ) {
    isOpen.value = false;
  }
};

const handleSort = () => {
  store.setSortBy(sortBy.value);
};

onMounted(async (): Promise<void> => {
  try {
    const response = await api.get("/all");
    countries.value = response.data;
    isLoading.value = false;
  } catch (error) {
    console.error("Error fetching countries:", error);
  }
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped lang="scss">
.home-container {
  font-family: var(--font-family);
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
  grid-template-columns: repeat(auto-fill, minmax(264px, 1fr));
  gap: 72px;
  justify-content: start;
}

.search-container {
  width: 30%;
  background-color: var(--white);
  border-radius: 5px;
  padding: 0.75rem 1.5rem;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  color: var(--very-dark-blue-text);

  input[type="text"] {
    background-color: var(--white);
    color: var(--very-dark-blue-text);
    border: none;
    outline: none;
    width: 100%;
    font-family: var(--font-family);
    margin-left: 1rem;

    &::placeholder {
      color: var(--dark-gray);
    }
  }

  .search-icon {
    color: var(--dark-gray);
    width: 1rem;
  }
}

.filters-wrapper {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-right: 2rem;
}

.sort-by-container {
  width: 200px;

  select {
    width: 100%;
    background-color: var(--white);
    border: none;
    padding: 0.75rem 1rem;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    color: var(--very-dark-blue-text);
    font-family: var(--font-family);
    cursor: pointer;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 1rem center;
    background-size: 1em;
  }
}

.select-wrapper {
  position: relative;
  width: 200px;

  .select-item {
    margin-left: 1em;
  }

  .custom-select {
    width: 100%;
    background-color: var(--white);
    border: none;
    padding: 0.75rem 1rem;
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
    left: 0;
    right: 0;
    background-color: var(--white);
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    z-index: 10;
    margin-top: 0.2rem;
    margin-right: -2em;
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
  .navbar {
    background-color: var(--dark-blue-elements);
    color: var(--white);
  }

  .search-container,
  .sort-by-container select,
  .select-wrapper .custom-select,
  .select-wrapper .select-options,
  input[type="text"] {
    background-color: var(--dark-blue-elements);
    color: var(--white);
  }

  .search-container {
    input[type="text"] {
      &::placeholder {
        color: var(--white);
      }
    }

    .search-icon {
      color: var(--white);
    }
  }

  .sort-by-container select {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  }

  .select-icon,
  .search-icon {
    filter: brightness(0) invert(1);
  }

  .select-wrapper {
    .select-option {
      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
    }
  }
}

// Media queries for responsiveness, 768px is habit - old measure for tablets
@media (max-width: 768px) {
  .search-filter-container {
    flex-direction: column;
    align-items: stretch;
  }

  .search-container {
    width: 83%;
    margin-bottom: 1rem;
  }

  .filters-wrapper {
    flex-direction: column;
    gap: 1rem;
  }

  .sort-by-container,
  .select-wrapper {
    width: 100%;
  }
}
</style>
