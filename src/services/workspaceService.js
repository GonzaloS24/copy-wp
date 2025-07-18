
export const fetchFlowSummary = async (range = 'yesterday') => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const mockResponse = {
    data: [{
      flow_ns: "f174417",
      summary_date: "2025-07-11",
      total_bot_users: 6,
      day_active_bot_users: 0,
      day_new_bot_users: 0,
      day_total_messages: 0,
      day_in_messages: 0,
      day_out_messages: 0,
      day_agent_messages: 0,
      day_note_messages: 0,
      day_assigned: 0,
      day_done: 0,
      day_email_sent: 0,
      day_email_open: 0,
      avg_agent_response_time: 0,
      avg_resolve_time: 0
    }],
    status: "ok"
  };

  return mockResponse.data[0]?.flow_ns || null;
};

export const fetchTeamInfo = async () => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const mockResponse = {
    data: {
      id: 184769,
      name: "Asistente logístico Chile",
      image: "https://ui-avatars.com/api?name=Asistente+log%C3%ADstico+Chile&color=ffffff&background=3357e3",
      owner_id: 97259,
      owner_email: "integraciones@chateapro.app"
    },
    status: "ok"
  };

  return mockResponse.data?.id || null;
};

/* 
// VERSIONES REALES (comentadas por problemas CORS)
import { getAuthToken } from '../utils/authCookies';

export const fetchFlowSummary = async (range = 'yesterday') => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error('No se encontró token de autenticación');

    const response = await fetch(`https://chateapro.app/api/flow-summary?range=${range}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'accept': 'application/json'
      }
    });

    if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

    const data = await response.json();
    if (data.status !== 'ok') throw new Error(data.message || 'Respuesta inesperada');

    return data.data[0]?.flow_ns || null;
  } catch (error) {
    console.error('Error en fetchFlowSummary:', error);
    throw error;
  }
};

export const fetchTeamInfo = async () => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error('No se encontró token de autenticación');

    const response = await fetch('https://chateapro.app/api/team-info', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'accept': 'application/json'
      }
    });

    if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

    const data = await response.json();
    if (data.status !== 'ok') throw new Error(data.message || 'Respuesta inesperada');

    return data.data?.id || null;
  } catch (error) {
    console.error('Error en fetchTeamInfo:', error);
    throw error;
  }
};
*/