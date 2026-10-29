<script setup lang="ts">
import BenefitService from '@/services/BenefitService';
import type { Benefit, Level } from '@/types';
import { onMounted, ref, watchEffect, watch } from 'vue';
import FormInput from '../form/FormInput.vue';
import Button from '../Button.vue';
import * as yup from 'yup'
import { useField, useFieldArray, useForm } from 'vee-validate';
import FormError from '../form/FormError.vue';

const props = defineProps<{
    level: Level
}>()

const validationSchema = yup.object({
  description: yup
    .string()
    .max(20, 'Maximum 20 characters.')
    .required('Level Description is required.'),
  passCriteria: yup
    .number()
    .typeError("Level Pass Criteria is required.")
    .required("Level Pass Criteria is required.")
    .min(1, 'Minimum 1%')
    .max(100, 'Maximum 100%'),
  benefits: yup
    .array()
    .of(
        yup.object({
            description: yup
                .string()
                .max(128, 'Maximum 128 characters.')
                .required("Benefit Description is required.")
        })
    )
    .min(1, "At least 1 benefit is required.")
});

const { errors, handleSubmit, resetForm, validate } = useForm({
    validationSchema,
    initialValues: {
        description: props.level.description ?? '',
        passCriteria: Number((props.level.passCriteria * 100).toFixed(0)),
        benefits: [] as Benefit[]
    }
})

const { value: levelDescription } = useField<string>('description')
const { value: levelPassCriteria } = useField<string>('passCriteria')
const { fields: benefits, push: addBenefit, replace: setBenefits } = useFieldArray<Benefit>('benefits')
watch(
    benefits,
    () => {
        validate()
    },
    { deep: true }
)

const defaultBenefits = ref<Benefit[]>([])
onMounted(() => {
    watchEffect(() => {
        BenefitService.getBenefitsByLevel(props.level.id)
            .then(res => {
                setBenefits(res.data)
                defaultBenefits.value = res.data
            })
    })
})

const handleSave = () => {

}

const handleCancel = () => {

}

const handleAddBenefit = () => {
    // Temporary assign id for benefit id, must be removed before send to backend.
    const tempId = -(Date.now() + Math.floor(Math.random() * 1000))
    addBenefit({
        id: tempId,
        description: "",
        level: props.level
    } as Benefit)
}
</script>

<template>
    <div class="flex flex-col gap-1.5 bg-brand-gray rounded-2xl p-5">
        <div class="flex flex-row justify-between">
            <div class="flex flex-col gap-y-0">
                <h3>{{ level.name }}</h3>
                <div class="flex flex-row items-center gap-x-2">
                    <h5>Level Description: </h5>
                    <FormInput :id="String(level.id)" label="" placeholder="Level Description" v-model="levelDescription" class="h-fit w-40 text-md py-0"/>
                </div>
                <FormError :errors="errors.description"></FormError>
            </div>
            <div class="flex flex-col gap-y-0">
                <h3 class="text-end">Pass Criteria </h3>
                <div class="flex flex-row items-center gap-x-2 justify-end">
                    <FormInput :id="String(level.id)" type="number" label="" placeholder="Level Pass Criteria" v-model="levelPassCriteria" class="h-fit w-24 text-md py-0"/>
                    <h5 class="text-end">%</h5>
                </div>
                <FormError :errors="errors.passCriteria" />
            </div>
        </div>
        <hr>
        <p class="font-semibold">Benefits:</p>
        <div v-for="(benefit, index) in benefits" :key="benefit.key" class="flex flex-col">
            <div class="flex flex-row items-center justify-center gap-x-2">
                <FormInput :id="String(benefit.key)" label="" placeholder="Level Benefit Description" v-model="benefit.value.description" class="w-full"/>
                <p class="cursor-pointer py-0 px-0">X</p>
            </div>
            <!-- For empty benefit description input -->
            <FormError :errors="errors[`benefits[${index}].description`]" />
        </div>
        <Button @click.prevent="handleAddBenefit" label="Add +" textColor="brand-black" bgColor="transparent" class="place-self-center underline"/>
        <!-- For benefit description that is less than 1 -->
        <FormError :errors="benefits?.length === 0 ? errors.benefits : undefined" />
        <div class="flex flex-row gap-x-2 justify-between w-full mt-auto">
            <Button @click="handleCancel" textColor="brand-black" bgColor="brand-white" label="Cancel" class="w-full"/>
            <Button @click="handleSave" label="Save" class="w-full"/>
        </div>
    </div>
</template>