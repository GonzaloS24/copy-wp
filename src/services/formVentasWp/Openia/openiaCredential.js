import Cookies from 'js-cookie';
import { BACK_BASE_URL } from '../../../utils/backendUrl';

const openiaCredential = {
  async getCredentials() {
    try {
      const token = Cookies.get('auth_token');
      
      if (!token) {
        throw new Error('Authorization token not found in cookies');
      }

      const response = await fetch(`${BACK_BASE_URL}/api/integrations/openai`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching OpenAI credentials:', error);
      throw error;
    }
  }
};

export default openiaCredential;