import './App.scss';
// react router v6
import { Routes, Route, useNavigate, BrowserRouter } from 'react-router-dom';
// pages
import { Home, CategoryProduct, ProductSingle, Cart, Search, Form, SizeGuide, EventPage, PrivacyPolicy, EventSingle }  from "./pages/index";
// components
import Header from "./components/Header/Header"
import Sidebar from "./components/Sidebar/Sidebar";
import Footer from "./components/Footer/Footer";
import store from "./store/store";
import { Provider } from "react-redux";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"

//apollo client
const client = new ApolloClient({
  uri: 'http://localhost:1337/graphql',
  cache: new InMemoryCache()
});

function App() {

  // const navigate = useNavigate();

  // const customAuthHandler = () => {
  //   navigate('/login');
  // }

  // const restoreOriginalUri = async (_oktaAuth, originalUri) => {
  //   navigate(toRelativeUrl(originalUri || '/', window.location.origin));
  // }

  return (
    <div className="App">
      <BrowserRouter>
        <Provider store={store}>
          <ApolloProvider client={client}>
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
              {/* <Route path='/login' element={<LoginWidget config={oktaConfig} />} /> */}
              <Route path="/form" element={<Form />} />
              {/* <Route path='/login/callback' Component={LoginCallback} /> */}
              <Route path="/sizeGuide" element={<SizeGuide />} />
              <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
              <Route path="/event" element={<EventPage />} />
              <Route path="/EventSinglePage" element={<EventSingle />} />
            </Routes>
            <Footer />
          </ApolloProvider>
        </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
