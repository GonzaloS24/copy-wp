import { getAuthToken } from "../utils/authCookies";
import { BACK_BASE_URL } from "../utils/backendUrl";

export class ProductService {
  static createFetchOptions(token) {
    return {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      credentials: "include",
    };
  }

  static createPostFetchOptions(token, body) {
    return {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(body),
    };
  }

  static async createProduct(productData) {
    try {
      const token = getAuthToken();
      if (!token) throw new Error("No se encontró token de autenticación");

      if (!productData || typeof productData !== "object") {
        throw new Error("Los datos del producto son requeridos");
      }

      const payload = {
        productData: {
          value: productData,
        },
      };

      console.log(
        "📦 Creando producto con payload simplificado:",
        JSON.stringify(payload, null, 2)
      );

      const response = await fetch(
        `${BACK_BASE_URL}/api/assistants/ventas-wp/bot-fields`,
        this.createPostFetchOptions(token, payload)
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message ||
            `Error ${response.status}: ${response.statusText}`
        );
      }

      const result = await response.json();
      console.log("✅ Producto creado exitosamente:", result);

      return result;
    } catch (error) {
      console.error("Error en ProductService.createProduct:", error);
      throw error;
    }
  }

  static async getProducts() {
    try {
      const token = getAuthToken();
      if (!token) throw new Error("No se encontró token de autenticación");

      const response = await fetch(
        `${BACK_BASE_URL}/api/assistants/ventas-wp/products`,
        this.createFetchOptions(token)
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message ||
            `Error ${response.status}: ${response.statusText}`
        );
      }

      const result = await response.json();
      const productsData = this.extractProductsData(result);

      return productsData.map((product) => this.normalizeProductData(product));
    } catch (error) {
      console.error("Error en ProductService.getProducts:", error);
      throw error;
    }
  }

  static async getProductConfiguration(productId) {
    try {
      const token = getAuthToken();
      if (!token) throw new Error("No se encontró token de autenticación");

      const cleanId = this.extractNumericId(productId);

      console.log(" Obteniendo configuración del producto ID:", cleanId);

      const endpoint = `${BACK_BASE_URL}/api/assistants/ventas-wp/products/${cleanId}`;

      const response = await fetch(endpoint, this.createFetchOptions(token));

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message ||
            `Error ${response.status}: ${response.statusText}`
        );
      }

      const result = await response.json();
      console.log("📋 Configuración del producto obtenida:", result);

      if (!result.success) {
        throw new Error(
          result.message || "Error al obtener la configuración del producto"
        );
      }

      if (!result.data) {
        throw new Error("No se encontraron datos del producto");
      }

      return {
        status: "ok",
        data: [
          {
            name: result.data.name,
            value: result.data.value,
          },
        ],
      };
    } catch (error) {
      console.error("Error en ProductService.getProductConfiguration:", error);
      throw error;
    }
  }

  static async updateProduct(productName, productData) {
    try {
      const token = getAuthToken();
      if (!token) throw new Error("No se encontró token de autenticación");

      if (!productData || typeof productData !== "object") {
        throw new Error("Los datos del producto son requeridos");
      }

      if (!productName || typeof productName !== "string") {
        throw new Error("El nombre del producto es requerido");
      }

      const normalizedData = this.normalizeProductDataForUpdate(productData);

      const payload = {
        name: `[Producto Ventas Wp] ${productName.trim()}`,
        value: JSON.stringify(normalizedData),
      };

      console.log("Actualizando producto:", productName);
      console.log("Payload de actualización:", payload);

      const fetchOptions = {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      };

      const response = await fetch(
        `${BACK_BASE_URL}/api/assistants/ventas-wp/bot-fields`,
        fetchOptions
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message ||
            `Error ${response.status}: ${response.statusText}`
        );
      }

      const result = await response.json();
      console.log("Producto actualizado exitosamente:", result);

      return result;
    } catch (error) {
      console.error("Error en ProductService.updateProduct:", error);
      throw error;
    }
  }

  static normalizeProductDataForUpdate(productData) {
    const info = productData.informacion_de_producto || {};
    const embudo = productData.embudo_de_ventas || {};
    const prompt = productData.prompt || {};
    const voz = productData.voz_con_ia || {};
    const recordatorios = productData.recordatorios || {};
    const remarketing = productData.remarketing || {};
    const activadores = productData.activadores_del_flujo || {};

    const multimediaData = embudo.multimedia || {};
    console.log("🔧 [NORMALIZE] Multimedia extraída:", multimediaData);

    return {
      informacion_de_producto: {
        id: info.id || info.id_del_producto_en_dropi || "",
        nombre: info.nombre_del_producto || info.nombre || "",
        precio: info.precio_del_producto || info.precio || "",
        id_dropi: info.id_del_producto_en_dropi || info.id_dropi || "",
        tipo: info.tipo_de_producto || info.tipo || "",
        variable: info.variable === "VARIABLE" ? "VARIABLE" : "SIMPLE",
        imagen: info.imagen_del_producto || info.imagen || "",
        estado: info.estado || info.estado_producto || "inactivo",
        dta_prompt: info.dta_prompt || "",
      },
      embudo_de_ventas: {
        mensaje_inicial: embudo.mensaje_inicial || "",
        multimedia: multimediaData,
        pregunta_de_entrada: embudo.pregunta_de_entrada || "",
      },
      prompt: {
        tipo_de_prompt: prompt.tipo_de_prompt || "libre",
        prompt_libre: prompt.prompt_libre || "",
        prompt_guiado_contextualizacion:
          prompt.prompt_guiado_contextualizacion || "",
        prompt_guiado_ficha_tecnica: prompt.prompt_guiado_ficha_tecnica || "",
        prompt_guiado_guion_conversacional:
          prompt.prompt_guiado_guion_conversacional || "",
        prompt_guiado_posibles_situaciones:
          prompt.prompt_guiado_posibles_situaciones || "",
        prompt_guiado_reglas: prompt.prompt_guiado_reglas || "",
      },
      voz_con_ia: {
        id: voz.id || "",
        api_key: voz.api_key_elevenlabs || voz.api_key || "",
        estabilidad: voz.estabilidad || 0.3,
        similaridad: voz.similaridad || 0.7,
        estilo: voz.estilo || 0.5,
        speaker_boost: String(
          voz.speaker_boost === "no" || voz.speaker_boost === false
            ? "false"
            : voz.speaker_boost || "false"
        ),
        habilitar: voz.habilitar,
      },
      recordatorios: {
        tiempo_1:
          recordatorios.tiempo_recordatorio_1 || recordatorios.tiempo_1 || 5,
        mensaje_1:
          recordatorios.mensaje_recordatorio_1 || recordatorios.mensaje_1 || "",
        tiempo_2:
          recordatorios.tiempo_recordatorio_2 || recordatorios.tiempo_2 || 10,
        mensaje_2:
          recordatorios.mensaje_recordatorio_2 || recordatorios.mensaje_2 || "",
        hora_min: recordatorios.hora_min || recordatorios.horario_minimo || "",
        hora_max: recordatorios.hora_max || recordatorios.horario_maximo || "",
      },
      remarketing: {
        tiempo_1:
          remarketing.tiempo_remarketing_1 || remarketing.tiempo_1 || "",
        tiempo_2:
          remarketing.tiempo_remarketing_2 || remarketing.tiempo_2 || "",
        hora_min: remarketing.hora_min || remarketing.horario_minimo || "",
        hora_max: remarketing.hora_max || remarketing.horario_maximo || "",
      },
      activadores_del_flujo: {
        palabras_clave: Array.isArray(activadores.palabras_clave)
          ? activadores.palabras_clave.join(",")
          : activadores.palabras_clave || "",
        ids_de_anuncio: Array.isArray(activadores.ids_de_anuncio)
          ? activadores.ids_de_anuncio.join(",")
          : activadores.ids_de_anuncio || "",
      },
    };
  }

  static extractNumericId(input) {
    if (!input || typeof input !== "string") return "";

    if (/^\d+$/.test(input.trim())) {
      return input.trim();
    }

    const patterns = [
      /\[Producto Ventas Wp\]\s*(\d+)/i,
      /producto\s*(\d+)/i,
      /(\d+)$/,
      /(\d+)/,
    ];

    for (const pattern of patterns) {
      const match = input.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }

    return input.replace(/\D/g, "") || input;
  }

  static extractProductsData(result) {
    if (result.data && result.data.data) return result.data.data;
    if (result.data && Array.isArray(result.data)) return result.data;
    if (Array.isArray(result)) return result;
    throw new Error("Estructura de respuesta no reconocida");
  }

  static normalizeProductData(product) {
    try {
      let productData;
      if (typeof product.value === "string") {
        productData = JSON.parse(product.value);
      } else if (typeof product.value === "object") {
        productData = product.value;
      } else {
        console.warn("Producto sin datos válidos:", product);
        return this.createFallbackProduct(product);
      }

      const info = productData.informacion_de_producto || {};

      return {
        id: this.extractIdFromProductName(product.name) || info.id || "unknown",
        name: this.getProductName(info, product),
        price: this.getProductPrice(info),
        type: this.getProductType(info),
        variability: this.getProductVariability(info),
        status: this.getProductStatus(info),
        image: this.getProductImage(info),
        dropiId: info.id_del_producto_en_dropi || info.id_dropi || "",
        rawData: product,
        productData: productData,
      };
    } catch (error) {
      console.error("Error al normalizar producto:", error, product);
      return this.createFallbackProduct(product);
    }
  }

  static createFallbackProduct(product) {
    const extractedId = this.extractIdFromProductName(product.name);
    return {
      id: extractedId || "unknown",
      name: extractedId
        ? `Producto ${extractedId}`
        : product.name || "Producto sin nombre",
      price: "$0.00",
      type: "Simple",
      status: "inactivo",
      image: "",
      dropiId: "",
      rawData: product,
      productData: null,
    };
  }

  static extractIdFromProductName(productName) {
    if (!productName) return null;
    const match = productName.match(/\[Producto Ventas Wp\]\s*(.+)/);
    return match ? match[1].trim() : null;
  }

  static getProductName(info, product) {
    const name =
      info.nombre_del_producto ||
      info.nombre ||
      info.nombre_de_producto ||
      product.nombre ||
      this.extractIdFromProductName(product.name) ||
      "Producto sin nombre";

    if (!name || name.trim() === "") {
      const extractedId = this.extractIdFromProductName(product.name);
      return extractedId ? `Producto ${extractedId}` : "Producto sin nombre";
    }
    return name;
  }

  static getProductPrice(info) {
    const price =
      info.precio_del_producto || info.precio || info.precio_de_producto || "0";

    if (
      typeof price === "string" &&
      (price.includes("$") || price.includes("€"))
    ) {
      return price;
    }
    const numericPrice = parseFloat(price) || 0;
    return `$${numericPrice.toFixed(2)}`;
  }

  static getProductStatus(info) {
    const status = info.estado || info.estado_producto || "inactivo";
    return status === "activo" ? "activo" : "inactivo";
  }

  static getProductType(info) {
    const type = info.tipo_de_producto || info.tipo || "";

    if (type === "fisico") return "Físico";
    if (type === "digital") return "Digital";
    if (type === "servicio") return "Servicio";

    return type || "No especificado";
  }

  static getProductVariability(info) {
    const variable = info.variable || "no";
    return variable === "si" ? "Variable" : "Simple";
  }

  static getProductImage(info) {
    return info.imagen_del_producto || info.imagen || "";
  }
}
