import { FieldValue } from 'firebase/firestore';

export interface Item {
    id: string;
    name: string;
    price: number;
    description: string;
    imgURL: string;
    imgId: string;
    title: string;
    category: string;
}

export interface Category {
    slug: string;
    imgURL: string;
}

export interface CartItem extends Item {
    quantity: number;
}

export interface AdminItem extends Item {
    docId: string;
    category: string;
}

export interface OrderItem {
    id: string;
    quantity: number;
    name: string;
    price: number;
}
export interface Order {
    name: string;
    email: string;
    address: string;
    zipCode: string;
    status: string;
    created_at: FieldValue;
    updated_at: FieldValue;
    estimated_delivery: number;
    item: OrderItem[];
    totalPrice: number;
}
