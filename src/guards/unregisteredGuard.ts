import { useRegisterStore } from '@/stores/register'
import type { RouteLocation } from 'vue-router'

export function unregisteredGuard(to: RouteLocation, from: RouteLocation) {
  if (useRegisterStore().isRegistered) {
    return
  } else {
    return { name: 'home'}
  }
}
