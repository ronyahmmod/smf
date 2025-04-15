import Sidebar from "./Sidebar";

const Layout = ({ role, children }) => {
  return (
    <div className="d-flex">
      <Sidebar role={role} />
      <div className="flex-grow-1 p-4" style={{ marginLeft: "240px" }}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
