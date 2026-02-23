const sessions = new Map();

export function getSession(userId) {
  if (!sessions.has(userId)) {
    sessions.set(userId, {
      step: 'start',
      lastMessageAt: new Date(),
      pendingHuman: false
    });
  }

  return sessions.get(userId);
}

export function updateSession(userId, data) {
  const session = getSession(userId);
  sessions.set(userId, { ...session, ...data });
}

export function clearSession(userId) {
  sessions.delete(userId);
}