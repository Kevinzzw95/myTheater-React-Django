import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CheckCircleIcon, XCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';


const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';

const Register = () => {
    const userRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLParagraphElement>(null);

    const [user, setUser] = useState<string>('');
    const [validName, setValidName] = useState<boolean>(false);
    const [userFocus, setUserFocus] = useState<boolean>(false);

    const [pwd, setPwd] = useState<string>('');
    const [validPwd, setValidPwd] = useState<boolean>(false);
    const [pwdFocus, setPwdFocus] = useState<boolean>(false);

    const [matchPwd, setMatchPwd] = useState<string>('');
    const [validMatch, setValidMatch] = useState<boolean>(false);
    const [matchFocus, setMatchFocus] = useState<boolean>(false);

    const [errMsg, setErrMsg] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);

    useEffect(() => {
        userRef.current?.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            setSuccess(true);
            setUser('');
            setPwd('');
            setMatchPwd('');
        } catch (err) {
            console.log(err);
            errRef.current?.focus();
        }
    }

    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => setUser(e.target.value);

    const handlePwdInput = (e: React.ChangeEvent<HTMLInputElement>) => setPwd(e.target.value);

    return (
        <>
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <a href="#">Sign In</a>
                    </p>
                </section>
            ) : (
                <section>
                    <div className="container justify-center content-center flex text-center min-h-[40rem] p-20">
                        <div className="card w-[25rem] glass">
                            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                            <h1 className="text-3xl font-bold pt-10">Register</h1>
                            <div className="card-body grid justify-items-center">
                                <form className="space-y-5 w-full" onSubmit={handleSubmit}>
                                    <div className="flex flex-row items-center space-x-1">
                                        <label className="input-group w-[90%]">
                                            <span className="w-[7rem] text-center bg-primary">Username</span>
                                            <input 
                                                ref={userRef} 
                                                type="text" 
                                                placeholder="username" 
                                                autoComplete="off"
                                                className="input input-bordered w-full"
                                                value={user}
                                                onChange={handleUserInput}
                                                required
                                                aria-invalid={validName ? "false" : "true"}
                                                aria-describedby="uidnote"
                                                onFocus={() => setUserFocus(true)}
                                                onBlur={() => setUserFocus(false)}
                                            />
                                        </label>
                                        <CheckCircleIcon className={validName ? "w-8 h-8" : "hidden"} color="hsl(var(--af))"/>
                                        <XCircleIcon className={validName || !user ? "hidden" : "w-8 h-8"} color="hsl(var(--sf))"/>
                                    </div>
                                    <div className={userFocus && user && !validName ? "alert shadow-lg" : "absolute bottom-[-5rem] hidden"}>
                                        <div>
                                            <ExclamationCircleIcon className="stroke-info flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24" />
                                            4 to 24 characters.<br />
                                            Must begin with a letter.<br />
                                            Letters, numbers, underscores, hyphens allowed.
                                        </div>
                                    </div>
                                    <div className="flex flex-row items-center space-x-1">
                                        <label className="input-group w-[90%]">
                                            <span className="w-[7rem] text-center bg-primary">Password</span>
                                            <input 
                                                type="text" 
                                                placeholder="password" 
                                                className="input input-bordered w-full" 
                                                onChange={handlePwdInput}
                                                value={pwd}
                                                required
                                                aria-invalid={validPwd ? "false" : "true"}
                                                aria-describedby="pwdnote"
                                                onFocus={() => setPwdFocus(true)}
                                                onBlur={() => setPwdFocus(false)}
                                            />
                                            
                                        </label>
                                        <CheckCircleIcon className={validPwd ? "w-8 h-8" : "hidden"} color="hsl(var(--af))"/>
                                        <XCircleIcon className={validPwd || !pwd ? "hidden" : "w-8 h-8"} color="hsl(var(--sf))"/>
                                    </div>
                                    <div className={pwdFocus && !validPwd ? "alert shadow-lg" : "absolute bottom-[-5rem] hidden"}>
                                        <div>
                                            <ExclamationCircleIcon className="stroke-info flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24" />
                                            8 to 24 characters.<br />
                                            Must include uppercase and lowercase letters, a number and a special character.                                        </div>
                                    </div>
                                    <div className="flex flex-row items-center space-x-1">
                                        <label className="input-group w-[90%]">
                                            <span className="leading-none w-[7rem] bg-primary">Confirm Password</span>
                                            <input 
                                                type="password"
                                                id="confirm_pwd"
                                                className="input input-bordered w-full"
                                                onChange={(e) => setMatchPwd(e.target.value)}
                                                value={matchPwd}
                                                required
                                                aria-invalid={validMatch ? "false" : "true"}
                                                aria-describedby="confirmnote"
                                                onFocus={() => setMatchFocus(true)}
                                                onBlur={() => setMatchFocus(false)}
                                            />
                                            
                                        </label>
                                        <CheckCircleIcon className={validMatch && matchPwd ? "w-8 h-8" : "hidden"} color="hsl(var(--af))"/>
                                        <XCircleIcon className={validMatch || !matchPwd ? "hidden" : "w-8 h-8"} color="hsl(var(--sf))"/>    
                                    </div>
                                    <div className={matchFocus && !validMatch ? "alert shadow-lg" : "absolute bottom-[-5rem] hidden"}>
                                        <div>
                                            <ExclamationCircleIcon className="stroke-info flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24" />
                                            Must match the first password input field.                                       </div>
                                        </div>
                                    <div className="card-actions justify-center">
                                        <button className="btn btn-wide btn-primary" disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>
                                    </div>
                                </form>
                                <p>
                                    Already registered?<br />
                                    <span className="line">
                                        <Link to="/login" className="text-accent">Sign In</Link>
                                    </span>
                                </p>
                            </div>
                            
                            
                        </div>
                    </div>
                    
                </section>
            )}
        </>
    )
}

export default Register