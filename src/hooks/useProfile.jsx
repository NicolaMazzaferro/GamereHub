/* eslint-disable camelcase */
import { useState, useEffect, useContext } from 'react';
import supabase from '../supabase/client';
import AppContext from '../context/AppContext';

function useProfile() {
  const { session } = useContext(AppContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
  
    async function getProfile() {
      try {
        const { user } = session;
  
        const { data, error } = await supabase
          .from('profiles')
          .select(`*`)
          .eq('id', user.id)
          .single();
  
        if (!ignore) {
          if (error) {
            console.warn(error);
          } else if (data) {
            setProfile(data);
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  
    if (session) {
      setLoading(true);
      getProfile();
    }
  
    return () => {
      ignore = true;
    };
  }, [session]);

  return {
    profile,
    loading,
  };
}

export default useProfile;