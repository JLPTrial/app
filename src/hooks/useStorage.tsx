import { StorageContext } from "@/contexts/StorageContext";
import { useContext } from "react";

export const useStorage = () => {
    const context = useContext(StorageContext);

    if (!context) {
        throw new Error("useStorage must be used within a StorageProvider");
    }

    return context;
}