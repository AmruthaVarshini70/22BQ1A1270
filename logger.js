const logs = [];

export function logEvent(type, message, meta = {}) {
  const entry = {
    timestamp: new Date().toISOString(),
    type,
    message,
    ...meta,
  };
  logs.push(entry);
  localStorage.setItem("logs", JSON.stringify(logs));
}
