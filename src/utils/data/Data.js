const Category = require("../../models/category.model");
const Product = require("../../models/product.model");
const ProductCart = require("../../models/productCart.model");
const ProductImg = require("../../models/productImg.model");
const Purchase = require("../../models/purchase.model");
const Rating = require("../../models/rating.model");
const User = require("../../models/user.model");
const { encryptedPassword } = require("../bcrypt");

const products = [
  {
    title: "Smartphone iphone 15",
    description:
      "The latest model smartphone featuring a high-resolution display, advanced camera system, and long-lasting battery life. Perfect for staying connected and capturing every moment.",
    price: 699.99,
    brand: "Apple",
    availableQuantity: 50,
    sales: 5,
    categoryId: 1,
    userId: 2,
  },
  {
    title: "Laptop Hp 14 245 G8, Ryzen 5 5500u, 8gb-256gb Ssd, Negra",
    description:
      "A high-performance laptop designed for both gaming and professional work. Equipped with a powerful processor, ample storage, and a sleek design.",
    price: 1299.99,
    brand: "lenovo",
    availableQuantity: 30,
    sales: 2,
    categoryId: 1,
    userId: 2,
  },
  {
    title: "NIKE Interact Run Womens Road Running Shoes",
    description:
      "Comfortable and durable running shoes that provide excellent support and cushioning. Ideal for runners of all levels, from beginners to seasoned athletes.",
    price: 89.99,
    brand: "Nike",
    availableQuantity: 100,
    sales: 10,
    categoryId: 4,
    userId: 2,
  },
  {
    title: "Dries Van Noten HEER 9600 T-SHIRT, Black",
    description:
      "A stylish cotton t-shirt with a unique design. Soft and breathable, making it perfect for everyday wear or casual outings.",
    price: 19.99,
    brand: "FashionWear",
    availableQuantity: 200,
    sales: 20,
    categoryId: 2,
    userId: 1,
  },
  {
    title: "Blender ESSENTIELB EBM11",
    description:
      "A high-speed blender that effortlessly blends smoothies, shakes, and more. Features multiple speed settings and a durable design.",
    price: 49.99,
    brand: "HomeAppliance",
    availableQuantity: 75,
    sales: 7,
    categoryId: 3,
    userId: 1,
  },
  {
    title: "PONDS Face Cream - 14.1 oz",
    description:
      "A moisturizing face cream that hydrates and nourishes your skin. Suitable for daily use and all skin types, leaving your skin feeling soft and smooth.",
    price: 24.99,
    brand: "POND'S",
    availableQuantity: 150,
    sales: 50,
    categoryId: 5,
    userId: 3,
  },
  {
    title: "Toynami Naruto Shippuden 10cm Poseable Action Figure Series 1",
    description:
      "A collectible action figure from a popular series. Highly detailed and perfect for fans and collectors alike.",
    price: 29.99,
    brand: "ToyWorld",
    availableQuantity: 80,
    sales: 40,
    categoryId: 6,
    userId: 3,
  },
  {
    title: "The Complete Novel of Sherlock Holmes",
    description:
      "A bestselling novel by a renowned author. Engaging and thought-provoking, this book is a must-read for literature enthusiasts.",
    price: 14.99,
    brand: "BookHouse",
    availableQuantity: 120,
    sales: 93,
    categoryId: 7,
    userId: 3,
  },
  {
    title: "Organic Snacks",
    description:
      "Healthy and tasty organic snacks made from natural ingredients. Perfect for a quick and nutritious snack on the go.",
    price: 9.99,
    brand: "HealthyBites",
    availableQuantity: 200,
    sales: 12,
    categoryId: 8,
    userId: 4,
  },
  {
    title: "Xiaomi Smartwatch Redmi Watch 3 Black",
    description:
      "A feature-rich smartwatch with fitness tracking, notifications, and more. Stay connected and monitor your health with ease.",
    price: 199.99,
    brand: "Xiaomi",
    availableQuantity: 60,
    categoryId: 1,
    userId: 4,
  },
  {
    title: "Baggy Wide Leg Jeans - Blue | Levi's",
    description:
      "Stylish and comfortable jeans that are perfect for any occasion. Made from high-quality materials for durability and comfort.",
    price: 49.99,
    brand: "Levi's",
    availableQuantity: 150,
    categoryId: 2,
    userId: 5,
  },
  {
    title: "Ultenic Cordless Wet Dry Vacuum Cleaner",
    description:
      "A powerful vacuum cleaner designed for home use. Features strong suction and multiple attachments for thorough cleaning.",
    price: 149.99,
    brand: "HomeAppliance",
    availableQuantity: 40,
    categoryId: 3,
    userId: 5,
  },
  {
    title: "Yoga Mat",
    description:
      "A non-slip yoga mat that provides excellent grip and cushioning. Ideal for all types of exercises and yoga practices.",
    price: 29.99,
    brand: "Sporty",
    availableQuantity: 100,
    categoryId: 4,
    userId: 6,
  },
  {
    title: "Bluemega lipstick set 12 Pcs Lipstick Sets",
    description:
      "Long-lasting lipstick available in various shades. Provides rich color and a smooth finish for a perfect look.",
    price: 12.99,
    brand: "BeautyCare",
    availableQuantity: 200,
    categoryId: 5,
    userId: 6,
  },
  {
    title: "Educa Around the World Puzzle Collection 42000pcs",
    description:
      "A challenging puzzle that is fun for all ages. Helps improve problem-solving skills and provides hours of entertainment.",
    price: 19.99,
    brand: "Educa",
    availableQuantity: 90,
    categoryId: 6,
    userId: 6,
  },
  {
    title: "15-Year Anniversary Cookbook",
    description:
      "A recipe book filled with delicious and easy-to-follow recipes. Perfect for home cooks looking to try new dishes.",
    price: 19.99,
    brand: "The Cookware",
    availableQuantity: 100,
    categoryId: 7,
    userId: 6,
  },
  {
    title: "Almond Sweet & Salty Granola Bars 15ct",
    description:
      "Nutritious granola bars made from wholesome ingredients. A great snack option for a quick energy boost.",
    price: 6.99,
    brand: "Nature Valley",
    availableQuantity: 250,
    sales: 34,
    categoryId: 8,
    userId: 6,
  },
  {
    title: "Tablet Lenovo Tab M10 3rd Gen",
    description:
      "A portable tablet with a high-resolution display and powerful performance. Ideal for entertainment, work, and more.",
    price: 299.99,
    brand: "lenovo",
    availableQuantity: 50,
    sales: 1,
    categoryId: 1,
    userId: 6,
  },
  {
    title: "TACVASEN Black Jacket for Men Zip Up Men's",
    description:
      "A warm and stylish jacket perfect for winter. Made from high-quality materials to keep you comfortable and cozy.",
    price: 79.99,
    brand: "TACVASEN",
    availableQuantity: 100,
    sales: 50,
    categoryId: 2,
    userId: 6,
  },
  {
    title: "Famiworths - Cafetera de una sola porción para taza K",
    description:
      "An automatic coffee maker with a timer. Brew delicious coffee effortlessly with this easy-to-use machine.",
    price: 59.99,
    brand: "Famiworths",
    availableQuantity: 70,
    sales: 40,
    categoryId: 3,
    userId: 6,
  },
  {
    title: "RitFit Rubber Hex Dumbbells Set 10-60 lbs Hex Weights",
    description:
      "A set of adjustable dumbbells for effective workouts. Perfect for strength training and fitness routines.",
    price: 49.99,
    brand: "RitFit",
    availableQuantity: 80,
    sales: 59,
    categoryId: 4,
    userId: 6,
  },
  {
    title: "Shampoo Head & Shoulders",
    description:
      "Nourishing shampoo suitable for all hair types. Leaves your hair feeling clean, soft, and healthy.",
    price: 8.99,
    brand: "Head & Shoulders",
    availableQuantity: 150,
    sales: 76,
    categoryId: 5,
    userId: 5,
  },
  {
    title:
      'Gamie Magnetic Board Game Set Includes 12 Retro Fun Games - 5" Compact Design',
    description:
      "A fun and engaging board game for families and friends. Provides hours of entertainment and helps build strategic thinking.",
    price: 29.99,
    brand: "ToyWorld",
    availableQuantity: 60,
    sales: 17,
    categoryId: 6,
    userId: 4,
  },
  {
    title: "The Science Book",
    description:
      "An informative science book that explores fascinating topics. Perfect for curious minds and science enthusiasts.",
    price: 24.99,
    brand: "BookHouse",
    availableQuantity: 90,
    sales: 42,
    categoryId: 7,
    userId: 4,
  },
  {
    title: "Honest Kids Super Fruit Punch Organic Juice Drinks",
    description:
      "Refreshing organic juice available in various flavors. Made from natural ingredients for a healthy drink option.",
    price: 4.99,
    brand: "HealthyBites",
    availableQuantity: 300,
    sales: 53,
    categoryId: 8,
    userId: 4,
  },
];

const categories = [
  { name: "Electronics" },
  { name: "Clothing" },
  { name: "Home" },
  { name: "Sports" },
  { name: "Beauty" },
  { name: "Toys" },
  { name: "Books" },
  { name: "Food" },
];

const productsImgs = [
  {
    productImgUrl:
      "https://firebasestorage.googleapis.com/v0/b/eccomerce-63ecc.appspot.com/o/products%2F1%2Fiphone%2015%202.jpg?alt=media&token=dcc241b7-46b8-4e3a-9a6f-6d8ec83affd2",
    productId: 1,
  },
  {
    productImgUrl:
      "https://firebasestorage.googleapis.com/v0/b/eccomerce-63ecc.appspot.com/o/products%2F1%2Fiphone%2015.jpg?alt=media&token=f2d3f0c2-50f1-4d8a-981f-318224d39ac7",
    productId: 1,
  },
  {
    productImgUrl:
      "https://firebasestorage.googleapis.com/v0/b/eccomerce-63ecc.appspot.com/o/products%2F1%2Fiphone%2015.webp?alt=media&token=d0e1c570-01eb-4755-8918-beafe7736c36",
    productId: 1,
  },
  {
    productImgUrl:
      "https://firebasestorage.googleapis.com/v0/b/eccomerce-63ecc.appspot.com/o/products%2F2%2Flaptop%20hp.webp?alt=media&token=5e710ec5-aa7f-41d2-b72d-3338bd23e636",
    productId: 2,
  },
  {
    productImgUrl:
      "https://firebasestorage.googleapis.com/v0/b/eccomerce-63ecc.appspot.com/o/products%2F2%2Flaptophp.webp?alt=media&token=5c611b20-3549-4644-a1cd-abb8d5df8659",
    productId: 2,
  },
  {
    productImgUrl:
      "https://firebasestorage.googleapis.com/v0/b/eccomerce-63ecc.appspot.com/o/products%2F3%2Fnike.jpg?alt=media&token=f2a8e4b1-b80f-4eb8-a08b-c530fbac6672",
    productId: 3,
  },
  {
    productImgUrl:
      "https://firebasestorage.googleapis.com/v0/b/eccomerce-63ecc.appspot.com/o/products%2F3%2Fnike2.webp?alt=media&token=694bb5e3-b9e2-4da8-b709-331d4e8e1739",
    productId: 3,
  },
  {
    productImgUrl:
      "https://firebasestorage.googleapis.com/v0/b/eccomerce-63ecc.appspot.com/o/products%2F3%2Fnike3.jpg?alt=media&token=0d80a750-45ef-4041-87ab-45ba936e4f06",
    productId: 3,
  },
  {
    productImgUrl:
      "https://firebasestorage.googleapis.com/v0/b/eccomerce-63ecc.appspot.com/o/products%2F4%2Ft-shirt.jpg?alt=media&token=771f22b2-c08e-4fec-98c0-0151a150122d",
    productId: 4,
  },
  {
    productImgUrl:
      "https://firebasestorage.googleapis.com/v0/b/eccomerce-63ecc.appspot.com/o/products%2F4%2Ft-shirt2.jpg?alt=media&token=69b43ff4-ab84-4fb8-b1f9-98529d49c323",
    productId: 4,
  },
  {
    productImgUrl:
      "https://firebasestorage.googleapis.com/v0/b/eccomerce-63ecc.appspot.com/o/products%2F4%2Ft-shirt3.jpg?alt=media&token=756e84f3-f2bb-49d5-964b-8aafbfd0d1d5",
    productId: 4,
  },
  {
    productImgUrl:
      "https://firebasestorage.googleapis.com/v0/b/eccomerce-63ecc.appspot.com/o/products%2F5%2FBlender.jpg?alt=media&token=a57362f5-9221-4f76-9e55-e3e34845c152",
    productId: 5,
  },
  {
    productImgUrl:
      "https://firebasestorage.googleapis.com/v0/b/eccomerce-63ecc.appspot.com/o/products%2F5%2FBlender2.jgp.jpg?alt=media&token=eb8586cb-1c54-4947-8a30-9f25448d8ec9",
    productId: 5,
  },
  {
    productImgUrl:
      "https://firebasestorage.googleapis.com/v0/b/eccomerce-63ecc.appspot.com/o/products%2F6%2Fponds.webp?alt=media&token=5a8dee38-4dd3-4563-b831-2dafebe0845a",
    productId: 6,
  },
  {
    productImgUrl:
      "https://firebasestorage.googleapis.com/v0/b/eccomerce-63ecc.appspot.com/o/products%2F7%2Fnaruto.jpg?alt=media&token=82b4061d-92e7-429c-a4b8-9dbb963950a4",
    productId: 7,
  },
  {
    productImgUrl:
      "https://firebasestorage.googleapis.com/v0/b/eccomerce-63ecc.appspot.com/o/products%2F7%2Fnaruto2.jpg?alt=media&token=99156ee7-2213-4dab-bad6-61fa6a0244ee",
    productId: 7,
  },
  {
    productImgUrl:
      "https://firebasestorage.googleapis.com/v0/b/eccomerce-63ecc.appspot.com/o/products%2F7%2Fnaruto3.jgp.jpg?alt=media&token=54070599-ee38-4293-aa61-574dbbb25bb3",
    productId: 7,
  },
  {
    productImgUrl:
      "https://firebasestorage.googleapis.com/v0/b/eccomerce-63ecc.appspot.com/o/products%2F7%2Fnaruto4.jpg?alt=media&token=911a906e-ffdc-47e2-b820-70ac9cc7b1d1",
    productId: 7,
  },
  {
    productImgUrl:
      "https://firebasestorage.googleapis.com/v0/b/eccomerce-63ecc.appspot.com/o/products%2F8%2Fnovel.webp?alt=media&token=f3060fdf-ee8a-415f-a15f-47f1caed2e97",
    productId: 8,
  },
  {
    productImgUrl:
      "https://firebasestorage.googleapis.com/v0/b/eccomerce-63ecc.appspot.com/o/products%2F10%2Fsmart2.webp?alt=media&token=b1b0c2de-a900-45d2-9229-c55212dc9d5f",
    productId: 10,
  },
  {
    productImgUrl:
      "https://firebasestorage.googleapis.com/v0/b/eccomerce-63ecc.appspot.com/o/products%2F10%2Fsmartw.jpg?alt=media&token=82cb671c-1864-46d8-9be6-b0a22fd63764",
    productId: 10,
  },
  {
    productImgUrl:
      "https://firebasestorage.googleapis.com/v0/b/eccomerce-63ecc.appspot.com/o/products%2F10%2Fsmart3.png?alt=media&token=51235411-d6c1-44f3-959a-84757b4263e6",
    productId: 10,
  },
  {
    productImgUrl:
      "https://firebasestorage.googleapis.com/v0/b/eccomerce-63ecc.appspot.com/o/products%2F11%2Flevi's.jpg?alt=media&token=f0cb9d63-9902-4f87-bc30-587f5ad13e0c",
    productId: 11,
  },
  {
    productImgUrl:
      "https://firebasestorage.googleapis.com/v0/b/eccomerce-63ecc.appspot.com/o/products%2F12%2Fcleaner.jpg?alt=media&token=d55bc8f0-e735-49fe-bc34-85186daa88c5",
    productId: 12,
  },
  {
    productImgUrl:
      "https://firebasestorage.googleapis.com/v0/b/eccomerce-63ecc.appspot.com/o/products%2F12%2Fcleaner2.webp?alt=media&token=2f3d3230-466c-4f05-b03f-9b90f07d5551",
    productId: 12,
  },
  {
    productImgUrl:
      "https://firebasestorage.googleapis.com/v0/b/eccomerce-63ecc.appspot.com/o/products%2F13%2FYoga-Mat.jpg?alt=media&token=0f318408-23bb-4267-b7f8-91738f61a2ea",
    productId: 13,
  },
  {
    productImgUrl:
      "https://firebasestorage.googleapis.com/v0/b/eccomerce-63ecc.appspot.com/o/products%2F13%2Fmath.jpg?alt=media&token=9a56335a-fa1c-4e3b-b85c-86ffe7dba63f",
    productId: 13,
  },
  {
    productImgUrl:
      "https://firebasestorage.googleapis.com/v0/b/eccomerce-63ecc.appspot.com/o/products%2F14%2Flavial.jpg?alt=media&token=c04f343f-3776-42d0-a6b9-4071a2e342df",
    productId: 14,
  },
  {
    productImgUrl:
      "https://firebasestorage.googleapis.com/v0/b/eccomerce-63ecc.appspot.com/o/products%2F15%2Fpuzle.jpg?alt=media&token=d3a83114-fe4e-4980-8ab8-4868589991d6",
    productId: 15,
  },
  {
    productImgUrl:
      "https://firebasestorage.googleapis.com/v0/b/eccomerce-63ecc.appspot.com/o/products%2F15%2Fpuzle2.jpg?alt=media&token=92e32962-ff11-4e60-8ff0-4fd1b9ed32c2",
    productId: 15,
  },
  {
    productImgUrl:
      "https://firebasestorage.googleapis.com/v0/b/eccomerce-63ecc.appspot.com/o/products%2F15%2Fpuzle3.jpg?alt=media&token=a0013ad8-d021-49fa-a04a-e978e20e917b",
    productId: 15,
  },
  {
    productImgUrl:
      "https://firebasestorage.googleapis.com/v0/b/eccomerce-63ecc.appspot.com/o/products%2F16%2Fbookcook.webp?alt=media&token=9b5889a5-365c-426d-a184-d8639b3cf970",
    productId: 16,
  },
  {
    productImgUrl:
      "https://firebasestorage.googleapis.com/v0/b/eccomerce-63ecc.appspot.com/o/products%2F17%2Fgranolabars.webp?alt=media&token=6494c1b6-3c19-4ba0-9de6-7ce963a3017d",
    productId: 17,
  },
  {
    productImgUrl:
      "https://firebasestorage.googleapis.com/v0/b/eccomerce-63ecc.appspot.com/o/products%2F17%2Fgranolabars2.webp?alt=media&token=1bf6ed5a-fe42-4ecf-83a7-f02fbe9ec702",
    productId: 17,
  },
  {
    productImgUrl:
      "https://firebasestorage.googleapis.com/v0/b/eccomerce-63ecc.appspot.com/o/products%2F18%2Flenovo3s.jpg?alt=media&token=f819ff48-6dcb-43a0-9be2-286ec5b2c06b",
    productId: 18,
  },
  {
    productImgUrl:
      "https://firebasestorage.googleapis.com/v0/b/eccomerce-63ecc.appspot.com/o/products%2F18%2Ftable1.webp?alt=media&token=9ac4163a-046b-4889-9d9f-7ec04932a959",
    productId: 18,
  },
  {
    productImgUrl:
      "https://firebasestorage.googleapis.com/v0/b/eccomerce-63ecc.appspot.com/o/products%2F18%2Ftable2.webp?alt=media&token=728d11c7-bd86-455e-8fa2-a74d74ca1fff",
    productId: 18,
  },
  {
    productImgUrl:
      "https://firebasestorage.googleapis.com/v0/b/eccomerce-63ecc.appspot.com/o/products%2F19%2Fjaket.jpg?alt=media&token=ff7603bf-53a7-4c2b-8387-07f38f5725c0",
    productId: 19,
  },
  {
    productImgUrl:
      "https://firebasestorage.googleapis.com/v0/b/eccomerce-63ecc.appspot.com/o/products%2F20%2Fcoffemaker.jpg?alt=media&token=56b06d72-d460-406b-9075-d6237e9efa61",
    productId: 20,
  },
  {
    productImgUrl:
      "https://firebasestorage.googleapis.com/v0/b/eccomerce-63ecc.appspot.com/o/products%2F20%2Fcoffemaker2.webp?alt=media&token=a4ae4109-29ad-4a89-875e-c877bfebff5d",
    productId: 20,
  },
  {
    productImgUrl:
      "https://firebasestorage.googleapis.com/v0/b/eccomerce-63ecc.appspot.com/o/products%2F20%2Fcoffemaker3.jpg?alt=media&token=40461996-04e5-4336-8675-685f6a19ee82",
    productId: 20,
  },
  {
    productImgUrl:
      "https://firebasestorage.googleapis.com/v0/b/eccomerce-63ecc.appspot.com/o/products%2F20%2Fcoffemaker4.jpg?alt=media&token=9008d90f-5e9d-4343-b3f0-ea4fed820182",
    productId: 20,
  },
  {
    productImgUrl:
      "https://firebasestorage.googleapis.com/v0/b/eccomerce-63ecc.appspot.com/o/products%2F21%2Fpesa.webp?alt=media&token=8b09c04a-9fbf-4c42-a1a1-1813a5cbb549",
    productId: 21,
  },
  {
    productImgUrl:
      "https://firebasestorage.googleapis.com/v0/b/eccomerce-63ecc.appspot.com/o/products%2F22%2Fshampoo.webp?alt=media&token=9caa2b78-468e-4b9d-a115-38ec8005e56a",
    productId: 22,
  },
  {
    productImgUrl:
      "https://firebasestorage.googleapis.com/v0/b/eccomerce-63ecc.appspot.com/o/products%2F23%2Fboard.jpg?alt=media&token=d2297cc6-2b0f-4683-b504-b4b8c2766fa1",
    productId: 23,
  },
  {
    productImgUrl:
      "https://firebasestorage.googleapis.com/v0/b/eccomerce-63ecc.appspot.com/o/products%2F24%2Fbook.jpg?alt=media&token=eed4c9fe-e54b-4a78-93df-63f25821da74",
    productId: 24,
  },
  {
    productImgUrl:
      "https://firebasestorage.googleapis.com/v0/b/eccomerce-63ecc.appspot.com/o/products%2F25%2F0065762201184.jpg?alt=media&token=1dc5a1ba-2d36-4eaa-a0de-a7cb7c60797f",
    productId: 25,
  },
  {
    productImgUrl:
      "https://firebasestorage.googleapis.com/v0/b/eccomerce-63ecc.appspot.com/o/products%2F25%2F21109330_front_a01_%402.png?alt=media&token=6e1721ef-844c-4ea1-8782-3632022ccf88",
    productId: 25,
  },
  {
    productImgUrl:
      "https://firebasestorage.googleapis.com/v0/b/eccomerce-63ecc.appspot.com/o/products%2F25%2F79CTG.webp?alt=media&token=cdf2e72f-8398-43b0-b7e5-7f439a445e74",
    productId: 25,
  },
];

const productsCart = [
  { quantity: 5, productId: 1, userId: 7 },
  { quantity: 1, productId: 2, userId: 7 },
  { quantity: 2, productId: 3, userId: 7 },
  { quantity: 24, productId: 4, userId: 7 },
  { quantity: 7, productId: 5, userId: 7 },
  { quantity: 27, productId: 6, userId: 7 },
  { quantity: 17, productId: 8, userId: 7 },
];

const purchases = [
  { quantity: 1, price: 200, productId: 1, userId: 1 },
  { quantity: 6, price: 200, productId: 2, userId: 1 },
  { quantity: 6, price: 200, productId: 3, userId: 2 },
  { quantity: 6, price: 200, productId: 4, userId: 2 },
  { quantity: 6, price: 200, productId: 5, userId: 2 },
  { quantity: 6, price: 200, productId: 6, userId: 3 },
  { quantity: 6, price: 200, productId: 7, userId: 3 },
  { quantity: 6, price: 200, productId: 8, userId: 3 },
  { quantity: 6, price: 200, productId: 9, userId: 4 },
  { quantity: 6, price: 200, productId: 5, userId: 5 },
  { quantity: 6, price: 200, productId: 7, userId: 5 },
  { quantity: 6, price: 200, productId: 1, userId: 5 },
  { quantity: 6, price: 200, productId: 1, userId: 5 },
  { quantity: 6, price: 200, productId: 20, userId: 7 },
  { quantity: 6, price: 200, productId: 1, userId: 7 },
  { quantity: 6, price: 200, productId: 25, userId: 7 },
  { quantity: 6, price: 200, productId: 25, userId: 7 },
  { quantity: 6, price: 200, productId: 25, userId: 2 },
  { quantity: 6, price: 200, productId: 2, userId: 2 },
];

const ratings = [
  {
    rating: 5,
    comment: "Absolutely love this product! Exceeded my expectations.",
    purchaseId: 1,
    productId: 1,
    userId: 1,
  },
  {
    rating: 2,
    comment: "Not what I expected. Quality could be better.",
    purchaseId: 2,
    productId: 2,
    userId: 1,
  },
  {
    rating: 4,
    comment: "Good value for the price. Would recommend.",
    purchaseId: 3,
    productId: 3,
    userId: 2,
  },
  {
    rating: 3,
    comment: "It’s okay, but I’ve seen better.",
    purchaseId: 4,
    productId: 4,
    userId: 2,
  },
  {
    rating: 5,
    comment: "Fantastic! Will definitely buy again.",
    purchaseId: 5,
    productId: 5,
    userId: 2,
  },
  {
    rating: 5,
    comment: "Fantastic! Will definitely buy again.",
    purchaseId: 6,
    productId: 6,
    userId: 3,
  },
  {
    rating: 1,
    comment: "Very disappointed. Would not recommend.",
    purchaseId: 7,
    productId: 7,
    userId: 3,
  },
  {
    rating: 4,
    comment: "Pretty good, but there’s room for improvement.",
    purchaseId: 8,
    productId: 8,
    userId: 3,
  },
  {
    rating: 5,
    comment: "Excellent quality and fast shipping!",
    purchaseId: 9,
    productId: 9,
    userId: 4,
  },
  {
    rating: 3,
    comment: "Average product. Nothing special.",
    purchaseId: 11,
    productId: 7,
    userId: 5,
  },
  {
    rating: 2,
    comment: "Not worth the money. Poor quality.",
    purchaseId: 12,
    productId: 1,
    userId: 5,
  },
  {
    rating: 2,
    comment: "Not worth the money. Poor quality.",
    purchaseId: 13,
    productId: 1,
    userId: 5,
  },
  {
    rating: 4,
    comment: "Satisfied with my purchase. Works as described.",
    purchaseId: 14,
    productId: 20,
    userId: 7,
  },
  {
    rating: 5,
    comment: "Amazing product! Highly recommend.",
    purchaseId: 15,
    productId: 1,
    userId: 7,
  },
  {
    rating: 3,
    comment: "It’s decent, but I’ve had better.",
    purchaseId: 16,
    productId: 25,
    userId: 7,
  },
  {
    rating: 3,
    comment: "It’s decent, but I’ve had better.",
    purchaseId: 17,
    productId: 25,
    userId: 7,
  },
  {
    rating: 5,
    comment: "Top-notch! Will purchase again.",
    purchaseId: 18,
    productId: 25,
    userId: 2,
  },
  {
    rating: 5,
    comment: "Top-notch! Will purchase again.",
    purchaseId: 19,
    productId: 2,
    userId: 2,
  },
  {
    rating: 5,
    comment: "Top-notch! Will purchase again.",
    purchaseId: 19,
    productId: 2,
    userId: 2,
  },
  {
    rating: 5,
    comment: "Top-notch! Will purchase again.",
    purchaseId: 19,
    productId: 2,
    userId: 2,
  },
  {
    rating: 5,
    comment: "Top-notch! Will purchase again.",
    purchaseId: 19,
    productId: 2,
    userId: 2,
  },
  {
    rating: 3,
    comment: "Top-notch! Will purchase again.",
    purchaseId: 19,
    productId: 2,
    userId: 2,
  },
];

const generateData = async () => {
  const users = [
    {
      firstName: "pedro",
      lastName: "fernandez",
      phone: "+525533525112",
      email: "pedrofernandez@mail.com",
      password: await encryptedPassword("pedro1234"),
      profileImgUrl:
        "https://firebasestorage.googleapis.com/v0/b/eccomerce-63ecc.appspot.com/o/users%2F1%2F72.jpg?alt=media&token=00ba4363-d9af-4832-8b30-72198b931ef4",
    },
    {
      firstName: "pepe",
      lastName: "cerrano",
      phone: "+525536432200",
      email: "pepecerrano@gmail.com",
      password: await encryptedPassword("pepe1234"),
      profileImgUrl:
        "https://firebasestorage.googleapis.com/v0/b/eccomerce-63ecc.appspot.com/o/users%2F2%2F85.jpg?alt=media&token=3e6d348d-b364-4682-a31a-6e77aa275351",
    },
    {
      firstName: "javier",
      lastName: "corral",
      phone: "+525866432223",
      email: "javier@gmail.com",
      password: await encryptedPassword("javier1234"),
      profileImgUrl:
        "https://firebasestorage.googleapis.com/v0/b/eccomerce-63ecc.appspot.com/o/users%2F3%2F91.jpg?alt=media&token=136e8f80-25e0-4cb8-90cf-a576c749ffce",
    },
    {
      firstName: "libia",
      lastName: "corral",
      phone: "+525866432266",
      email: "libia@gmail.com",
      password: await encryptedPassword("libia1234"),
      profileImgUrl:
        "https://firebasestorage.googleapis.com/v0/b/eccomerce-63ecc.appspot.com/o/users%2F4%2F33.jpg?alt=media&token=ddb01c41-cd9a-4327-8ab7-5624be1bddce",
    },
    {
      firstName: "martin",
      lastName: "lopez",
      phone: "+52580032266",
      email: "martin@gmail.com",
      password: await encryptedPassword("martin1234"),
      profileImgUrl:
        "https://firebasestorage.googleapis.com/v0/b/eccomerce-63ecc.appspot.com/o/users%2F5%2F26.jpg?alt=media&token=b2e3d49d-262e-44f2-9912-56c9dad3b743",
    },
    {
      firstName: "german",
      lastName: "martinez",
      phone: "+525809486196",
      email: "german@gmail.com",
      password: await encryptedPassword("german1234"),
      profileImgUrl:
        "https://firebasestorage.googleapis.com/v0/b/eccomerce-63ecc.appspot.com/o/users%2F6%2F6.jpg?alt=media&token=0c2e151f-1003-4426-a06a-3d61300be15f",
    },
    {
      firstName: "richard",
      lastName: "cruz",
      phone: "+520009486622",
      email: "richard@gmail.com",
      password: await encryptedPassword("richard1234"),
      profileImgUrl:
        "https://firebasestorage.googleapis.com/v0/b/eccomerce-63ecc.appspot.com/o/users%2F7%2F65.jpg?alt=media&token=cc34bd96-8217-477c-8e9b-544ab6c0b804",
      role: "admin",
    },
  ];

  await Category.bulkCreate(categories);
  await User.bulkCreate(users);
  await Product.bulkCreate(products);
  await ProductCart.bulkCreate(productsCart);
  await Purchase.bulkCreate(purchases);
  await Rating.bulkCreate(ratings);
  return await ProductImg.bulkCreate(productsImgs);
};

module.exports = generateData;
