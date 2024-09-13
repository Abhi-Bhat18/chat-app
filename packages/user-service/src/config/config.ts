import dotenv from 'dotenv'
dotenv.config();

const config = { 
    port : process.env.PORT,
    apiKey : process.env.API_KEY,
    mongoDbUri : process.env.MONGO_URI,
    oAuthClientId : process.env.OAUTH_CLIENT_ID,
    oAuthClientSecret : process.env.OAUTH_CLIENT_SECRET,
    secure : process.env.NODE_ENV === 'DEV' ? false : true,
}

export default config;