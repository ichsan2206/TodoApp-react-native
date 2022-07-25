import { NativeBaseProvider, extendTheme} from "native-base"
import Container from './Container';


export default function App() {
  return (
    <NativeBaseProvider>
      <Container />
    </NativeBaseProvider>
  );
}

