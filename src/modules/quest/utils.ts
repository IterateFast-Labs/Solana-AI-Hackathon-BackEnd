import axios from 'axios';
import { TaskContent } from 'src/types';

export async function taskApiCall(
  content: TaskContent,
  userWalletAddress: string,
): Promise<boolean> {
  try {
    const parsedUrl = `${content.url}?wallet=${userWalletAddress}`;
    const response = await axios.get(parsedUrl);
    return response.data.isSuccess;
  } catch (err) {
    return false;
  }
}
