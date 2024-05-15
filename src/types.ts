export interface Item {
    id: string;
    name: string;
    price: number;
    description: string;
    imgURL: string;
    imgId: string;
    title: string;
}

export interface Category {
    name: string;
    slug: string;
}

export interface CartItem extends Item {
    quantity: number;
}
