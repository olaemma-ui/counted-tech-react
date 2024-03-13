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

  // Usage
//   const storageService = new LocalStorageService();
  
//   // Set an item
//   storageService.setItem('user', { name: 'John Doe', age: 30 });
  
//   // Get an item
//   const user = storageService.getItem<{ name: LocalStoragekey; age: number }>('user');
//   console.log(user);
  
//   // Remove an item
//   storageService.removeItem('user');
  
//   // Clear all items
//   storageService.clear();
