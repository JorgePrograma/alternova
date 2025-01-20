import { AuthStorageRepository } from '../../repositories/auth/AuthStorageRepository';

export class DeleteUserUseCase{
    constructor(private authStorageRepository: AuthStorageRepository){}

    async execute(): Promise<boolean>{
        return this.authStorageRepository.delete();
    }
}