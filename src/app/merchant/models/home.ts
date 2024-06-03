export interface Post {
    postId: number;
    username: string;
    content: string;
    postedAt: any;
}

export interface Category{
    categoryId: number;
    name: string;
    imageUrl: string;
}

export interface Product {
    id: number;
    productName: string;
    price: number;
    description: string;
    category: Category;
    user: any;
    stockQuantity: number;
    brand: string;
    availableSizes: string[];
    availableColors: string[];
    sizesJson: string;
    colorsJson: string;
    userName: string;
  }

export interface CartItem {
    productId: number;
    selectedColors: string[];
    selectedSizes: string[];
    quantity: number;
}