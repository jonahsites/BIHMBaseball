import React, { useState, useEffect, createContext, useContext, Component } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { Builder } from '@builder.io/react';

// Import Firebase
import { auth, db, loginWithGoogle, logout } from './firebase';

// Import Builder components
import { Navbar } from './components/builder/Navbar';
import { Hero } from './components/builder/Hero';
import { QuoteSection } from './components/builder/QuoteSection';
import { StepSection } from './components/builder/StepSection';
import { MissionSection } from './components/builder/MissionSection';
import { AboutSection } from './components/builder/AboutSection';
import { PricingSection } from './components/builder/PricingSection';
import { LocationsSection } from './components/builder/LocationsSection';
import { ContactSection } from './components/builder/ContactSection';
import { Footer } from './components/builder/Footer';
import { PhotosPage } from './components/builder/PhotosPage';
import { TeamPage } from './components/builder/TeamPage';
import { VisionPage } from './components/builder/VisionPage';
import { MerchPage } from './components/builder/MerchPage';

// --- Context & Types ---
interface FirebaseContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined);

export const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        // Check if user exists in Firestore, if not create profile
        const userRef = doc(db, 'users', user.uid);
        try {
          await setDoc(userRef, {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            role: user.email === "jadovdav@gmail.com" ? 'admin' : 'client',
            lastLogin: serverTimestamp()
          }, { merge: true });
          
          setIsAdmin(user.email === "jadovdav@gmail.com");
        } catch (error) {
          console.error("Error syncing user profile:", error);
        }
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <FirebaseContext.Provider value={{ user, loading, isAdmin, login, logout: handleLogout }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};

// --- Error Boundary ---
interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const handlePageChange = (e: any) => {
      setCurrentPage(e.detail);
      window.scrollTo(0, 0);
    };
    window.addEventListener('changePage', handlePageChange);
    return () => window.removeEventListener('changePage', handlePageChange);
  }, []);

  return (
    <FirebaseProvider>
      <div className="bg-zinc-200 selection:bg-navy-900 selection:text-white overflow-x-hidden">
        <Navbar />
        
        <AnimatePresence mode="wait">
          {currentPage === 'home' && (
            <motion.main 
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Hero />
              <StepSection />
              <MissionSection />
              <QuoteSection 
                quote='"1% PERCENT BETTER EVERYDAY."' 
                backgroundColor="bg-ice-blue" 
              />
              <AboutSection />
              <PricingSection />
              <LocationsSection />
              <ContactSection />
              <Footer />
            </motion.main>
          )}

          {currentPage === 'photos' && (
            <motion.div 
              key="photos"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <PhotosPage onBack={() => setCurrentPage('home')} />
            </motion.div>
          )}

          {currentPage === 'team' && (
            <motion.div 
              key="team"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <TeamPage onBack={() => setCurrentPage('home')} />
            </motion.div>
          )}

          {currentPage === 'vision' && (
            <motion.div 
              key="vision"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <VisionPage onBack={() => setCurrentPage('home')} />
            </motion.div>
          )}

          {currentPage === 'merch' && (
            <motion.div 
              key="merch"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <MerchPage onBack={() => setCurrentPage('home')} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FirebaseProvider>
  );
}

export default App;
