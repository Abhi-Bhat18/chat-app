import { Link } from "react-router-dom";

const Login = () => {
    
    return (
        <div className="w-screen h-screen flex justify-center items-center space-x-2">
            <p>This is login page</p>
            <Link
                className="text-blue-600 cursor-pointer"
                to={"http://localhost:1337/api/v1/auth/google"}
            >
                Login
            </Link>
        </div>
    )
}

export default Login