import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '@store/index';
import { ThemeProvider } from '@contexts/ThemeContext';
import { SidebarProvider } from '@contexts/SidebarContext';

const Providers = ({ children }) => (
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider>
        <SidebarProvider>
          {children}
        </SidebarProvider>
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
);

export default Providers;
