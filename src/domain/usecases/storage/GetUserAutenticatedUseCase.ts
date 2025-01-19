import { UserStorage } from '../../entities/UserStorage';
import { AuthStorageRepository } from '../../repositories/auth/AuthStorageRepository';
export class GetUserAutenticatedUseCase{
    constructor(private authStorageRepository: AuthStorageRepository){}

    async execute(): Promise<UserStorage | null>{
        return this.authStorageRepository.getUser();
    }
}