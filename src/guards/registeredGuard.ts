import { useRegisterStore } from '@/stores/register'
import type { RouteLocation } from 'vue-router'

export function registeredGuard(to: RouteLocation, from: RouteLocation) {
  if (useRegisterStore().isRegistered) {
    return { name: 'registered' }
  } else {
    return
  }
}
