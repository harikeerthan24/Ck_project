<template>
  <div class="app-container">
    <main>
      <router-view />
    </main>
    
    <footer class="app-footer">
      <p>&copy; 2025 Student Survey Application</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// App component logic
</script>

<style lang="scss">
:root {
  --color-bg: #ffffff;
  --color-text: #343541;
  --color-text-secondary: #6e6e80;
  --color-border: #e5e5e5;
  --color-primary: #10a37f;
  --color-primary-hover: #0e8c6d;
  --color-secondary: #f7f7f8;
  --color-secondary-hover: #ececf1;
  --color-error: #ef4146;
  --color-success: #10a37f;
  --font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  --shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  --radius: 8px;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: var(--font-family);
  color: var(--color-text);
  background-color: var(--color-bg);
  line-height: 1.5;
  font-size: 16px;
}

h1, h2, h3, h4, h5, h6 {
  font-weight: 600;
  line-height: 1.25;
  margin-bottom: 1rem;
  color: var(--color-text);
}

h1 {
  font-size: 1.875rem;
}

h2 {
  font-size: 1.5rem;
}

p {
  margin-bottom: 1rem;
}

a {
  color: var(--color-primary);
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
}

.card {
  background-color: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 1.5rem;
  box-shadow: var(--shadow);
}

.btn {
  display: inline-block;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  text-align: center;
  text-decoration: none;
  border-radius: var(--radius);
  border: 1px solid transparent;
  cursor: pointer;
  transition: background-color 0.2s, border-color 0.2s, color 0.2s;
  
  &:hover {
    text-decoration: none;
  }
  
  &.btn-primary {
    background-color: var(--color-primary);
    color: white;
    
    &:hover {
      background-color: var(--color-primary-hover);
    }
  }
  
  &.btn-secondary {
    background-color: var(--color-secondary);
    color: var(--color-text);
    border-color: var(--color-border);
    
    &:hover {
      background-color: var(--color-secondary-hover);
    }
  }
  
  &.btn-danger {
    background-color: var(--color-error);
    color: white;
    
    &:hover {
      background-color: darken(#ef4146, 5%);
    }
  }
  
  &.btn-success {
    background-color: var(--color-success);
    color: white;
    
    &:hover {
      background-color: var(--color-primary-hover);
    }
  }
}

input, select, textarea {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  font-family: inherit;
  font-size: 0.875rem;
  color: var(--color-text);
  background-color: var(--color-bg);
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: var(--color-primary);
  }
  
  &.invalid {
    border-color: var(--color-error);
  }
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.app-footer {
  padding: 1rem;
  text-align: center;
  color: var(--color-text-secondary);
  font-size: 0.875rem;
  border-top: 1px solid var(--color-border);
}

.error-message {
  color: var(--color-error);
  font-size: 0.75rem;
  margin-top: 0.25rem;
}
</style> 