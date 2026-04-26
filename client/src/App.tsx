import { Switch, Route } from "wouter";
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { initGA } from "./lib/analytics";
import { useAnalytics } from "./hooks/use-analytics";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Instructions from "@/pages/Instructions";
import PersonalChart from "@/pages/PersonalChart";
import Legal from "@/pages/Legal";
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";
import AdvancedAzkaar from "@/pages/AdvancedAzkaar";
import AdvancedTips from "@/pages/AdvancedTips";

// LanguageProvider is only consumed by Instructions — wrap it at the route
// level rather than the app root to avoid unnecessary context overhead.
function WrappedInstructions() {
  return (
    <LanguageProvider>
      <Instructions />
    </LanguageProvider>
  );
}

function Router() {
  useAnalytics();

  return (
    <Switch>
      <Route path="/" component={Home}/>
      <Route path="/instructions" component={WrappedInstructions}/>
      <Route path="/chart" component={PersonalChart}/>
      <Route path="/legal" component={Legal}/>
      <Route path="/terms" component={Terms}/>
      <Route path="/privacy" component={Privacy}/>
      <Route path="/azkaar" component={AdvancedAzkaar}/>
      <Route path="/advanced-tips" component={AdvancedTips}/>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
    if (!import.meta.env.VITE_GA_MEASUREMENT_ID) {
      console.warn('Missing required Google Analytics key: VITE_GA_MEASUREMENT_ID');
    } else {
      initGA();
    }
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
