<template>
    <nav class="navbar">
        <div class="container">
            <router-link to="/" class="logo">
                <h1 class="logo">Where in the world?</h1>
            </router-link>
            <button @click="toggleDarkMode" class="dark-mode-toggle">
                <font-awesome-icon :icon="['fas', isDarkMode ? 'sun' : 'moon']" />
                {{ isDarkMode ? 'Light Mode' : 'Dark Mode' }}
            </button>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

const isDarkMode = ref(false);

const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;
    document.documentElement.setAttribute('data-theme', isDarkMode.value ? 'dark' : 'light');
    localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light');
};

onMounted(() => {
    const savedTheme = localStorage.getItem('theme');
    isDarkMode.value = savedTheme === 'dark';
    document.documentElement.setAttribute('data-theme', isDarkMode.value ? 'dark' : 'light');
});

watch(isDarkMode, (newTheme) => {
    document.documentElement.setAttribute('data-theme', newTheme ? 'dark' : 'light');
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
});
</script>

<style scoped lang="scss">
.navbar {
    font-family: var(--font-family);
    background-color: var(--white);
    color: var(--very-dark-blue-text);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    padding: 1rem 3rem;

    .container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        /* As per style guide */
        max-width: 1440px;
        margin: 0 auto;
    }

    .logo {
        font-weight: var(--font-weight-bold);
        font-size: 1.5rem;
        text-decoration: none;
        color: var(--very-dark-blue-text);
    }

    .back-button {
        margin-left: auto;
    }

    .dark-mode-toggle {
        background-color: transparent;
        border: none;
        color: var(--very-dark-blue-text) !important;
        cursor: pointer;
        font-family: var(--font-family);
        font-size: 0.9rem;
        font-weight: bold;
        display: flex;
        align-items: center;
        gap: 0.5rem;

        .fa-moon,
        .fa-sun {
            font-size: 1rem;
        }
    }
}

[data-theme='dark'] {
    .navbar {
        background-color: var(--dark-blue-elements);
        color: var(--white);

        .logo {
            color: var(--white);
        }
    }

    .dark-mode-toggle {
        color: var(--white) !important;
    }
}
</style>
