// Small utility to format ISO date strings into localized, human-readable dates
const formatDate = (raw, options) => {
  if (!raw) return '—';
  try {
    const d = new Date(raw);
    if (Number.isNaN(d.getTime())) return raw;
    return d.toLocaleDateString(undefined, options || { month: 'short', day: 'numeric', year: 'numeric' });
  } catch {
    return raw;
  }
};

export default formatDate;
