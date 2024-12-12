<script setup lang="ts">

</script>

<template>
    <nav class="nav">
      <ul class="nav-list">
        <li class="nav-item">
          <router-link to="/">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/about">About</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/contact">Contact</router-link>
        </li>
      </ul>
    </nav>
</template>

<style lang="css" scoped>
.nav {
  display: flex;
  justify-content: center;
}

.nav-list {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  margin: 0 1rem;
}

.nav-item a {
  text-decoration: none;
  color: white;
  font-weight: bold;
}

.nav-item a:hover {
  text-decoration: underline;
  cursor: pointer;
}
</style>