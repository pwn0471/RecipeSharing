import SideBar from "../components/SideBar";

const SideBarLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <SideBar />

      {/* Main content */}
      <main
        className="
          flex-1
          p-6
          md:ml-0
        "
      >
        {children}
      </main>
    </div>
  );
};

export default SideBarLayout;
