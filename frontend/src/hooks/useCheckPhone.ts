import { useState } from "react";
import { checkPhoneRequest  } from "../services/api";

interface useCheckPhoneReturn {
    loading: boolean;
    error: string | null;
    success: boolean;
    validarCelular: (phone: string) => Promise<void>
}

function useCheckPhone(): useCheckPhoneReturn {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<boolean>(false)

    const validarCelular = async (phone: string): Promise<void>  => {
        if(!phone) return;

        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const data = await checkPhoneRequest(phone);
            const disponivel = !data.exists;
            setSuccess(disponivel);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro inesperado");
            setSuccess(false);
        } finally {
            setLoading(false);
        }
    };
    
    return {loading, error, success, validarCelular}
}

export default useCheckPhone;