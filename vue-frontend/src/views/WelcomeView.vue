<template>
  <div class="welcome-container">
    <div class="welcome-card">
      <h1>Student Survey</h1>
      <p>Welcome to the Student Survey application ! Please choose an option below to get started.</p>
      
      <div class="button-group">
        <router-link to="/student-survey" class="btn btn-primary">Take New Survey</router-link>
        <router-link to="/survey-list" class="btn btn-secondary">View All Surveys</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Welcome component logic
</script>

<style scoped lang="scss">
.welcome-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 100px);
  padding: 2rem 1rem;
  
  .welcome-card {
    max-width: 600px;
    width: 100%;
    text-align: center;
    padding: 3rem 2rem;
    background-color: var(--color-bg);
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    border: 1px solid var(--color-border);
  }
  
  .logo {
    width: 80px;
    height: 80px;
    margin-bottom: 1.5rem;
  }
  
  h1 {
    color: var(--color-text);
    margin-bottom: 1rem;
    font-size: 2.25rem;
    font-weight: 700;
  }
  
  p {
    margin-bottom: 2.5rem;
    color: var(--color-text-secondary);
    font-size: 1.125rem;
    max-width: 450px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .button-group {
    display: flex;
    gap: 1rem;
    justify-content: center;
    
    .btn {
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
      min-width: 180px;
    }
    
    @media (max-width: 576px) {
      flex-direction: column;
      width: 100%;
      max-width: 300px;
      margin: 0 auto;
    }
  }
}
</style> 