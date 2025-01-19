import { UserStorage } from '../../entities/UserStorage';
import { AuthStorageRepository } from '../../repositories/auth/AuthStorageRepository';

export class SaveUserStorageUseCase{
    constructor(private authStorageRepository: AuthStorageRepository){}

    async execute(user:UserStorage): Promise< boolean>{
        return this.authStorageRepository.save(user);
    }
}