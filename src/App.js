import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { AuthProvider } from './AuthContext';
import { VerifyAuth } from './VerifyAuth';
import Style from '../src/components/style.module.css'
const Welcome = lazy(() => import('./pages/welcome/welcome'))
const Home = lazy(() => import('./pages/home/home'))
const LogIn = lazy(() => import('./pages/login/login'))
const SignIn = lazy(() => import('./pages/login/signin'))
const Track = lazy(() => import('./pages/track/track'))
const Profile = lazy(() => import('./pages/profile/profile'))
const Chat = lazy(() => import('./pages/chat/chat'))
const Update = lazy(() => import('./pages/profile/updateProfile'))
const ChatPage = lazy(() => import('./pages/chat/chatPage'))


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={
          <div className={Style.progress8}></div>
        }>
          <Switch>
            <Route exact path='/signin' component={SignIn} />
            <Route exact path='/login' component={LogIn} />
            <Route exact path='/welcome' component={Welcome} />


            <Route exact path='/' >
              <VerifyAuth>
                <Home />
              </VerifyAuth>
            </Route>

            <Route exact path='/users/:id' >
              <VerifyAuth>
                <Profile />
              </VerifyAuth>
            </Route>

            <Route exact path='/track/:id' >
              <VerifyAuth>
                <Track />
              </VerifyAuth>
            </Route>


            <Route exact path='/messages' >
              <VerifyAuth>
                <Chat />
              </VerifyAuth>
            </Route>


            <Route exact path='/messages/:id' >
              <VerifyAuth>
                <ChatPage />
              </VerifyAuth>
            </Route>

            <Route exact path='/profile' >
              <VerifyAuth>
                <Update />
              </VerifyAuth>
            </Route>
          </Switch>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;