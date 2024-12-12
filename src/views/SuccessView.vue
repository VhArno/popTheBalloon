<template>
    <section class="success">
      <h1>🎈Je bent ingeschreven!!!🎈</h1>
      <p>
        Hou je mail inbox in de gaten. Wij sturen jouw een mailtje terug of je geselecteerd bent of niet!
      </p>
      <RouterLink to="/">Ga terug</RouterLink>
  
      <div class="img-container">
        <img src="/src/assets/checkMark.png" alt="Check mark">
      </div>
    </section>
</template>
  
<style>
    h1, p {
        text-align: center;
        margin: 1rem 0;
    }

    .success {
        text-align: center;
    }

    .img-container {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    img {
        width: 50%;
    }
</style>
  