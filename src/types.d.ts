/*
{
id:1,
title:'...',
price:'...',
category:'...',
description:'...',
image:'...'
},
*/ 

type Product = {
    id: number;
    title: string;
    price: string;
    category: string;
    description: string;
    image: string;
}
/*
- For javascript you would create a data model by creating a class for a data type

class Product {
    constructor(id, title, price, category, description, image) {
        this.id = id;
        this.title = title;
        this.price = price;
    }
}
*/

/*
Return for cartItem
{
    id: 1,
    quantity: 2,
    product: {
        id: 1,
        title: 'mens shirt',
        category: 'mens clothing',
        description:
    }
}
*/ 
type CartItem = {
    id: number;
    quantity: number;
    product:Product;
}



// Define a state type
type InitialStateType = {
    products: Product[];
    cart: CartItem[];
    product: Product | undefined;
    is_loading: boolean;
    getProducts: () => void;
    getSingleProduct: (productId:number) => void;
    addToCart: (product:Product) => void;
};