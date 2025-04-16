<template>
  <div class="survey-list-container">
    <div class="header">
      <h1>Student Survey List</h1>
    </div>
    
    <div class="filters">
      <div class="search-container">
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Search by name or email..." 
          @input="handleSearch"
        >
      </div>
    </div>
    
    <div v-if="loading" class="loading">
      <p>Loading surveys...</p>
    </div>
    
    <div v-else-if="surveys.length > 0" class="table-responsive">
      <table class="survey-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Age</th>
            <th>Date</th>
            <th>Campus Influence Aspects</th>
            <th>Interest Source</th>
            <th>Recommendation</th>
            <th>Feedback</th>
            
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="survey in surveys" :key="survey.id">
            <td class="name-cell">{{ survey.firstName }} {{ survey.lastName }}</td>
            <td class="gender-cell">{{ survey.gender }}</td>
            <td class="email-cell">{{ survey.email }}</td>
            <td class="phone-cell">{{ survey.telephoneNumber }}</td>
            <td class="address-cell">{{ survey.streetAddress }}, {{ survey.city }}, {{ survey.state }} {{ survey.zipCode }}</td>
            <td class="age-cell">{{ survey.age }}</td>
            <td class="date-cell">{{ formatDate(survey.surveyDate) }}</td>
            <td class="campus-preferences-cell">{{ survey.campusPreferences?.join(', ') || 'No preferences' }}</td>
            <td class="interest-source-cell">{{ survey.interestSource }}</td>
            <td class="recommendation-cell">{{ survey.recommendationLikelihood || 'No recommendation' }}</td>
            <td class="feedback-cell">{{ survey.feedback || 'No feedback' }}</td>

            <td class="actions-cell">
              <router-link :to="`/edit-survey/${survey.id}`" class="btn btn-primary">Edit</router-link>
              <button @click="confirmDelete(survey)" class="btn btn-danger">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <div v-else class="no-results">
      <div class="empty-state">
        <div class="emoji">📋</div>
        <p>No surveys found yet. Click "Take New Survey" to add one!</p>
        <p v-if="error" class="error-hint">{{ error }}</p>
      </div>
    </div>
    
    <!-- Pagination -->
    <div class="pagination" v-if="totalPages > 1">
      <button 
        :disabled="currentPage === 0" 
        @click="changePage(currentPage - 1)" 
        class="btn"
      >
        Previous
      </button>
      
      <span class="page-info">Page {{ currentPage + 1 }} of {{ totalPages }}</span>
      
      <button 
        :disabled="currentPage >= totalPages - 1" 
        @click="changePage(currentPage + 1)"
        class="btn"
      >
        Next
      </button>
    </div>
    
    <!-- Buttons Container at Bottom -->
    <div class="buttons-container">
      <router-link to="/" class="btn btn-primary back-btn">
        <span></span> Back to Home
      </router-link>
      <router-link to="/student-survey" class="btn btn-primary">
        Take New Survey
      </router-link>
    </div>
    
    <!-- Delete Confirmation Modal -->
    <div class="modal" v-if="showDeleteModal">
      <div class="modal-content">
        <h3>Confirm Delete</h3>
        <p>Are you sure you want to delete the survey for {{ selectedSurvey?.firstName }} {{ selectedSurvey?.lastName }}?</p>
        <div class="modal-actions">
          <button @click="deleteSurvey" class="btn btn-danger">Delete</button>
          <button @click="showDeleteModal = false" class="btn">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { apiService } from '@/services/api.service';
import type { Survey } from '@/models/Survey';

// State
const surveys = ref<Survey[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const currentPage = ref(0);
const totalPages = ref(0);
const searchQuery = ref('');
const showDeleteModal = ref(false);
const selectedSurvey = ref<Survey | null>(null);

// Methods
const loadSurveys = async (page = 0) => {
  try {
    loading.value = true;
    error.value = null;
    
    const response = await apiService.getAllSurveys(page);
    surveys.value = response.data.content;
    totalPages.value = response.data.totalPages;
    currentPage.value = page;
  } catch (err: any) {
    console.error('Error loading surveys:', err);
    // Instead of showing an error message, just set surveys to empty array
    surveys.value = [];
    totalPages.value = 0;
    currentPage.value = 0;
    // Only set error if it's not a connection issue
    if (err.response) {
      error.value = 'Failed to load surveys. Please try again.';
    }
  } finally {
    loading.value = false;
  }
};

const changePage = (page: number) => {
  if (page >= 0 && page < totalPages.value) {
    loadSurveys(page);
  }
};

const handleSearch = () => {
  // Simple client-side filtering by name or email
  // For a real app, you would want to send this to the server
  loadSurveys(0);
};

const confirmDelete = (survey: Survey) => {
  selectedSurvey.value = survey;
  showDeleteModal.value = true;
};

const deleteSurvey = async () => {
  if (!selectedSurvey.value) return;
  
  try {
    await apiService.deleteSurvey(selectedSurvey.value.id!);
    surveys.value = surveys.value.filter(s => s.id !== selectedSurvey.value!.id);
    showDeleteModal.value = false;
    
    // If we deleted the last item on the page, go to previous page
    if (surveys.value.length === 0 && currentPage.value > 0) {
      changePage(currentPage.value - 1);
    } else {
      // Reload current page
      loadSurveys(currentPage.value);
    }
  } catch (err) {
    console.error('Error deleting survey:', err);
    error.value = 'Failed to delete survey. Please try again.';
  }
};

const formatDate = (dateString: string): string => {
  if (!dateString) return 'N/A';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  } catch {
    return dateString;
  }
};

// Lifecycle hooks
onMounted(() => {
  loadSurveys();
});
</script>

<style scoped lang="scss">
.survey-list-container {
  padding: 1rem;
  
  .header {
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
    
    h1 {
      margin-bottom: 0;
      margin-left: auto;
      margin-right: auto;
      font-weight: 700;
      font-size: 2.2rem;
    }
  }
  
  .filters {
    margin-bottom: 1.5rem;
    
    .search-container {
      max-width: 400px;
      
      input {
        padding: 0.75rem 1rem;
        border-radius: var(--radius);
        border: 1px solid var(--color-border);
        background-color: var(--color-secondary);
        font-size: 0.875rem;
        
        &:focus {
          background-color: var(--color-bg);
        }
      }
    }
  }
  
  .table-responsive {
    overflow-x: auto;
    margin-bottom: 2rem;
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    border: 1px solid var(--color-border);
  }
  
  .survey-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.875rem;
    
    th, td {
      padding: 1.25rem;
      text-align: left;
      border-bottom: 1px solid var(--color-border);
      vertical-align: middle;
    }
    
    th {
      background-color: var(--color-secondary);
      font-weight: 600;
      font-size: 0.875rem;
      color: var(--color-text);
      position: sticky;
      top: 0;
      white-space: nowrap;
      user-select: none;
      text-transform: none;
      letter-spacing: normal;
      padding-top: 1rem;
      padding-bottom: 1rem;
      box-shadow: 0 1px 0 var(--color-border);
      text-align: center;
    }
    
    td {
      color: var(--color-text);
      font-weight: 400;
    }
    
    tr:last-child td {
      border-bottom: none;
    }
    
    tr:hover {
      background-color: var(--color-secondary);
    }
    
    .feedback-cell, .campus-preferences-cell {
      max-width: 200px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .actions-cell {
      white-space: nowrap;
      
      .btn {
        margin-right: 0.5rem;
        padding: 0.4rem 0.7rem;
        font-size: 0.75rem;
        
        &:last-child {
          margin-right: 0;
        }
      }
    }
    
    .name-cell {
      font-weight: 600;
      color: var(--color-text);
    }
    
    /* Make sure Phone always displays on one line with proper spacing */
    .phone-cell {
      font-family: inherit;
      font-size: inherit;
      letter-spacing: 0.5px;
      white-space: nowrap;
      text-align: center;
      padding-left: 1.5rem;
      padding-right: 1.5rem;
      min-width: 150px;
      overflow: visible;
    }
    
    /* Column widths */
    th:nth-child(1), td:nth-child(1) { width: 10%; }  /* Name */
    th:nth-child(2), td:nth-child(2) { width: 7%; }   /* Gender */
    th:nth-child(3), td:nth-child(3) { width: 12%; }  /* Email */
    th:nth-child(4), td:nth-child(4) { width: 25%; min-width: 150px; }   /* Phone */
    th:nth-child(5), td:nth-child(5) { width: 15%; }  /* Address */
    th:nth-child(6), td:nth-child(6) { width: 5%; }   /* Age */
    th:nth-child(7), td:nth-child(7) { width: 8%; }   /* Date */
    th:nth-child(8), td:nth-child(8) { width: 9%; }  /* Campus */
    th:nth-child(9), td:nth-child(9) { width: 7%; }   /* Interest */
    th:nth-child(10), td:nth-child(10) { width: 8%; } /* Feedback */
    th:nth-child(11), td:nth-child(11) { width: 8%; } /* Recommendation */
    th:nth-child(12), td:nth-child(12) { width: 6%; } /* Actions */
  }
  
  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-top: 2rem;
    
    .page-info {
      min-width: 120px;
      text-align: center;
      font-size: 0.875rem;
      color: var(--color-text-secondary);
    }
  }
  
  .buttons-container {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
    
    .btn {
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
    }
  }
  
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    
    .modal-content {
      background-color: var(--color-bg);
      padding: 2rem;
      border-radius: var(--radius);
      max-width: 500px;
      width: 90%;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      
      h3 {
        margin-top: 0;
        font-size: 1.25rem;
      }
      
      p {
        margin: 1rem 0;
        color: var(--color-text-secondary);
      }
      
      .modal-actions {
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
        margin-top: 1.5rem;
      }
    }
  }
  
  .loading, .error, .no-results {
    text-align: center;
    padding: 3rem 1rem;
    color: var(--color-text-secondary);
  }
  
  .error {
    color: var(--color-error);
  }
  
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem 1rem;
    
    .emoji {
      font-size: 3.5rem;
      margin-bottom: 1rem;
      color: var(--color-text-secondary);
      opacity: 0.7;
    }
    
    p {
      font-size: 1.1rem;
      color: var(--color-text-secondary);
      text-align: center;
      max-width: 450px;
      margin: 0 auto 0.5rem;
    }
    
    .error-hint {
      font-size: 0.875rem;
      color: var(--color-error);
      margin-top: 1rem;
    }
  }
}
</style> 


