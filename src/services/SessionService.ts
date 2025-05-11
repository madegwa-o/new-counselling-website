
import axiosInstance from "../utils/axiosInstance";

type Session = {
    sessionId: number;
    studentId: number;
    counsellorId: number;
    date: Date;
    timeSlot:  string;

}

export default class SessionService {
    static async bookSession(session: Session, baseUrl: string,accessToken: string): Promise<Session> {

        const response = await axiosInstance().get(`${baseUrl}/api/v1/sessions/book`,{
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },

        });

    }
}