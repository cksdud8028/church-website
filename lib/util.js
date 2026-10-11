const pad = (n) => String(n).padStart(2, "0");
export const todayStr = () => {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};
export const daysBetween = (a, b) => Math.round((new Date(b) - new Date(a)) / 86400000);
export const daysToBirthday = (mmdd, today) => {
  const y = Number(today.slice(0, 4));
  const d = `${y}-${mmdd}` < today ? `${y + 1}-${mmdd}` : `${y}-${mmdd}`;
  return daysBetween(today, d);
};
export const ddayLabel = (n) => (n === 0 ? "D-DAY" : n > 0 ? `D-${n}` : `D+${-n}`);
