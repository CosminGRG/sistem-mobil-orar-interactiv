import SideNavbar from "../components/SidebarNav";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <div className="h-screen flex flex-row justify-start">
      <SideNavbar />
      <div className="flex-1 p-4">
        <main>{children}</main>
      </div>
    </div>
  );
}

export default Layout;
