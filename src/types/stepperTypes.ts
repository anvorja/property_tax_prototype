// src/types/stepperTypes.ts
import React from "react";

export interface Step {
    id: number;
    label: string;
    description?: string;
    icon?: React.ComponentType<{ className?: string }>;
}

export interface StepperProps {
    steps: Step[];
    currentStep: number;
}