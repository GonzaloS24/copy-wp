import encuesta1 from "../../../assets/surveyIcons/Encuesta 1.png";
import encuesta2 from "../../../assets/surveyIcons/Encuesta 2.png";
import encuesta3 from "../../../assets/surveyIcons/Encuesta 3.png";

export const WIZARD_OPTIONS = {
  salesChannel: [
    {
      value: "whatsapp",
      title: "WhatsApp",
      description: "Recibo pedidos directamente por WhatsApp.",
      icon: <img src={encuesta1} />,
    },
    {
      value: "online",
      title: "Landing o tienda online",
      description: "Mis clientes me compran desde una página web.",
      icon: <img src={encuesta2} />,
    },
    {
      value: "no-vendiendo",
      title: "Aún no estoy vendiendo",
      description: "Todavía no he empezado a vender en internet.",
      icon: <img src={encuesta3} />,
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
