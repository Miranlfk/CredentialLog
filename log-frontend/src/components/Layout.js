//Component which provides default layout for the application, in this instance the home page contains buttons to register and sign in

import { Outlet, Link } from "react-router-dom";
import { Button } from 'antd';

const Layout = () => {
  return (
    <>
      <nav>
        <Button type="primary" htmlType="submit" className="registration-form-button"style={{marginRight:25, marginTop:200}} size="large">
            <Link to="/register">Register</Link>
        </Button>

        <Button type="primary" htmlType="submit" className="login-form-button" size="large">
            <Link to="/login">Login</Link>
        </Button>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;