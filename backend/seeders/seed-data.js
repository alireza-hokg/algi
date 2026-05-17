// seeders/seed-data.js
export const productsData = [
    {
        id: 1,
        name: "T-Shirt",
        price: 2999,
        description: "Comfortable cotton t-shirt",
        category_id: 1,
        sku: "Q429",
        slug: "t-shirt-q429"
    },
    {
        id: 2,
        name: "Jeans",
        price: 7999,
        description: "Blue denim jeans",
        category_id: 2,
        sku: "Q429",
        slug: "Jeans-q429"
    },
    {
        id: 3,
        name: "Jacket",
        price: 14999,
        description: "Winter jacket",
        category_id: 3,
        sku: "Q429",
        slug: "jacket-q429"
    }
];

export const categoriesData = [
    {
        name: "shirt"
    },
    {
        name: "شلوار"
    },
    {
        name: "کاپشن"
    }
]

export const variantsData = [
    {
        product_id: 1,
        size: 42,
        color: "Green",
        quantity: 10,
        height: 20.5,
        width: 10,
        image_url: "http://example.com/tshirt-red.jpg"
    },
    {
        product_id: 1,
        size: 44,
        color: "Red",
        height: 20.5,
        width: 10,
        quantity: 15,
        image_url: "http://example.com/tshirt-red-xl.jpg"
    },
    {
        product_id: 1,
        size: 42,
        color: "Blue",
        quantity: 8,
        height: 20.5,
        width: 10,
        image_url: "http://example.com/tshirt-blue.jpg"
    },
    {
        product_id: 2,
        size: 32,
        color: "Blue",
        quantity: 20,
        height: 20.5,
        waist: 10,
        image_url: "http://example.com/jeans-blue.jpg"
    },
    {
        product_id: 2,
        size: 34,
        color: "Red",
        quantity: 25,
        height: 20.5,
        waist: 10,
        image_url: "http://example.com/jeans-blue-34.jpg"
    },
    {
        product_id: 3,
        size: 44,
        color: "Black",
        quantity: 5,
        height: 20.5,
        waist: 10,
        image_url: "http://example.com/jacket-black.jpg"
    }
];

export const usersData = [
    {
        phoneNumber: "09371036096",
        password: "$2b$10$kESq4QfjM4JJ1PdpT8j5juKEyAURapquE6S5ywxZPBxs3FHTV/Cii",
        role: "admin",
    }
]

export const otpsData = [
    {
        phoneNumber: "09127361268",
        code: "123456",
        expiresAt: new Date(Date.now()+1000*60*2)
    }
]

