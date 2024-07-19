import { defineStore, acceptHMRUpdate } from 'pinia';
import api from '@/services/api';
import type { Country } from '@/types/types';

export const useCountriesStore = defineStore('countries', {
    state: () => ({
        allCountries: [] as Country[],
        searchQuery: '',
        selectedRegion: '',
        regions: [] as string[],
    }),
    getters: {
        filteredCountries: (state) => {
            let filtered = state.allCountries;
            if (state.searchQuery) {
                const query = state.searchQuery.toLowerCase();
                filtered = filtered.filter(country => country.name.toLowerCase().includes(query));
            }
            if (state.selectedRegion) {
                filtered = filtered.filter(country => country.region === state.selectedRegion);
            }
            return filtered;
        },
    },
    actions: {
        async fetchCountries() {
            const response = await api.get('/all');
            this.allCountries = response.data;
            this.regions = Array.from(new Set(response.data.map((country: { region: any; }) => country.region)));
        },
        setSearchQuery(query: string) {
            this.searchQuery = query;
        },
        setSelectedRegion(region: string) {
            this.selectedRegion = region;
        }
    }
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCountriesStore, import.meta.hot));
}
