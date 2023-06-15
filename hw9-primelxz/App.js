import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';

import BadgerPreferencesContext from './contexts/BadgerPreferencesContext';
import BadgerTabs from './components/navigation/BadgerTabs';

export default function App() {

  const [prefs, setPrefs] = useState({});
  const [BadgerNews, setBagderNews] = useState([]);

  useEffect(() => {
    fetch('https://www.cs571.org/s23/hw9/api/news/articles', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "X-CS571-ID": "bid_c6b0ef60328ceef94599",
      }
    }).then(res => {
      if (res.status === 200) {
        return res.json();
      }
    }).then(json => {
      setBagderNews(json);
    })
  }, []);

  useEffect(() => {
    const allTags = BadgerNews.reduce((acc, news) => {
      news.tags.forEach(tag => {
        if (!acc.includes(tag)) {
          acc.push(tag);
        }
      })
      return acc;
    }, []);
    allTags.forEach(tag => {
      setPrefs(oldlist => {
        return {
          ...oldlist,
          [tag]: true
        }
      })
    })
  }, [BadgerNews]);
  
  if (BadgerNews.length === 0) {
    return
  }

  return (
    <>
      <BadgerPreferencesContext.Provider value={[prefs, setPrefs]}>
        <NavigationContainer>
          <BadgerTabs {...BadgerNews}/>
        </NavigationContainer>
      </BadgerPreferencesContext.Provider>
      <StatusBar style="auto" />
    </>
  );
}