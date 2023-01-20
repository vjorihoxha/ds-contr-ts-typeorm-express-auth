import { Service } from 'typedi';

@Service()
class TestService {
	test() {
		return 0;
	}
}

export default TestService;
