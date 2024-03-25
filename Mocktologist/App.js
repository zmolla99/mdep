import 'react-native-gesture-handler';
import Navigation from './Navigation';
import { AuthProvider } from './hooks/useAuth';
import { OverlayPopupProvider } from './hooks/useOverlayPopup'
import { ChoicesProvider } from './hooks/useChoices';

const App = () => {

  return (
    <AuthProvider>
      <OverlayPopupProvider>
        <ChoicesProvider>
          <Navigation />
        </ChoicesProvider>
      </OverlayPopupProvider>
    </AuthProvider>
  )
};

export default App;

