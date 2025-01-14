// types/commonTypes.ts
import React from "react";

export interface NavItem {
    title: string;
    href: string;
    icon?: React.ComponentType<{ className?: string }>;
    description?: string;
}