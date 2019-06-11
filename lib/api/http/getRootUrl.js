export default function getRootUrl() {
    const port = process.env.PORT || 3000;
    const dev = process.env.NODE_ENV !== 'production';
    const ROOT_URL = process.env.ROOT_URL || `http://localhost:${port}`;

    return ROOT_URL;
}