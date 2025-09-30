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

    async function submit(): Promise<boolean> {
        setErrors([]);
        setLoading(true);
        try {
            const res = await fetch("/api/users/login", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    email,
                    password,
                    agree,
                }),
            });
            const data = await res.json();
            if (!res.ok || !data?.ok) {
                if (Array.isArray(data?.errors)) setErrors(data.errors);
                else if (data?.message)
                    setErrors([{ path: ["_"], message: data.message }]);
                else
                    setErrors([
                        { path: ["_"], message: "Registration failed" },
                    ]);
                return false;
            }
            router.push("/login");
            return true;
        } catch (error) {
            console.log("---------error---------------", error);
            setErrors([
                { path: ["_"], message: "Network error. Please try again." },
            ]);
            return false;
        } finally {
            setLoading(false);
        }
    }

    return {
        state: { email, password, agree, loading, errors },
        setField,
        submit,
    };
}
