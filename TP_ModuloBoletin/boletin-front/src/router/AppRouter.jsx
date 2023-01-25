import React from "react";
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "../auth";
import { Boletin } from "../boletin/pages/Boletin";
import { PublicRoute, PrivateRoute } from "./";

export const AppRouter = () => {

  return (

      <>
      
        <Routes>
          <Route path="/login" element = {
              <PublicRoute>
                <LoginPage/>
              </PublicRoute>
          }>
          </Route>


          <Route path="/*" element={
            <PrivateRoute>
              <Boletin/>
            </PrivateRoute>
          }
          
          >
          </Route>

        </Routes>
      
      
      </>


  );
};
