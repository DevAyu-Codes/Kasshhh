import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/data';
import { useAuthenticator } from '@aws-amplify/ui-react';

const client = generateClient();

export default function App() {
  const { user, signOut } = useAuthenticator();
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const sub = client.models.UserProfile.observeQuery().subscribe({
      next: ({ items }) => setProfiles([...items]),
    });
    return () => sub.unsubscribe();
  }, []);

  return (
    <main>
      <h1>Aakash Thapa</h1>
      <p>Logged in as: {user?.signInDetails?.loginId}</p>
      
      <div>
        <h2>Registered Profiles</h2>
        {profiles.length === 0 ? <p>Loading profiles...</p> : 
          profiles.map(profile => (
           <div className="profile-card" key={profile.id}>
             📧 {profile.email}
           </div>
        ))}
      </div>

      <button onClick={signOut}>Sign Out</button>
    </main>
  );
}