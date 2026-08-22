// Encrypted Offline Field Queue Helper for CaseVault under low/no connectivity

const QUEUE_KEY = 'casevault_offline_queue_v1';

export function getOfflineQueue() {
  try {
    const raw = localStorage.getItem(QUEUE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    return [];
  }
}

export function queueOfflineSubmission(type, payload) {
  try {
    const current = getOfflineQueue();
    const item = {
      id: `OFF-QUE-${Date.now()}`,
      type, // 'case' | 'document' | 'panchnama'
      timestamp: new Date().toLocaleString('en-IN') + ' IST',
      payload
    };
    current.push(item);
    localStorage.setItem(QUEUE_KEY, JSON.stringify(current));
    return item;
  } catch (err) {
    console.warn('Queue submission warning:', err);
    return null;
  }
}

export function clearOfflineQueue() {
  localStorage.removeItem(QUEUE_KEY);
}

export async function flushOfflineQueue(syncHandler) {
  const queue = getOfflineQueue();
  if (queue.length === 0) return 0;

  let count = 0;
  for (const item of queue) {
    if (syncHandler) {
      await syncHandler(item);
      count++;
    }
  }
  clearOfflineQueue();
  return count;
}
