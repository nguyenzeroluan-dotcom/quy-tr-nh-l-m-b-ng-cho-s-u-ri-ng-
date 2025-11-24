
import { ProductInfo, TimelineItemData } from '../types';
import { PRODUCT_DB } from '../data/products';
import { timelineData } from '../data/timeline';

// Trên Vercel, API nằm cùng domain nên dùng '/api'. 
// Khi chạy local, nếu port khác nhau cần full URL, nhưng setup Vercel thường handle tốt.
const API_URL = '/api';

class DataManager {
    private async fetchWithTimeout(url: string, timeout = 5000) {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeout);
        try {
            const response = await fetch(url, { signal: controller.signal });
            clearTimeout(id);
            return response;
        } catch (error) {
            clearTimeout(id);
            throw error;
        }
    }

    // --- Products ---
    async getProducts(): Promise<ProductInfo[]> {
        try {
            const res = await this.fetchWithTimeout(`${API_URL}/products`);
            if (!res.ok) throw new Error(`Server returned ${res.status}`);
            return await res.json();
        } catch (e) {
            console.warn("API Error/Offline. Fallback to static data.", e);
            return Object.values(PRODUCT_DB);
        }
    }

    async saveProduct(product: ProductInfo): Promise<void> {
        try {
            await fetch(`${API_URL}/products`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(product)
            });
        } catch (e) {
            console.error("Error saving product", e);
            throw e;
        }
    }

    async deleteProduct(id: string): Promise<void> {
        try {
            await fetch(`${API_URL}/products/${id}`, {
                method: 'DELETE'
            });
        } catch (e) {
            console.error("Error deleting product", e);
            throw e;
        }
    }

    // --- Timeline ---
    async getTimeline(): Promise<TimelineItemData[]> {
        try {
            const res = await this.fetchWithTimeout(`${API_URL}/timeline`);
            if (!res.ok) throw new Error(`Server returned ${res.status}`);
            
            const data = await res.json();
            
            if (!data || data.length === 0) {
                return timelineData;
            }
            
            return data.map((item: any) => {
                const staticItem = timelineData.find(t => String(t.id) === String(item.id));
                return {
                    ...item,
                    icon: staticItem ? staticItem.icon : undefined, 
                    richDetail: staticItem ? staticItem.richDetail : undefined,
                    imageType: item.imageType || (staticItem ? staticItem.imageType : 'default'),
                    imageUrl: item.imageUrl || (staticItem ? staticItem.imageUrl : undefined)
                };
            });
        } catch (e) {
            console.warn("API Error/Offline. Fallback to static data.", e);
            return timelineData;
        }
    }

    async saveTimelineItem(item: TimelineItemData): Promise<void> {
        try {
            await fetch(`${API_URL}/timeline`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(item)
            });
        } catch (e) {
            console.error("Error saving timeline", e);
            throw e;
        }
    }

    async deleteTimelineItem(id: number): Promise<void> {
        try {
            await fetch(`${API_URL}/timeline/${id}`, {
                method: 'DELETE'
            });
        } catch (e) {
            console.error("Error deleting timeline item", e);
            throw e;
        }
    }

    resetData() {
        alert("Tính năng reset DB cần thực hiện trực tiếp trên Server.");
    }
}

export const dataManager = new DataManager();
