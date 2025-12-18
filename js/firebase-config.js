/**
 * Firebase Configuration and Services
 * MagikEvents PhotoBooth Application
 *
 * ASSOCIATION FLAG USAGE:
 * To enable association tracking, set the ASSOCIATION_CONFIG values below.
 * When any association data is present (name, id, or event), the associationFlag
 * will automatically be set to 1 for all saved images.
 *
 * Example:
 *   ASSOCIATION_CONFIG.name = "ABC Corporation";
 *   ASSOCIATION_CONFIG.id = "12345";
 *   ASSOCIATION_CONFIG.event = "Annual Conference 2024";
 *
 * This will save each image with:
 *   - associationFlag: 1
 *   - associationData: { name: "ABC Corporation", id: "12345", event: "Annual Conference 2024" }
 */

// Firebase Configuration
const FIREBASE_CONFIG = {
    apiKey: "AIzaSyDcgeMu5fPC1UCTBu7hgPYn-Xn6WUbPJoA",
    authDomain: "magikevents-bb514.firebaseapp.com",
    projectId: "magikevents-bb514",
    storageBucket: "magikevents-bb514.firebasestorage.app",
    messagingSenderId: "492099076261",
    appId: "1:492099076261:web:dbf80896539d28ece70d4c",
    measurementId: "G-S21N9W5PCR",
    databaseURL: "https://magikevents-bb514-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// Association Configuration
// Set association data here when available
const ASSOCIATION_CONFIG = {
    name: "",  // Association name
    id: "",    // Association ID
    event: "", // Event name
    // Add association data as needed
};

/**
 * Check if association data is available
 * @returns {boolean} True if association data exists
 */
function hasAssociationData() {
    return !!(ASSOCIATION_CONFIG.name || ASSOCIATION_CONFIG.id || ASSOCIATION_CONFIG.event);
}

/**
 * Get association flag value
 * @returns {number} 1 if association data available, 0 otherwise
 */
function getAssociationFlag() {
    return hasAssociationData() ? 1 : 0;
}

// Make association config globally available
window.ASSOCIATION_CONFIG = ASSOCIATION_CONFIG;
window.getAssociationFlag = getAssociationFlag;

// Firebase Services Initialization
class FirebaseService {
    constructor() {
        this.app = null;
        this.database = null;
        this.isInitialized = false;
    }

    /**
     * Initialize Firebase services
     * @returns {Promise<void>}
     */
    async initialize() {
        try {
            const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js');
            const { getDatabase } = await import('https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js');
            
            this.app = initializeApp(FIREBASE_CONFIG);
            this.database = getDatabase(this.app);
            this.isInitialized = true;
            
            console.log('Firebase initialized successfully');
        } catch (error) {
            console.error('Firebase initialization failed:', error);
            throw error;
        }
    }

    /**
     * Get database reference
     * @returns {Object} Database reference
     */
    getDatabase() {
        if (!this.isInitialized) {
            throw new Error('Firebase not initialized');
        }
        return this.database;
    }

    /**
     * Get Firebase app instance
     * @returns {Object} Firebase app
     */
    getApp() {
        if (!this.isInitialized) {
            throw new Error('Firebase not initialized');
        }
        return this.app;
    }
}

// Global Firebase service instance
window.firebaseService = new FirebaseService();

// Initialize Firebase when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    try {
        await window.firebaseService.initialize();
    } catch (error) {
        console.error('Failed to initialize Firebase:', error);
    }
});
