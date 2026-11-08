import { ThemeProvider, AuthProvider, CartProvider } from './context/AppContext';

import ThemeSwitcher from './components/ThemeSwitcher';
import AuthPanel from './components/AuthPanel';
import Cart from './components/Cart';
import SearchDebounce from './components/SearchDebounce';
import PreviousValue from './components/PreviousValue';
import OptimizedList from './components/OptimizedList';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <div style={{ padding: 20 }}>
            <h1>Context API и Продвинутые хуки</h1>
            
            <section>
              <h2>Часть 9: Context API</h2>
              <ThemeSwitcher />
              <hr />
              <AuthPanel />
              <hr />
              <Cart />
            </section>
            
            <section>
              <h2>Часть 10: Продвинутые хуки</h2>
              <SearchDebounce />
              <hr />
              <PreviousValue />
              <hr />
              <OptimizedList />
            </section>
          </div>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}