import Axios from "axios";
import Spinner from "../styles/spinner";
export default async function Github(user: string, cmd: string) {
	const spin = Spinner(`Loading user ${user}`);
	try {
		const response = await Axios.get(`https://api.github.com/users/${user}`);
		spin.stop();
		console.log(response.data);
	} catch (error) {
		console.log(error);
	}
}
