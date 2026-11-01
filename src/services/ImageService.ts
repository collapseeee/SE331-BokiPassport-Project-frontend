import { apiClient } from "./apiClient"

export const getPresignedImageUrl = async (fileName: string): Promise<string> => {
    if (!fileName) return ''
    // Already a full public URL (existing accounts) — use it directly
    if (fileName.startsWith('http://') || fileName.startsWith('https://')) return fileName
    // Salted filename from new upload — convert to presigned URL
    const { data } = await apiClient.get(`/presignedUrl?fileName=${encodeURIComponent(fileName)}`)
    return data
}

export const uploadProfileImage = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append('image', file)
    const { data } = await apiClient.post('/uploadImage', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    })
    return data.name
}