/**
 * Global Timeout Configurations for Playwright tests.
 * Centralizing these values ensures consistency across test suites.
 */
export const TimeOuts = {
    /** Short duration wait for small animations or UI state changes */
    SHORT: 500,

     /** Short duration wait for small animations or UI state changes */
    DEFAULT: 3000,

    /** Standard wait duration for most element interactions */
    STANDARD: 2000,

    /** Medium duration for AJAX calls or API responses */
    MEDIUM: 5000,

    /** Long duration for complex page loads or heavy data processing */
    LONG: 10000,

    /** Extended duration for critical test assertions or heavy background tasks */
    EXTENDED: 30000,

    /** Maximum timeout for specific critical navigation or extreme delays */
    MAX: 60000,

    /**
     * Default implicit wait time for locating elements.
     */
    IMPLICIT_WAIT: 1000,

    /**
     * Timeout for polling assertions.
     */
    POLLING_INTERVAL: 250,

    /**
     * Timeout for frame loading.
     */
    FRAME_LOAD: 15000,

    /**
     * Timeout for network idle state.
     */
    NETWORK_IDLE: 30000,

    /**
     * Timeout for network idle state.
     */
    SPINNER: 30000,

    /**
     * Timeout for network idle state.
     */
    MODAL: 30000,

    /**
     * Timeout for page navigation.
     */
    NAVIGATION: 30000
} as const;

/**
     * Helper to get timeout in milliseconds based on key.
     * @param key Timeout key
     */
    export function getTimeout(key: keyof typeof TimeOuts): number {
        return TimeOuts[key];
    }