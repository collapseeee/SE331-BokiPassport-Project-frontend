<script lang="ts" setup></script>

<template>
    <h1>User Profile Page</h1>
    <RouterLink :to="{ name: 'UserProfileBadgesView' }">Badges</RouterLink> | 
    <RouterLink :to="{ name: 'UserProfileExamHistoryView' }">Exam History</RouterLink>
    <div>
        <RouterView/>
    </div>
</template>
