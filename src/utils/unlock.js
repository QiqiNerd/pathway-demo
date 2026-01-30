export function isUnlocked(step, completedSet) {
  if (!step.prerequisites || step.prerequisites.length === 0) {
    return true;
  }
  return step.prerequisites.every(pid => completedSet.has(pid));
}

export function allRequiredCompleted(steps, completedSet) {
  return steps
    .filter(s => s.required)
    .every(s => completedSet.has(s.id));
}
