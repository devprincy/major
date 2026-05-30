// Streak Calculation
function calculateStreak(lastCompletedDate, currentStreak) {
  if (!lastCompletedDate) return 1;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const last = new Date(lastCompletedDate);
  last.setHours(0, 0, 0, 0);

  const diffDays = Math.floor((today - last) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return currentStreak;
  if (diffDays === 1) return currentStreak + 1;
  return 1;
}

// XP Calculation
function calculateXP(streak) {
  const baseXP = 10;
  const bonusXP = Math.floor(streak / 7) * 5;
  return baseXP + bonusXP;
}

// Level Calculation
function calculateLevel(totalXP) {
  return Math.floor(Math.sqrt(totalXP) / 2) + 1;
}

// Check if already completed today
function isCompletedToday(lastCompletedDate) {
  if (!lastCompletedDate) return false;
  const today = new Date();
  const last = new Date(lastCompletedDate);
  return (
    today.getFullYear() === last.getFullYear() &&
    today.getMonth() === last.getMonth() &&
    today.getDate() === last.getDate()
  );
}

// Check and return new badges earned
function checkBadges(existingBadges, totalXP, streak) {
  const allBadges = [
    { id: 'first_step', label: '🥇 First Step', condition: totalXP >= 10 },
    { id: 'on_fire', label: '🔥 On Fire', condition: streak >= 3 },
    { id: 'consistency_king', label: '👑 Consistency King', condition: streak >= 7 },
    { id: 'xp_hunter', label: '⚡ XP Hunter', condition: totalXP >= 100 },
    { id: 'legend', label: '🏆 Legend', condition: totalXP >= 500 },
  ];

  const newBadges = [];
  for (const badge of allBadges) {
    if (badge.condition && !existingBadges.includes(badge.id)) {
      newBadges.push(badge.id);
    }
  }
  return newBadges;
}

module.exports = {
  calculateStreak, calculateXP, calculateLevel,
  isCompletedToday, checkBadges
};