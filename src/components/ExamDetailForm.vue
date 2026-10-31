<script lang="ts" setup>
import { useLevelsStore } from '@/stores/levels';
import { storeToRefs } from 'pinia';
import FormInput from '@/components/form/FormInput.vue';
import SelectInput from '@/components/select/SelectInput.vue';
import { computed, watch } from 'vue';
import { useForm, useIsFormValid } from 'vee-validate';
import * as yup from 'yup';
import FormError from '@/components/form/FormError.vue';

const levelStore = useLevelsStore();
const { levels } = storeToRefs(levelStore);

const model = defineModel<{
    name: string
    description: string
    levelId: number | null
}>({ required: true });

const validationSchema = yup.object({
    name: yup.string().required('Exam name is required.'),
    description: yup.string().required('Description is required.'),
    levelId: yup.number().required('Level is required.')
});

const { errors, setValues } = useForm({
    validationSchema,
    initialValues: {
        name: model.value.name,
        description: model.value.description,
        levelId: model.value.levelId
    }
});

const isValid = useIsFormValid();

// Keep form in sync with external model (defineModel)
watch(() => model.value, (val) => {
    setValues(val);
}, { deep: true });

defineExpose({
    isValid
});

const levelOptions = computed(() => levels.value.map((level) => level.name));

const selectedLevelName = computed({
    get: () => levels.value.find((level) => level.id === model.value.levelId)?.name ?? '',
    set: (name: string) => {
        const matched = levels.value.find((level) => level.name === name);
        model.value.levelId = matched ? matched.id : null;
        setValues({ levelId: model.value.levelId }, true);
    },
});

</script>

<template>
    <div class="bg-brand-black rounded-2xl p-8 flex flex-col gap-y-1">
        <h3 class="text-brand-white">Exam Details</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <FormInput
                    id="exam-name"
                    label="Exam name"
                    placeholder="e.g., Basic AI"
                    v-model="model.name"
                    textcolor="text-brand-white"
                />
                <FormError :errors="errors.name"/>
            </div>
            <div>
                <label for="exam-target-level" class="block text-sm font-medium text-brand-white mb-1">Target Level</label>
                <SelectInput
                    name="Target Level"
                    :options="levelOptions"
                    v-model="selectedLevelName"
                />
                <FormError :errors="errors.levelId"/>
            </div>
        </div>

        <div>
            <label for="exam-description" class="block text-sm font-medium text-brand-white mb-1">Description</label>
            <textarea
                id="exam-description"
                v-model="model.description"
                rows="4"
                placeholder="This exam test your...."
                class="w-full py-2.5 px-3 border border-brand-gray rounded-md bg-white resize-none focus:outline-none focus:ring focus:ring-blue-400 focus:border-blue-400"
            />
            <FormError :errors="errors.description"/>
        </div>
    </div>
</template>