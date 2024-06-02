import { auth, GoogleAuthProvider, signInWithPopup, signOut } from "./firebase.js";

auth.onAuthStateChanged(user => {
    if (user) {
      document.getElementById('login').style.display = 'none';
      document.getElementById('note').style.display = 'block';
    } else {
      document.getElementById('login').style.display = 'block';
      document.getElementById('note').style.display = 'none';
    }
  });
  
document.getElementById('login-button').addEventListener('click', async () => {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
    document.getElementById('login').style.display = 'none';
    document.getElementById('note').style.display = 'block';
  } catch (error) {
    console.error('Error signing in:', error);
  }
});

document.getElementById('save-note').addEventListener('click', async () => {
  const content = document.getElementById('note-content').value;
  if (content) {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('Not authenticated');
      
      const response = await fetch('https://noteeey.vercel.app/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await user.getIdToken()}`
        },
        body: JSON.stringify({ content })
      });
      const result = await response.json();
      console.log('Note saved:', result);
      document.getElementById('note-content').value = ''; // Clear the textarea
    } catch (error) {
      console.error('Error saving note:', error);
    }
  }
});
