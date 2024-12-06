import axios from 'axios';
import { SkillCheckResponse } from '../models/responses/SkillCheckResponse';
import { SkillCheckRequest } from '../models/requests/SkillCheckRequest'; 

const getPossiblyOutcomes = async (skillCheckRequest: SkillCheckRequest): Promise<SkillCheckResponse> => {
    const apiUrl = process.env.REACT_APP_API_URL;

    try {
      const response = await axios.get(`${apiUrl}api/pathfinder2e/v1/distribution`, {
        params: { modifier: skillCheckRequest.modifier, dc: skillCheckRequest.dc },
      });
  
      if (response.status === 200) {
        const data = response.data;
        return {
            dc: skillCheckRequest.dc,
            modifier: skillCheckRequest.modifier, 
            critical_success: data.critical_successes,
            success: data.successes,
            failure: data.failures,
            critical_failure: data.critical_failures,
        };
      } else if (response.status === 400) {
        throw new Error(response.data.error);
      } else {
        throw new Error('Error trying to obtain data from the server.');
      }
    } catch (error: any) {
      throw new Error(error.message || 'Error trying to obtain data from the server.');
    }
  };

  export default getPossiblyOutcomes;


