'use client'

import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import api from '@/lib/axiosInstance'

export function useAuth() {
    const router = useRouter()

    const query = useQuery({
        queryKey: ['authUser'],
        queryFn: async () => {
            const res = await api.get('/api/users/me')
            return res.data
        },
        retry: false,
    })

    if (query.isError) {
        setTimeout(() => router.push(`/login`), 50)
    }

    return query
}

export function Logout() {
    const router = useRouter()

    const logout = async () => {
        await api.post('/api/users/logout')
        router.push('/login')
    }

    return { logout }
}
