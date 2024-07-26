import { useContext, useState } from "react"
import { FaXmark } from "react-icons/fa6"
import { ShopContext } from "../context/ShopContext"
import axios from "axios"
import { toast } from "react-toastify"

const LoginPopup = ({ setShowLogin }) => {
    const { url, setToken } = useContext(ShopContext)
    const [state, setState] = useState('Login')
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setData((data) => ({ ...data, [name]: value }))
    }

    const onLogin = async (e) => {
        e.preventDefault()
        let newUrl = url;
        if (state === "Login") {
            newUrl += "/api/user/login"
        } else {
            newUrl += "/api/user/register"
        }

        try {
            const res = await axios.post(newUrl, data)


            setToken(res.data.token)
            localStorage.setItem("token", res.data.token)
            setShowLogin(false)
            toast.success(res.data.message)



        } catch (error) {

            toast.error(error.response.data.message)
        }
    }

    return (
        <div className="absolute h-full w-full bg-black/40 z-50 flexCenter">
            <form onSubmit={onLogin} className="bg-white w-[366px] p-7 rounded-lg shadow-md">
                <div className="flex justify-between items-baseline">
                    <h4 className="bold-28">{state}</h4>
                    <FaXmark
                        className="medium-20 text-slate-900/70 cursor-pointer"
                        onClick={() => setShowLogin(false)} />
                </div>
                <div className="flex flex-col gap-4 my-6">
                    {state === "Sign Up" && (
                        <input
                            type="text"
                            placeholder="Name"
                            onChange={onChangeHandler}
                            name="name"
                            required
                            className="border border-slate-900/20 p-2 pl-4 rounded-md outline-none"
                            value={data.name}
                        />
                    )}
                    <input
                        type="email"
                        placeholder="E-mail"
                        onChange={onChangeHandler}
                        required
                        className="border border-slate-900/20 p-2 pl-4 rounded-md outline-none"
                        name="email"
                        value={data.email}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        required
                        className="border border-slate-900/20 p-2 pl-4 rounded-md outline-none"
                        onChange={onChangeHandler}
                        name="password"
                        value={data.password}
                    />
                </div>
                <button className="btn-secondary rounded-md w-full" type="submit">
                    {state === "Sign Up" ? "Create account" : "Login"}
                </button>
                <div className="flex items-baseline gap-x-3 mt-6 mb-4">
                    <input type="checkbox" required />
                    <p className="relative bottom-1">
                        By continuing you agree to our <span>Terms of Service</span> and Privacy Policy
                    </p>
                </div>
                {state === "Sign Up" ? (
                    <p>
                        Already have an account?{" "}
                        <span onClick={() => setState("Login")} className="cursor-pointer text-secondary">
                            Login
                        </span>
                    </p>
                ) : (
                    <p>
                        Don't have an account?{" "}
                        <span onClick={() => setState("Sign Up")} className="cursor-pointer text-secondary">
                            Sign Up
                        </span>
                    </p>
                )}
            </form>
        </div>
    )
}

export default LoginPopup
