// src/utils/getImageUrl.js
import { API_BASE_URL } from "@/config";

/**
 * Returns a full image URL (backend + relative path).
 * Falls back to a default logo if missing.
 *
 * @param {string} path - relative path stored in DB (e.g., /uploads/company_logos/logo.png)
 * @param {string} fallback - fallback image path
 * @returns {string}
 */
export function getImageUrl(path, fallback = "/default_logo.png") {
    if (!path) return fallback;
    return `${API_BASE_URL}${path}`;
}
