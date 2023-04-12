// part of the library
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Component } from "react";
// style
import "./App.css";
// component
import LayoutContainer from "./components/Layout/LayoutConteiner";
import ProfileContainer from "./components/profile/ProfileContainer";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import ErrorPage from "./components/error/errorPage";
import UsersContainer from "./components/Users/UsersContainer";
import AuthContainer from "./components/Layout/AuthContainer";

class App extends Component {
  render() {
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LayoutContainer />}>
              {/* костыль для пренаправления на Профиль, что бы вместо index написать path="/profile"  в роутере Profile*/}
              <Route index element={<Navigate to="/profile" replace />} />
              <Route path="/login" element={<AuthContainer />} />
              <Route path="/profile" element={<ProfileContainer />}>
                <Route path=":userId" element={<ProfileContainer />} />
              </Route>
              <Route path="/dialogs" element={<DialogsContainer />} />
              <Route path="/users" element={<UsersContainer />} />
              <Route path="*" element={<ErrorPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
