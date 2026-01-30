export function calculateProgress(completedSteps, totalSteps) {
  if (totalSteps === 0) return 0;
  return (completedSteps / totalSteps) * 100;
}
