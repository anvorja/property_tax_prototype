// // src/components/ui/stepper.tsx
// import React from 'react';
// import { Check, CircleDot } from 'lucide-react';
// import { StepperProps } from '@/types/stepperTypes';
// import { cn } from '@/lib/utils';
//
// export const Stepper: React.FC<StepperProps> = ({
//                                                     steps,
//                                                     currentStep,
//                                                     orientation = 'horizontal'
//                                                 }) => {
//     return (
//         <div className={cn(
//             "w-full",
//             orientation === 'horizontal' ? 'flex justify-between' : 'flex flex-col space-y-4'
//         )}>
//             {steps.map((step, index) => {
//                 const isCompleted = currentStep > step.id;
//                 const isCurrent = currentStep === step.id;
//                 const Icon = step.icon;
//
//                 return (
//                     <div
//                         key={step.id}
//                         className={cn(
//                             "flex items-center",
//                             orientation === 'horizontal' ? 'flex-col w-full' : 'w-full',
//                             index !== steps.length - 1 && orientation === 'horizontal' && "relative"
//                         )}
//                     >
//                          {/*Línea conectora*/}
//                         {index !== steps.length - 1 && (
//                             <div
//                                 className={cn(
//                                     orientation === 'horizontal'
//                                         ? "absolute top-5 left-[calc(50%+20px)] w-[calc(100%-40px)] h-[2px]"
//                                         : "absolute left-5 top-[calc(50%+20px)] h-[calc(100%-40px)] w-[2px]",
//                                     isCompleted ? "bg-blue-500" : "bg-gray-200"
//                                 )}
//                             />
//                         )}
//
//                         {/* Contenedor del paso */}
//                         <div className="flex flex-col items-center relative z-10">
//                             {/* Círculo indicador */}
//                             <div
//                                 className={cn(
//                                     "w-10 h-10 rounded-full flex items-center justify-center border-2",
//                                     isCompleted && "bg-blue-500 border-blue-500 text-white",
//                                     isCurrent && "border-blue-500 text-blue-500",
//                                     !isCompleted && !isCurrent && "border-gray-200 text-gray-400"
//                                 )}
//                             >
//                                 {isCompleted ? (
//                                     <Check className="h-5 w-5" />
//                                 ) : Icon ? (
//                                     <Icon className={cn(
//                                         "h-5 w-5",
//                                         isCurrent ? "text-blue-500" : "text-gray-400"
//                                     )} />
//                                 ) : (
//                                     <CircleDot className="h-5 w-5" />
//                                 )}
//                             </div>
//
//                             {/* Etiqueta y descripción */}
//                             <div className={cn(
//                                 "mt-2 text-center",
//                                 orientation === 'horizontal' ? "w-32" : "ml-4"
//                             )}>
//                                 <p className={cn(
//                                     "text-sm font-medium",
//                                     isCurrent ? "text-blue-500" : "text-gray-600"
//                                 )}>
//                                     {step.label}
//                                 </p>
//                                 {step.description && (
//                                     <p className="text-xs text-gray-500 mt-1">
//                                         {step.description}
//                                     </p>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 );
//             })}
//         </div>
//     );
// };

// // propuesta 2
// // src/components/ui/stepper.tsx
// import React from 'react';
// import { Check, CircleDot } from 'lucide-react';
// import { StepperProps } from '@/types/stepperTypes';
// import { cn } from '@/lib/utils';
//
// export const Stepper: React.FC<StepperProps> = ({
//                                                     steps,
//                                                     currentStep,
//                                                 }) => {
//     return (
//         <div className="w-full flex justify-center mb-8">
//             <div className="flex items-center max-w-3xl w-full">
//                 {steps.map((step, index) => {
//                     const isCompleted = currentStep > step.id;
//                     const isCurrent = currentStep === step.id;
//
//                     return (
//                         <React.Fragment key={step.id}>
//                             <div className="flex flex-col items-center flex-1">
//                                 {/* Círculo indicador */}
//                                 <div
//                                     className={cn(
//                                         "w-8 h-8 rounded-full flex items-center justify-center",
//                                         isCompleted && "bg-blue-500 text-white",
//                                         isCurrent && "border-2 border-blue-500",
//                                         !isCompleted && !isCurrent && "border-2 border-gray-300"
//                                     )}
//                                 >
//                                     {isCompleted ? (
//                                         <Check className="h-4 w-4" />
//                                     ) : (
//                                         <CircleDot className={cn(
//                                             "h-4 w-4",
//                                             isCurrent ? "text-blue-500" : "text-gray-300"
//                                         )} />
//                                     )}
//                                 </div>
//
//                                 {/* Texto */}
//                                 <div className="text-center mt-2">
//                                     <p className={cn(
//                                         "text-sm",
//                                         isCurrent ? "text-blue-500 font-medium" : "text-gray-500"
//                                     )}>
//                                         {step.label}
//                                     </p>
//                                     {step.description && (
//                                         <p className="text-xs text-gray-400">
//                                             {step.description}
//                                         </p>
//                                     )}
//                                 </div>
//                             </div>
//
//                             {/* Línea conectora */}
//                             {index < steps.length - 1 && (
//                                 <div className="flex-1 h-[1px] bg-gray-200 mx-4 relative top-4">
//                                     <div
//                                         className={cn(
//                                             "h-full bg-blue-500 transition-all duration-300",
//                                             isCompleted ? "w-full" : "w-0"
//                                         )}
//                                     />
//                                 </div>
//                             )}
//                         </React.Fragment>
//                     );
//                 })}
//             </div>
//         </div>
//     );
// };
//
// import React from 'react';
// import { Check, CircleDot, FileText, CreditCard, CheckCircle } from 'lucide-react';
// import { StepperProps } from '@/types/stepperTypes';
// import { cn } from '@/lib/utils';
//
// const paymentSteps = [
//     {
//         id: 1,
//         label: 'Resumen',
//         description: 'Verificar información',
//         icon: FileText
//     },
//     {
//         id: 2,
//         label: 'Pago',
//         description: 'PSE',
//         icon: CreditCard
//     },
//     {
//         id: 3,
//         label: 'Confirmación',
//         description: 'Proceso completado',
//         icon: CheckCircle
//     }
// ];
//
// export const Stepper: React.FC<StepperProps> = ({
//                                                     steps = paymentSteps,
//                                                     currentStep,
//                                                 }) => {
//     return (
//         <div className="w-full flex justify-center mb-8">
//             <div className="flex items-center max-w-3xl w-full">
//                 {steps.map((step, index) => {
//                     const isCompleted = currentStep > step.id;
//                     const isCurrent = currentStep === step.id;
//                     const Icon = step.icon;
//
//                     return (
//                         <React.Fragment key={step.id}>
//                             <div className="flex flex-col items-center flex-1">
//                                 {/* Círculo indicador */}
//                                 <div
//                                     className={cn(
//                                         "w-8 h-8 rounded-full flex items-center justify-center",
//                                         isCompleted && "bg-blue-500 text-white",
//                                         isCurrent && "border-2 border-blue-500",
//                                         !isCompleted && !isCurrent && "border-2 border-gray-300"
//                                     )}
//                                 >
//                                     {isCompleted ? (
//                                         <Check className="h-4 w-4" />
//                                     ) : Icon ? (
//                                         <Icon className={cn(
//                                             "h-4 w-4",
//                                             isCurrent ? "text-blue-500" : "text-gray-300"
//                                         )} />
//                                     ) : (
//                                         <CircleDot className={cn(
//                                             "h-4 w-4",
//                                             isCurrent ? "text-blue-500" : "text-gray-300"
//                                         )} />
//                                     )}
//                                 </div>
//
//                                 {/* Texto */}
//                                 <div className="text-center mt-2">
//                                     <p className={cn(
//                                         "text-sm",
//                                         isCurrent ? "text-blue-500 font-medium" : "text-gray-500"
//                                     )}>
//                                         {step.label}
//                                     </p>
//                                     {step.description && (
//                                         <p className="text-xs text-gray-400">
//                                             {step.description}
//                                         </p>
//                                     )}
//                                 </div>
//                             </div>
//
//                             {/* Línea conectora */}
//                             {index < steps.length - 1 && (
//                                 <div className="flex-1 h-[1px] bg-gray-200 mx-4 relative top-4">
//                                     <div
//                                         className={cn(
//                                             "h-full bg-blue-500 transition-all duration-300",
//                                             isCompleted ? "w-full" : "w-0"
//                                         )}
//                                     />
//                                 </div>
//                             )}
//                         </React.Fragment>
//                     );
//                 })}
//             </div>
//         </div>
//     );
// };

// propuesta 3
// src/components/ui/stepper.tsx
import React from 'react';
import { Check, CircleDot} from 'lucide-react';
import { StepperProps } from '@/types/stepperTypes';
import { cn } from '@/lib/utils';

export const Stepper: React.FC<StepperProps> = ({
                                                    steps,
                                                    currentStep,
                                                }) => {
    return (
        <div className="w-full flex justify-center mb-8">
            <div className="flex items-center max-w-3xl w-full">
                {steps.map((step, index) => {
                    const isCompleted = currentStep > step.id;
                    const isCurrent = currentStep === step.id;
                    const Icon = step.icon;

                    return (
                        <React.Fragment key={step.id}>
                            <div className="flex flex-col items-center flex-1">
                                {/* Círculo indicador mejorado */}
                                <div
                                    className={cn(
                                        "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200",
                                        isCompleted && "bg-blue-500 text-white shadow-sm",
                                        isCurrent && "border-2 border-blue-500 shadow-sm",
                                        !isCompleted && !isCurrent && "border-2 border-gray-400"
                                    )}
                                >
                                    {isCompleted ? (
                                        <Check className="h-5 w-5" />
                                    ) : Icon ? (
                                        <Icon className={cn(
                                            "h-5 w-5",
                                            isCurrent ? "text-blue-500" : "text-gray-400"
                                        )} />
                                    ) : (
                                        <CircleDot className={cn(
                                            "h-5 w-5",
                                            isCurrent ? "text-blue-500" : "text-gray-400"
                                        )} />
                                    )}
                                </div>

                                {/* Texto mejorado */}
                                <div className="text-center mt-3">
                                    <p className={cn(
                                        "text-sm font-medium transition-colors duration-200",
                                        isCurrent ? "text-blue-500" : "text-gray-700"
                                    )}>
                                        {step.label}
                                    </p>
                                    {step.description && (
                                        <p className="text-xs text-gray-500 mt-1">
                                            {step.description}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Línea conectora mejorada */}
                            {index < steps.length - 1 && (
                                <div className="flex-1 h-[2px] bg-gray-200 mx-4 relative top-5">
                                    <div
                                        className={cn(
                                            "h-full bg-blue-500 transition-all duration-300",
                                            isCompleted ? "w-full" : "w-0"
                                        )}
                                    />
                                </div>
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
};