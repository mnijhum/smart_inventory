import { SnackbarProvider } from "notistack";
import { useEffect, useRef, useState } from "react";
import { alertContext } from "./hooks/alertContext";
import { Products } from "./pages";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";

function App() {
  const [alertPopupContext, setAlertPopupContext] = useState(""); //{message, type}
  const alertPopupRef = useRef();
  useEffect(() => {
    if (!alertPopupContext) return;
    alertPopupRef.current.enqueueSnackbar(alertPopupContext.message, {
      variant: alertPopupContext.type,
    });
  }, [alertPopupContext]);

  return (
    <alertContext.Provider value={{ alertPopupContext, setAlertPopupContext }}>
      <SnackbarProvider
        ref={alertPopupRef}
        maxSnack={4}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        style={{
          fontWeight: alertPopupContext.type === "error" ? "bolder" : "bold",
        }}
        action={(key) => (
          <AiOutlineClose
            onClick={() => {
              alertPopupRef.current.closeSnackbar(key);
            }}
            // style={{
            //   color: "#fff",
            //   height: "1.5rem",
            //   paddingBottom: "0.5rem",
            //   cursor: "pointer",
            //   font
            // }}
            className="text-white h-[20px] text-lg cursor-pointer"
          />
        )}
      ></SnackbarProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Products}></Route>
        </Switch>
      </BrowserRouter>
    </alertContext.Provider>
  );
}

export default App;
