import React, { FC } from 'react';
import GlobalStore from './hooks/globalStore';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DashboardLayout from "./dashboard/layout";
import Home from './view/Home';
import Inventoy from './view/Inventory';
import FactoryView from './view/Factory';
import Administrator from './view/Administrator';
import ProductsAndServices from './view/ProductsAndServices';
import PointSale from './view/PointSale';
import Login from './view/Login';
import { setAuthorizationToken } from "./utils/setAuthorizationToken";
import redirectLoginAuth from "./utils/redirectLoginAuth";
import StoreProviderAuthLogin from "./hooks/AuthLogin/StoreProvider";

setAuthorizationToken(global.window?.localStorage.AuthToken);
redirectLoginAuth();

const App: FC = () => {

  return (
      <>
          <StoreProviderAuthLogin>
              {
                  global.window?.localStorage.AuthToken ?
                    (<>
                      <GlobalStore>
                        <BrowserRouter>
                          <DashboardLayout>
                              <Routes>
                                <Route path="/" element={ <Home /> } />
                                <Route path="/nueva-venta" element={<PointSale />} />
                                <Route path="/productos-y-servicios" element={<ProductsAndServices />} />
                                <Route path='/inventoy' element={<Inventoy />} />
                                <Route path='/facturas' element={<FactoryView />} />
                                <Route path='/admin' element={<Administrator />} />
                              </Routes>
                          </DashboardLayout>
                        </BrowserRouter>
                      </GlobalStore>
                    </>):
                    <BrowserRouter>
                      <Routes>
                        <Route path="/login" element={ <Login />} />
                      </Routes>
                    </BrowserRouter>
              }
          </StoreProviderAuthLogin>
        </>
  );
}

export default App;
