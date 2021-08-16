import { lazy, Suspense } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Store from "./store/context";
import { useMeetings } from "./hooks/useMeetings";
import Spinner from "./components/Spinner/Spinner";
import "./App.css";
import SideMenu from "./components/SideMenu/SideMenu";

const Meetings = lazy(() => import("./pages/Meetings/Meetings"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const Archives = lazy(() => import("./pages/Archives/Archives"));

const App = () => {
    const { ...values } = useMeetings();

    return (
        <BrowserRouter>
            <SideMenu />
            <Suspense fallback={<Spinner />}>
                <Store.Provider value={values}>
                    <Switch>
                        <Route path={"/"} exact>
                            <Meetings />
                        </Route>
                        <Route path={"/archives"} exact>
                            <Archives />
                        </Route>
                        <Route path={"/profile"} exact>
                            <Profile />
                        </Route>
                        <Redirect to={"/"} />
                    </Switch>
                </Store.Provider>
            </Suspense>
        </BrowserRouter>
    );
};

export default App;