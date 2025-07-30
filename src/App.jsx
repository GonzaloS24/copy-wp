import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PrivateRoute } from './privateRoutes/PrivateRoute';
import { HomePage } from './pages/HomePage';
import { ConfigureAsistent } from './pages/ConfigureAsistent';
import { ProductConfigPage } from './pages/ProductConfigPage';
import { ProductContentForm } from './pages/ProductContentForm';
import CarritosPage from './pages/CarritosPage';
import { LogistAssistantPage } from "./pages/LogistAssistantPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/configurar/:template_ns"
            element={<ConfigureAsistent />}
          />
          <Route path="/productos-config" element={<ProductConfigPage />} />
          <Route path="/agregando" element={<ProductContentForm />} />
          <Route path="/:productName" element={<ProductContentForm />} />
          <Route path="/asistente-carritos" element={<CarritosPage />} />
          <Route
            path="/asistente-logistico"
            element={<LogistAssistantPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}