<script setup lang="ts">
import BenefitService from '@/services/BenefitService';
import type { Benefit, Level } from '@/types';
import { onMounted, ref, watchEffect, watch } from 'vue';
import FormInput from '../form/FormInput.vue';
import Button from '../Button.vue';

const props = defineProps<{
    level: Level
}>()

const levelDescription = ref(props.level.description);
watch(() => props.level.description, (newVal) => {
    levelDescription.value = newVal;
});

const levelPassCriteria = ref((props.level.passCriteria * 100).toFixed(2));
watch(() => props.level.passCriteria, (newVal) => {
    levelPassCriteria.value = (newVal * 100).toFixed(2);
})

const benefits = ref<Benefit[] | null>(null)
const defaultBenefits = ref<Benefit[] | null>(null)
onMounted(() => {
    watchEffect(() => {
        BenefitService.getBenefitsByLevel(props.level.id)
            .then(res => {
                benefits.value = res.data
                defaultBenefits.value = res.data
            })
    })
})

const handleSave = () => {

}

const handleAdd = () => {    
}

const handleCancel = () => {

}
</script>

<template>
    <div class="flex flex-col gap-1.5 bg-brand-gray rounded-2xl p-5">
        <div class="flex flex-row justify-between">
            <div class="flex flex-col gap-y-0">
                <h3>{{ level.name }}</h3>
                <div class="flex flex-row items-center gap-x-2">
                    <h5>Level Description: </h5>
                    <FormInput :id="String(level.id)" label="" placeholder="Level Description" v-model="levelDescription" class="h-fit w-32 text-md py-0"/>
                </div>
            </div>
            <div class="flex flex-col gap-y-0">
                <h3>Pass Criteria </h3>
                <div class="flex flex-row items-center gap-x-2 justify-end">
                    <FormInput :id="String(level.id)" type="number" label="" placeholder="Level Pass Criteria" v-model="levelPassCriteria" class="h-fit w-24 text-md py-0"/>
                    <h5 class="text-end">%</h5>
                </div>
            </div>
        </div>
        <hr>
        <p class="font-semibold">Benefits:</p>
        <div>
            <FormInput v-for="benefit in benefits" :id="String(benefit.id)" label="" placeholder="Level Benefit" v-model="benefit.description" :key="String(benefit.id)"/>
        </div>
        <Button @click.prevent="handleAdd" label="Add +" textColor="brand-black" bgColor="transparent" class="place-self-center underline"/>
        <div class="flex flex-row gap-x-2 justify-between w-full mt-auto">
            <Button @click="handleCancel" textColor="brand-black" bgColor="brand-white" label="Cancel" class="w-full"/>
            <Button @click="handleSave" label="Save" class="w-full"/>
        </div>
    </div>
</template>