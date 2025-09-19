import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAETtwg-DDlNjN2Sf5zHJCNyTwqpl5QLMc",
  authDomain: "auroraapp-85303.firebaseapp.com",
  projectId: "auroraapp-85303",
  storageBucket: "auroraapp-85303.firebasestorage.app",
  messagingSenderId: "359616267659",
  appId: "1:359616267659:web:0495e6237a09cb7e8ddb8e"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);