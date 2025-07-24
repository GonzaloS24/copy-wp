import { getAuthToken } from '../utils/authCookies';
import { ProductUtils } from '../utils/productUtils';

export class ProductService {
  static async getMockProducts() {
    await new Promise(resolve => setTimeout(resolve, 800)); 
    const mockData = ProductUtils.getMockProducts();
    return ProductUtils.parseProductValues(mockData.data);
  }

  static async getMockProductConfiguration(productName) {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const mockData = ProductUtils.getMockProducts();
    const product = mockData.data.find(p => 
      p.name.toLowerCase().includes(productName.toLowerCase())
    );
    
    if (!product) {
      return { data: [mockData.data[0]] };
    }
    
    return { data: [product] };
  }

  static async getWpSalesProducts() {
    try {
      if (process.env.NODE_ENV === 'development') {
        return await this.getMockProducts();
      }

      const token = getAuthToken();
      if (!token) throw new Error('No se encontró token de autenticación');

      const endpoint = 'https://chateapro.app/api/flow/bot-fields?name=%5BProducto%20Ventas%20Wp%5D%20';
      
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.status !== 'ok') {
        throw new Error(data.message || 'Respuesta inesperada de la API');
      }

      return ProductUtils.parseProductValues(data.data || []);
    } catch (error) {
      console.error('Error en ProductService.getWpSalesProducts:', error);
      return await this.getMockProducts();
    }
  }


  static extractProductId(productName) {
    if (!productName) return 0;
    
    const match = productName.match(/\[Producto Ventas Wp\]\s*(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  }

  static async getNextProductId() {
    try {
      const existingProducts = await this.getWpSalesProducts();
      
      if (!existingProducts || existingProducts.length === 0) {
        return 1; 
      }


      const existingIds = existingProducts
        .map(product => this.extractProductId(product.name))
        .filter(id => id > 0) 
        .sort((a, b) => b - a); 

    
      return existingIds.length > 0 ? existingIds[0] + 1 : 1;
    } catch (error) {
      console.error('Error al obtener el siguiente ID:', error);
   
      return Date.now() % 10000; 
    }
  }

  static async createProduct(productName, fieldData) {
    try {
      const token = getAuthToken();
      if (!token) throw new Error('No se encontró token de autenticación');

      
      const nextId = await this.getNextProductId();

  
      const processedData = this.processFieldData(productName, fieldData);

      const requestBody = {
        name: `[Producto Ventas Wp] ${nextId}`,
        var_ns: "",
        var_type: "array",
        description: "",
        value: JSON.stringify(processedData),
        is_template_field: false
      };

      console.log('Enviando datos al servidor:', requestBody);
      console.log('ID generado mediante autoincremento:', nextId);

      const response = await fetch('https://chateapro.app/api/flow/create-bot-field', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'accept': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      
      if (data.status !== 'ok') {
        throw new Error(data.message || 'Respuesta inesperada de la API');
      }

      return {
        ...data,
        generatedId: nextId  
      };
    } catch (error) {
      console.error('Error en ProductService.createProduct:', error);
      throw error;
    }
  }

  static async getProductConfiguration(productName) {
    try {
      if (process.env.NODE_ENV === 'development') {
        return await this.getMockProductConfiguration(productName);
      }

      const token = getAuthToken();
      if (!token) throw new Error('No se encontró token de autenticación');

      const encodedName = encodeURIComponent(`[Producto Ventas Wp] ${productName}`);
      const endpoint = `https://chateapro.app/api/flow/bot-fields?name=${encodedName}`;
      
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.status !== 'ok') {
        throw new Error(data.message || 'Respuesta inesperada de la API');
      }

      return data;
    } catch (error) {
      console.error('Error en ProductService.getProductConfiguration:', error);
      return await this.getMockProductConfiguration(productName);
    }
  }

    static async setBotFieldsByName(productName, fieldData) {
    try {
      const token = getAuthToken();
      if (!token) throw new Error('No se encontró token de autenticación');

      const processedData = this.processFieldData(productName, fieldData);

      const requestBody = {
        data: [{
          name: `[Producto Ventas Wp] ${productName}`,
          value: JSON.stringify(processedData)
        }]
      };

      console.log('Actualizando producto:', requestBody);

      const response = await fetch('https://chateapro.app/api/flow/set-bot-fields-by-name', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'accept': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      
      if (data.status !== 'ok') {
        throw new Error(data.message || 'Respuesta inesperada de la API');
      }

      return data;
    } catch (error) {
      console.error('Error en ProductService.setBotFieldsByName:', error);
      throw error;
    }
  }

  static processFieldData(productName, fieldData) {
  
    const processedData = JSON.parse(JSON.stringify(fieldData));

   
    if (processedData.informacion_de_producto) {
      processedData.informacion_de_producto.nombre_del_producto = productName;
    }

    if (processedData.informacion_de_producto?.tipo_de_producto) {
      processedData.informacion_de_producto.tipo_de_producto = 
        processedData.informacion_de_producto.tipo_de_producto === "simple" ? "no" : "si";
    }

    if (processedData.voz_con_ia?.speaker_boost) {
      processedData.voz_con_ia.speaker_boost = 
        processedData.voz_con_ia.speaker_boost === "si" ? "true" : "false";
    }

    if (processedData.activadores_del_flujo?.palabras_clave) {
      if (Array.isArray(processedData.activadores_del_flujo.palabras_clave)) {
        processedData.activadores_del_flujo.palabras_clave = 
          processedData.activadores_del_flujo.palabras_clave.join(",");
      }
    }

    if (processedData.activadores_del_flujo?.ids_de_anuncio) {
      if (Array.isArray(processedData.activadores_del_flujo.ids_de_anuncio)) {
        processedData.activadores_del_flujo.ids_de_anuncio = 
          processedData.activadores_del_flujo.ids_de_anuncio.join(",");
      }
    }

  
    const template = {
      informacion_de_producto: {
        id: "",
        nombre: "",
        precio: "",
        id_dropi: "",
        tipo: "no", // por defecto simple
        imagen: "",
        estado_producto: ""
      },
      embudo_de_ventas: {
        mensaje_inicial: "",
        multimedia:{
          c1: ""
        },
        pregunta_de_entrada: ""
      },
      prompt: {
        tipo_de_prompt: "",
        prompt_libre: "",
        prompt_guiado_contextualizacion: "",
        prompt_guiado_ficha_tecnica: "",
        prompt_guiado_guion_conversacional: "",
        prompt_guiado_posibles_situaciones: "",
        prompt_guiado_reglas: ""
      },
      voz_con_ia: {
        id: "",
        api_key: "",
        estabilidad: 0.3,
        similaridad: 0.7,
        estilo: 0.5,
        speaker_boost: "false"
      },
      recordatorios: {
         tiempo_1: 5,
         mensaje_1: "",
         tiempo_2: 10,
         mensaje_2: "",
         horario_minimo: "",
         horario_maximo: ""
       },
       remarketing: {
         tiempo_1: "",
         plantilla_1: "",
         tiempo_2: "",
         plantilla_2: ""
       },
       activadores_del_flujo: {
         palabras_clave: "",
          ids_de_anuncio: ""
       }
    };

    return this.mergeWithTemplate(processedData, template);
  }

  static mergeWithTemplate(data, template) {
    const result = { ...template };
    
    
    for (const section in template) {
      if (data[section]) {
       
        result[section] = { ...template[section], ...data[section] };
      }
    }
    
    return result;
  }
}