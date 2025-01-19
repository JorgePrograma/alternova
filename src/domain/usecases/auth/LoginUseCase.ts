import { User } from '../../entities/User';
import { AuthRepository } from '../../repositories/auth/AuthRepository';

export class LoginUseCase{
    constructor(private authRepository: AuthRepository){}

    async execute(email:string, password:string): Promise<User | null>{
        return this.authRepository.login(email, password);
    }
}