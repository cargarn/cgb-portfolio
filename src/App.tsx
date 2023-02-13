import { ChakraProvider } from "@chakra-ui/react";
import { Header } from "./components/Header";
import { LandingSection } from "./components/LandingSection";
import { ProjectsSection } from "./components/ProjectSection";
import { ContactMeSection } from "./components/ContactMeSection";
import { Footer } from "./components/Footer";
import { AlertProvider } from "./context/alertContext";
import { Alert } from "./components/Alert";
import { GeneralProvider } from "./context/generalContext";

// Global variables
const authorName = "Carlos Garnacho Benito";
const authorShortName = "Carlos G. B.";

function App() {
  return (
    <ChakraProvider>
      <GeneralProvider authorName={ authorName } authorShortName={ authorShortName }>
        <AlertProvider>
          <main>
            <Header />
            <LandingSection />
            <ProjectsSection />
            <ContactMeSection />
            <Footer />
            <Alert />
          </main>
      </AlertProvider>
      </GeneralProvider>
    </ChakraProvider>
  );
}

export default App;
