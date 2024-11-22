<template>
  <div class="profile-container">
    <!-- Sidebar Toggle Button (Mobile Only) -->
    <button 
      class="sidebar-toggle"
      @click="toggleSidebar"
      :class="{ 'is-active': isSidebarOpen }"
    >
      <span class="toggle-icon"></span>
      <span class="toggle-text">Menu</span>
    </button>

    <div class="wrapper">
      <!-- Overlay for mobile -->
      <div 
        class="sidebar-overlay" 
        :class="{ 'is-visible': isSidebarOpen }"
        @click="closeSidebar"
      ></div>

      <!-- Sidebar -->
      <aside 
        class="sidebar"
        :class="{ 'is-open': isSidebarOpen }"
      >
        <div class="sidebar-content">
          <div class="sidebar-header">
            <h5 class="mb-4">My Account</h5>
            <!-- Close button (Mobile Only) -->
            <button 
              class="close-sidebar"
              @click="closeSidebar"
            >
              <span>&times;</span>
            </button>
          </div>
          
          <nav class="sidebar-nav">
            <RouterLink
              v-for="(link, index) in navLinks"
              :key="index"
              :to="link.to"
              class="nav-link"
              active-class="active"
              @click="closeSidebar"
            >
              {{ link.text }}
            </RouterLink>
          </nav>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="main-content">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink, RouterView } from "vue-router";

const isSidebarOpen = ref(false);

const navLinks = [
  {
    to: { name: 'profileSettings' },
    text: 'Profile Settings'
  },
  {
    to: { name: 'pendingOrders' },
    text: 'Pending Orders'
  },
  {
    to: { name: 'ordersHistory' },
    text: 'Order History'
  }
];

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
  if (isSidebarOpen.value) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
};

const closeSidebar = () => {
  isSidebarOpen.value = false;
  document.body.style.overflow = '';
};
</script>

<style scoped lang="scss">
.profile-container {
  min-height: 100vh;
  width: 100%;
  position: relative;
}

.wrapper {
  display: flex;
  min-height: 100vh;
}

// Sidebar Toggle Button (Mobile Only)
.sidebar-toggle {
  display: none;
  position: fixed;
  top: 5rem;
  left: 1rem;
  z-index: 1030;
  padding: 0.5rem;
  background: #198754;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: darken(#198754, 5%);
  }

  .toggle-icon {
    display: block;
    width: 20px;
    height: 2px;
    background: currentColor;
    position: relative;

    &::before,
    &::after {
      content: '';
      position: absolute;
      left: 0;
      width: 100%;
      height: 2px;
      background: currentColor;
      transition: transform 0.3s ease;
    }

    &::before { top: -6px; }
    &::after { bottom: -6px; }
  }

  &.is-active {
    .toggle-icon {
      background: transparent;

      &::before {
        transform: rotate(45deg);
        top: 0;
      }

      &::after {
        transform: rotate(-45deg);
        bottom: 0;
      }
    }
  }

  @media (max-width: 767px) {
    display: flex;
  }
}

// Sidebar
.sidebar {
  width: 250px;
  background-color: #f8f9fa;
  border-right: 1px solid #dee2e6;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1040;
  transition: transform 0.3s ease;

  @media (max-width: 767px) {
    transform: translateX(-100%);
    
    &.is-open {
      transform: translateX(0);
    }
  }
}

.sidebar-content {
  padding: 8em 1rem 1rem;
  height: 100%;
  overflow-y: auto;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  h5 {
    margin: 0;
    color: #333;
  }
}

.close-sidebar {
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #666;
  cursor: pointer;
  padding: 0.25rem;

  &:hover {
    color: #333;
  }

  @media (max-width: 767px) {
    display: block;
  }
}

// Navigation Links
.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.nav-link {
  color: #333;
  padding: 0.75rem 1rem;
  border-radius: 0.25rem;
  text-decoration: none;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #e9ecef;
    color: #198754;
  }
  
  &.active {
    color: #fff;
    background-color: #198754;
    
    &:hover {
      background-color: darken(#198754, 5%);
      color: #fff;
    }
  }
}

// Overlay
.sidebar-overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1035;
  opacity: 0;
  transition: opacity 0.3s ease;
  
  @media (max-width: 767px) {
    display: block;
    pointer-events: none;
    
    &.is-visible {
      opacity: 1;
      pointer-events: auto;
    }
  }
}

// Main Content
.main-content {
  flex: 1;
  padding: 8em 2rem 2rem;
  margin-left: 250px;
  width: calc(100% - 250px);
  min-height: 100vh;
  
  @media (max-width: 767px) {
    margin-left: 0;
    width: 100%;
    padding: 8em 1rem 1rem;
  }
}
</style>