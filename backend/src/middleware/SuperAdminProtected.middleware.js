import jwt from "jsonwebtoken"
export const SuperAdminProtected = async(req, res, next)=>{
    try {
        console.log('Loggin in')
        const token = req.headers.authorization.split(' ')[1]
        console.log(token)
        const decoded = await jwt.decode(token, process.env)
        next()
    } catch (error) {
        
    }
}