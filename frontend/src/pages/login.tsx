import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/auth/authSlice";
import { useLoginMutation } from "../redux/auth/authApiSlice";

const Login = () => {
    const userRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLParagraphElement>(null);
    const [user, setUser] = useState<string>('');
    const [pwd, setPwd] = useState<string>('');
    const [errMsg, setErrMsg] = useState<string>('');
    const navigate = useNavigate();
    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useDispatch();

    useEffect(() => {
        userRef.current?.focus()
    }, []);

    useEffect(() => {
        setErrMsg('')
    }, [user, pwd]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            //const userData = await login({ user, pwd }).unwrap();
            const authData = {token: "123"}
            dispatch(setCredentials({ ...authData, user }));
            setUser('');
            setPwd('');
            navigate('/trending');
        } catch (err) {
            console.log(err);
            errRef.current?.focus();
        }
    }

    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => setUser(e.target.value);

    const handlePwdInput = (e: React.ChangeEvent<HTMLInputElement>) => setPwd(e.target.value);

    const content = isLoading ? <h1>iLoading...</h1> : (
        <section className="login">
            <div className="container justify-center content-center flex text-center min-h-[40rem] p-20">
                
                <div className="card w-[25rem] glass items-center">
                    <p ref={errRef} className="">{errMsg}</p>
                    <h1 className="text-3xl font-bold pt-10">Sign In</h1>
                    <div className="card-body grid justify-items-center">
                        <form className="space-y-5 w-full" onSubmit={handleSubmit}>
                            <label className="input-group">
                                <span className="w-[7rem] bg-primary">Username</span>
                                <input 
                                    ref={userRef} 
                                    type="text" 
                                    placeholder="username" 
                                    autoComplete="off"
                                    className="input input-bordered w-full"
                                    value={user}
                                    onChange={handleUserInput}
                                    required
                                />
                            </label>
                            
                            <label className="input-group">
                                <span className="w-[7rem] bg-primary">Password</span>
                                <input 
                                    type="text" 
                                    placeholder="password" 
                                    className="input input-bordered w-full" 
                                    onChange={handlePwdInput}
                                    value={pwd}
                                    required
                                />
                            </label>
                            
                            <div className="card-actions justify-center">
                                <button className="btn btn-wide btn-primary">Login</button>
                            </div>
                        </form>
                        <p>
                            Do not have an account?<br />
                            <span className="line">
                                <Link to="/register" className="text-accent">Sign up</Link>
                            </span>
                        </p>
                    </div>
                </div>
            
            </div>
        </section>
    )
    return (
        content
    )
}

export default Login;