export interface Vehicle {
    year: number;
    make: string;
    model: string;
    fullName: string;
}

export interface Product {
    id: number;
    name: string;
    description: string;
    imageUrl?: string;
    supportedVehicles: Vehicle[];
    serviceTypes: string[];
}