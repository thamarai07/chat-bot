import "./App.scss";
import React from "react";

import { useState, useEffect } from "react";
import { Image, Navbar } from "./components";
import Routes from "./Routes";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import queryClient from "./react-query-client";
import { Footer } from "./components";
import { firestore } from "./config/firbase";
import {
  FirebaseContext,
  AuthenticationConext,
} from "./config/FirestoreContext";
import { getAuth } from "firebase/auth";
import HotNews from "hotNews";
import { IoIosCloseCircle } from "react-icons/io";


import { referenceLinks } from "config/externalLinks";
import whatsAppIcon from "assets/whatsapp.svg";
import notificationIcon from "assets/notification-icon.png";
import { AppContentContext } from "config/ContentContext";
import generateAppContent from "websiteContent/main";
import { getDocumentsData } from "databaseConfig/dbConfig";
import { HOTNEWS } from "constants/dbConstants";
import ErrorBoundary from "ErrorBoundary";
import MyChatBot from "components/chatbot";

function App() {
  const [showHotNews, setShowHotNews] = useState(true);

  const [hotNewsData, setHotNewsData] = useState({});

  const [isChatBotShow,setisChatBotShow] = useState(false);

  useEffect(() => {
    getDocumentsData(HOTNEWS).then((resp) => {
      setHotNewsData(resp);
    });
  }, []);

  const handleChatbot = () => {
    setisChatBotShow(!isChatBotShow);
  }

  return (
    <div className="app">
      <QueryClientProvider client={queryClient}>
        <FirebaseContext.Provider value={firestore}>
          <AuthenticationConext.Provider value={getAuth()}>
            <AppContentContext.Provider value={generateAppContent()}>
              <div className="app-content">
                <Navbar />
                <ErrorBoundary>
                  <Routes />
                </ErrorBoundary>

                <Footer />
                {hotNewsData.length > 0 && (
                  <HotNews
                    openHotNews={showHotNews}
                    setOpenHotNews={setShowHotNews}
                    hotNewsData={hotNewsData}
                  />
                )}
              </div>
              <ReactQueryDevtools initialIsOpen={false} />
            </AppContentContext.Provider>
          </AuthenticationConext.Provider>
        </FirebaseContext.Provider>
      </QueryClientProvider>
      {!showHotNews && hotNewsData.length > 0 && (
        <Image
          className="hotNotification pointer"
          src={notificationIcon}
          alt={"notification-icon"}
          onClick={() => {
            setShowHotNews(!showHotNews);
          }}
        />
      )}

      <div
        className="whatsAppBtn"
        href={referenceLinks.WHATSAPP}
        target="_blank"
        rel="noreferrer"
        onClick={()=>handleChatbot()}
      >
        <Image
          className="whatsAppIcon"
          src={whatsAppIcon}
          alt={"whatsapp-chat"}
        />
      {isChatBotShow && <IoIosCloseCircle className="IoIosCloseCircle" height={60} width={60} onClick={()=>handleChatbot()}/> }
        
      </div>
       
     {isChatBotShow && <MyChatBot/>} 
    </div>
  );
}

export default App;
