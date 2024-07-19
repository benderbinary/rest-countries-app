<template>
    <nav class="navbar">
        <div class="container">
            <h1 class="logo">Where in the world?</h1>
        </div>
    </nav>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
@import '@/styles/theme.scss';

.navbar {
    font-family: var(--font-family);
    background-color: var(--white);
    color: var(--very-dark-blue-text);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    padding: 1rem 3rem;

    .container {}

    .logo {
        font-weight: var(--font-weight-bold);
        font-size: 1rem;
    }
}

[data-theme='dark'] {
    .navbar {
        background-color: var(--dark-blue-elements);
        color: var(--white);
    }
}
</style>
