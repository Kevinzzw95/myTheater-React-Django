import { Link, Outlet, useLocation } from "react-router-dom";
import { Fragment } from "react";
import { ReactComponent as StarLogo } from '../../assets/logo.svg';
import classnames from 'classnames';
import Search from "./search.component";

const Navigation = () => {
    const pathParam = useLocation();
    const currPath = pathParam.pathname;

    return (
        <Fragment>
            <div className="navbar bg-base-100 flex flex-wrap">
                <div className="flex-1 flex-row">
                    <div className="logo">
                        <Link className="logo-container flex flex-row items-center" to='/'>
                            <StarLogo className="logo" width="40" height="40"/>
                            <span className="flex flex-row">
                                <h1 className="text-2xl text-white Oswald">my</h1>
                                <h1 className="text-2xl text-accent Oswald">Theater</h1>
                            </span>
                        </Link>
                    </div>
                    
                    <div className="tabs">
                        <Link className={classnames("text-lg tab font-semibold", currPath === '/' ? "tab-active" : "")} to='/'>
                            Home
                        </Link>
                        <Link className={classnames("text-lg tab font-semibold", currPath === '/mylist' ? "tab-active" : "")} to='/mylist'>
                            My List
                        </Link>
                        <Link className={classnames("text-lg tab font-semibold", currPath === '/discover' ? "tab-active" : "")} to='/discover'>
                            Discover
                        </Link>
                        <Link className={classnames("text-lg tab font-semibold", currPath === '/stat' ? "tab-active" : "")} to='/stat'>
                            Statistics
                        </Link>
                    </div>
                </div>
                
                <div className="flex">
                    <Search />
                    <button className="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </button>

                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img src={require("../../assets/avatar.png")} alt=""/>
                            </div>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-primary text-primary-content rounded-box w-52">
                            <li>
                            <a className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                            </li>
                            <li><a>Settings</a></li>
                            <li><a>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <Outlet />
        </Fragment>
        
    )
}

export default Navigation;