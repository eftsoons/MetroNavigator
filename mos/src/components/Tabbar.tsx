import { ReactNode } from "react";

import { retrieveLaunchParams } from "@telegram-apps/sdk-react";

import Logo from "@/svg/logo.tsx";
import News from "@/svg/news";
import Rating from "@/svg/rating";
import Profile from "@/svg/profile";
import Support from "@/svg/support";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Store } from "@/type";
import PageErrorTimeout from "@/pages/PageErrorTimeout";

function Tabbar({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const launchparams = retrieveLaunchParams();

  const timeouterror = useSelector((data: Store) => data.info.timeouterror);

  return (
    <>
      <header className="hidden">тут могла быть ваша реклама!</header>
      <main className="overflow-x-hidden overflow-y-auto h-full w-full">
        {!timeouterror ? children : <PageErrorTimeout />}
      </main>
      <footer
        style={{
          paddingBottom: ["macos", "ios"].includes(launchparams.platform)
            ? "34px"
            : "0",
          height: ["macos", "ios"].includes(launchparams.platform)
            ? "100px"
            : "80px",
        }}
        className="h-[80px] flex items-center justify-around bg-[var(--primary-color)] rounded-t-[10px] border-t-[2px] border-t-[var(--primary-border-color)] border-t-solid"
      >
        <button
          onClick={() => navigate("/")}
          className="justify-center w-[35px] h-[35px] duration-250!"
          style={{
            fill: location == "/" ? "var(--primary-text)" : "none",
            stroke: location == "/" ? "none" : "var(--primary-text)",
            transition: "all 0.3s ease",
          }}
        >
          <Logo />
        </button>
        <button
          onClick={() => navigate("/news")}
          className="w-[35px] h-[35px]"
          style={{
            fill: location == "/news" ? "var(--primary-text)" : "none",
            stroke: location == "/news" ? "none" : "var(--primary-text)",
          }}
        >
          <News />
        </button>
        <button
          onClick={() => navigate("/rating")}
          className="w-[35px] h-[35px]"
          style={{
            fill: location == "/rating" ? "var(--primary-text)" : "none",
            stroke: location == "/rating" ? "none" : "var(--primary-text)",
          }}
        >
          <Rating />
        </button>
        <button
          onClick={() => navigate("/profile/0")}
          className="w-[35px] h-[35px]"
          style={{
            fill:
              location.split("/")[1] == "profile"
                ? "var(--primary-text)"
                : "none",
            stroke:
              location.split("/")[1] == "profile"
                ? "none"
                : "var(--primary-text)",
          }}
        >
          <Profile />
        </button>
        {/* <button
          onClick={() => navigate("/guide")}
          className="flex items-center justify-center w-[35px] h-[35px]"
          style={{
            fill: location == "/" ? "var(--primary-text)" : "none",
            stroke: "var(--primary-text)",
          }}
        >
          <Info />
        </button> */}
        <button
          onClick={() => navigate("/support")}
          className="w-[35px] h-[35px]"
          style={{
            fill: location == "/support" ? "var(--primary-text)" : "none",
            stroke: location == "/support" ? "none" : "var(--primary-text)",
          }}
        >
          <Support />
        </button>
      </footer>
    </>
  );
}

export default Tabbar;
