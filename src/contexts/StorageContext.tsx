import { Storage } from "expo-sqlite/kv-store";
import { createContext, PropsWithChildren, useState } from "react";

type StorageSchema = {
    jlptLevel: 'N5' | 'N4';
};

const defaultStorage: StorageSchema = {
    jlptLevel: 'N5',
};

type StorageContextType = {
    data: StorageSchema;
        setValue: <K extends keyof StorageSchema>(
        key: K,
        value: StorageSchema[K]
    ) => void;
};

export const StorageContext = createContext<StorageContextType | null>(null);

export function StorageProvider({ children } : PropsWithChildren){

    const [data, setData] = useState<StorageSchema>(() => {
        const result: StorageSchema = { ...defaultStorage };

        for (const key of Object.keys(defaultStorage) as (keyof StorageSchema)[]) {
            const stored = Storage.getItemSync(key);

            if (stored !== null) {
                result[key] = stored as StorageSchema[typeof key];
            }
        }

        return result;
    });

    const setValue = <K extends keyof StorageSchema>(
        key: K,
        value: StorageSchema[K]
        ) => {
        Storage.setItemSync(key, value);

        setData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    return (
        <StorageContext.Provider value={{ data, setValue }}>
            {children}
        </StorageContext.Provider>
    );

}