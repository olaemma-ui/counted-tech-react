import { LocalStoragekey } from "../_constants/enums";

// Handles the localstirage
export class LocalStorageService {
    
    // Set an item in the LocalStorage
    static setItem<T>(key: LocalStoragekey, item: T): void {
        localStorage.setItem(key.toString(), JSON.stringify(item));
    }

    // Get an item from the LocalStorage
    static getItem<T>(key: LocalStoragekey): T | null {
        const item = localStorage.getItem(key.toString());
        if (!item) return null;
        
        return JSON.parse(item) as T;
    }

    // Remove an item from the LocalStorage
    static removeItem(key: LocalStoragekey): void {
        localStorage.removeItem(key.toString());
    }

    // Clear the LocalStorage
    static clear(): void {  
        localStorage.clear();
    }
}