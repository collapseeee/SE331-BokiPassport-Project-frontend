import { apiClient } from "./apiClient"

export const getPresignedImageUrl = async (fileName: string): Promise<string> => {
    if (!fileName) return ''
    const { data } = await apiClient.get(`/presignedUrl?fileName=${fileName}`)
    return data
}