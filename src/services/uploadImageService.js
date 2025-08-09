import { getAuthToken } from '../utils/authCookies';

export class uploadImage {
  static createAuthFetchOptions(token, body) {
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

  static createUploadFetchOptions(token, formData) {
    return {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
      body: formData
    };
  }

  static getFileExtension(fileName) {
    if (typeof fileName !== 'string') return '';
    const lastDotIndex = fileName.lastIndexOf('.');
    return lastDotIndex !== -1 ? fileName.substring(lastDotIndex) : '';
  }

  static async authorize(applicationKeyId, applicationKey) {
    try {
      const token = getAuthToken();
      if (!token) throw new Error('No authentication token found');

      if (!applicationKeyId || !applicationKey) {
        throw new Error('Both applicationKeyId and applicationKey are required');
      }

      const payload = {
        applicationKeyId,
        applicationKey
      };

      console.log('🔐 Authorizing with Backblaze with payload:', payload);

      const response = await fetch(
        'http://localhost:3000/api/integrations/backblaze/authorize',
        this.createAuthFetchOptions(token, payload)
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || 
          `Error ${response.status}: ${response.statusText}`
        );
      }

      const result = await response.json();
      console.log('✅ Backblaze authorization successful:', result);
      
      return result;
      
    } catch (error) {
      console.error('Error in BackblazeService.authorize:', error);
      throw error;
    }
  }

  static async uploadFile(file, originalFileName) {
    try {
      const token = getAuthToken();
      if (!token) throw new Error('No authentication token found');

      if (!file || !originalFileName) {
        throw new Error('Both file and originalFileName are required');
      }

      const fileExtension = this.getFileExtension(originalFileName);
      const baseName = originalFileName.substring(0, originalFileName.lastIndexOf('.'));
      const finalFileName = `${baseName}${fileExtension}`;

      const formData = new FormData();
      formData.append('file', file);
      formData.append('fileName', finalFileName);

      console.log('📤 Uploading file to Backblaze:', finalFileName);

      const response = await fetch(
        'http://localhost:3000/api/integrations/backblaze/upload',
        this.createUploadFetchOptions(token, formData)
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || 
          `Error ${response.status}: ${response.statusText}`
        );
      }

      const result = await response.json();
      console.log('✅ File uploaded successfully:', result);
      
      return result;
      
    } catch (error) {
      console.error('Error in BackblazeService.uploadFile:', error);
      throw error;
    }
  }
}