import { AuthRepository } from "../../repositories/auth/AuthRepository";

export class LogoutUseCase{
    constructor(private authRepository: AuthRepository){}

    async execute(): Promise<boolean>{
        return this.authRepository.logout();
    }
}