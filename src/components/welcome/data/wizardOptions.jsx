export const WIZARD_OPTIONS = {
  salesChannel: [
    {
      value: "whatsapp",
      title: "WhatsApp",
      description: "Recibo pedidos directamente por WhatsApp.",
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516" />
        </svg>
      ),
    },
    {
      value: "online",
      title: "Landing o tienda online",
      description: "Mis clientes me compran desde una página web.",
      icon: (
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      value: "no-vendiendo",
      title: "Aún no estoy vendiendo",
      description: "Todavía no he empezado a vender en internet.",
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z" />
        </svg>
      ),
    },
  ],

  experience: [
    {
      value: "iniciando",
      title: "Estoy iniciando",
      description: "Estoy en mis primeros pasos o todavía no he vendido.",
      icon: "🐣",
    },
    {
      value: "menos-3-meses",
      title: "Menos de 3 meses",
      description: "Llevo poco tiempo, pero ya he tenido mis primeras ventas.",
      icon: "🚶‍♂️",
    },
    {
      value: "3-meses-1-año",
      title: "Entre 3 meses y 1 año",
      description: "Mi negocio ya está en marcha y quiero crecer más.",
      icon: "🏃",
    },
    {
      value: "mas-1-año",
      title: "Más de 1 año",
      description: "Tengo experiencia y busco escalar aún más.",
      icon: "🧗",
    },
  ],

  volume: [
    {
      value: "0-10",
      title: "De 0 a 10 pedidos",
      description: "Estoy empezando o tengo un volumen bajo.",
      icon: "📦",
    },
    {
      value: "10-50",
      title: "De 10 a 50 pedidos",
      description: "Recibo varios pedidos al día.",
      icon: "📈",
    },
    {
      value: "50-100",
      title: "De 50 a 100 pedidos",
      description: "Tengo buen volumen diario.",
      icon: "🚚",
    },
    {
      value: "100+",
      title: "Más de 100 pedidos",
      description: "Mi operación es alta y constante.",
      icon: "🏭",
    },
  ],

  goals: [
    {
      value: "aumentar-ventas",
      title: "Aumentar ventas",
      description: "Quiero vender más o recuperar carritos.",
      icon: "💰",
    },
    {
      value: "atencion-cliente",
      title: "Mejorar atención al cliente",
      description: "Quiero responder más rápido y mejor.",
      icon: "🎯",
    },
    {
      value: "automatizar",
      title: "Automatizar procesos",
      description: "Quiero ahorrar tiempo automatizando tareas.",
      icon: "🤖",
    },
    {
      value: "todo",
      title: "Todo lo anterior",
      description: "Quiero aprovechar todo el potencial de la plataforma.",
      icon: "🧩",
    },
  ],
};

export const COUNTRIES = [
  { code: "+57", name: "Colombia", flag: "🇨🇴" },
  { code: "+56", name: "Chile", flag: "🇨🇱" },
  { code: "+593", name: "Ecuador", flag: "🇪🇨" },
  { code: "+52", name: "México", flag: "🇲🇽" },
  { code: "+51", name: "Perú", flag: "🇵🇪" },
  { code: "+595", name: "Paraguay", flag: "🇵🇾" },
  { code: "+507", name: "Panamá", flag: "🇵🇦" },
];

export const PHONE_LENGTHS = {
  "+57": 10, // Colombia
  "+56": 9, // Chile
  "+593": 9, // Ecuador
  "+52": 10, // México
  "+51": 9, // Perú
  "+595": 9, // Paraguay
  "+507": 8, // Panamá
};

export const PHONE_PLACEHOLDERS = {
  "+57": "300 123 4567",
  "+56": "9 1234 5678",
  "+593": "99 123 4567",
  "+52": "55 1234 5678",
  "+51": "999 123 456",
  "+595": "981 123 456",
  "+507": "6123 4567",
};
