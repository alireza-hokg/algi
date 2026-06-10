import express from "express";

import UserRepo from "../repository/users.js";
import UserService from "../services/users.js";
import UserController from "../controllers/users.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";

/**
 * =================================
 * User module dependencies
 * =================================
 * 
 * Repository layer: Handles database operations
 * Service layer: Contains business logic
 * Controller Layer: Handles HTTP requests/response
 * 
 * Injection order: 
 * 1. UserRepo (data access)
 * 2. UserService (business logic) <- depends on user repo
 * 3. UserController (HTTP layer) <- depends on user service
 */

// Initialize repository (data layer)
const userRepo = new UserRepo();
// Initialize service with repository injected
const userService = new UserService(userRepo);
// Initialize controller with service injected
const userController = new UserController(userService);

const router = express.Router();

/**
 * @route GET /auth/users
 * @purpose Get all the users
 * Authentication required: Yes
 * Authorization: Admin
 * @response {200} - List of all the user
 * @throws {401} - Token is not valid
 * @throws {403} - Access deny just admin have access
 * @throws {500} - Server error
 * @emaple GET /api/v1/auth/users
 */

router.get("/auth/users", userController.getAllUsers.bind(userController));
/**
 * @route POST /auth/login
 * @purpose Get a user by phoneNumber and password
 * @response {200} - User authorized successfully.
 * @throws {400} - PhoneNumber and password is required
 * @throws {401} - PhoneNumber or password is wrong
 * @throws {500} - Server error
 */
router.post("/auth/login", userController.login.bind(userController));

/**
 * @route POST /auth/register
 * @purpose Create a user
 * @body {string} phoneNumber - شماره تلفن کاربر
 * @body {string} password - رمز عبور کاربر
 * @body {string} role - نقش کاربر
 * @response {201} - User registered successfully
 * @throws {400} - PhoneNumber and password is required
 * @throws {409} - PhoneNumber already exists
 * @throws {500} - Server error
 */
router.post("/auth/register", userController.register.bind(userController));

router.post("/auth/logout", userController.logout.bind(userController));

/**
 * @route GET /auth/me
 * @purpose ایا کاربر token معتبر دارد
 * @response {200} - token معتبر است
 * @throws {401} - unAuthorized
 * @throws {404} - Not found user
 * @throw {500} - Server error
 */
router.get("/auth/me", authenticateToken, userController.isLoggedIn.bind(userController))

export default router;