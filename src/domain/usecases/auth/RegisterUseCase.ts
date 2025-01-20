import { User } from '../../entities/User';
import { AuthRepository } from '../../repositories/auth/AuthRepository';

export class RegisterUseCase{
    constructor(private authRepository: AuthRepository){}

    async execute(name:string, email:string, password:string): Promise<User | null>{
        return this.authRepository.register(name, email, password);
    }
}