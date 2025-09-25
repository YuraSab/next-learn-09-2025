'use client';

import {SWRConfig} from "swr";
import React from "react";

// Ми визначимо тут глобальний fetcher, але поки що залишимо його порожнім,
// бо в SWR для Firestore зазвичай використовують спеціальні функції.
// SWRConfig просто налаштовує контекст SWR.

interface Props {
    children: React.ReactNode
}

const SWRProvider = ({ children }: Props) => {
    return (
        <SWRConfig
            value={{
                // Тут можуть бути глобальні налаштування, наприклад,
                // focus revalidation, error handling тощо.
                revalidateOnFocus: true,
            }}
        >
            { children }
        </SWRConfig>
    )
}

export default SWRProvider;