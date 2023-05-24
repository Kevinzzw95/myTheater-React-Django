import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOut, selectCurrentToken } from "../../redux/auth/authSlice";

const UserEntry = () => {
	const token = useSelector(selectCurrentToken);
	const dispath = useDispatch();
	const navigate = useNavigate();
	const logout = () => {
		dispath(logOut());
		navigate('/trending');
	}
    return (
			<Fragment>
				{ !token && 
					(
						<div className="space-x-2">
							<Link to="/login">
								<button className="btn btn-outline rounded-full btn-accent">Login</button>
							</Link>
							<Link to="/register">
								<button className="btn btn-outline rounded-full btn-accent">Register</button>
							</Link>
						</div>
						
					)
				}
				{ token && 
					(
						<div className="dropdown dropdown-end">
							<label tabIndex={0} className="btn btn-ghost btn-circle avatar">
									<div className="w-10 rounded-full">
											<img src={require("../../assets/avatar.png")} alt=""/>
									</div>
							</label>
							<ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-primary text-primary-content rounded-box w-52">
									<li><a className="justify-between">Profile</a></li>
									<li><a onClick={logout}>Logout</a></li>
							</ul>
						</div>
					)
				}	
			</Fragment>	
    )
}

export default UserEntry;