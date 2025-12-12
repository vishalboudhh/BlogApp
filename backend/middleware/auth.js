import jwt  from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if(!token){
            return res.status(401).json({
                message:"User is not authenticated.",
                success:false
            })
        }

        const decode = await jwt.verify(token,process.env.TOKENSECRET);
        req.user = decode.userId;
        next();
        
    } catch (error) {
        next(error);
    }
};

export default isAuthenticated;