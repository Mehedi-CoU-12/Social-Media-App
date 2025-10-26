import api from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";
import { useState } from "react";

type RegisterPayload = {
    fullName: string;
    email: string;
    password: string;
    agree: boolean;
};

export type RegisterErrors = Array<{
    path: (string | number)[];
    message: string;
}>;

export function useRegister() {
    const router = useRouter();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [agree, setAgree] = useState(true);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<RegisterErrors>([]);

    function setField<K extends keyof RegisterPayload>(
        key: K,
        value: RegisterPayload[K]
    ) {
        if (key === "fullName") setFullName(value as string);
        if (key === "email") setEmail(value as string);
        if (key === "password") setPassword(value as string);
        if (key === "agree") setAgree(value as boolean);
    }

    async function submit(): Promise<boolean> {
        setErrors([]);
        setLoading(true);
        try {
            const res = await api.post("/api/users/register", {
                fullName,
                email,
                password,
                agree,
            });

            const data = res.data;
            console.log("-------data-----------", data, res);
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
        state: { fullName, email, password, agree, loading, errors },
        setField,
        submit,
    };
}
