import React from "react";
import { Route, Routes } from "react-router-dom";
import { Dashboard, Hero } from "./components";
import { BookshelfProvider } from "./context/BookshelfContext";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <BookshelfProvider>
      <UserProvider>
        <main>          
            <Routes>
              <Route path="/" exact element={<Hero />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>      
        </main>
      </UserProvider>
    </BookshelfProvider>
  );
}
export default App;
