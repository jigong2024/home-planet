'use client'

import { useCounterStore } from '@/providers/storeProvider'
import browserClient from '@/utils/supabase/client'

export default function UserPage() {
  const uid = useCounterStore((state) => state.uid)

  const handleLogout = async () => {
    try {
      const {error} = await browserClient.auth.signOut();
      if(error) throw error;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h1>User Page</h1>
      <p>Your UID: {uid ? uid : 'No UID available'}</p>
      <button onClick={handleLogout}>로그아웃</button>
    </div>
  )
}
