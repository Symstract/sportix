import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components/macro";

import { BackgroundPattern } from "./components/BackgroundPattern";
import { GlobalStyles } from "./components/GlobalStyles";
import { Header } from "./components/Header";
import { PageContainer } from "./components/PageContainer";
import { Home } from "./components/pages/Home";
import { Quiz } from "./components/pages/Quiz";
import { Result } from "./components/pages/Result";

import { theme } from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <BackgroundPattern />
      <PageContainer>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/result" element={<Result />} />
          </Routes>
        </BrowserRouter>
      </PageContainer>
    </ThemeProvider>
  );
}

export default App;
