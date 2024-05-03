import { Navigate, Outlet, useNavigate, Route, Routes } from "react-router-dom";
import { logOut, userInfosCompleted } from "./config/auth";
import { useAuth } from "./contexts/authContext";
import SideBar from "./components/SideBar";
import { useLayoutContext } from "./contexts/layoutContext";
import NavBar from "./components/NavBar";

const App = () => {
  const { sideVisible } = useLayoutContext();
  const { currentUser } = useAuth();

  const navigate = useNavigate();

  if (!currentUser) return <Navigate to={"/login"} replace={true} />;

  const [infosAreCompleted, missingInfos] = userInfosCompleted(currentUser);

  if (!infosAreCompleted)
    return <Navigate to={"/tellUsMore"} state={missingInfos} replace={true} />;
  return (
    <main className="flex bg-background min-w-screen min-h-screen font-dm-sans text-font-normal">
      <SideBar
        signOutFunc={() => logOut().then(() => navigate("/login"))}
        userName={currentUser.displayName}
        userAvatarURL={currentUser.photoURL}
      />
      <div
        className={`w-full min-h-screen transition-margin p-6 duration-300 space-y-8 ${
          sideVisible ? "md:ml-72" : ""
        }`}
      >
        <NavBar userAvatar={currentUser.photoURL} />
        <div className="w-full">
          <Routes>
            <Route index element={<div>AZDDDDDDD</div>} />
          </Routes>
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default App;
