'use client'

import { useCounterStore } from '@/providers/storeProvider'

export default function UserPage() {
  const uid = useCounterStore((state) => state.uid)

  return (
    <div>
      <h1>User Page</h1>
      <p>Your UID: {uid ? uid : 'No UID available'}</p>
    </div>
  )
}
