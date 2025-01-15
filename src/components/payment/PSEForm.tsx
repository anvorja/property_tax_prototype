// // sencillo inicial
// // src/components/payment/PSEForm.tsx
// import React from 'react';
// import { Card, CardHeader, CardContent, CardTitle, CardFooter } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from '@/components/ui/select';
// import { BanksMockData } from '@/data/BanksMockData';
// import { PSEFormProps, PSEFormData } from '@/types/paymentPSETypes';
// import { CreditCard, Loader2 } from 'lucide-react';
//
// export const PSEForm: React.FC<PSEFormProps> = ({
//                                                     onSubmit,
//                                                     isLoading = false,
//                                                     initialData = {}
//                                                 }) => {
//     const [formData, setFormData] = React.useState<PSEFormData>({
//         fullName: initialData.fullName || '',
//         documentType: initialData.documentType || '',
//         documentNumber: initialData.documentNumber || '',
//         email: initialData.email || '',
//         phone: initialData.phone || '',
//         bankCode: initialData.bankCode || '',
//     });
//
//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         onSubmit(formData);
//     };
//
//     const handleChange = (field: keyof PSEFormData) => (
//         e: React.ChangeEvent<HTMLInputElement>
//     ) => {
//         setFormData(prev => ({
//             ...prev,
//             [field]: e.target.value
//         }));
//     };
//
//     const handleSelectChange = (field: keyof PSEFormData) => (value: string) => {
//         setFormData(prev => ({
//             ...prev,
//             [field]: value
//         }));
//     };
//
//     return (
//         <Card className="w-full max-w-xl mx-auto">
//             <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                     <CreditCard className="h-5 w-5" />
//                     Pago PSE
//                 </CardTitle>
//             </CardHeader>
//             <form onSubmit={handleSubmit}>
//                 <CardContent className="space-y-4">
//                     <div className="space-y-2">
//                         <label className="text-sm font-medium">Nombre Completo</label>
//                         <Input
//                             required
//                             value={formData.fullName}
//                             onChange={handleChange('fullName')}
//                             placeholder="Nombre como aparece en su documento"
//                         />
//                     </div>
//
//                     <div className="grid grid-cols-2 gap-4">
//                         <div className="space-y-2">
//                             <label className="text-sm font-medium">Tipo de Documento</label>
//                             <Select
//                                 value={formData.documentType}
//                                 onValueChange={handleSelectChange('documentType')}
//                             >
//                                 <SelectTrigger>
//                                     <SelectValue placeholder="Seleccione..." />
//                                 </SelectTrigger>
//                                 <SelectContent>
//                                     <SelectItem value="CC">Cédula de Ciudadanía</SelectItem>
//                                     <SelectItem value="CE">Cédula de Extranjería</SelectItem>
//                                     <SelectItem value="NIT">NIT</SelectItem>
//                                 </SelectContent>
//                             </Select>
//                         </div>
//
//                         <div className="space-y-2">
//                             <label className="text-sm font-medium">Número de Documento</label>
//                             <Input
//                                 required
//                                 value={formData.documentNumber}
//                                 onChange={handleChange('documentNumber')}
//                                 placeholder="Número de documento"
//                             />
//                         </div>
//                     </div>
//
//                     <div className="space-y-2">
//                         <label className="text-sm font-medium">Correo Electrónico</label>
//                         <Input
//                             required
//                             type="email"
//                             value={formData.email}
//                             onChange={handleChange('email')}
//                             placeholder="correo@ejemplo.com"
//                         />
//                     </div>
//
//                     <div className="space-y-2">
//                         <label className="text-sm font-medium">Teléfono</label>
//                         <Input
//                             required
//                             type="tel"
//                             value={formData.phone}
//                             onChange={handleChange('phone')}
//                             placeholder="Número de contacto"
//                         />
//                     </div>
//
//                     <div className="space-y-2">
//                         <label className="text-sm font-medium">Banco</label>
//                         <Select
//                             value={formData.bankCode}
//                             onValueChange={handleSelectChange('bankCode')}
//                         >
//                             <SelectTrigger>
//                                 <SelectValue placeholder="Seleccione su banco..." />
//                             </SelectTrigger>
//                             <SelectContent>
//                                 {BanksMockData.map(bank => (
//                                     <SelectItem key={bank.code} value={bank.code}>
//                                         {bank.name}
//                                     </SelectItem>
//                                 ))}
//                             </SelectContent>
//                         </Select>
//                     </div>
//                 </CardContent>
//                 <CardFooter className="flex justify-end space-x-2">
//                     <Button
//                         type="submit"
//                         disabled={isLoading}
//                         className="min-w-[150px] bg-blue-600 hover:bg-blue-700 text-white"
//                     >
//                         {isLoading ? (
//                             <>
//                                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                                 Procesando...
//                             </>
//                         ) : (
//                             'Continuar'
//                         )}
//                     </Button>
//                 </CardFooter>
//             </form>
//         </Card>
//     );
// };



// // sin logo de pse
// // src/components/payment/PSEForm.tsx
// import React from 'react';
// import { Card, CardHeader, CardContent, CardTitle, CardFooter } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from '@/components/ui/select';
// import { BanksMockData } from '@/data/BanksMockData';
// import { PSEFormProps, PSEFormData } from '@/types/paymentPSETypes';
// import { CreditCard, Loader2 } from 'lucide-react';
//
// export const PSEForm: React.FC<PSEFormProps> = ({
//                                                     onSubmit,
//                                                     isLoading = false,
//                                                     initialData = {}
//                                                 }) => {
//     const [formData, setFormData] = React.useState<PSEFormData>({
//         fullName: initialData.fullName || '',
//         documentType: initialData.documentType || '',
//         documentNumber: initialData.documentNumber || '',
//         email: initialData.email || '',
//         phone: initialData.phone || '',
//         bankCode: initialData.bankCode || '',
//     });
//
//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         onSubmit(formData);
//     };
//
//     const handleChange = (field: keyof PSEFormData) => (
//         e: React.ChangeEvent<HTMLInputElement>
//     ) => {
//         setFormData(prev => ({
//             ...prev,
//             [field]: e.target.value
//         }));
//     };
//
//     const handleSelectChange = (field: keyof PSEFormData) => (value: string) => {
//         setFormData(prev => ({
//             ...prev,
//             [field]: value
//         }));
//     };
//
//     return (
//         <Card className="w-full max-w-xl mx-auto">
//             <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                     <CreditCard className="h-5 w-5" />
//                     Pago PSE
//                 </CardTitle>
//             </CardHeader>
//             <form onSubmit={handleSubmit}>
//                 <CardContent className="space-y-4">
//                     <div className="space-y-2">
//                         <label className="text-sm font-medium">Nombre Completo</label>
//                         <Input
//                             required
//                             value={formData.fullName}
//                             onChange={handleChange('fullName')}
//                             placeholder="Nombre como aparece en su documento"
//                             className="text-gray-900 placeholder:text-gray-500"
//                         />
//                     </div>
//
//                     <div className="grid grid-cols-2 gap-4">
//                         <div className="space-y-2">
//                             <label className="text-sm font-medium">Tipo de Documento</label>
//                             <Select
//                                 value={formData.documentType}
//                                 onValueChange={handleSelectChange('documentType')}
//                             >
//                                 <SelectTrigger className="text-gray-900">
//                                     <SelectValue
//                                         placeholder="Seleccione..."
//                                         className="placeholder:text-gray-500"
//                                     />
//                                 </SelectTrigger>
//                                 <SelectContent>
//                                     <SelectItem value="CC">Cédula de Ciudadanía</SelectItem>
//                                     <SelectItem value="CE">Cédula de Extranjería</SelectItem>
//                                     <SelectItem value="NIT">NIT</SelectItem>
//                                 </SelectContent>
//                             </Select>
//                         </div>
//
//                         <div className="space-y-2">
//                             <label className="text-sm font-medium">Número de Documento</label>
//                             <Input
//                                 required
//                                 value={formData.documentNumber}
//                                 onChange={handleChange('documentNumber')}
//                                 placeholder="Número de documento"
//                             />
//                         </div>
//                     </div>
//
//                     <div className="space-y-2">
//                         <label className="text-sm font-medium">Correo Electrónico</label>
//                         <Input
//                             required
//                             type="email"
//                             value={formData.email}
//                             onChange={handleChange('email')}
//                             placeholder="correo@ejemplo.com"
//                         />
//                     </div>
//
//                     <div className="space-y-2">
//                         <label className="text-sm font-medium">Teléfono</label>
//                         <Input
//                             required
//                             type="tel"
//                             value={formData.phone}
//                             onChange={handleChange('phone')}
//                             placeholder="Número de contacto"
//                         />
//                     </div>
//
//                     <div className="space-y-2">
//                         <label className="text-sm font-medium">Banco</label>
//                         <Select
//                             value={formData.bankCode}
//                             onValueChange={handleSelectChange('bankCode')}
//                         >
//                             <SelectTrigger className="w-full border-gray-200 bg-white focus:ring-blue-500 focus:border-blue-500">
//                                 <SelectValue placeholder="Seleccione su banco..." />
//                             </SelectTrigger>
//                             <SelectContent className="max-h-[300px]">
//                                 <div className="p-2">
//                                     {BanksMockData.map(bank => (
//                                         <SelectItem
//                                             key={bank.code}
//                                             value={bank.code}
//                                             className="py-2.5 px-3 hover:bg-blue-50 rounded-md cursor-pointer transition-colors"
//                                         >
//                                             {bank.name}
//                                         </SelectItem>
//                                     ))}
//                                 </div>
//                             </SelectContent>
//                         </Select>
//                     </div>
//                 </CardContent>
//                 <CardFooter className="flex justify-end space-x-2">
//                     <Button
//                         type="submit"
//                         disabled={isLoading}
//                         className="min-w-[150px] bg-blue-600 hover:bg-blue-700 text-white"
//                     >
//                         {isLoading ? (
//                             <>
//                                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                                 Procesando...
//                             </>
//                         ) : (
//                             'Continuar'
//                         )}
//                     </Button>
//                 </CardFooter>
//             </form>
//         </Card>
//     );
// };



// sin logos pero buena propuesta
// import React from 'react';
// import { Card, CardHeader, CardContent, CardTitle, CardFooter } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from '@/components/ui/select';
// import { BanksMockData } from '@/data/BanksMockData';
// import { PSEFormProps, PSEFormData } from '@/types/paymentPSETypes';
// import { CreditCard, Loader2 } from 'lucide-react';
// import Image from 'next/image';
//
// export const PSEForm: React.FC<PSEFormProps> = ({
//                                                     onSubmit,
//                                                     isLoading = false,
//                                                     initialData = {}
//                                                 }) => {
//     const [formData, setFormData] = React.useState<PSEFormData>({
//         fullName: initialData.fullName || '',
//         documentType: initialData.documentType || '',
//         documentNumber: initialData.documentNumber || '',
//         email: initialData.email || '',
//         phone: initialData.phone || '',
//         bankCode: initialData.bankCode || '',
//     });
//
//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         onSubmit(formData);
//     };
//
//     const handleChange = (field: keyof PSEFormData) => (
//         e: React.ChangeEvent<HTMLInputElement>
//     ) => {
//         setFormData(prev => ({
//             ...prev,
//             [field]: e.target.value
//         }));
//     };
//
//     const handleSelectChange = (field: keyof PSEFormData) => (value: string) => {
//         setFormData(prev => ({
//             ...prev,
//             [field]: value
//         }));
//     };
//
//     return (
//         <Card className="w-full max-w-xl mx-auto">
//             <CardHeader className="flex flex-col items-center">
//                 <Image
//                     src="https://res.cloudinary.com/dv2xu8dwr/image/upload/v1736927378/PSE1_a1ldmo.png"
//                     alt="PSE Logo"
//                     width={160}
//                     height={60}
//                     className="h-16 w-auto"
//                     priority
//                 />
//                 <CardTitle className="flex items-center gap-2">
//                     <CreditCard className="h-5 w-5" />
//                     Pago PSE
//                 </CardTitle>
//             </CardHeader>
//             <form onSubmit={handleSubmit}>
//                 <CardContent className="space-y-4">
//                     <div className="space-y-2">
//                         <label className="text-sm font-medium">Nombre Completo</label>
//                         <Input
//                             required
//                             value={formData.fullName}
//                             onChange={handleChange('fullName')}
//                             placeholder="Nombre como aparece en su documento"
//                             className="text-gray-900 placeholder:text-gray-500"
//                         />
//                     </div>
//
//                     <div className="grid grid-cols-2 gap-4">
//                         <div className="space-y-2">
//                             <label className="text-sm font-medium">Tipo de Documento</label>
//                             <Select
//                                 value={formData.documentType}
//                                 onValueChange={handleSelectChange('documentType')}
//                             >
//                                 <SelectTrigger className="text-gray-900">
//                                     <SelectValue
//                                         placeholder="Seleccione..."
//                                         className="placeholder:text-gray-500"
//                                     />
//                                 </SelectTrigger>
//                                 <SelectContent>
//                                     <SelectItem value="CC">Cédula de Ciudadanía</SelectItem>
//                                     <SelectItem value="CE">Cédula de Extranjería</SelectItem>
//                                     <SelectItem value="NIT">NIT</SelectItem>
//                                 </SelectContent>
//                             </Select>
//                         </div>
//
//                         <div className="space-y-2">
//                             <label className="text-sm font-medium">Número de Documento</label>
//                             <Input
//                                 required
//                                 value={formData.documentNumber}
//                                 onChange={handleChange('documentNumber')}
//                                 placeholder="Número de documento"
//                             />
//                         </div>
//                     </div>
//
//                     <div className="space-y-2">
//                         <label className="text-sm font-medium">Correo Electrónico</label>
//                         <Input
//                             required
//                             type="email"
//                             value={formData.email}
//                             onChange={handleChange('email')}
//                             placeholder="correo@ejemplo.com"
//                         />
//                     </div>
//
//                     <div className="space-y-2">
//                         <label className="text-sm font-medium">Teléfono</label>
//                         <Input
//                             required
//                             type="tel"
//                             value={formData.phone}
//                             onChange={handleChange('phone')}
//                             placeholder="Número de contacto"
//                         />
//                     </div>
//
//                     <div className="space-y-2">
//                         <label className="text-sm font-medium">Banco</label>
//                         <Select
//                             value={formData.bankCode}
//                             onValueChange={handleSelectChange('bankCode')}
//                         >
//                             <SelectTrigger className="w-full border-gray-200 bg-white focus:ring-blue-500 focus:border-blue-500">
//                                 <SelectValue placeholder="Seleccione su banco..." />
//                             </SelectTrigger>
//                             <SelectContent className="max-h-[300px]">
//                                 <div className="p-2">
//                                     {BanksMockData.map(bank => (
//                                         <SelectItem
//                                             key={bank.code}
//                                             value={bank.code}
//                                             className="py-2.5 px-3 hover:bg-blue-50 rounded-md cursor-pointer transition-colors"
//                                         >
//                                             {bank.name}
//                                         </SelectItem>
//                                     ))}
//                                 </div>
//                             </SelectContent>
//                         </Select>
//                     </div>
//                 </CardContent>
//                 <CardFooter className="flex justify-end space-x-2">
//                     <Button
//                         type="submit"
//                         disabled={isLoading}
//                         className="min-w-[150px] bg-blue-600 hover:bg-blue-700 text-white"
//                     >
//                         {isLoading ? (
//                             <>
//                                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                                 Procesando...
//                             </>
//                         ) : (
//                             'Continuar'
//                         )}
//                     </Button>
//                 </CardFooter>
//             </form>
//         </Card>
//     );
// };




// iconos en form pse
// src/components/payment/PSEForm.tsx
import React from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { BanksMockData } from '@/data/BanksMockData';
import { PSEFormProps, PSEFormData } from '@/types/paymentPSETypes';
import { Loader2, User, Mail, Phone, Landmark } from 'lucide-react';
import Image from 'next/image';

export const PSEForm: React.FC<PSEFormProps> = ({
                                                    onSubmit,
                                                    isLoading = false,
                                                    initialData = {}
                                                }) => {
    const [formData, setFormData] = React.useState<PSEFormData>({
        fullName: initialData.fullName || '',
        documentType: initialData.documentType || '',
        documentNumber: initialData.documentNumber || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        bankCode: initialData.bankCode || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleChange = (field: keyof PSEFormData) => (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormData(prev => ({
            ...prev,
            [field]: e.target.value
        }));
    };

    const handleSelectChange = (field: keyof PSEFormData) => (value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return (
        <div className="w-full max-w-xl mx-auto">
            <Card className="shadow-lg">
                <CardHeader className="text-center border-b pb-6">
                    <div className="flex justify-center mb-6">
                        <Image
                            src="https://res.cloudinary.com/dv2xu8dwr/image/upload/v1736927378/PSE1_a1ldmo.png"
                            alt="PSE Logo"
                            width={160}
                            height={60}
                            className="h-16 w-auto"
                            priority
                        />
                    </div>
                    <p className="text-gray-500 mt-2">Complete los datos para realizar su pago</p>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-6 pt-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium flex items-center gap-2">
                                <User className="h-4 w-4 text-gray-500" />
                                Nombre Completo
                            </label>
                            <Input
                                required
                                value={formData.fullName}
                                onChange={handleChange('fullName')}
                                placeholder="Nombre como aparece en su documento"
                                className="h-11"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Tipo de Documento</label>
                                <Select
                                    value={formData.documentType}
                                    onValueChange={handleSelectChange('documentType')}
                                >
                                    <SelectTrigger className="h-11">
                                        <SelectValue placeholder="Seleccione..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="CC">Cédula de Ciudadanía</SelectItem>
                                        <SelectItem value="CE">Cédula de Extranjería</SelectItem>
                                        <SelectItem value="NIT">NIT</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Número de Documento</label>
                                <Input
                                    required
                                    value={formData.documentNumber}
                                    onChange={handleChange('documentNumber')}
                                    placeholder="Número de documento"
                                    className="h-11"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium flex items-center gap-2">
                                <Mail className="h-4 w-4 text-gray-500" />
                                Correo Electrónico
                            </label>
                            <Input
                                required
                                type="email"
                                value={formData.email}
                                onChange={handleChange('email')}
                                placeholder="correo@ejemplo.com"
                                className="h-11"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium flex items-center gap-2">
                                <Phone className="h-4 w-4 text-gray-500" />
                                Teléfono
                            </label>
                            <Input
                                required
                                type="tel"
                                value={formData.phone}
                                onChange={handleChange('phone')}
                                placeholder="Número de contacto"
                                className="h-11"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium flex items-center gap-2">
                                <Landmark className="h-4 w-4 text-gray-500" />
                                Banco
                            </label>
                            <Select
                                value={formData.bankCode}
                                onValueChange={handleSelectChange('bankCode')}
                            >
                                <SelectTrigger className="h-11">
                                    <SelectValue placeholder="Seleccione su banco..." />
                                </SelectTrigger>
                                <SelectContent className="max-h-60 overflow-y-auto">
                                    <div className="p-2">
                                        {BanksMockData.map(bank => (
                                            <SelectItem
                                                key={bank.code}
                                                value={bank.code}
                                                className="py-2.5 px-3 hover:bg-blue-50 rounded-md cursor-pointer transition-colors"
                                            >
                                                {bank.name}
                                            </SelectItem>
                                        ))}
                                    </div>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                    <CardFooter className="border-t pt-6">
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Procesando...
                                </>
                            ) : (
                                'Continuar al pago'
                            )}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};



// // buena propuesta: iconos izquierda
// // src/components/payment/PSEForm.tsx
// import React from 'react';
// import { Card, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from '@/components/ui/select';
// import { BanksMockData } from '@/data/BanksMockData';
// import { PSEFormProps, PSEFormData } from '@/types/paymentPSETypes';
// import { Landmark, User, Mail, Phone, Loader2 } from 'lucide-react';
// import Image from 'next/image';
//
// export const PSEForm: React.FC<PSEFormProps> = ({
//                                                     onSubmit,
//                                                     isLoading = false,
//                                                     initialData = {}
//                                                 }) => {
//     const [formData, setFormData] = React.useState<PSEFormData>({
//         fullName: initialData.fullName || '',
//         documentType: initialData.documentType || '',
//         documentNumber: initialData.documentNumber || '',
//         email: initialData.email || '',
//         phone: initialData.phone || '',
//         bankCode: initialData.bankCode || '',
//     });
//
//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         onSubmit(formData);
//     };
//
//     const handleChange = (field: keyof PSEFormData) => (
//         e: React.ChangeEvent<HTMLInputElement>
//     ) => {
//         setFormData(prev => ({
//             ...prev,
//             [field]: e.target.value
//         }));
//     };
//
//     const handleSelectChange = (field: keyof PSEFormData) => (value: string) => {
//         setFormData(prev => ({
//             ...prev,
//             [field]: value
//         }));
//     };
//
//     return (
//         <Card className="w-full">
//             <CardContent className="pt-6 space-y-6">
//                 <div className="flex flex-col items-center space-y-4">
//                     <Image
//                         src="https://res.cloudinary.com/dv2xu8dwr/image/upload/v1736927378/PSE1_a1ldmo.png"
//                         alt="PSE Logo"
//                         width={180}
//                         height={70}
//                         className="h-auto"
//                         priority
//                     />
//                     <p className="text-gray-600 text-center">
//                         Complete los datos para realizar su pago
//                     </p>
//                 </div>
//
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     <div className="space-y-1">
//                         <div className="relative">
//                             <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//                             <Input
//                                 required
//                                 value={formData.fullName}
//                                 onChange={handleChange('fullName')}
//                                 placeholder="Nombre completo"
//                                 className="pl-10"
//                             />
//                         </div>
//                     </div>
//
//                     <div className="grid grid-cols-2 gap-4">
//                         <Select
//                             value={formData.documentType}
//                             onValueChange={handleSelectChange('documentType')}
//                         >
//                             <SelectTrigger>
//                                 <SelectValue placeholder="Tipo documento" />
//                             </SelectTrigger>
//                             <SelectContent>
//                                 <SelectItem value="CC">Cédula de Ciudadanía</SelectItem>
//                                 <SelectItem value="CE">Cédula de Extranjería</SelectItem>
//                                 <SelectItem value="NIT">NIT</SelectItem>
//                             </SelectContent>
//                         </Select>
//
//                         <Input
//                             required
//                             value={formData.documentNumber}
//                             onChange={handleChange('documentNumber')}
//                             placeholder="Número de documento"
//                         />
//                     </div>
//
//                     <div className="space-y-1">
//                         <div className="relative">
//                             <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//                             <Input
//                                 required
//                                 type="email"
//                                 value={formData.email}
//                                 onChange={handleChange('email')}
//                                 placeholder="Correo electrónico"
//                                 className="pl-10"
//                             />
//                         </div>
//                     </div>
//
//                     <div className="space-y-1">
//                         <div className="relative">
//                             <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//                             <Input
//                                 required
//                                 type="tel"
//                                 value={formData.phone}
//                                 onChange={handleChange('phone')}
//                                 placeholder="Teléfono"
//                                 className="pl-10"
//                             />
//                         </div>
//                     </div>
//
//                     <div className="space-y-1">
//                         <div className="relative">
//                             <Landmark className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//                             <Select
//                                 value={formData.bankCode}
//                                 onValueChange={handleSelectChange('bankCode')}
//                             >
//                                 <SelectTrigger className="pl-10">
//                                     <SelectValue placeholder="Seleccione su banco" />
//                                 </SelectTrigger>
//                                 <SelectContent>
//                                     {BanksMockData.map(bank => (
//                                         <SelectItem
//                                             key={bank.code}
//                                             value={bank.code}
//                                         >
//                                             {bank.name}
//                                         </SelectItem>
//                                     ))}
//                                 </SelectContent>
//                             </Select>
//                         </div>
//                     </div>
//
//                     <Button
//                         type="submit"
//                         disabled={isLoading}
//                         className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
//                     >
//                         {isLoading ? (
//                             <>
//                                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                                 Procesando...
//                             </>
//                         ) : (
//                             'Continuar al pago'
//                         )}
//                     </Button>
//                 </form>
//             </CardContent>
//         </Card>
//     );
// };
