import { useRouter } from "next/navigation";
import { useState } from "react";

type RegisterPayload = {
    email: string;
    password: string;
    agree: boolean;
};

export type RegisterErrors = Array<{
    path: (string | number)[];
    message: string;
}>;

export function useLogin() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [agree, setAgree] = useState(true);
    const [disabled, setDisabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<RegisterErrors>([]);

    function setField<K extends keyof RegisterPayload>(
        key: K,
        value: RegisterPayload[K]
    ) {
        if (key === "email") setEmail(value as string);
        if (key === "password") setPassword(value as string);
        if (key === "agree") setAgree(value as boolean);
    }

    if (!email || !password || !agree) {
    }

    async function login(email: string, password: string) {
        const res = await fetch("/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json().catch(() => null);

        if (!res.ok) {
            // Expect data: { success:false, message, code, path, timestamp }
            throw new Error(data?.message || "Login failed");
        }
        return data;
    }

    async function submit(): Promise<boolean> {
        if (!agree) {
            alert("You must agree to the terms and conditions");
            return false;
        }
        setErrors([]);
        setLoading(true);
        const res = await login(email, password);
        console.log("------------res------------------>", res);
        setLoading(false);
        router.push("/");
        return true;
    }

    return {
        state: { email, password, agree, disabled, loading, errors },
        setField,
        submit,
    };
}
