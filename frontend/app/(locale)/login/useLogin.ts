import { useState } from 'react'

type RegisterPayload = {
    email: string
    password: string
    agree: boolean
}

export type RegisterErrors = Array<{
    path: (string | number)[]
    message: string
}>

export function useLogin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [agree, setAgree] = useState(false)

    function setField<K extends keyof RegisterPayload>(
        key: K,
        value: RegisterPayload[K]
    ) {
        if (key === 'email') setEmail(value as string)
        if (key === 'password') setPassword(value as string)
        if (key === 'agree') setAgree(value as boolean)
    }

    return {
        state: { email, password, agree },
        setField,
    }
}
