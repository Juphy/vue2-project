<template>
    <div class="app-wrapper">
        <Sidebar class="sidebar-container"></Sidebar>
        <div class="main-container">
            <router-view />
        </div>
    </div>
</template>

<script>
import Sidebar from '@/components/Sidebar/index.vue'
export default {
    components: {
        Sidebar
    }
}
</script>

<style>

</style>