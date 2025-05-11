import axiosInstance from "../utils/axiosInstance.js";
import AuthService from "./AuthService.js";

const baseUrl = AuthService.BASE_URL;

export default class CounsellorService {
    static async getCounsellors(accessToken) {
        try {
            const response = await axiosInstance.get(`${baseUrl}/api/v1/users/by-role`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                params: {
                    role: 'COUNSELLOR',
                    page: 0,
                    size: 5
                }
            });

            // Return the actual counsellor data from the embedded userList
            if (response.data && response.data._embedded && response.data._embedded.userList) {
                return response.data._embedded.userList;
            }

            return [];
        } catch (error) {
            console.error('Error fetching counsellors:', error);
            throw error;
        }
    }
}