// seeders/seed-data.js
export const productsData = [
    {
        id: 1,
        name: "T-Shirt",
        price: 2999,
        description: "Comfortable cotton t-shirt"
    },
    {
        id: 2,
        name: "Jeans",
        price: 7999,
        description: "Blue denim jeans"
    },
    {
        id: 3,
        name: "Jacket",
        price: 14999,
        description: "Winter jacket"
    }
];

export const variantsData = [
    {
        product_id: 1,
        size: 42,
        color: "Red",
        quantity: 10,
        image_url: "http://example.com/tshirt-red.jpg"
    },
    {
        product_id: 1,
        size: 44,
        color: "Red",
        quantity: 15,
        image_url: "http://example.com/tshirt-red-xl.jpg"
    },
    {
        product_id: 1,
        size: 42,
        color: "Blue",
        quantity: 8,
        image_url: "http://example.com/tshirt-blue.jpg"
    },
    {
        product_id: 2,
        size: 32,
        color: "Blue",
        quantity: 20,
        image_url: "http://example.com/jeans-blue.jpg"
    },
    {
        product_id: 2,
        size: 34,
        color: "Blue",
        quantity: 25,
        image_url: "http://example.com/jeans-blue-34.jpg"
    },
    {
        product_id: 3,
        size: 44,
        color: "Black",
        quantity: 5,
        image_url: "http://example.com/jacket-black.jpg"
    }
];