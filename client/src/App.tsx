import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import Admin from "@/pages/Admin";
import TrackingPage from "@/pages/TrackingPage";
import NotFound from "@/pages/not-found";
import AboutUs from "@/pages/AboutUs";
import OurTeam from "@/pages/OurTeam";
import Careers from "@/pages/Careers";
import Contact from "@/pages/Contact";
import HelpCenter from "@/pages/HelpCenter";
import GetQuote from "@/pages/GetQuote";
import Services from "@/pages/Services";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/admin" component={Admin} />
      <Route path="/track" component={TrackingPage} />
      <Route path="/about" component={AboutUs} />
      <Route path="/team" component={OurTeam} />
      <Route path="/careers" component={Careers} />
      <Route path="/contact" component={Contact} />
      <Route path="/help" component={HelpCenter} />
      <Route path="/quote" component={GetQuote} />
      <Route path="/services" component={Services} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;