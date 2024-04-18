import React, { useState } from "react";
import { BookshelfProvider } from "./context/BookshelfContext";
import { UserProvider } from "./context/UserContext";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { BookSearch, Home, Mybooks } from "./pages";

function App() {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <BookshelfProvider>
      <UserProvider>
        <main>
          <Tabs
            selectedIndex={activeTab}
            onSelect={(index) => setActiveTab(index)}
          >
            <TabList>
              <Tab>SEARCH</Tab>
              <Tab>HOME</Tab>
              <Tab>MY BOOKS</Tab>
            </TabList>

            <TabPanel>
              <BookSearch />
            </TabPanel>
            <TabPanel>
              <Home />
            </TabPanel>
            <TabPanel>
              <Mybooks />
            </TabPanel>
          </Tabs>
        </main>
      </UserProvider>
    </BookshelfProvider>
  );
}
export default App;
