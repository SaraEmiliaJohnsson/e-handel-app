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
