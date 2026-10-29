<script lang="ts" setup>
import AdminHeader from '@/components/AdminHeader.vue';
import Button from '@/components/Button.vue';
import VideoCard from '@/components/cards/VideoCard.vue';
import LevelFilter from '@/components/LevelFilter.vue';
import ModalContainer from '@/components/modal/ModalContainer.vue';
import FormInput from '@/components/form/FormInput.vue';
import { useCourseStore } from '@/stores/course';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import * as yup from 'yup';
import { useValidation } from '@/validation/useValidation';
import { requiredString, oneOf, url } from '@/validation/schemas';
import FormError from '@/components/form/FormError.vue';
import courseService from '@/services/courseService';
import SelectInput from '@/components/select/SelectInput.vue';
import { useLevelsStore } from '@/stores/levels';
import VideoPlayer from '@/components/VideoPlayer.vue';
import NotFoundText from '@/components/NotFoundText.vue';
const courseStore = useCourseStore()
const levelStore = useLevelsStore()
const route = useRoute()
const router = useRouter()
const filteredCourses = computed(() => {
    const level = route.query.level
    return (courseStore.courses || []).filter(course => level === 'all' || !level || String(course.level.id) === level)
})
const levels = levelStore.levels.map(level => level.id.toString())

/* Add new course scripts */
const validationSchema = yup.object({
    name: requiredString(),
    description: requiredString(),
    videoUrl: url('Must be a valid video link'),
    level: oneOf(levels, 'Invalid level selected')
})

const { errors, handleSubmit, resetForm, field } = useValidation(validationSchema, {
    name: '',
    description: '',
    videoUrl: '',
    level: ''
})
const courseId = ref<number | null>()
const { value: name } = field('name')
const { value: description } = field('description')
const { value: videoUrl } = field('videoUrl')
const { value: level } = field('level')
const isModalOn = ref<boolean>(false)
const closeModal = () => {
    isModalOn.value = false
    courseId.value = null
    resetForm()
}
const openModal = () => isModalOn.value = true

// Handle Add/Edit Course
const handleSave = handleSubmit(values => {
    // Handle save exist
    if (courseId.value) {
        courseService.updateCourse(courseId.value, {
            name: values.name,
            description: values.description,
            videoUrl: values.videoUrl,
            level: { id: Number(values.level)}
        }).then(() => {
            closeModal()
            router.push({ name: 'AdminCourseManagement'})
        })
    } else {
        courseService.saveCourse({
            name: values.name,
            description: values.description,
            videoUrl: values.videoUrl,
            level: { id: Number(values.level) }
        }).then(() => {
            closeModal()
            router.go(0)
        })
    }
    
})

// Handle open edit course overlay
const handleEdit = (id: number) => {
    courseService.getCourse(id)
        .then(res => {
            courseId.value = res.data.id
            name.value = res.data.name
            description.value = res.data.description
            videoUrl.value = res.data.videoUrl
            level.value = res.data.level.id
            openModal()
        })
}
// Handle Delete Course
const handleDelete = (id: number) => {
    courseService.deleteCourse(id)
        .then(() => {
            closeModal()
            router.go(0)
        })
}

/* Video extractor */
const thumbnailFailed = ref(false)
const videoId = computed(() => {
  const url = videoUrl.value;
  if (!url) return null

  // Matches standard, share, embed, and shorts YouTube URLs
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[2]?.length === 11 ? match[2] : null
})
const thumbnailUrl = computed(() => {
  if (!videoId.value) return null
  const quality = thumbnailFailed.value ? 'hqdefault' : 'maxresdefault'
  return `https://img.youtube.com/vi/${videoId.value}/${quality}.jpg`
})
</script>

<template>
    <AdminHeader title="Course Management" description="Boki Passport course management system"/>
    <div class="p-5 flex flex-col gap-y-2">
        <div class="flex flex-row justify-between">
            <LevelFilter/>
            <Button class="h-full!" bg-color="brand-green" @click="openModal" isBold label="ADD"/>
        </div>
        <div v-if="filteredCourses" class="grid grid-cols-4 w-full">
            <VideoCard @click.prevent="handleEdit(course.id)" v-for="course in filteredCourses" :key="course.id" :course="course"/>
        </div>
        <NotFoundText v-else text="Courses are currently unavailable!"/>
    </div>

    <!-- Add course modal -->
    <ModalContainer v-model="isModalOn">
        <form @submit.prevent="handleSave" class="flex flex-col gap-y-2.5">
            <Button v-if="courseId" @click.prevent="handleDelete(courseId)" class="absolute w-20! right-0 top-2.5" bg-color="brand-red" label="Delete"/>
            <h2 class="w-full">{{ courseId ? 'Edit Course' : 'Add new course' }}</h2>
            <FormInput required v-model="name" class="w-full" id="course-name" label="Name"/>
            <FormError :errors="errors.name"/>
            <FormInput v-model="description" class="w-full" id="course-description" label="Description"/>
            <FormError :errors="errors.description"/>
            <FormInput v-model="videoUrl" class="w-full" id="course-url" label="URL"/>
            <FormError :errors="errors.videoUrl"/>
            <div class="w-full h-full">
                <VideoPlayer v-if="videoUrl" :video-src="videoUrl" :thumbnail-url="thumbnailUrl"/>
                <img class="w-full h-ful rounded-xl opacity-65" v-else src="https://placehold.co/300x172/white/00A1EE?text=Video+Preview&font=roboto" alt="VideoPreview">
            </div>
            <SelectInput class="max-w-full" label="Level" name="level" :options="levels" v-model="level"/>
            <FormError :errors="errors.level"/>
            <div class="w-full flex flex-row *:w-full py-2 gap-x-2">
                <Button @click="closeModal" bg-color="brand-white" text-color="brand-black" label="Cancel"/>
                <Button bg-color="brand-green" label="Add"/>
            </div>
        </form>
    </ModalContainer>
</template>
