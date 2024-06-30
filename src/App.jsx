import { useEffect } from 'react'
import './App.css'
import Chat from './components/chat/Chat'
import Detail from './components/detail/Detail'
import List from './components/list/List'
import Login from './components/login/Login'
import Notification from './components/notification/Notification'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './lib/firebase'
import { useUserStore } from './lib/userStore'
import { useChatStore } from './lib/useChatStore'


function App() {

  const {currentUSer, isLoading, fetchUserInfo} = useUserStore()

  const {chatId} = useChatStore()
  
  useEffect(() => {

    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
    });

    return() => {
      unSub();
    };
  },[fetchUserInfo]);

  console.log(currentUSer);

  if(isLoading) return <div className='loading'>Loading...</div>
  return (
    <>
    <div className='container'> 

    {currentUSer ? (
      <>
        <List/>
        {chatId && <Chat/>}   
        {chatId && <Detail/>}
      </>
    ) : (
    
        <Login/>

    )}  
      
      <Notification/>

    </div>
    </>
  )
}

export default App
