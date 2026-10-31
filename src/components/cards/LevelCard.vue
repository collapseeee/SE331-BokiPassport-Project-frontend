<script setup lang="ts">
import BenefitService from '@/services/BenefitService';
import type { Benefit, BenefitPayload, Level, Service, ServicePayload } from '@/types';
import { onMounted, ref, watchEffect, watch } from 'vue';
import FormInput from '../form/FormInput.vue';
import Button from '../Button.vue';
import * as yup from 'yup'
import { useField, useFieldArray, useForm } from 'vee-validate';
import FormError from '../form/FormError.vue';
import LevelService from '@/services/LevelService.ts';
import { Trash2 } from '@lucide/vue';
import ServiceService from '@/services/ServiceService.ts';
import {
  levelDescription as levelDescriptionSchema,
  passCriteria as passCriteriaSchema,
  benefitSchema,
  serviceSchema,
} from '@/validation/schemas';
import { useLevelsStore } from '@/stores/levels.ts';

const props = defineProps<{
    level: Level
}>()

const emit = defineEmits<{
    (emit: 'saved', success: boolean, levelName: string): void
}>();

const levelStore = useLevelsStore();

const validationSchema = yup.object({
  description: levelDescriptionSchema(),
  passCriteria: passCriteriaSchema(),
  benefits: yup
    .array()
    .of(benefitSchema())
    .min(1, 'At least 1 benefit is required.'),
  services: yup
    .array()
    .of(serviceSchema())
    .min(1, 'At least 1 service is required.'),
});

const { errors, handleSubmit, resetForm, validate, meta } = useForm({
    validationSchema,
    initialValues: {
        description: props.level.description ?? '',
        passCriteria: Number((props.level.passCriteria * 100).toFixed(0)),
        benefits: [] as Benefit[],
        services: [] as Service[],
    }
})

const { value: levelDescription } = useField<string>('description');
const { value: levelPassCriteria } = useField<string>('passCriteria');
const { fields: benefits, push: addBenefit, replace: setBenefits, remove: removeBenefit } = useFieldArray<Benefit>('benefits');
const { fields: services, push: addService, replace: setServices, remove: removeService } = useFieldArray<Service>('services');
watch(
    [benefits, services],
    () => {
        validate()
    },
    { deep: true }
)

const defaultBenefits = ref<Benefit[]>([]);
const defaultServices = ref<Service[]>([]);
onMounted(() => {
    watchEffect(() => {
        BenefitService.getBenefitsByLevel(props.level.id)
            .then(res => {
                setBenefits(res.data);
                defaultBenefits.value = JSON.parse(JSON.stringify(res.data));
            })
            .catch((error) => {
                console.error('An error occurs while fetching benefit: ', error);
            })
        ServiceService.getServiceByLevelId(props.level.id)
            .then(res => {
                setServices(res.data);
                defaultServices.value = JSON.parse(JSON.stringify(res.data));
            })
            .catch((error) => {
                console.error('An error occurs while fetching service: ', error);     
            })
    })
})
const deletedBenefitIds = ref<number[]>([]);
const deletedServiceIds = ref<number[]>([]);

const handleSave = handleSubmit(async (values) => {
    try {
        if (deletedBenefitIds.value.length > 0) {
            await BenefitService.deleteBenefits(deletedBenefitIds.value);
            deletedBenefitIds.value = [];
        }
        if (deletedServiceIds.value.length > 0) {
            await ServiceService.deleteServices(deletedServiceIds.value);
            deletedServiceIds.value = [];
        }

        const benefitsPayload = values.benefits.map((b: BenefitPayload) => ({
            id: b.id && b.id > 0 ? b.id : null,
            description: b.description,
            level: props.level
        }))

        const servicesPayload = values.services.map((s: ServicePayload) => ({
            id: s.id && s.id > 0 ? s.id : null,
            name: s.name,
            level: props.level
        }))

        const savedBenefitsRes = await BenefitService.saveBenefits(props.level.id, benefitsPayload)
        setBenefits(savedBenefitsRes.data)
        defaultBenefits.value = JSON.parse(JSON.stringify(savedBenefitsRes.data))

        const savedServicesRes = await ServiceService.saveServices(props.level.id, servicesPayload)
        setServices(savedServicesRes.data)
        defaultServices.value = JSON.parse(JSON.stringify(savedServicesRes.data))

        const passCriteriaDecimal = Number((values.passCriteria / 100).toFixed(2));

        // Save current level
        await LevelService.saveLevel(props.level.id, {
            ...props.level,
            description: values.description,
            passCriteria: passCriteriaDecimal
        });

        // Sync to prerequisite level (level.id - 1) which the backend exam checks
        if (props.level.id > 1) {
            const prevLevel = levelStore.getLevelById(props.level.id - 1);
            if (prevLevel) {
                await LevelService.saveLevel(prevLevel.id, {
                    ...prevLevel,
                    passCriteria: passCriteriaDecimal
                });
            }
        }

        emit('saved', true, props.level.name);
    } catch (error) {
        console.error('Failed to save level information: ', error)
        emit('saved', false, props.level.name);
    }
})

const handleReset = () => {
    resetForm({
        values: {
            description: props.level.description,
            passCriteria: Number((props.level.passCriteria * 100).toFixed(0)),
            benefits: defaultBenefits.value,
            services: defaultServices.value
        }
    })
    deletedBenefitIds.value = []
    deletedServiceIds.value = []
}

const handleDeleteBenefit = (index: number) => {
    const benefit = benefits.value[index]?.value;
    // Send to deleted id for backend only existed benefit.
    if (benefit && benefit.id > 0) {
        deletedBenefitIds.value.push(benefit.id);
    }
    removeBenefit(index);
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

const handleDeleteService = (index: number) => {
    const service = services.value[index]?.value;
    // Send to deleted id for backend only existed service.
    if (service && service.id > 0) {
        deletedServiceIds.value.push(service.id);
    }
    removeService(index);
}

const handleAddService = () => {
    const tempId = -(Date.now() + Math.floor(Math.random() * 1000))
    addService({
        id: tempId,
        name: "",
        level: props.level
    } as Service)
}

</script>

<template>
    <div class="flex flex-col gap-1.5 bg-brand-gray rounded-2xl p-5">
        <!-- Level information section -->
        <div class="flex flex-row justify-between">
            <div class="flex flex-col gap-y-0">
                <h3>{{ level.name }}</h3>
                <div class="flex flex-row items-center gap-x-2">
                    <h5>Level Description: </h5>
                    <FormInput :id="'description-' + String(level.id)" label="" placeholder="Level Description" v-model="levelDescription" class="h-fit w-40 text-md py-0"/>
                </div>
                <FormError :errors="errors.description"></FormError>
            </div>
            <div v-if="props.level.id !== 1" class="flex flex-col gap-y-0">
                <h3 class="text-end">Pass Criteria </h3>
                <div class="flex flex-row items-center gap-x-2 justify-end">
                    <FormInput :id="'passCriteria-' + String(level.id)" type="number" label="" placeholder="Level Pass Criteria" v-model="levelPassCriteria" class="h-fit w-24 text-md py-0"/>
                    <h5 class="text-end">%</h5>
                </div>
                <FormError :errors="errors.passCriteria" />
            </div>
            <div v-else class="flex flex-col gap-y-3">
                <h3 class="text-end">Pass Criteria </h3>
                <p class="text-brand-dark-blue text-end whitespace-nowrap space-y-0">Default starting level (no exam criteria)</p>
            </div>
        </div>
        <hr>

        <!-- Benefits section -->
        <div class="flex flex-col h-full gap-1.5">
            <p class="font-semibold">Benefits:</p>
        <div v-for="(benefit, index) in benefits" :key="benefit.key" class="flex flex-col">
            <div class="flex flex-row items-center justify-center bg-brand-dark-blue rounded-xl">
                <button 
                    class="cursor-pointer flex items-center justify-center w-fit h-full px-3 rounded-l-xl font-semibold shrink-0 hover:scale-110 transition-all text-brand-gray hover:text-brand-red" 
                    @click="handleDeleteBenefit(index)" 
                    title="Delete this benefit."
                    type="button"
                >
                    <Trash2 class="size-6" />
                </button>
                    <FormInput :id="String(benefit.value.id)" label="" placeholder="Level Benefit Description" v-model="benefit.value.description" class="w-full"/>
                </div>
                <!-- For empty benefit description input -->
                <FormError :errors="errors[`benefits[${index}].description`]" />
            </div>
            <Button @click.prevent="handleAddBenefit" label="Add new benefit +" textColor="brand-black" bgColor="transparent" class="place-self-center underline"/>
            <!-- For benefit description that is less than 1 -->
            <FormError :errors="benefits?.length === 0 ? errors.benefits : undefined" />
        </div>
        <hr>

        <!-- Services section -->
        <p class="font-semibold">Services:</p>
        <div v-for="(service, index) in services" :key="service.key" class="flex flex-col">
            <div class="flex flex-row items-center justify-center bg-brand-dark-blue rounded-xl">
                <button 
                    class="cursor-pointer flex items-center justify-center w-fit h-full px-3 rounded-l-xl font-semibold shrink-0 hover:scale-110 transition-all text-brand-gray hover:text-brand-red" 
                    @click="handleDeleteService(index)" 
                    title="Delete this service."
                    type="button"
                >
                    <Trash2 class="size-6" />
                </button>
                <FormInput :id="String(service.value.id)" label="" placeholder="Level Service Description" v-model="service.value.name" class="w-full"/>
            </div>
            <!-- For empty benefit description input -->
            <FormError :errors="errors[`services[${index}].name`]" />
        </div>
        <Button @click.prevent="handleAddService" label="Add new service +" textColor="brand-black" bgColor="transparent" class="place-self-center underline"/>
        <!-- For benefit description that is less than 1 -->
        <FormError :errors="services?.length === 0 ? errors.services : undefined" />
        

        <!-- Buttons section -->
        <div class="flex flex-row gap-x-2 justify-between w-full mt-auto">
            <Button @click="handleReset" textColor="brand-black" bgColor="brand-white" label="Reset" class="w-full"/>
            <Button @click="handleSave" :disabled="!meta.valid" label="Save" class="w-full"/>
        </div>
    </div>
</template>