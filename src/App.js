import './App.scss';
// react router v6
import { Routes, Route, useNavigate } from 'react-router-dom';
// pages
import { Home, CategoryProduct, ProductSingle, Cart, Search } from "./pages/index";
// components
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Footer from "./components/Footer/Footer";
import store from "./store/store";
import { Provider } from "react-redux";
import { oktaConfig } from "./utils/oktaConfig"
import { OktaAuth } from "@okta/okta-auth-js";
import { Security} from '@okta/okta-react';
import LoginWidget from './components/Auth/LoginWidget';
import {toRelativeUrl} from "@okta/okta-auth-js"

const oktaAuth = new OktaAuth(oktaConfig);

function App() {

  const navigate = useNavigate();

  const customAuthHandler = () => {
    navigate('/login');
  }

  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    navigate(toRelativeUrl(originalUri || '/', window.location.origin));
  }

  return (
    <div className="App">
      <Provider store={store}>
          <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri} onAuthRequired={customAuthHandler}>
            <Header />
            <Sidebar />
            <Routes>
              {/* home page route */}
              <Route path="/" element={<Home />} />
              {/* single product route */}
              <Route path="/product/:id" element={<ProductSingle />} />
              {/* category wise product listing route */}
              <Route path="/category/:category" element={<CategoryProduct />} />
              {/* cart */}
              <Route path="/cart" element={<Cart />} />
              {/* searched products */}
              <Route path="/search/:searchTerm" element={<Search />} />
              <Route path='/login' element={<LoginWidget config={oktaConfig}/>} />
            </Routes>
            <Footer />
          </Security>
      </Provider>
    </div>
  );
}

export default App;
