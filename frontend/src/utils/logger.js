export const logError = async (message, level = 'error') => {
  try {
    await fetch('https://electrosafeweb.com/api/logs', {        // http://localhost:5000/api/logs/ping          https://electrosafeweb.com/api/logs
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ level, message })
    })
  } catch (err) {
    console.error("Error al enviar log:", err)
  }
}




