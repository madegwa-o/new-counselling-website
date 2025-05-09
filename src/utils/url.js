const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080'; // Default fallback

export default function getBaseUrl() {
    if (!baseUrl) {
        console.error('Backend URL is not defined.');
        return '';
    }
    return baseUrl;
}
