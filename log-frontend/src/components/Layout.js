import { Outlet, Link } from "react-router-dom";
import { Button } from 'antd';

const Layout = () => {
  return (
    <>
      <nav>
        <Button type="primary" htmlType="submit" className="registration-form-button"style={{marginRight:25, marginTop:150}}>
            <Link to="/register">Register</Link>
        </Button>

        <Button type="primary" htmlType="submit" className="login-form-button">
            <Link to="/login">Login</Link>
        </Button>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;