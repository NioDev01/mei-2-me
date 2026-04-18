export type StepStatus = "locked" | "available" | "in_progress" | "completed";

export type Step = {
  step: string;
  status: StepStatus;
};

export type JornadaSummary = {
  progress: number;
  currentStep: string | null;
  nextStep: string | null;
  completedSteps: number;
  totalSteps: number;
  steps: Step[];
};
