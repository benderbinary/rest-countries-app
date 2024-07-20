<template>
    <nav class="navbar">
        <div class="container">
            <h1 class="logo">Where in the world?</h1>
            <button @click="toggleDarkMode">Dark Mode</button>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isDarkMode = ref(false);
const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;
    document.documentElement.setAttribute(
        "data-theme",
        isDarkMode.value ? "dark" : "light"
    );
};
</script>

<style scoped lang="scss">
@import '@/styles/theme.scss';

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
        font-size: 1rem;
    }

    .back-button {
        margin-left: auto;

    }
}

[data-theme='dark'] {
    .navbar {
        background-color: var(--dark-blue-elements);
        color: var(--white);
    }
}
</style>
