<script lang="ts" setup>
import Container from '@/components/Container.vue';
import UserBadge from '@/components/profile/UserBadge.vue';

</script>
<template>
    <Container title="Badges">
        <div class="grid grid-cols-6 w-full h-full gap-4 p-4">
            <UserBadge v-for="value in [1,2,3,4,5,6,7,8,9,10,11,12]" :key="value" />
        </div>
    </Container>
</template>