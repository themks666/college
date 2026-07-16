import express from "express";
import { superAdminLogin, superAdminProfile, superAdminRegister, updateSuperAdminProfile } from "../controllers/superAdmin.controller.js";
import { SuperAdminProtected } from "../middleware/SuperAdminProtected.middleware.js";
const router = express.Router()

router.post('/register', superAdminRegister)

router.post('/login', superAdminLogin)
router.get('/profile', SuperAdminProtected,superAdminProfile)
router.put('/profile/update', SuperAdminProtected,updateSuperAdminProfile)
router.post('/createInstitution')

export default router