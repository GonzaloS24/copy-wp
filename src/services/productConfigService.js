import { getAuthToken } from '../utils/authCookies'
import { BACK_BASE_URL } from '../utils/backendUrl';
;

export class productConfigService {
  static createFetchOptions(token, body) {
    return {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(body)
    };
  }

  static async configureProduct(configData) {
    try {
      const token = getAuthToken();
      if (!token) throw new Error('No authentication token found');

      if (!configData) {
        throw new Error('Configuration data is required');
      }

      console.log('Configuring product with data:', configData);

      const response = await fetch(
        `${BACK_BASE_URL}/api/integrations/chateapro/set-bot-fields-by-name`,
        this.createFetchOptions(token, configData)
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || 
          `Error ${response.status}: ${response.statusText}`
        );
      }

      const result = await response.json();
      console.log('Product configuration successful:', result);
      
      return result;
      
    } catch (error) {
      console.error('Error in productConfigService.configureProduct:', error);
      throw error;
    }
  }
}