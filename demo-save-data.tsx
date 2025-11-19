
// This file simulates a data store for the project configuration.
// In a real app, this might read/write to a JSON file or API.
// Here we use LocalStorage to persist the user's "Saved" config.

export type MediaItem = {
    id: string;
    type: 'image' | 'video';
    url: string;
  };
  
  const DEFAULT_MEDIA: MediaItem[] = [
    {
      id: '1',
      type: 'image',
      url: 'https://lh7-rt.googleusercontent.com/docsz/AD_4nXcg4sSs3hVnLhBvBtDIlPddaxEbRWJpXeukguH6x-gDpxTmXbuppI-q-cxfOWB51lhAffDOA699AzwaGJSSHenOPzn0_fUmsfggYjcAHbF-SSSU-8Erih4X8o5lwv0hR8Q7An21cw?key=HW9Is8Th0VJ0Ln4U3kUKOP64'
    },
    {
      id: '2',
      type: 'image',
      url: 'https://tincay.com/wp-content/uploads/2024/07/trai-nghiem-cac-vuon-sau-rieng-sieu-trai-o-tay-nguyen-08.jpg' // Durian Flower
    },
    {
      id: '3',
      type: 'image',
      url: 'https://giacaphe.com/wp-content/uploads/2024/06/dien-tich-sau-rieng.jpg' // Durian Fruit/Tree
    }
  ];
  
  const STORAGE_KEY = 'farmersmart_header_config_v1';
  
  export const loadMediaConfig = (): MediaItem[] => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn("Failed to load config, using default", e);
    }
    return DEFAULT_MEDIA;
  };
  
  export const saveMediaConfig = (data: MediaItem[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      console.log("Configuration saved to 'file':", data);
    } catch (e) {
      console.error("Failed to save config", e);
    }
  };
