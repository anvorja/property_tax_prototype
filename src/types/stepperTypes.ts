// // propuesta 1
// // src/types/stepperTypes.ts
// import React from "react";
//
// export interface Step {
//     id: number;
//     label: string;
//     description?: string;
//     icon?: React.ComponentType<{ className?: string }>;
// }
//
// export interface StepperProps {
//     steps: Step[];
//     currentStep: number;
//     orientation?: 'horizontal' | 'vertical';
// }



// // propuesta 2
// // src/types/stepperTypes.ts
// export interface Step {
//     id: number;
//     label: string;
//     description?: string;
// }
//
// export interface StepperProps {
//     steps: Step[];
//     currentStep: number;
//     orientation?: 'horizontal' | 'vertical';
// }

// propuesta 3
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