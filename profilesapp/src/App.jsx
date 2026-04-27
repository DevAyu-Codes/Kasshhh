import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

export default function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main className="container">
          <div className="glass-card">
            <h1>Aakash Thapa</h1>
            <h2>EUID: at1045</h2>
            <p className="login-info">
              Logged in as: <span>{user?.signInDetails?.loginId}</span>
            </p>
            
            {/* The "Registered Profiles" section has been removed from here */}

            <button onClick={signOut} className="signout-btn">
              Sign Out
            </button>
          </div>
        </main>
      )}
    </Authenticator>
  );
}