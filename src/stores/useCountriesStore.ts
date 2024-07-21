import { defineStore, acceptHMRUpdate } from 'pinia';
import api from '@/services/api';
import type { Country } from '@/types/types';
import Fuse from "fuse.js";

export const useCountriesStore = defineStore('countries', {
    state: () => ({
        allCountries: [] as Country[],
        searchQuery: '',
        selectedRegion: '',
        regions: [] as string[],
        isLoading: true,
        sortBy: '' as 'name' | 'population' | ''
    }),
    getters: {
        filteredCountries: (state) => {
            let filtered = state.allCountries;

            if (state.searchQuery) {
                const fuse = new Fuse(filtered, { keys: ["name"], threshold: 0.4 });
                filtered = fuse.search(state.searchQuery).map(result => result.item);
            }

            if (state.selectedRegion) {
                filtered = filtered.filter(
                    (country) => country.region === state.selectedRegion
                );
            }

            if (state.sortBy === 'name') {
                filtered.sort((a, b) => a.name.localeCompare(b.name));
            } else if (state.sortBy === 'population') {
                filtered.sort((a, b) => b.population - a.population);
            }
            return filtered;
        },
    },
    actions: {
        async fetchCountries() {
            this.isLoading = true;
            try {
                const response = await api.get<Country[]>('/all');
                this.allCountries = response.data;
                this.regions = ['All', ...Array.from(new Set(response.data.map(country => country.region)))];
            } catch (error) {
                console.error('Error fetching countries:', error);
            } finally {
                this.isLoading = false;
            }
        },
        setSearchQuery(query: string) {
            this.searchQuery = query;
        },
        setSelectedRegion(region: string) {
            this.selectedRegion = region;
        },
        setSortBy(sortBy: 'name' | 'population' | '') {
            this.sortBy = sortBy;
        },
    }
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCountriesStore, import.meta.hot));
}
