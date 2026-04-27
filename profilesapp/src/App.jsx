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
      <h1>Hello Aakash Thapa ({user?.signInDetails?.loginId})</h1>
      <button onClick={signOut}>Sign out</button>
      <div>
        <h2>Database Profiles</h2>
        {profiles.map(profile => (
           <div key={profile.id}>{profile.email}</div>
        ))}
      </div>
    </main>
  );
}