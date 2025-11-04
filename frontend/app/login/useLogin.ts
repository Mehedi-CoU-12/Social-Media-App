import api from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

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
    const [agree, setAgree] = useState(false);
    const [loading, setLoading] = useState(false);

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

    async function submit() {
        if (!email || !password || !agree) {
            toast.error("All fields are required");
            return;
        }
        try {
            setLoading(true);
            const res = await api.post("/api/users/login", {
                email,
                password,
                agree,
            });

            const data = res.data;

            if (!res.status || res.status >= 400) {
                // Expect data: { success:false, message, code, path, timestamp }
                throw new Error(data?.message || "Login failed");
            }
            setLoading(false);
            toast.success("Login successful");
            router.push("/");
        } catch (error) {
            toast.error((error as Error).message || "Login failed");
        }
    }

    return {
        state: { email, password, agree, loading },
        setField,
        submit,
    };
}
