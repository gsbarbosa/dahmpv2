import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './src/screens/home';
import Autenticacao from './src/screens/autenticacao';
import Blog from './src/screens/blog';
import Loja from './src/screens/loja';
import Sobre from './src/screens/sobre';
import Carteirinha from './src/screens/carteirinha';
import Podcast from './src/screens/podcasts'
import Video from './src/screens/video'
import FAQ from './src/screens/faq'

function HomeScreen({navigation}) { return <Home nav={navigation} />; } 
function AutenticacaoScreen({navigation}) { return <Autenticacao nav={navigation} />; }
function BlogScreen({navigation}) { return <Blog nav={navigation} />; }
function VideosScreen({navigation}) { return <Video dahmpNews={true} nav={navigation} />; }
function PodCastScreen({navigation}) { return <Podcast dahmpNews={true} nav={navigation} />; }
function PodCast2Screen({navigation}) { return <Podcast dahmpNews={false} nav={navigation} />; }
function LojaScreen({navigation}) { return <Loja nav={navigation} />; }
function FAQScreen({navigation}) { return <FAQ nav={navigation}/>; }
function SobreScreen({navigation}) { return <Sobre nav={navigation} />; }
function CarteirinhaScreen({navigation}) { return <Carteirinha nav={navigation} />; }

function DrawerScreens({}) {
  return (
    <Drawer.Navigator backBehavior={'history'} drawerType={'slide'} overlayColor={'rgba(0, 0, 0, 0.7)'} // drawerStyle={styles.drawer} 
                      screenOptions={{headerStyle: {borderBottomWidth: 1}}}>
      <Drawer.Screen name="Noticias" component={BlogScreen} 
                     options={{title:"Portal de Notícias", headerShown: false, headerTitleStyle: {alignSelf: 'auto'}}}/>
      <Drawer.Screen name="Videos" component={VideosScreen}
                      options={{title: "Vídeos", headerShown: false, headerTitleStyle: {alignSelf: 'auto'}}}/>
      <Drawer.Screen name="DahmpNews" component={PodCastScreen}
                      options={{title: "DAHMP News", headerShown: false, headerTitleStyle: {alignSelf: 'auto'}}}/>
      <Drawer.Screen name="CausaMortis" component={PodCast2Screen}
                      options={{title: "Causa Mortis", headerShown: false, headerTitleStyle: {alignSelf: 'auto'}}}/>
      <Drawer.Screen name="Formularios" component={LojaScreen} 
                      options={{title: "Formulários", headerShown: false, headerTitleStyle: {alignSelf: 'auto'}}}/>
      <Drawer.Screen name="FAQ" component={FAQScreen} 
                      options={{title: 'Fale Conosco', headerShown: false, headerTitleStyle: {alignSelf: 'auto'},}} />
      <Drawer.Screen name="Carteirinha" component={CarteirinhaScreen} 
                      options={{title: 'Carteirinha', headerShown: false, headerTitleStyle: {alignSelf: 'auto'},}}/>
      <Drawer.Screen name="Sobre" component={SobreScreen} 
                      options={{title: 'Sobre', headerShown: false, headerTitleStyle: {alignSelf: 'auto'},}}/>
    </Drawer.Navigator>
  );
}

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const App = () => (
  <NavigationContainer initialRouteName="Home">
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Autenticacao" component={AutenticacaoScreen} options={{headerShown: false, drawerPosition: 'left'}}/>
      <Stack.Screen name="Blog" component={DrawerScreens} options={{headerShown: false, drawerPosition: 'left'}}/>
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
