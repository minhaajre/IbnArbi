import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Instructions from "@/pages/Instructions";
import PersonalChart from "@/pages/PersonalChart";
import Legal from "@/pages/Legal";
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home}/>
      <Route path="/instructions" component={Instructions}/>
      <Route path="/chart" component={PersonalChart}/>
      <Route path="/legal" component={Legal}/>
      <Route path="/terms" component={Terms}/>
      <Route path="/privacy" component={Privacy}/>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
