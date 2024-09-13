import { Request, Response, NextFunction} from "express";

const apiKey = 'your-secure-api-key';

const validateApiKey = ( req : Request, res : Response, next : NextFunction ) => { 
    try {
        
    const providedApiKey = req.headers['x-api-key'];

    if(providedApiKey && providedApiKey === apiKey) { 
        next();
    }
    throw new Error('Unauthorized access')
    } catch (error) {
        res.status(401).json({ success : false, message : 'Unauthorized access' })
    }
}

export default validateApiKey;