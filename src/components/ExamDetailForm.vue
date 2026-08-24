<script lang="ts" setup>
import { useLevelsStore } from '@/stores/levels';
import { storeToRefs } from 'pinia';
import FormInput from '@/components/form/FormInput.vue';
import SelectInput from '@/components/select/SelectInput.vue';
import { computed } from 'vue';

const levelStore = useLevelsStore();
const { levels } = storeToRefs(levelStore);

const model = defineModel<{
    name: string
    description: string
    levelId: number | null
}>({ required: true });

const levelOptions = computed(() => levels.value.map((level) => level.name));

const handleLevelChange = (levelName: string) => {
    const matched = levels.value.find((level) => level.name === levelName);
    model.value.levelId = matched ? matched.id : null;
};

</script>

<template>
    <div class="bg-brand-black rounded-2xl p-8 flex flex-col gap-6">
        <h3 class="text-brand-white">Exam Details</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
                id="exam-name"
                label="Exam name"
                placeholder="e.g., Basic AI"
                v-model="model.name"
                textcolor="text-brand-white"

            />

            <div>
                <label for="exam-target-level" class="block text-sm font-medium text-brand-white mb-1">Target Level</label>
                <SelectInput
                    name="Target Level"
                    :options="levelOptions"
                    @change="handleLevelChange"
                />
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
        </div>
    </div>
</template>