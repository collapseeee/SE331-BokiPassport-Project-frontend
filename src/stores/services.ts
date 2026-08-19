import { defineStore } from 'pinia'
import type { Service, ServicesState } from '@/types'

export const useServicesStore = defineStore('service', {
  state: (): ServicesState => ({
    services: [],
  }),
  actions: {
    updateServices(services: Service[]): void {
      this.services = services
    }
  }
})
