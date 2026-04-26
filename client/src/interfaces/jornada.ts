export interface JornadaData {
  progress: number;
  completedSteps: number;
  totalSteps: number;
  currentStep: string | null;
  nextStep: string | null;
}
