
export interface IUserService {
    getAllUsersEmail(): Promise<string[]>;
}